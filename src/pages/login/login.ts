import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';

import {NativeStorage} from 'ionic-native'

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

  error: any;
  constructor(public af: AngularFire, private nav: NavController,) {

      this.af.auth.subscribe(auth => { 
      if(auth) {
        this.nav.setRoot(HomePage);
      }
    });

  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
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