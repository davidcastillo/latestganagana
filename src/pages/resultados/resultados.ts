import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GoogleAnalytics } from 'ionic-native';

const name_view_resultados: string = 'Resultados';

@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
  
})

export class ResultadosPage implements OnInit{
  homePage : HomePage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    GoogleAnalytics.trackView(name_view_resultados);
  }

  ngOnInit(){
   window.open('http://www.ganagana.com.co/index.php/resultados');
  }

  redirectTo(){
    window.open('http://www.ganagana.com.co/index.php/resultados');
  }

}
