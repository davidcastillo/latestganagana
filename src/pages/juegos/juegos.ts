import { Component, OnInit, OnDestroy } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ArmaparejasPage } from '../armaparejas/armaparejas';
import { KitdelasuertePage } from '../kitdelasuerte/kitdelasuerte';
import { CompleteInfoPage } from '../kitdelasuerte/complete-info/complete-info';
/*import { KitsuertewinPage } from '../kitdelasuerte/kitsuertewin/kitsuertewin';*/

import { FirebaseService } from '../../app/services/firebase.service';
import { LoadingController, AlertController } from 'ionic-angular';

import { Network, Toast, GoogleAnalytics } from 'ionic-native';
import { Subscription } from 'rxjs/Subscription';
const name_view_juegos: string = 'juegos';

@Component({
  selector: 'page-juegos',
  templateUrl: 'juegos.html'
})
export class JuegosPage implements OnInit, OnDestroy {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, icon: string }>;
  games: Array<{ title: string, gameId: string, descripcion: string, }>;
  sub_personalInfo: Subscription = new Subscription();
  /*private tamaño;
  private contadorAmuletos: number;
  private totalAmuletos: number;
  private gameToShow: any;*/
  private loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController

  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.games = [
      {
        title: 'Armar Parejas',
        gameId: 'armaparejas',
        descripcion: 'este es el juego para encontrar parejas y ejercitar la mente'
      },
      {
        title: 'Kit de la Suerte',
        gameId: 'kitdelasuerte',
        descripcion: 'este juego se parece a capturar pokemones'
      },
    ];

  }

  ngOnInit() {
    GoogleAnalytics.trackView(name_view_juegos);
  }

  ngOnDestroy() {
    this.sub_personalInfo.unsubscribe();
    this.sub_authinfo.unsubscribe();
  }

  ionViewDidEnter() {
    
  }
  ionViewDidLeave() {
    this.firebaseService.message = null;
    this.sub_personalInfo.unsubscribe();
    this.sub_authinfo.unsubscribe();
  }

  gamesTapped(event, game) {

    switch (game.gameId) {
      case 'armaparejas':
        this.navCtrl.push(ArmaparejasPage);
        break;
      case 'kitdelasuerte':
        this.kitSuerteSelected();
        break;
      default:
        console.log("none item selected");
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Cargando Informacion`,
    });
    this.loading.present();
  }
  dismissLoading() {
    this.loading.dismiss();
  }

  check_uid(uid: any): string {
    console.log('Aqui hay error');
    if (uid.uid == null) {
      return '';
    }
    return uid.uid
  }

  private sub_authinfo: Subscription = new Subscription();
  kitSuerteSelected() {

    if (Network.type != 'none') {
      this.showLoading();

      this.sub_authinfo.unsubscribe();
      this.sub_authinfo =
        this.firebaseService.auth.subscribe((authInfo) => {
          if (authInfo) {
            this.sub_personalInfo.unsubscribe();
            this.sub_personalInfo =
              this.firebaseService.getSpecificPersonalInfo(this.check_uid(authInfo))
                .subscribe(result => {
                  if (result.length == 1) {
                    this.dismissLoading();
                    this.navCtrl.push(KitdelasuertePage);
                  } else {
                    this.dismissLoading();
                    this.navCtrl.push(CompleteInfoPage);
                  }
                }, (err) => {
                  //console.log("la cosa no sirvio");
                }, () => {
                  //console.log("Proceso terminado");
                });
          }
        });

    } else {
      this.showToast('Debe tener conexión a Internet', 'bottom');
    }
  }
  showToast(message: string, position: string, pixelsY: number = (-40)) {
    Toast.showWithOptions({
      message: message,
      duration: 2000,
      position: position,
      addPixelsY: pixelsY
    }).subscribe(console.log);

  }
}
