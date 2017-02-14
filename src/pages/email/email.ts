import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupComponent } from '../signup/signup';

@Component({
  selector: 'email-page',
  templateUrl: 'email.html',

})
export class EmailComponent implements OnInit {

    state: string = '';
    error: any;
    signupComponent = SignupComponent;
    

    constructor(public af: AngularFire, private nav: NavController,) {
      this.af.auth.subscribe(auth => { 
        if(auth) {
          this.nav.setRoot(HomePage);
        }
      });
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log(success);
        this.nav.setRoot(HomePage);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  ngOnInit() {
  }

}