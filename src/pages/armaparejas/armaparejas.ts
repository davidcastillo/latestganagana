import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InstruccionesPage } from '../instrucciones/instrucciones';
import { ArmaparejasgamePage} from '../armaparejasgame/armaparejasgame';

@Component({
  selector: 'page-armaparejas',
  templateUrl: 'armaparejas.html'
})
export class ArmaparejasPage {
  instruccionesPage = InstruccionesPage;
  armaparejagamePage = ArmaparejasgamePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}



}
