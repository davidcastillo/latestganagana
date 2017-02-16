import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupComponent } from '../signup/signup';


import { NativeStorage } from 'ionic-native';

import { Facebook } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { FirebaseService } from '../../app/services/firebase.service';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',


})
export class LoginPage implements OnInit {
  user = { email: '', password: '' };
  signupComponent = SignupComponent;
  state: string = '';
  error: any;
  constructor(public af: AngularFire,
    private nav: NavController,
    private platform: Platform,
    private firebaseService: FirebaseService
  ) {
    /*this.af.auth.subscribe(auth => { 
    if(auth) {
      this.nav.setRoot(HomePage);
    }
  });*/

  }
  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then(
        (success) => {
          console.log(success);
          this.nav.setRoot(HomePage);
        }).catch(
        (err) => {
          this.error = 'Datos de inicio de sesión erroneos';
        })
    }
  }

  ngOnInit() {
    
  }

  ionViewDidLoad() {
    if (localStorage.getItem(currentuser)){
      this.nav.setRoot(HomePage);
    }
    
  }

}


export const currentuser: string = 'firebase:authUser:AIzaSyDfi3aeYqUL-I1pC_kR5l7es7Sd9t_nsyQ:[DEFAULT]';
