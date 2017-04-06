import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


//pages
import { HomePage } from '../pages/home/home';
import { JuegosPage } from '../pages/juegos/juegos';
import { NumerologiaPage } from '../pages/numerologia/numerologia';
import { AstrologiaPage } from '../pages/astrologia/astrologia';
import { ResultadosPage } from '../pages/resultados/resultados';
import { SimuladorgirosPage } from '../pages/simuladorgiros/simuladorgiros';
import { LoginPage } from '../pages/login/login';
import { PortafolioServiciosPage } from '../pages/portafolio-servicios/portafolio-servicios';
import { GoogleAnalytics } from 'ionic-native';

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
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      //google
      
      return GoogleAnalytics.startTrackerWithId('UA-92560068-1')
        .then((_success) => {
          console.log('Google analytics is ready now');
          alert("Google analytics is ready now");
          // Tracker is ready
          // You can now track pages or set additional information such as AppVersion or UserId
          return GoogleAnalytics.enableUncaughtExceptionReporting(true)
        }).then((_success) => {
          alert("starttrackerwithid success");
        })
        .catch(e => {
          console.log('Error starting GoogleAnalytics', e);
          alert("Error starting GoogleAnalytics " + e);
        });
        

    });
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Juegos', component: JuegosPage },
      { title: 'Numerología', component: NumerologiaPage },
      { title: 'Astrología', component: AstrologiaPage },
      { title: 'Resultados', component: ResultadosPage },
      { title: 'Portafolio', component: PortafolioServiciosPage },
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
    this.firebaseService.logout().then(
      () => {
        console.log("debe mandar a login page");
        this.nav.setRoot(LoginPage);

      }
    );
  }
}
