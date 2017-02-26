import { Injectable, OnInit } from '@angular/core';
import { AlertController, PopoverController } from 'ionic-angular';
import { FirebaseService } from './firebase.service';

import { KitSuertePopoverPage } from '../../pages/kitdelasuerte/kit-suerte-popover/kit-suerte-popover';

@Injectable()
export class GamecontrolService {

    armaParejasFlag: boolean = false;
    kitSuerteFlag: boolean;
    amuletosCapturados;
    amuletosRestantes;
    contadorAmuletos: number;
    totalAmuletos: number;
    popover: any;
    flagEsGanador: boolean;
    amuletos = [];
    pruebaKey;
    amuletosDelUsuario = [];
    constructor(public alertCtrl: AlertController,
        public popoverCtrl: PopoverController,
        private firebaseService: FirebaseService
    ) {
this.flagEsGanador = false;
    }
    ngOnInit() {
        

        this.flagEsGanador = false;
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