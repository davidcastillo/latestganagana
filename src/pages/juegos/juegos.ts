import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ArmaparejasPage } from '../armaparejas/armaparejas';
import { KitdelasuertePage } from '../kitdelasuerte/kitdelasuerte';
import { CompleteInfoPage } from '../kitdelasuerte/complete-info/complete-info';
/*import { KitsuertewinPage } from '../kitdelasuerte/kitsuertewin/kitsuertewin';*/

import { FirebaseService } from '../../app/services/firebase.service';
import { LoadingController } from 'ionic-angular';

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
    private loadingCtrl: LoadingController

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

  kitSuerteSelected() {
    this.showLoading();
    console.log("kitsuertelected");
    this.firebaseService.getSpecificPersonalInfo(this.firebaseService.auth.getAuth().uid)
      .subscribe(result => {
        if (result.length == 1) {
          this.dismissLoading();
          this.navCtrl.push(KitdelasuertePage);
          /*this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid())
            .subscribe(
            (uidYamuletos) => {
              uidYamuletos.forEach(amuletosEnFirebase => {
                this.contadorAmuletos = 0;
                this.totalAmuletos = 0;
                (amuletosEnFirebase.amuletos).forEach(amuletosDescription => {
                  if ((amuletosDescription.find) == true) {
                    this.contadorAmuletos++;
                  }
                  this.totalAmuletos++;
                });
                console.log('Total amuletos: '+this.totalAmuletos + " AmuletosContados: " + this.contadorAmuletos);
                if (this.contadorAmuletos == this.totalAmuletos) {
                  this.navCtrl.push(KitsuertewinPage);
                  this.dismissLoading();
                } else {
                  this.dismissLoading();
                  this.navCtrl.push(KitdelasuertePage);
                }
              });
            }
            );*/
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
}
