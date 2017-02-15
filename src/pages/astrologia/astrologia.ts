import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder } from '@angular/forms';

import { AstroresultadosPage } from '../astroresultados/astroresultados';


@Component({
  selector: 'page-astrologia',
  templateUrl: 'astrologia.html'
})
export class AstrologiaPage {
  astroresultadosPage = AstroresultadosPage
     todo = {}




  constructor(public navParams: NavParams, private formBuilder: FormBuilder, public navCtrl: NavController)  {
  
      this.todo = this.formBuilder.group({
      name: ['', Validators.required],
      date_of_birth: ['',Validators.required],
      time: ['',Validators.required],
      city: ['',Validators.required],
    });
}

}
