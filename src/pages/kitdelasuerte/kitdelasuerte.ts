import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from '';
//services
import { FirebaseService } from '../../app/services/firebase.service';
import { GamecontrolService } from '../../app/services/gamecontrol.service';
import { LoadingController, PopoverController } from 'ionic-angular';

//pages

import { KitsuertewinPage } from './kitsuertewin/kitsuertewin';
import { KitSuertePopoverPage } from './kit-suerte-popover/kit-suerte-popover';

//native import 
import { Toast, BarcodeScanner, GoogleAnalytics } from 'ionic-native';

const name_view_kitdelasuerte: string = 'Kit_Suerte';

@Component({
  selector: 'page-kitdelasuerte',
  templateUrl: 'kitdelasuerte.html'
})
export class KitdelasuertePage implements OnInit {
  private amulets;
  private loading;
  private contadorAmuletos: any;
  private totalAmuletos: any;
  private amuletosSubscribe;
  private contarAmuletosSubscribe;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseService,
    private gameControlService: GamecontrolService,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController

  ) {
    GoogleAnalytics.trackView(name_view_kitdelasuerte);
  }

  ngOnInit() {
    this.presentLoadingAmulets();
    this.fromFiretoFireSaves();
    this.firebaseService.iudMethod();
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
                        name: amuletosActualizar.name,
                        capturedDate: new Date().getTime()
                      });
                    } else {
                      amuletosActualizados.push({
                        code: amuletosActualizar.code,
                        find: amuletosActualizar.find,
                        imgUrl: amuletosActualizar.imgUrl,
                        name: amuletosActualizar.name,
                        capturedDate: amuletosActualizar.capturedDate
                      });
                    }
                  });

                  this.firebaseService.updateKitSuerteSaves(
                    kitSuerteSaveIdyAmuletos.$key,
                    { amuletos: amuletosActualizados }
                  ).then(
                    () => {
                      this.showToast("Amuleto Capturado", "bottom");
                      setTimeout(() => {
                        this.verificarCuantosAmuletosCapturados();
                      }, 2000);
                    }
                    );//enviarle amuletos

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
                  find: false,
                  capturedDate: 0
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
          res.forEach(element => {
            this.gameControlService.pruebaKey = element.$key;
          });

          this.cargarAmuletosDesdeFirebase();
        }

      }
    );
  }

  cargarAmuletosDesdeFirebase() {
    this.amuletosSubscribe = this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid()).subscribe(
      (kitSuerteSave) => {
        kitSuerteSave.forEach(kitSuerteSaveIdyAmuletos => {
          this.amulets = kitSuerteSaveIdyAmuletos.amuletos;
          this.gameControlService.amuletosDelUsuario = kitSuerteSaveIdyAmuletos.amuletos;
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

    this.contarAmuletosSubscribe = this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid())
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
        });
      }
      );
  }

  verificarCuantosAmuletosCapturados() {
    this.contadorAmuletos = 0;
    this.totalAmuletos = 0;
    (this.gameControlService.amuletosDelUsuario).forEach(amuletosDescription => {
      if ((amuletosDescription.find) == true) {
        this.contadorAmuletos++;
      }
      this.totalAmuletos++;
    });
    if (this.contadorAmuletos == this.totalAmuletos) {
      /*return this.gameControlService.flagEsGanador = true;*/
      this.navCtrl.push(KitsuertewinPage)
    } else {
      this.showToast('Te faltan: ' + (this.totalAmuletos - this.contadorAmuletos), 'bottom');
    }
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
            /*return this.gameControlService.flagEsGanador = true;*/
            this.navCtrl.push(KitsuertewinPage)
          } /*else {
            return this.showToast('Te faltan: ' + (this.totalAmuletos - this.contadorAmuletos), 'bottom');
          }*/
        });
      }
      );
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
        });
      }
      );
    let popover = this.popoverCtrl.create(KitSuertePopoverPage,
      {},
      {
        showBackdrop: true,
      }
    );
    popover.present({
      ev: event
    });
    popover.onDidDismiss(
      (res) => {
        console.log("onDidDismiss")
        var amuletosLocal = [];
        if (this.gameControlService.kitSuerteFlag) {
          this.firebaseService.getAmulets().subscribe(
            (amuletos) => {

              amuletos.forEach(amulet => {
                amuletosLocal.push({
                  code: amulet.code,
                  imgUrl: amulet.imgUrl,
                  name: amulet.name,
                  find: false,
                  capturedDate: 0
                });
              });
              this.firebaseService.updateKitSuerteSaves(this.gameControlService.pruebaKey, { amuletos: amuletosLocal }).catch(() => {
                console.log("update fallo");
              });

            }
          );



          this.gameControlService.kitSuerteFlag = false;



        }
      }
    );

  }





}

const barcodeScannerParams = {
  showFlipCameraButton: true,
  formats: "QR_CODE",
  prompt: 'Listo para escanear',
  resultDisplayDuration: 0
}