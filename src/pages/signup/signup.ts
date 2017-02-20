import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {NavController} from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',


})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;
  signupComponent = SignupComponent


  constructor(public af: AngularFire, private nav: NavController,) {

  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        this.nav.setRoot(HomePage);
      }).catch(
        (err) => {
        this.error = this.returnError(err.message);
      })
    }
  }

  returnError(message){
    let badlyEmail: string = "The email address is badly formatted.";
    let AlreadyUse: string = "The email address is already in use by another account.";
    if(message == badlyEmail){
      return 'La direccion de correo electronico esta mal escrita';
    }else if (message == AlreadyUse) {
      return 'La dirección de correo electrónico ya está en uso por otra cuenta.';
    }else{
      return 'Hay un error, por favor verifique la informacion';
    }

  }

  ngOnInit() {
  }

}

