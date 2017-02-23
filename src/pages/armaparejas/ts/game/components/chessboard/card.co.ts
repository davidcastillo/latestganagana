import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICard, CARDS } from '../../../store/model/card';

@Component({
    selector: 'card',
    template: `
    <div class="card" [class.flipped]="info.flipped" (click)="flip(info)">
        <img class="front" src="{{ info.url }}"/>
        <img class="back" src="{{ backCard.url }}"/>
    </div>
    `,
    styles: [`
    :host {
        width: 115px;
        height: 140px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        position: relative;
        perspective: 800px;
    }
    
    .card {
        width: 100%;
        height: 100%;
        transition: transform 1s;
        transform-style: preserve-3d;
    }
    .card.flipped {
        transform: rotateY( 180deg );
    }
    .card img {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        backface-visibility: hidden;
    }
    .card .back {
        background: blue;
        transform: rotateY( 0deg );
    }
    .card .front {
        background: blue;
        transform: rotateY( 180deg );
    }
    @media screen and (max-width: 1110px) {
        :host {
            width: 100px;
            height: 115px;
            margin-right: 3px;
            cursor: pointer;
            position: relative;
            perspective: 800px;
        }
    }
    @media screen and (max-width: 969px) {
        :host {
                width: 130px;
                height: 75px;
                margin-right: 58px;
                cursor: pointer;
                position: relative;
                perspective: 800px;
        }
    }
    @media screen and (max-width: 846px) {
        :host {
            width: 103px;
            height: 70px;
            margin-right: 59px;
            cursor: pointer;
            position: relative;
            perspective: 800px;
        }
    }
    @media screen and (max-width: 717px) {
        :host {
                width: 113px;
                height: 70px;
                margin-right: 15px;
                cursor: pointer;
                position: relative;
                perspective: 800px;
        }
    }
    @media screen and (max-width: 579px) {
        :host {
            width: 99px;
            height: 70px;
            margin-right: 1px;
        }
    }
    @media screen and (max-width: 534px) {
        :host {
            width: 90px;
            height: 69px;
            margin-right: 1px;
        }
    }
    @media screen and (max-width: 470px) {
        :host {
            width: 80px;
            height: 60px;
            margin-right: 1px;
        }
    }
    @media screen and (max-width: 396px) {
        :host {
            width: 70px;
            height: 60px;
            margin-right: 1px;
        }
    }
    @media screen and (max-width: 360px) {
        :host {
            width: 60px;
            height: 70px;
            margin-right: 1px;
        }
    }
    @media screen and (max-width: 313px) {
        :host {
            width: 60px;
            height: 55px;
            margin-right: -1px;
            margin-left: -1px;
     
    `]
})
export class CardComponent {
    @Input() info: ICard;

    @Output() flipped = new EventEmitter();

    backCard: ICard;

    constructor() {
        this.backCard = CARDS.find(c => c.name === 'back');
    }

    flip(info: ICard) {
        if (info.flipped) {
            return;
        }
        this.flipped.emit(info);
    }
}
