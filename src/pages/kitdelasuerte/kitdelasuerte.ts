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
  private amulets;
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
    this.kitService.getAllAmulets().then(
      (ress)=>{
        console.log(ress);
        this.amulets = ress;
      }
    );

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

  prueba(key){
    let data = {
      code: key.code,
      find: true,
      imgUrl: key.imgUrl,
      name: key.name
    }
    this.kitService.updateAmulte(key.id, data);
    
  }

} 

const barcodeScannerParams = {
  preferFrontCamera: true,
  showFlipCameraButton: true,
  prompt: "Suerte!",
  formats: "QR_CODE",
}
