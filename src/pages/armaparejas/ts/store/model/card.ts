
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
    url: 'assets/images/1bannertranajre.jpg'
},
{
    name: 'baked-potato',
    flipped: false,
    url: 'assets/images/bancobogota.jpg'
},
{
    name: 'dinosaur',
    flipped: false,
    url: 'assets/images/logo2.png'
},
{
    name: 'kronos',
    flipped: false,
    url: 'assets/images/recargas.jpg'
},
{
    name: 'rocket',
    flipped: false,
    url: 'assets/images/yo_quiero_migiroseguro.jpg'
},
{
    name: 'skinny-unicorn',
    flipped: false,
    url: 'assets/images/bannerganagana.png'
},
{
    name: 'that-guy',
    flipped: false,
    url: 'assets/images/banner_liga14.jpg'
},
{
    name: 'zeppelin',
    flipped: false,
    url: 'assets/images/todoenunsololugar.jpg'
},
{
    name: 'back',
    flipped: false,
    url: 'assets/images/signointerrogacion.jpg'
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
