import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupComponent } from '../signup/signup';
import { EmailComponent } from '../email/email';

import {NativeStorage} from 'ionic-native';

import { Facebook } from 'ionic-native';
import { Platform } from 'ionic-angular';
import {GooglePlus} from 'ionic-native';

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Component({
  selector: 'login-page',
  templateUrl: 'login.html',

  
})
export class LoginPage implements OnInit{
  user = {email: '', password: ''};
  signupComponent = SignupComponent;
  emailComponent = EmailComponent

  error: any;
  constructor(public af: AngularFire, private nav: NavController, private platform: Platform) {

      this.af.auth.subscribe(auth => { 
      if(auth) {
        this.nav.setRoot(HomePage);
      }
    });

  }

  loginFb() {
      if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential) ;
         });
    } else {
      return  this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    })
/*
        NativeStorage.setItem('user', {
        email: this.user.email,
      })*/
      
    .then(
        (success) => {
        this.nav.setRoot(HomePage);
      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
    
        NativeStorage.setItem('user', {
        email: this.user.email,

      })

    .then(
        (success) => {
         this.nav.setRoot(HomePage);
      }).catch(
        (err) => {
        this.error = err;
      })
  }


  ngOnInit() {
  }

}