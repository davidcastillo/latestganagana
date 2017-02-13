import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//pages
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
import { ArmaparejasgamePage } from '../pages/armaparejasgame/armaparejasgame';
import { CompleteInfoPage } from '../pages/kitdelasuerte/complete-info/complete-info';

//Modules 
import { FormsModule} from '@angular/forms';
import { GameModule } from '../pages/armaparejas/ts/game/index'; 

//services
import { FirebaseService, firebaseConfig } from './services/firebase.service';
import { GamecontrolService } from './services/gamecontrol.service';



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
    ArmaparejasgamePage,
    CompleteInfoPage
  ],

  imports: [
    GameModule,
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
    ArmaparejasgamePage,
    CompleteInfoPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseService,
    GamecontrolService
  ]
})
export class AppModule {}
