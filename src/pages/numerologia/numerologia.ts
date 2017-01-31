import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NumresultadosPage } from '../numresultados/numresultados';

@Component({
  selector: 'page-numerologia',
  templateUrl: 'numerologia.html'
})
export class NumerologiaPage {
  numresultsPage = NumresultadosPage
  isPushed: string = "disable";

  constructor(public navCtrl: NavController) {}

  public activateButtons(){
    this.isPushed = "";
  }
}
