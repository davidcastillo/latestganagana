import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AstroresultadosPage } from '../astroresultados/astroresultados';

import { FirebaseService } from '../../app/services/firebase.service';

@Component({
  selector: 'page-astrologia',
  templateUrl: 'astrologia.html'
})
export class AstrologiaPage implements OnInit {
  astroresultadosPage = AstroresultadosPage
  todo: FormGroup;
  private informacionUsuario: Iinformacionusuario;

  constructor(
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private firebaseService: FirebaseService

  ) {
    this.todo = this.formBuilder.group({
      nombre: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      hora: [null, Validators.required],
      ciudad: [null, Validators.required],
    });

  }

  ngOnInit() {
    this.firebaseService.getSpecificPersonalInfo(this.firebaseService.getuid()).subscribe(
      (personalInfo) => {
        if (personalInfo.length == 1) {
          this.informacionUsuario = personalInfo;
        }
      }
    );
  }

}
interface Iinformacionusuario {
  name?: string,
  date_of_birth?: any,
  time?: any,
  city?: string
}