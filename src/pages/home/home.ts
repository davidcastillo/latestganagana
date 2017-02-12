import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../app/services/firebase.service';
import { LoginPage } from '../login/login';
import { ViewChild } from '@angular/core';
import { JuegosPage } from '../juegos/juegos';
import { NumerologiaPage } from '../numerologia/numerologia';
import { AstrologiaPage } from '../astrologia/astrologia';
import { ResultadosPage } from '../resultados/resultados';
import { SimuladorgirosPage } from '../simuladorgiros/simuladorgiros';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  juegosPage = JuegosPage
  numerologiaPage = NumerologiaPage
  astrologiaPage = AstrologiaPage
  resultadosPage = ResultadosPage
  simuladorgirosPage = SimuladorgirosPage


  constructor(public navCtrl: NavController, public navParams: NavParams, private _firebaseService: FirebaseService) {}

  ngOnInit(){
  }

  /*ionViewCanEnter(){
    return this._firebaseService.authenticated;
  }*/


}
