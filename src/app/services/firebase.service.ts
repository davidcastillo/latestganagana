import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireAuth, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Players } from '../entities/Players';
import { Nav, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';

//firebaseConfig
export const firebaseConfig = {

  apiKey: "AIzaSyDfi3aeYqUL-I1pC_kR5l7es7Sd9t_nsyQ",
  authDomain: "ganaganadb.firebaseapp.com",
  databaseURL: "https://ganaganadb.firebaseio.com",
  storageBucket: "ganaganadb.appspot.com",
  messagingSenderId: "928922388579"
};


@Injectable()
export class FirebaseService {
  private authState: FirebaseAuthState;
  players: FirebaseListObservable<any>;
  player = {};
  status = {}
  isLogged: boolean = false;


  constructor(private angFire: AngularFire, public auth: AngularFireAuth) {
    this.authState = auth.getAuth();
    auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    // If we navigated to this page, we will have an item available as a nav param
    this.player = {
      name: "",
      mobile: "",
      email: "",
      city: "",
      date_of_birth: "",
      amulet_0: 123,
      amulet_1: 0,
      amulet_2: 0,
      amulet_3: 0,
      amulet_4: 0,
      amulet_5: 0,
    }
    this.players = angFire.database.list('/Players');
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }


/*  loginvalidation() {
    /*
    auth.js:104 WARNING: the getAuth() API has changed behavior since adding support for Firebase 3.
        This will return null for the initial value when the page loads, even if the user is actually logged in.
        Please observe the actual authState asynchronously by subscribing to the auth service: af.auth.subscribe().
        The getAuth method will be removed in future releases
        
    // console.log(this.auth.getAuth()); //en efecto es nulo

    if (this.authState != null) {
      this.navCtrl.push(HomePage);
    }
  }*/

  isAlreadyLoggedIn() {
    var user = this.angFire.auth.subscribe();
    console.log(user)
    let isAuthenticated = false
    let how = {}
    if (how == isAuthenticated) {
      return true;
    }
    else {
      return false;
    }

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.auth.logout().then(
      () =>{
        console.log("Ha cerrado sesion");
      }
    );
  }
}