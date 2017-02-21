import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupComponent } from '../signup/signup';

import { Platform } from 'ionic-angular';

import { FirebaseService } from '../../app/services/firebase.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',


})
export class LoginPage implements OnInit {
  user = [];
  signupComponent = SignupComponent;
  state: string = '';
  error: any;
  private todo: FormGroup;
  constructor(public af: AngularFire,
    private nav: NavController,
    private platform: Platform,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) {

    this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  logForm() {
    this.firebaseService.login(this.todo.value.email, this.todo.value.contraseña).then(
      (success) => {
        this.nav.setRoot(HomePage);
      }).catch(
      (err) => {
        this.error = 'Datos de inicio de sesión erroneos';
      })

  }

  ngOnInit() {
    this.user.push({ email: '', password: '' });
  }

  ionViewDidLoad() {
    if (localStorage.getItem(currentuser)) {
      this.nav.setRoot(HomePage);
    };

  }
}


export const currentuser: string = 'firebase:authUser:AIzaSyDfi3aeYqUL-I1pC_kR5l7es7Sd9t_nsyQ:[DEFAULT]';
