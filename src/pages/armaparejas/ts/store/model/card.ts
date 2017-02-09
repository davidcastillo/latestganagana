
export interface ICard {
    _id?: Number;
    flipped: Boolean;
    name: String;
    url?: any;
}
/*
import * as URL_8BALL from '../../../../../assets/img/8-ball.png';
import * as URL_BAKEDPOTATO from '../../../img/baked-potato.png';
import * as URL_DINOSAUR from '../../../img/dinosaur.png';
import * as URL_KRONOS from '../../../img/kronos.png';
import * as URL_ROCKET from '../../../img/rocket.png';
import * as URL_SKINNYUNICORN from '../../../img/skinny-unicorn.png';
import * as URL_THATGUY from '../../../img/that-guy.png';
import * as URL_ZEPPELIN from '../../../img/zeppelin.png';

import * as URL_BACK from '../../../img/back.png';
*/
export const CARDS: ICard[] = [{
    name: '8-ball',
    flipped: false,
    url: '../../../../../assets/img/8-ball.png'
},
{
    name: 'baked-potato',
    flipped: false,
    url: '../../../../../assets/img/baked-potato.png'
},
{
    name: 'dinosaur',
    flipped: false,
    url: '../../../../../assets/img/dinosaur.png'
},
{
    name: 'kronos',
    flipped: false,
    url: '../../../../../assets/img/kronos.png'
},
{
    name: 'rocket',
    flipped: false,
    url: '../../../../../assets/img/rocket.png'
},
{
    name: 'skinny-unicorn',
    flipped: false,
    url: '../../../../../assets/img/skinny-unicorn.png'
},
{
    name: 'that-guy',
    flipped: false,
    url: '../../../../../assets/img/that-guy.png'
},
{
    name: 'zeppelin',
    flipped: false,
    url: '../../../../../assets/img/zeppelin.png'
},
{
    name: 'back',
    flipped: false,
    url: '../../../../../assets/img/back.png'
}];

const CARDS_WITHOUT_BACK = CARDS.filter(c => c.name !== 'back');

export function duplicateCards() {
    return CARDS_WITHOUT_BACK.concat(CARDS_WITHOUT_BACK).map((c, i) => ({
        _id: i,
        name: c.name,
        flipped: c.flipped,
        url: c.url
    }));
}
