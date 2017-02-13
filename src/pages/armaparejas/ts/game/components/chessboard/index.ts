import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { GameActions } from '../../../store/action';
import { ICard } from '../../../store/model/card';

@Component({
    selector: 'chessboard',
    template: `
    
    <card *ngFor="let card of cards$ | async; trackBy:trackByCards" [info]="card" (flipped)="actions.flipCard($event)"></card>
    
    `,
    styles: [`
    :host {
        margin-top: 50px;
        margin-bottom: 5%;
        width: 100%;
        background-color: #fff;
        height: 100%;
        border-radius: 4px;
        padding: 10px 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: space-around;
        position: absolute;
        padding-bottom: 40px;
    }
    card:nth-child(4n) {
        
    }
    @media screen and (max-width: 450px) {
        :host {
            height: 100%;
            
        }
    }
    @media screen and (max-width: 370px) {
        :host {
            height: 100%;
            
        }
    }
    `]
})
export class ChessboardComponent {

    @select() cards$: Observable<ICard[]>;

    constructor(private actions: GameActions) { }

    trackByCards(index: number, card: ICard) {
        return card._id;
    }
}
