import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ViewChild } from '@angular/core';
import { JuegosPage } from '../juegos/juegos';
import { NumerologiaPage } from '../numerologia/numerologia';
import { AstrologiaPage } from '../astrologia/astrologia';
import { ResultadosPage } from '../resultados/resultados';
import { SimuladorgirosPage } from '../simuladorgiros/simuladorgiros';

import { GooglePlus, NativeStorage } from 'ionic-native';

import { HomeModel } from './home.model';


/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  juegosPage = JuegosPage
  numerologiaPage = NumerologiaPage
  astrologiaPage = AstrologiaPage
  resultadosPage = ResultadosPage
  simuladorgirosPage = SimuladorgirosPage
  user: HomeModel = new HomeModel();


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

   ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        email: data.email,
      };
    }, function(error){
      console.log(error);
    });
  }


}
