import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { GameActions } from '../../../store/action';
import { stop } from '../../../core/helper/event';
import { STATUS } from '../../../store/model/status';

//service 
import { GamecontrolService } from '../../../../../../app/services/gamecontrol.service';

@Component({
    selector: 'status',
    template: `
    <span *ngIf="(status$ | async) === status.READY">¿Estas Listo?</span>
    <span *ngIf="(status$ | async) === status.PLAYING">Jugando</span>
    <span class="hand" *ngIf="(status$ | async) === status.PASS"  (click)="win()">¡Has Terminado! Toca aqui para continuar</span>
    <span class="elapsed">{{ elapsedMs$ | async }} s</span>
    `,
    styles: [`
    :host {
        position: relative;
        margin-top: 10px;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
    .hand {
        cursor: pointer;
        font-size: 12px;
    }
    .elapsed {
        position: absolute;
        right: 10px;
        font-size: 15px;
        font-weight: normal;
    }
    `]
})
export class StatusComponent {
    @select() status$: Observable<Number>;
    @select() elapsedMs$: Observable<Number>;
    
    status: any;
    flag: boolean = true;
    pass: any;
    constructor(private actions: GameActions, private gamecontrolService: GamecontrolService) {
        this.status = STATUS;
        this.pass = this.status.PASS;
    }

    ngDoCheck() {
        
        this.status$.subscribe((result) => {
            if (result === this.pass) {
                console.log("Pendiente");
                this.pass = null;
                this.gamecontrolService.armaParejasWin();
                this.gamecontrolService.armaParejasFlag = true;
            }
        })
        
    }

    reset(e: Event) {
        stop(e);
        this.actions.reset();
    }

    win() {
        
        /*this.gamecontrolService.armaParejasWin();
        this.gamecontrolService.armaParejasFlag= true;*/
    }
}
