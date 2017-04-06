import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NumresultadosPage } from '../numresultados/numresultados';
import { GoogleAnalytics } from 'ionic-native';

const name_view_numerologia: string = 'numerologia';

@Component({
  selector: 'page-numerologia',
  templateUrl: 'numerologia.html',

})
export class NumerologiaPage implements OnInit {
  numresultsPage = NumresultadosPage
  isPushed: string = "disable";

  constructor(public navCtrl: NavController, ) {}

  ngOnInit(){
    GoogleAnalytics.trackView(name_view_numerologia);
  }

  public activateButtons(){
    this.isPushed = "";
  }



}
