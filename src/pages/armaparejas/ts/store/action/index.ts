import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { isEmpty } from '../../core/helper/object';
import { IState } from '../model/state';
import { STATUS } from '../model/status';
import { ICard } from '../model/card';

import {  GamecontrolService } from '../../../../../app/services/gamecontrol.service';

@Injectable()
export class GameActions {
    constructor(private ngRedux: NgRedux<IState>,  private gamecontrolService: GamecontrolService) { }

    static RESET: string = 'RESET';
    static UPDATE_STATUS: string = 'UPDATE_STATUS';
    static UPDATE_LAST_SELECTED_CARD: string = 'UPDATE_LAST_SELECTED_CARD';
    static UPDATE_CARD_FLIPPED: string = 'UPDATE_CARD_FLIPPED';
    static UPDATE_REMAINS: string = 'UPDATE_REMAINS';
    static UPDATE_ELAPSED: string = 'UPDATE_ELAPSED';
    static UPDATE_HIGHESTSPEED: string = 'UPDATE_HIGHESTSPEED';

    private timerId: any;

    reset(): void {
        this.ngRedux.dispatch({ type: GameActions.RESET });
    }

    updateStatus(status: STATUS): void {
        this.ngRedux.dispatch({ type: GameActions.UPDATE_STATUS, payload: status });
        if (status === STATUS.PLAYING) {
            this.timerId = setInterval(() => {
                this.ngRedux.dispatch({ type: GameActions.UPDATE_ELAPSED, payload: +this.ngRedux.getState().elapsedMs + 1 });
            }, 1000);
        } else if (status === STATUS.PASS) {
            clearInterval(this.timerId);
            this.ngRedux.dispatch({ type: GameActions.UPDATE_HIGHESTSPEED, payload: this.ngRedux.getState().elapsedMs });
            this.gamecontrolService.armaParejasWin();
            this.gamecontrolService.armaParejasFlag = true;
        }
    }

    updateLastSelectedCard(card: ICard): void {
        this.ngRedux.dispatch({ type: GameActions.UPDATE_LAST_SELECTED_CARD, payload: card });
    }

    updateCardFlipped(card: ICard): void {
        this.ngRedux.dispatch({ type: GameActions.UPDATE_CARD_FLIPPED, payload: card });
    }

    match(): void {
        this.ngRedux.dispatch({ type: GameActions.UPDATE_REMAINS, payload: +this.ngRedux.getState().remains - 1 });
    }

    flipCard(card: ICard): any {
        const state = this.ngRedux.getState();
        this.updateCardFlipped(card);
        if (state.status === STATUS.READY) {
            this.updateStatus(STATUS.PLAYING);
        }
        if (isEmpty(state.lastSelectedCard)) {
            return this.updateLastSelectedCard(card);
        }
        if (state.lastSelectedCard.name === card.name) {
            this.updateLastSelectedCard(null);
            this.match();
            const remains = +state.remains - 1;
            return remains || this.updateStatus(STATUS.PASS);
        }
        const lastCard = state.lastSelectedCard;
        this.updateLastSelectedCard(null);
        setTimeout(() => {
            this.updateCardFlipped(lastCard);
            this.updateCardFlipped(card);
        }, 1000);
    }
}