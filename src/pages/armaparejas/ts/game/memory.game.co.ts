import { Component, OnInit } from '@angular/core';

import { GameActions } from '../store/action';
import { STATUS } from '../store/model/status';
import { NavController, NavParams } from 'ionic-angular';

//height: 670px;
@Component({
    selector: 'memory-game',
    template: `
    <status></status>
    <chessboard></chessboard>
    `,
    styles: [`
    :host {
        width: 100%;
        height: 100%;      
        
        border-radius: 2px;
        background-color: #faf8ef;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
    @media screen and (max-width: 450px) {
        :host{
            width: 100%;
            height: 100%;
            justify-content: space-around;
        }
    }
    >>> a {
        text-decoration: none;
        color: #fff;
    }
    `]
})
export class MemoryGameComponent implements OnInit {
    constructor(private actions: GameActions, public navCtrl: NavController, public navParams: NavParams) { }

    ngOnInit() {
        this.actions.updateStatus(STATUS.READY);
        this.actions.reset();
    }
}
