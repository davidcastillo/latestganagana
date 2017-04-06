import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';

//pages for Root
import { GamecontrolService } from '.././../../app/services/gamecontrol.service';
import { FirebaseService } from '.././../../app/services/firebase.service';
import { PopoverController } from 'ionic-angular';
import { JuegosPage } from '../../juegos/juegos';
import { Observable } from 'rxjs/Observable';
import { GoogleAnalytics } from 'ionic-native';

const name_view_kitsuertepopover: string = 'Kit_Suerte_Popover';

@Component({
  selector: 'page-kit-suerte-popover',
  templateUrl: 'kit-suerte-popover.html'
})
export class KitSuertePopoverPage {
  private tapToShow: string;
  amuletosCapturados;
  amuletosRestantes;
  amuletos = [];
  loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private gamecontrolService: GamecontrolService,
    private alertCtrl: AlertController,
    private firebaseService: FirebaseService,
    private viewController: ViewController,
    private loadingCtrl: LoadingController
  ) {
    this.amuletosCapturados = this.gamecontrolService.amuletosCapturados;
    this.amuletosRestantes = this.gamecontrolService.amuletosRestantes;
    this.tapToShow = 'instrucciones';
    GoogleAnalytics.trackView(name_view_kitsuertepopover);
  }

  ionViewDidLoad() {

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Procesando Informacion`,
    });
    this.loading.present();
  }
  dismissLoading() {
    this.loading.dismiss();
  }

  showConfirmReset() {

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
            
            this.gamecontrolService.kitSuerteFlag = true;
            this.viewController.dismiss();
            

          }
        }
      ]
    });
    confirm.present();

  }

  updateData(){
    return this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid()).subscribe(
      (uidYamuletos) => {
        uidYamuletos.forEach(Uidamuletos => {
          (Uidamuletos.amuletos).forEach(amuletos => {
            this.amuletos.push({
              name: amuletos.name,
              imgUrl: amuletos.imgUrl,
              code: amuletos.code,
              find: false,
              capturedDate: 0
            });
          });
          console.log(Uidamuletos.$key);
          console.log(this.amuletos);
          this.firebaseService.updateKitSuerteSaves(Uidamuletos.$key, { amuletos: this.amuletos })
            .then(
            () => {
              this.viewController.dismiss();
              
            }
            );
        });
      }
    );
  }

}
