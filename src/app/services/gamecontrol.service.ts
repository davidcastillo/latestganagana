import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
@Injectable()
export class GamecontrolService {

    armaParejasFlag: boolean = false;
    kitSuerteFlag: boolean = true;
    amuletosCapturados;
    amuletosRestantes;
    constructor(public alertCtrl: AlertController) {

    }

    armaParejasWin() {
        let alert = this.alertCtrl.create({
            title: '¡Ganaste!',
            subTitle: 'Has completado exitosamente el juego de armar parejas',
            buttons: ['OK']
        });
        alert.present();
    }

}