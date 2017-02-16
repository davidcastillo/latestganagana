import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


//pages
import { HomePage } from '../pages/home/home';
import { JuegosPage } from '../pages/juegos/juegos';
import { NumerologiaPage } from '../pages/numerologia/numerologia';
import { AstrologiaPage } from '../pages/astrologia/astrologia';
import { ResultadosPage } from '../pages/resultados/resultados';
import { SimuladorgirosPage } from '../pages/simuladorgiros/simuladorgiros';
import { LoginPage } from '../pages/login/login';

//services
import { FirebaseService } from './services/firebase.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    private firebaseService: FirebaseService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Juegos', component: JuegosPage },
      { title: 'Numerología', component: NumerologiaPage },
      { title: 'Astrología', component: AstrologiaPage },
      { title: 'Resultados', component: ResultadosPage },
      { title: 'Simulador de Giros', component: SimuladorgirosPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  cerrarSesion() {
    this.firebaseService.logout();
    this.nav.setRoot(LoginPage);
  }
}
