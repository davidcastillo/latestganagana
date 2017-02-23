import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//services
import { FirebaseService } from '../../app/services/firebase.service';
import { GamecontrolService } from '../../app/services/gamecontrol.service';
import { LoadingController, PopoverController } from 'ionic-angular';

//pages

import { KitsuertewinPage } from './kitsuertewin/kitsuertewin';
import { KitSuertePopoverPage } from './kit-suerte-popover/kit-suerte-popover';

//native import 
import { Toast, BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-kitdelasuerte',
  templateUrl: 'kitdelasuerte.html'
})
export class KitdelasuertePage implements OnInit {
  private amulets;
  private loading;
  private contadorAmuletos: any;
  private totalAmuletos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseService,
    private gameControlService: GamecontrolService,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController

  ) {
    
  }

  ngOnInit() {
    this.presentLoadingAmulets();
    this.fromFiretoFireSaves();

  }

  ionViewDidLoad() {
  }

  getQR() {
    BarcodeScanner.scan(barcodeScannerParams).then(
      (barcodeData) => {
        
        this.validarQR(barcodeData.text);
        
      }).catch(
      (err) => {
        console.log('Algo salio mal' + err);
      }
      );
  }

  validarQR(qrText) {
    var amuletosActualizados = [];
    this.gameControlService.kitSuerteFlag = true;
    this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid()).subscribe(
      (kitSuerteSave) => {
        kitSuerteSave.forEach(kitSuerteSaveIdyAmuletos => {
          if (this.gameControlService.kitSuerteFlag) {
            (kitSuerteSaveIdyAmuletos.amuletos).forEach(amuletosPersonales => {
              if (amuletosPersonales.code == qrText) {
                this.gameControlService.kitSuerteFlag = false;
                if (amuletosPersonales.find) {
                  return this.showToast("ya tienes este Amuleto", "bottom");
                } else {
                  (kitSuerteSaveIdyAmuletos.amuletos).forEach(amuletosActualizar => {
                    if (amuletosActualizar.code == qrText) {
                      amuletosActualizados.push({
                        code: amuletosActualizar.code,
                        find: true,
                        imgUrl: amuletosActualizar.imgUrl,
                        name: amuletosActualizar.name
                      });
                    } else {
                      amuletosActualizados.push({
                        code: amuletosActualizar.code,
                        find: amuletosActualizar.find,
                        imgUrl: amuletosActualizar.imgUrl,
                        name: amuletosActualizar.name
                      });
                    }
                  });
                  this.firebaseService.updateKitSuerteSaves(
                    kitSuerteSaveIdyAmuletos.$key,
                    { amuletos: amuletosActualizados }
                  );//enviarle amuletos
                  this.showToast("Amuleto Capturado", "bottom");
                  setTimeout(() => {
                    this.validarCuantosAmuletosCapturados();
                  }, 2000);
                }
              }
            });
          }
          if (this.gameControlService.kitSuerteFlag == true) {
            return this.showToast("Lo sentimos pero no corresponde a ningun amuleto", "bottom");
          }
        });
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

  fromFiretoFireSaves() {
    //objeto para capturar los amuletos personales
    var kitSuerteSaves = []
    //cargue los amuletos
    this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid()).subscribe(
      (res) => {
        //si no existe un espacio privado entonces creelo
        if (res.length == 0) {
          this.firebaseService.getAmulets().subscribe(
            (amuletos) => {

              amuletos.forEach(amulet => {
                kitSuerteSaves.push({
                  code: amulet.code,
                  imgUrl: amulet.imgUrl,
                  name: amulet.name,
                  find: false
                });
              });
              this.firebaseService.pushKitSuerteSaves({
                uid: this.firebaseService.getuid(),
                amuletos: kitSuerteSaves
              }).then(
                (res) => {

                  this.cargarAmuletosDesdeFirebase();
                }
                );
            }
          );
          //por el contrario ya tiene uno, valida que exista el espacio local
        } else {
          this.cargarAmuletosDesdeFirebase();
        }

      }
    );
  }

  cargarAmuletosDesdeFirebase() {
    this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid()).subscribe(
      (kitSuerteSave) => {
        kitSuerteSave.forEach(kitSuerteSaveIdyAmuletos => {
          this.amulets = kitSuerteSaveIdyAmuletos.amuletos;
        });
        this.dismissLoadingAmulets();
      }
    );
  }

  presentLoadingAmulets() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Cargando Amuletos`,
    });
    this.loading.present();
    return true;
  }

  dismissLoadingAmulets() {
    this.loading.dismiss();
  }

  contarAmuletos() {
    this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid())
      .subscribe(
      (uidYamuletos) => {
        uidYamuletos.forEach(amuletosEnFirebase => {
          this.contadorAmuletos = 0;
          (amuletosEnFirebase.amuletos).forEach(amuletosDescription => {
            if ((amuletosDescription.find) == true) {
              this.contadorAmuletos++;
            }
            this.totalAmuletos++;
          });
          this.gameControlService.amuletosCapturados = this.contadorAmuletos;
          this.gameControlService.amuletosRestantes = (this.totalAmuletos - this.contadorAmuletos)
        });
      }
      );
  }

  validarCuantosAmuletosCapturados() {
    this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid())
      .subscribe(
      (uidYamuletos) => {
        uidYamuletos.forEach(amuletosEnFirebase => {
          this.contadorAmuletos = 0;
          this.totalAmuletos = 0;
          (amuletosEnFirebase.amuletos).forEach(amuletosDescription => {
            if ((amuletosDescription.find) == true) {
              this.contadorAmuletos++;
            }
            this.totalAmuletos++;
          });
          if (this.contadorAmuletos == this.totalAmuletos) {
            return this.navCtrl.push(KitsuertewinPage).catch(console.log);
          } else {
            return this.showToast('Te faltan: ' + (this.totalAmuletos - this.contadorAmuletos), 'bottom');
          }
        });
      }
      );
  }

  esGanador() {
    
  }

  openPopover(event) {
    this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid())
      .subscribe(
      (uidYamuletos) => {
        uidYamuletos.forEach(amuletosEnFirebase => {
          this.contadorAmuletos = 0;
          this.totalAmuletos = 0;
          (amuletosEnFirebase.amuletos).forEach(amuletosDescription => {
            if ((amuletosDescription.find) == true) {
              this.contadorAmuletos++;
            }
            this.totalAmuletos++;
          });
          this.gameControlService.amuletosCapturados = this.contadorAmuletos;
          this.gameControlService.amuletosRestantes = (this.totalAmuletos - this.contadorAmuletos)
          let popover = this.popoverCtrl.create(KitSuertePopoverPage,
            {},
            {
              showBackdrop: true,
            }
          );
          popover.present({
            ev: event
          });
          
        });
      }
      );

  }



}

const barcodeScannerParams = {
  showFlipCameraButton: true,
  formats: "QR_CODE",
  prompt:'Listo para escanear',
  resultDisplayDuration: 0
}