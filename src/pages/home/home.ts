import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../app/services/firebase.service';
import { LoginPage } from '../login/login';
import { ViewChild } from '@angular/core';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FirebaseService],
})
export class HomePage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams, private _firebaseService: FirebaseService) {}

  ngOnInit(){
    this._firebaseService.loginvalidation();
  }


}
