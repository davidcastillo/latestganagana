import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//services
import { FirebaseService } from '../../app/services/firebase.service';
import { kitsuerteService } from '../../app/services/kitsuerte.service';

//border scanner
import { BarcodeScanner } from 'ionic-native';

//native import 
import { Toast } from 'ionic-native';

@Component({
  selector: 'page-kitdelasuerte',
  templateUrl: 'kitdelasuerte.html'
})
export class KitdelasuertePage {
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
    this.loadAmuletos();

  }

  loadAmuletos() {
    this.kitService.getAllAmulets().then(
      (ress) => {
        this.amulets = ress;
      }
    );
  }


  getQR() {
    BarcodeScanner.scan(barcodeScannerParams).then(
      (barcodeData) => {
        this.data = {
          result: barcodeData.text
        };
      }, (err) => {
        console.log('Algo salio mal' + err);
      });



  }

  compararQR(qrText) {
    this.kitService.getAllAmulets().then(
      (amulets) => {
        amulets.forEach(amulet => {
          //comparo el amuleto con el code del amuleto
          if (qrText == amulet.code) {
            //si el amuleto corresponde pero ya lo tiene
            if (amulet.find) {
              //Ya tenias este amuleto
              return this.showToast("ya tienes este Amuleto", "bottom");
            } else {
              //No tiene este amuleto, entonces actualice
              this.updateFind(amulet).then(
                (res) => {
                  this.loadAmuletos();
                }
              );
              return this.showToast("Amuleto Capturado", "bottom");
            }
          } else {
            //Lo siento pero este codigo qr no pertenece a ningun amuleto
            return this.showToast("Lo sentimos pero no corresponde a ningun amuleto", "bottom");
          }
        });
      }
    )
  }

  showToast(message: string, position: string) {
    Toast.showWithOptions({
      message: message,
      duration: 2000, // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      position: position,
      addPixelsY: -40
    }).subscribe(console.log);
  }



  updateFind(key) {
    let data = {
      code: key.code,
      find: true,
      imgUrl: key.imgUrl,
      name: key.name
    }
    return this.kitService.updateAmulte(key.id, data);

  }

}

const barcodeScannerParams = {
  preferFrontCamera: true,
  showFlipCameraButton: true,
  prompt: "Suerte!",
  formats: "QR_CODE",
}
