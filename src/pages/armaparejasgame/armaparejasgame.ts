import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//game component
import { MemoryGameComponent } from '../armaparejas/ts/game/memory.game.co';

/*
  Generated class for the Armaparejasgame page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-armaparejasgame',
  templateUrl: 'armaparejasgame.html'
})
export class ArmaparejasgamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
    gameRoot = MemoryGameComponent;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArmaparejasgamePage');
  }

}
