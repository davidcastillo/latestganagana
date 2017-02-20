import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-kitsuertewin',
  templateUrl: 'kitsuertewin.html'
})
export class KitsuertewinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad KitsuertewinPage');
  }

  volverAlHome(){
    this.navCtrl.pop();
  }
}
