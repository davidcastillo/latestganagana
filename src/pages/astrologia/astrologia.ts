import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Network, GoogleAnalytics } from 'ionic-native';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../../app/services/firebase.service';


import { AstroresultadosPage } from '../astroresultados/astroresultados';

const name_view_astrologia: string = 'astrologia';

@Component({
  selector: 'page-astrologia',
  templateUrl: 'astrologia.html'
})
export class AstrologiaPage implements OnInit {
  astroresultadosPage = AstroresultadosPage
  todo: FormGroup;
  private informacionUsuario = [];

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
    GoogleAnalytics.trackView(name_view_astrologia);
    if (Network.type != 'none') {
      this.firebaseService.getSpecificPersonalInfo(this.firebaseService.getuid()).subscribe(
        (personalInfo) => {
          if (personalInfo.length == 1) {
            this.informacionUsuario = personalInfo;
          } else {
            this.informacionUsuario.push({
              name: '',
              date_of_birth: '',
              time: '',
              city: ''

            });
          }
        }, (err) => {


        }
      );
    }else {
      this.informacionUsuario.push({
              name: '',
              date_of_birth: '',
              time: '',
              city: ''

            });
    }


  }

}
interface Iinformacionusuario {
  name?: string,
  date_of_birth?: any,
  time?: any,
  city?: string
}