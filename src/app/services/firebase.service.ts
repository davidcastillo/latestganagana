import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders,AuthMethods } from 'angularfire2';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import 'rxjs/add/operator/map';


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
    console.log("se ha instanciado firebaseservice");
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
    angFire.database.list('/Players').subscribe(
      (ress) => {
        console.log('la cantidad de players son: ' + ress.length);
      }
    );
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
    return this.auth.logout()
  }

  /*displayData() {
    var data;
    this.angFire.auth.subscribe((ress)=>{
      data = ress;
      console.log('esto es data: '+ data);
    });
    return data;
  }*/
  getuid(){
    return this.angFire.auth.getAuth().uid;
  }



  updatePersonalInfo(personalInfo) {
    return this.getSpecificPersonalInfo().push(personalInfo);
  }

  getSpecificPersonalInfo(uid?: string) {
    let person: FirebaseListObservable<IUser[]>;
    let nameSpaceDb: string = 'personalInfo';
    if (uid != null || uid != undefined) {
      return person = this.angFire.database.list(nameSpaceDb, {
        query: {
          orderByChild: 'uid',
          equalTo: uid
        }
      });

    } else {
      return person = this.angFire.database.list(nameSpaceDb);
    }

  }


  getAmulets(id?: string){
    let amulets: FirebaseListObservable<any>;
    if(id != null || id != undefined){
      return amulets = this.angFire.database.list(amuletsDb, {
        query: {
          orderByChild: 'code',
          equalTo: id
        }
      })
    }else{
      return amulets = this.angFire.database.list(amuletsDb);
    }
  }

  getKitSuerteSaves(id?: string){
    let amulets: FirebaseListObservable<any>;
    if(id != null || id != undefined){
      return amulets = this.angFire.database.list(kitSuerteSavesDb, {
        query: {
          orderByChild: 'uid',
          equalTo: id
        }
      })
    }else{
      return amulets = this.angFire.database.list(kitSuerteSavesDb);
    }
  }

  pushKitSuerteSaves(amulet){
    return this.getKitSuerteSaves().push(amulet);
  }

  updateKitSuerteSaves(key: string, data: any){
    return this.getKitSuerteSaves().update(key, data);
  }

  login(email, contraseña){
    return this.angFire.auth.login({
        email: email,
        password: contraseña
      },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        });
  }

  

}




export interface IUser {
  email?: string,
  uid?: string,
  password?: string,
  name?: string,
  mobile?: string,
  city?: string,
  date_of_birth?: string,
  amulet_0?: string,
  amulet_1?: string,
  amulet_2?: string,
  amulet_3?: string,
  amulet_4?: string,
  amulet_5?: string,
}

export const amuletsDb: string = 'Amulets';
export const kitSuerteSavesDb: string = 'kitSuerteSaves'; 