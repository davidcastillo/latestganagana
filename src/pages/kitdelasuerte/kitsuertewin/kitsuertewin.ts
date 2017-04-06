import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

const name_view_kitSuerte_win: string = 'Kit_Suerte_Win';

@Component({
  selector: 'page-kitsuertewin',
  templateUrl: 'kitsuertewin.html'
})
export class KitsuertewinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    GoogleAnalytics.trackView(name_view_kitSuerte_win);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KitsuertewinPage');
  }

  volverAlHome(){
    this.navCtrl.pop();
  }
}
