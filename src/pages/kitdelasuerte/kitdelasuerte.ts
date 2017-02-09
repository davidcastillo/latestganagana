import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//border scanner
import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-kitdelasuerte',
  templateUrl: 'kitdelasuerte.html'
})
export class KitdelasuertePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  private data;

  ionViewDidLoad() {
    console.log('ionViewDidLoad KitdelasuertePage');
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
          preferFrontCamera : true,
          showFlipCameraButton : true,
          prompt : "Suerte!",
          formats : "QR_CODE",
      }
