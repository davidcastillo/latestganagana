import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//services
import { FirebaseService } from '../../app/services/firebase.service';
import { kitsuerteService } from '../../app/services/kitsuerte.service';

//pages
import { InstruccionesKitSuertePage } from './instrucciones-kit-suerte/instrucciones-kit-suerte';

//border scanner
import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-kitdelasuerte',
  templateUrl: 'kitdelasuerte.html'
})
export class KitdelasuertePage {
  private instructionsRoot = InstruccionesKitSuertePage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseService,
    private kitService: kitsuerteService
  ) { 
  }

  private data;

  ionViewDidLoad() {
    console.log('ionViewDidLoad KitdelasuertePage');
    this.kitService.copyDbAmulets();

  }

  validarQR() {
    BarcodeScanner.scan(barcodeScannerParams).then((barcodeData) => {
      this.data = {
        result: barcodeData.text
      };
    }, (err) => {
      console.log('Algo salio mal' + err);
    });

  }

}

const barcodeScannerParams = {
  preferFrontCamera: true,
  showFlipCameraButton: true,
  prompt: "Suerte!",
  formats: "QR_CODE",
}
