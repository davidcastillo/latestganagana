import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InstruccionesPage } from './instrucciones/instrucciones';
import { ArmaparejasgamePage} from '../armaparejasgame/armaparejasgame';
import { JuegosPage } from '../juegos/juegos';
//
import { GamecontrolService } from '../../app/services/gamecontrol.service';
import { GoogleAnalytics } from 'ionic-native';

const name_view_armaparejas: string = 'Arma_Parejas';

@Component({
  selector: 'page-armaparejas',
  templateUrl: 'armaparejas.html'
})
export class ArmaparejasPage {
  instruccionesPage = InstruccionesPage;
  armaparejagamePage = ArmaparejasgamePage;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private gamecontrolService: GamecontrolService
    ) {
      GoogleAnalytics.trackView(name_view_armaparejas);
    }

  ngDoCheck(){
    if(this.gamecontrolService.armaParejasFlag){
      this.win();
      this.gamecontrolService.armaParejasFlag=false;
    }
  }

  win(){
    this.navCtrl.setRoot(JuegosPage);
  }

}
