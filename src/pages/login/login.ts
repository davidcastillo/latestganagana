import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {AngularFireAuth, AuthProviders, AuthMethods} from 'angularfire2';
import {HomePage} from '../home/home';
import {FirebaseService} from '../../app/services/firebase.service';

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader: any;
  user = {email: '', password: ''};
  isAlreadyloggedin = {};


 
  constructor(public nav: NavController, public auth: AngularFireAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {}
 
  public registerUser() {
    this.showLoading()
    this.auth.createUser(this.user).then((authData) => {
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


  public login() {
    this.showLoading()
    this.auth.login(this.user, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
    }).then((authData) => {
        this.localStorage()
       //this.FirebaseService.isAlreadyloggedin
       this.loader.dismiss();
       console.log("antes de enviar a home");
       this.nav.setRoot(HomePage);
    }).catch((error) => {this.showError(error);});
  }


  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }
 
 
  showError(text) {
        setTimeout(() => {
        this.loader.dismiss();
    });
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }

localStorage() {
    localStorage.setItem('currentUser', JSON.stringify(this.user));
              }


 logout() {
    //  remove user from local storage to log user out
  localStorage.removeItem('currentUser');
 }
}