import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';
import { HomePage } from '../home/home';
import { FirebaseService, IUser } from '../../app/services/firebase.service';


import 'rxjs/add/operator/map';

//formulario de registro
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  //declaracion de variables
  private loader: any;
  private user: IUser = { email: '', password: '' };
  private register;
  private newUser: IUser = {
    name: '',
    mobile: '',
    email: '',
    password: '',
    city: '',
    date_of_birth: null,
    amulet_0: '123',
    amulet_1: '',
    amulet_2: '',
    amulet_3: '',
    amulet_4: '',
    amulet_5: ''
  };
  //Fin


  constructor(public nav: NavController,
    public auth: AngularFireAuth,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder) {
    this.register = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      city: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.isCurrentlyLogged();

  }

  registerUser(): void {
    //La variable newUser queda lista para almacenar en la base de datos con los correspondientes datos.
    console.log(this.newUser);
    this.showLoading();
    let user = {email: this.newUser.email, password: this.newUser.password}
    //Por ahora sigo creando la cuenta con email y password para satisfacer la credencial.
    this.auth.createUser(user).then((authData) => {
      setTimeout(() => {
        this.loader.dismiss();
      });
      let prompt = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Your new Account was created!',
        buttons: ['OK']
      });
      prompt.present();
    }).catch((error) => {
      this.showError(error);
    });
  }


  login(userData): void {
    this.showLoading()
    this.auth.login(userData, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    }).then((authData) => {
      this.localStorage(userData)
      //this.FirebaseService.isAlreadyloggedin
      this.loader.dismiss();
      console.log("antes de enviar a home");
      this.nav.setRoot(HomePage);
    }).catch((error) => { this.showError(error); });
  }

  loginAlert(): void {
    let prompt = this.alertCtrl.create({
      title: 'login',
      message: "Digita un usuario y contraseña.",
      inputs: [
        {
          name: 'email',
          placeholder: 'example@mail.com',
          type: 'text'

        },
        {
          name: 'password',
          placeholder: '****',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Entrar',
          handler: data => {
            this.login(data);
          }
        }

      ]
    });
    prompt.present();
  }


  showLoading(): void {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }


  showError(text): void {

    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }

  localStorage(userData): void {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  isCurrentlyLogged(): void {
    if (localStorage.getItem('currentUser') != null) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      let user = { email: this.user.email, password: this.user.password }
      this.auth.login(user, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then((authData) => {
        console.log("ya estaba logeado");
        this.nav.setRoot(HomePage);
      }).catch((error) => { this.showError(error); });
    }

  }

}