import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../app/services/firebase.service';
import { JuegosPage } from '../juegos/juegos';
import { NumerologiaPage } from '../numerologia/numerologia';
import { AstrologiaPage } from '../astrologia/astrologia';
import { ResultadosPage } from '../resultados/resultados';
import { SimuladorgirosPage } from '../simuladorgiros/simuladorgiros';
import { PortafolioServiciosPage } from '../portafolio-servicios/portafolio-servicios';
import { GoogleAnalytics } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  juegosPage = JuegosPage;
  numerologiaPage = NumerologiaPage;
  astrologiaPage = AstrologiaPage;
  resultadosPage = ResultadosPage;
  simuladorgirosPage = SimuladorgirosPage;
  potafolioServiciosPage = PortafolioServiciosPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _firebaseService: FirebaseService) {
    GoogleAnalytics.trackView(name_view_home,'ganagana/home',true);
  }

  ngOnInit(){
  
  }

  /*ionViewCanEnter(){
    return this._firebaseService.authenticated;
  }*/

  pruebaUid(){
    
  }
}

const name_view_home: string = 'home';