import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//services
import { FirebaseService } from '../../app/services/firebase.service';
import { kitsuerteService } from '../../app/services/kitsuerte.service';

//border scanner
import { BarcodeScanner } from 'ionic-native';

//pages
import { InstruccionesKitSuertePage } from './instrucciones-kit-suerte/instrucciones-kit-suerte';

//native import 
import { Toast } from 'ionic-native';

@Component({
  selector: 'page-kitdelasuerte',
  templateUrl: 'kitdelasuerte.html'
})
export class KitdelasuertePage {
  private amulets;
  private instructionsRoot;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseService,
    private kitService: kitsuerteService
  ) {
    this.instructionsRoot = InstruccionesKitSuertePage;
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
        if(ress.length > 8) {
          this.controlDoubleAmulets().then(
            (res)=>{
              this.navCtrl.pop().then(
                ()=>{
                  this.navCtrl.push(KitdelasuertePage);
                }
              );
            }
          );
        }
      }
    );
  }

  controlDoubleAmulets(){
    return this.kitService.deleteTable('amulets');
  }

  getQR() {
    BarcodeScanner.scan(barcodeScannerParams).then(
      (barcodeData) => {
        this.data = {
          result: barcodeData.text
        };
        this.compararQR(barcodeData.text);
      }).catch(
      (err) => {
        console.log('Algo salio mal' + err);
      }
      );



  }

  compararQR(qrText) {
    this.kitService.getAllAmulets().then(
      (amulets) => {
          var flag: boolean = true;
        amulets.forEach(amulet => {
          //comparo el amuleto con el code del amuleto
          if (qrText == amulet.code) {
            flag = false;
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
              this.showToast("Amuleto Capturado", "bottom");
              setTimeout(() => {
                this.validAllQR();
              }, 3000);

            }
          } 
        });
        if (flag) {
            //Lo siento pero este codigo qr no pertenece a ningun amuleto
            return this.showToast("Lo sentimos pero no corresponde a ningun amuleto", "bottom");
          }
      }
    )
  }

  validAllQR() {
    var faltantes: number = 0;
    this.kitService.getAllAmulets().then(
      (res) => {
        res.forEach(amulet => {
          if (!amulet.find) {
            faltantes++;
          }
        });
        if (faltantes == 0) {
          this.showToast("Has Terminado!", "bottom");
        } else {
          this.showToast("Te faltan: " + (faltantes) + "Amuletos por encontrar.", "bottom");
        }
      }
    );
  }
  showToast(message: string, position: string, pixelsY: number = (-40)) {
    Toast.showWithOptions({
      message: message,
      duration: 2000,
      position: position,
      addPixelsY: pixelsY
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
  showFlipCameraButton: true,
  prompt: "Suerte!",
  formats: "QR_CODE",
}
