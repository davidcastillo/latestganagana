import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the InstruccionesKitSuerte page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-instrucciones-kit-suerte',
  templateUrl: 'instrucciones-kit-suerte.html'
})
export class InstruccionesKitSuertePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstruccionesKitSuertePage');
  }

}
