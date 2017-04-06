import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MostrarServicioPage } from './mostrar-servicio/mostrar-servicio';
import { GoogleAnalytics } from 'ionic-native';

const name_view_portafolio_servicios: string = 'portafolio_servicios';

@Component({
  selector: 'page-portafolio-servicios',
  templateUrl: 'portafolio-servicios.html'
})
export class PortafolioServiciosPage implements OnInit {

  private mostrarServicioPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {

  }

  ngOnInit() {
    GoogleAnalytics.trackView(name_view_portafolio_servicios);
    this.mostrarServicioPage = MostrarServicioPage;
  }
  

}
