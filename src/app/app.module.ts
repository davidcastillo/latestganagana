import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { JuegosPage } from '../pages/juegos/juegos';
import { ArmaparejasPage } from '../pages/armaparejas/armaparejas';
import { KitdelasuertePage } from '../pages/kitdelasuerte/kitdelasuerte';
import { NumerologiaPage } from '../pages/numerologia/numerologia';
import { AstrologiaPage } from '../pages/astrologia/astrologia';
import { ResultadosPage } from '../pages/resultados/resultados';
import { SimuladorgirosPage } from '../pages/simuladorgiros/simuladorgiros';
import { InstruccionesPage } from '../pages/instrucciones/instrucciones';
import { NumresultadosPage } from '../pages/numresultados/numresultados';
import { AstroresultadosPage } from '../pages/astroresultados/astroresultados';
import { AngularFireModule } from 'angularfire2';
import { FormsModule} from '@angular/forms';
import { SignupComponent } from '../pages/signup/signup'
import { EmailComponent } from '../pages/email/email'
import { AuthGuard } from './auth.service';


export const firebaseConfig = {

    apiKey: "AIzaSyDfi3aeYqUL-I1pC_kR5l7es7Sd9t_nsyQ",
    authDomain: "ganaganadb.firebaseapp.com",
    databaseURL: "https://ganaganadb.firebaseio.com",
    storageBucket: "ganaganadb.appspot.com",
    messagingSenderId: "928922388579"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    JuegosPage,
    ArmaparejasPage,
    KitdelasuertePage,
    NumerologiaPage,
    AstrologiaPage,
    ResultadosPage,
    SimuladorgirosPage,
    InstruccionesPage,
    NumresultadosPage,
    AstroresultadosPage,
    SignupComponent,
    EmailComponent,
  ],

  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    JuegosPage,
    ArmaparejasPage,
    KitdelasuertePage,
    NumerologiaPage,
    AstrologiaPage,
    ResultadosPage,
    SimuladorgirosPage, 
    InstruccionesPage,
    NumresultadosPage,
    AstroresultadosPage,
    SignupComponent,
    EmailComponent,
  ],
  providers: [AuthGuard]
})
export class AppModule {}
