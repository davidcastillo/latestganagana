import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



//page
import { KitdelasuertePage } from '../kitdelasuerte';

//service 
import { FirebaseService, IUser } from '../../../app/services/firebase.service';
import { AlertController, PopoverController } from 'ionic-angular';

//formulario de registro
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'page-complete-info',
  templateUrl: 'complete-info.html'
})
export class CompleteInfoPage {
  private register;
  private aceptaTerminos = true;
  private User: IUser = {
    uid: '',
    name: '',
    mobile: '',
    city: '',
    date_of_birth: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) {
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
        this.navCtrl.pop().then(
          () => {
            this.navCtrl.push(KitdelasuertePage);
          }
        ).catch((err) => {
          console.log('Error navCtrl: ' + err);
        });
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
