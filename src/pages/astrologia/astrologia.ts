import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AstroresultadosPage } from '../astroresultados/astroresultados';


@Component({
  selector: 'page-astrologia',
  templateUrl: 'astrologia.html'
})
export class AstrologiaPage {
  astroresultadosPage = AstroresultadosPage



  constructor(public navCtrl: NavController, public navParams: NavParams) {}



}
