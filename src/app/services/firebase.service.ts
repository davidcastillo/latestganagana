import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AngularFireAuth, AuthProviders, AuthMethods, FirebaseAuthState} from 'angularfire2';
import 'rxjs/add/operator/map';
import { Players } from '../entities/Players';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';


@Injectable()
export class FirebaseService{
  private authState: FirebaseAuthState;
  players: FirebaseListObservable<any>;
  player = {};
  status= {}

  constructor(public navCtrl: NavController, private angFire: AngularFire, public auth: AngularFireAuth) {
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

loginvalidation(){
  if (this.authState == null) {
    this.navCtrl.push(LoginPage);
  }
}

 isAlreadyLoggedIn(){
      var user = this.angFire.auth.subscribe();
      console.log(user)
      let isAuthenticated = false
      let how = {}
      if (how == isAuthenticated){
        return true;
      }
      else{
        return false;
      }
      
  }
}