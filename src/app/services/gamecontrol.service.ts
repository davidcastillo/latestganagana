import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
@Injectable()
export class GamecontrolService {

    constructor(public alertCtrl: AlertController) {

    }

    armaParejasWin() {
        let alert = this.alertCtrl.create({
            title: 'New Friend!',
            subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['OK']
        });
        alert.present();
    }

}