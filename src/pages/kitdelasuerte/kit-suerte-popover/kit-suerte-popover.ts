import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

//pages for Root
import { InstruccionesKitSuertePage } from '../instrucciones-kit-suerte/instrucciones-kit-suerte';
import { KitsuertewinPage } from '../kitsuertewin/kitsuertewin';

import { GamecontrolService } from '.././../../app/services/gamecontrol.service';
import { FirebaseService } from '.././../../app/services/firebase.service';

@Component({
  selector: 'page-kit-suerte-popover',
  templateUrl: 'kit-suerte-popover.html'
})
export class KitSuertePopoverPage {
  private tapToShow: string = 'instrucciones';
  amuletosCapturados;
  amuletosRestantes;
  amuletos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private gamecontrolService: GamecontrolService,
              private alertCtrl: AlertController,
              private firebaseService: FirebaseService
  ) {
    this.amuletosCapturados = this.gamecontrolService.amuletosCapturados;
    this.amuletosRestantes = this.gamecontrolService.amuletosRestantes;
  }
  
  ionViewDidLoad() {
    
  }

  change(){

  }

  showConfirmReset(){
    
    let confirm = this.alertCtrl.create({
      title: 'Desea iniciar de nuevo?',
      message: 'Si acepta se perderan los avances',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid()).subscribe(
              (uidYamuletos)=>{
                uidYamuletos.forEach(Uidamuletos => {
                  (Uidamuletos.amuletos).forEach(amuletos => {
                    this.amuletos.push({
                      name: amuletos.name,
                      imgUrl: amuletos.imgUrl,
                      code: amuletos.code,
                      find: false
                    });
                  });
                  this.firebaseService.updateKitSuerteSaves(Uidamuletos.$key,{amuletos: this.amuletos});
                });
              }
            );
          }
        }
      ]
    });
    confirm.present();

  }

}
