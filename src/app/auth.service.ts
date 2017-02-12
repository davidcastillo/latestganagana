import { Component } from '@angular/core';
import { Loading } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/angularfire2";
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { LoginPage } from '../pages/login/login';
import { Facebook } from 'ionic-native';


@Injectable()
export class AuthGuard {

    constructor(private auth: AngularFireAuth, private navCtrl: NavController,) {}

    canActivate(): Observable<boolean> {
      return Observable.from(this.auth)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if 
        (!authenticated) this.navCtrl.push(LoginPage);
      })
    }
 
}

