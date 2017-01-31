import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-astroresultados',
  templateUrl: 'astroresultados.html'
})
export class AstroresultadosPage implements OnInit{
  numrandom: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(){
    console.log('se esta ejecutando el metodo');
    this.generatePIN();    
  }
  generatePIN(){
        console.log('se esta ejecutando el metodo');
        this.numrandom = Math.floor(Math.random() * 9999) + 1000;
  }
}
