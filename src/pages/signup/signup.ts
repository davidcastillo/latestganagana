import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
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
        this.error = err;
      })
    }
  }

  ngOnInit() {
  }

}