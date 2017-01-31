import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InstruccionesPage } from '../instrucciones/instrucciones';


@Component({
  selector: 'page-armaparejas',
  templateUrl: 'armaparejas.html'
})
export class ArmaparejasPage {
  instruccionesPage = InstruccionesPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {}



}
