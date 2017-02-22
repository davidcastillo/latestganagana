import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MostrarServicioPage } from './mostrar-servicio/mostrar-servicio';


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
    this.mostrarServicioPage = MostrarServicioPage;
  }
  

}
