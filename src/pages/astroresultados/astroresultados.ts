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
    this.generatePIN(4);    
  }
  generatePIN(length){
        this.numrandom = Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  }
}
