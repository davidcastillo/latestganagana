import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/*
  Generated class for the Resultados page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
  
})

export class ResultadosPage implements OnInit{
  homePage : HomePage

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(){
   window.open('http://www.ganagana.com.co/index.php/resultados/resultados-loterias-y-sorteos');
  }

  redirectTo(){
    window.open('http://www.ganagana.com.co/index.php/resultados/resultados-loterias-y-sorteos');
  }

}
