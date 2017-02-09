import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InstruccionesPage } from '../instrucciones/instrucciones';
import { MemoryGameComponent } from './ts/game/memory.game.co';

@Component({
  selector: 'page-armaparejas',
  templateUrl: 'armaparejas.html'
})
export class ArmaparejasPage {
  instruccionesPage = InstruccionesPage
  gameRoot = MemoryGameComponent;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}



}
