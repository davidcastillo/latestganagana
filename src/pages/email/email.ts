import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'email-page',
  templateUrl: 'email.html',

})
export class EmailComponent implements OnInit {

    state: string = '';
    error: any;

    constructor(public af: AngularFire, private navCtrl: NavController,) {
      this.af.auth.subscribe(auth => { 
        if(auth) {
          this.navCtrl.push(HomePage);
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
        this.navCtrl.push(HomePage);
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