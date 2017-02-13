import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ArmaparejasPage } from '../armaparejas/armaparejas';
import { KitdelasuertePage } from '../kitdelasuerte/kitdelasuerte';
import { CompleteInfoPage } from '../kitdelasuerte/complete-info/complete-info';

import { FirebaseService } from '../../app/services/firebase.service';

@Component({
  selector: 'page-juegos',
  templateUrl: 'juegos.html'
})
export class JuegosPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, icon: string}>;
  games: Array<{title: string, gameId: string, descripcion: string,}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseService: FirebaseService
    
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

  gamesTapped(event, game) {
    let gametoShow : any;
      switch(game.gameId) {
        case 'armaparejas':
             gametoShow = ArmaparejasPage;
             break;
        case 'kitdelasuerte':

             gametoShow = this.validDatos();
             break;
        default:
            console.log("none item selected");
      }
    this.navCtrl.push(gametoShow, {
      item: game
    });
  }

  validDatos(): any{
    let uid;
    this.firebaseService.displayData().subscribe((result) => {uid = result.auth.uid})
    let length;
    this.firebaseService.getSpecificPersonalInfo(uid).subscribe((ress) => {length = ress.length});
    console.log(length);
    if(length == undefined){
      return CompleteInfoPage;
    }
    return KitdelasuertePage;
  }

}
