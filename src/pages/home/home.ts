import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ViewChild } from '@angular/core';
import { JuegosPage } from '../juegos/juegos';
import { NumerologiaPage } from '../numerologia/numerologia';
import { AstrologiaPage } from '../astrologia/astrologia';
import { ResultadosPage } from '../resultados/resultados';
import { SimuladorgirosPage } from '../simuladorgiros/simuladorgiros';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

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
export class HomePage implements OnInit{
  juegosPage = JuegosPage
  numerologiaPage = NumerologiaPage
  astrologiaPage = AstrologiaPage
  resultadosPage = ResultadosPage
  simuladorgirosPage = SimuladorgirosPage
  user: HomeModel = new HomeModel();
  name: any;


  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

  }

  logout() {
     this.af.auth.logout();
     this.navCtrl.setRoot(LoginPage);
  }


  ngOnInit() {
  }
}