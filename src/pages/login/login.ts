import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupComponent } from '../signup/signup';

import { Platform } from 'ionic-angular';

import { FirebaseService } from '../../app/services/firebase.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',


})
export class LoginPage implements OnInit {
  user = { email: '', password: '' };
  signupComponent = SignupComponent;
  state: string = '';
  error: any;
  private todo : FormGroup;
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

  logForm(){
      
      this.af.auth.login({
        email: this.todo.value.email,
        password: this.todo.value.contraseña
      },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then(
        (success) => {
          this.nav.setRoot(HomePage);
        }).catch(
        (err) => {
          this.error = 'Datos de inicio de sesión erroneos';
        })
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    if (localStorage.getItem(currentuser)) {
      this.nav.setRoot(HomePage);
    }
  }
}


export const currentuser: string = 'firebase:authUser:AIzaSyDfi3aeYqUL-I1pC_kR5l7es7Sd9t_nsyQ:[DEFAULT]';
