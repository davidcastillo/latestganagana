import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-numresultados',
  templateUrl: 'numresultados.html'
})
export class NumresultadosPage implements OnInit{
  numrandom: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {}

  ngOnInit(){
    this.presentLoading();
    this.generatePIN(4);
 
  }
  generatePIN(length){
        this.numrandom = Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  }

    presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "cargando",
      duration: 3000
    });
    loader.present();
  }
}

