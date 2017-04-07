import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//page
import { JuegosPage } from '../../juegos/juegos';
import { KitdelasuertePage } from '../kitdelasuerte';
//service 
import { FirebaseService, IUser } from '../../../app/services/firebase.service';
import { AlertController, PopoverController } from 'ionic-angular';

//formulario de registro
import { Validators, FormBuilder } from '@angular/forms';
import { GoogleAnalytics } from 'ionic-native';
const name_view_kitsuerte_completeInfo: string = 'Kit_Suerte_Complete_info';

@Component({
  selector: 'page-complete-info',
  templateUrl: 'complete-info.html'
})
export class CompleteInfoPage {
  private register;
  private User: IUser = {
    uid: '',
    name: '',
    mobile: '',
    city: '',
    date_of_birth: '',
    terms: false
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) {

    GoogleAnalytics.trackView(name_view_kitsuerte_completeInfo);

    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      city: ['', Validators.required],
      politicas: [false, Validators.pattern('true')]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteInfoPage');
  }

  updateUser(): void {
    this.User.uid = this.firebaseService.auth.getAuth().uid;

    console.log(this.User);
    this.firebaseService.updatePersonalInfo(this.User).then(
      () => {
        this.firebaseService.message = 'Información Registrada';
        this.navCtrl.pop();
      }
    )
      .catch(
      (err) => {
        console.log('error ubdatePersonalInfo: ' + err);
      }
      )
  }

  

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Politicas y Seguridad',
      message: 'Los datos ingresados seran utilizados unicamente en la aplicacion.',
      buttons: [
        {
          text: 'Cancelar y salir',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Acepto',
          handler: () => {
            this.updateUser();
          }
        }
      ]
    });
    alert.present();
  }

  openTerminosyCondiciones(){
    window.open('http://www.ganagana.com.co/index.php/la-empresa/politica-de-calidad');
  }

}
