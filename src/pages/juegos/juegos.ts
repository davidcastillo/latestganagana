import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ArmaparejasPage } from '../armaparejas/armaparejas';
import { KitdelasuertePage } from '../kitdelasuerte/kitdelasuerte';
import { CompleteInfoPage } from '../kitdelasuerte/complete-info/complete-info';
/*import { KitsuertewinPage } from '../kitdelasuerte/kitsuertewin/kitsuertewin';*/

import { FirebaseService } from '../../app/services/firebase.service';
import { LoadingController, AlertController } from 'ionic-angular';

import { Network, Toast } from 'ionic-native';


@Component({
  selector: 'page-juegos',
  templateUrl: 'juegos.html'
})
export class JuegosPage implements OnInit {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, icon: string }>;
  games: Array<{ title: string, gameId: string, descripcion: string, }>;
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

  ngOnInit() { }

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

  kitSuerteSelected() {

    if (Network.type != 'none') {
      this.showLoading();
      this.firebaseService.getSpecificPersonalInfo(this.firebaseService.auth.getAuth().uid)
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
