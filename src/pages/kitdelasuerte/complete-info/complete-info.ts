import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



import { IUser } from '../../../app/services/firebase.service';

import { KitdelasuertePage } from '../kitdelasuerte';

//service 
import { FirebaseService } from '../../../app/services/firebase.service';

//formulario de registro
import { Validators, FormBuilder } from '@angular/forms';

/*import { FirebaseService, IUser } from '../../../app/services/firebase.service';*/
/*
  Generated class for the CompleteInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-complete-info',
  templateUrl: 'complete-info.html'
})
export class CompleteInfoPage {
  private register;
  private User: IUser = {
    name: '',
    mobile: '',
    email: '',
    city: '',
    date_of_birth: '',

  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      city: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteInfoPage');
  }

  updateUser(): void {
    console.log(this.User);
    this.navCtrl.pop().then(
      () => {
        this.navCtrl.push(KitdelasuertePage);
      }
    );
  }

}
