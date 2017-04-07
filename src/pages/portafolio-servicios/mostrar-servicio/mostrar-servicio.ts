import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

/*
  Generated class for the MostrarServicio page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mostrar-servicio',
  templateUrl: 'mostrar-servicio.html'
})
export class MostrarServicioPage {
  showService = []
  title: string = '';
  private options: any;
  private browser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    console.log(navParams.get('show'));
    this.showListService();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarServicioPage');

  }

  showListService() {
    switch (this.navParams.get('show')) {
      case 'juegosAzar':
        this.showService = [
          { nombre: 'Chance', imgUrl: 'assets/servicios/juegosAzar/chance.png', url: 'http://www.ganagana.com.co/index.php/chance' },
          { nombre: 'Astro', imgUrl: 'assets/servicios/juegosAzar/astro.png', url: 'http://www.ganagana.com.co/index.php/super-astro' },
          { nombre: 'Loteria Virtual', imgUrl: 'assets/servicios/juegosAzar/loteriaVirtual.png', url: 'http://www.ganagana.com.co/index.php/loteria-virtual' },
          { nombre: 'Loteria Fisica', imgUrl: 'assets/servicios/juegosAzar/loteriaFisica.png', url: 'http://www.ganagana.com.co/index.php/loteria-fisica' },
          { nombre: 'Los Gorditos', imgUrl: 'assets/servicios/juegosAzar/losGorditos.png', url: 'http://www.ganagana.com.co/index.php/los-gorditos' },
          { nombre: 'Las Deportivas', imgUrl: 'assets/servicios/juegosAzar/lasDeportivas.png', url: 'http://www.ganagana.com.co/index.php/las-deportivas' },
          { nombre: 'Super Chance', imgUrl: 'assets/servicios/juegosAzar/superChance.png', url: 'http://www.ganagana.com.co/index.php/super-chance' },
          { nombre: 'Gana Sueños', imgUrl: 'assets/servicios/juegosAzar/ganaSueños.png', url: 'http://www.ganagana.com.co/index.php/gana-sueno' },
          { nombre: 'Semanario', imgUrl: 'assets/servicios/juegosAzar/semanario.png', url: 'http://www.ganagana.com.co/index.php/semanario' },
          { nombre: 'Doble Play', imgUrl: 'assets/servicios/juegosAzar/doblePlay.png', url: 'http://www.ganagana.com.co/index.php/doble-play' },
          { nombre: 'Chance+', imgUrl: 'assets/servicios/juegosAzar/chanceMas.png', url: 'http://www.ganagana.com.co/index.php/chance-mas' },
        ];
        this.title = 'Juegos de Azar';
        break;
      case 'recargas':
        this.showService = [
          { nombre: 'Claro', imgUrl: 'assets/servicios/recargas/claro.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'Tigo', imgUrl: 'assets/servicios/recargas/tigo.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'Movistar', imgUrl: 'assets/servicios/recargas/movistar.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'Virgin', imgUrl: 'assets/servicios/recargas/virgin.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'Uff', imgUrl: 'assets/servicios/recargas/uff.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'móvil éxito', imgUrl: 'assets/servicios/recargas/exito.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'Une', imgUrl: 'assets/servicios/recargas/une.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'Avantel', imgUrl: 'assets/servicios/recargas/avantel.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
          { nombre: 'Directv', imgUrl: 'assets/servicios/recargas/direcTv.png', url: 'http://www.ganagana.com.co/index.php/portafolio/recargas' },
        ];
        this.title = 'Recargas';
        break;
      case 'giros':
        this.showService = [
          { nombre: 'migiro', imgUrl: 'assets/servicios/giros/migiro.png', url: 'http://www.ganagana.com.co/index.php/portafolio/giros' }
        ];
        this.title = 'Giros';
        break;
      case 'pagos':
        this.showService = [
          { nombre: 'ComfaTolima', imgUrl: 'assets/servicios/pagos/comfaTolima.png', url: 'http://www.ganagana.com.co/index.php/portafolio/pagos/223-comfatolima' },
          { nombre: 'Comfenalco', imgUrl: 'assets/servicios/pagos/comfenalco.png', url: 'http://www.ganagana.com.co/index.php/portafolio/pagos/222-comfenalco' },
          { nombre: 'Colombia Mayor', imgUrl: 'assets/servicios/pagos/colombiaMayor.png', url: 'https://colombiamayor.co/' }
        ];
        this.title = 'Pagos';
        break;
      case 'recaudos':
        this.showService = [
          { nombre: 'Banco de Bogotá', imgUrl: 'assets/servicios/recaudos/bancoBogota.png', url: 'http://www.ganagana.com.co/index.php/portafolio/pagos-y-recaudos/corresponsal-bancario' },
          { nombre: 'ENERTOLIMA', imgUrl: 'assets/servicios/recaudos/enertolima.png', url: 'http://www.ganagana.com.co/index.php/portafolio/pagos-y-recaudos/pago-servicios-tolima' },
          { nombre: 'Alcanos', imgUrl: 'assets/servicios/recaudos/alcanos.png', url: 'http://www.ganagana.com.co/index.php/portafolio/pagos-y-recaudos/pago-servicios-tolima' },
          { nombre: 'IBAL', imgUrl: 'assets/servicios/recaudos/ibal.png', url: 'http://www.ganagana.com.co/index.php/portafolio/pagos-y-recaudos/pago-servicios-tolima' },
          { nombre: 'Conhydra', imgUrl: 'assets/servicios/recaudos/conhydra.png', url: 'http://www.aquamana.com.co/' },
          { nombre: 'EAAA', imgUrl: 'assets/servicios/recaudos/eaaa.png', url: 'http://www.eaaaespinal.com.co/' },
          { nombre: 'ESPAG', imgUrl: 'assets/servicios/recaudos/espag.png', url: 'http://www.elguamo-tolima.gov.co/dependencias.shtml?apc=dbxx-1-&x=2791744' },
          { nombre: 'EDALGAS', imgUrl: 'assets/servicios/recaudos/edalgas.png', url: 'http://edalgassaesp.com/?/home' },
          { nombre: 'EMPOLERIDA', imgUrl: 'assets/servicios/recaudos/empolerida.png', url: 'http://www.empolerida.gov.co/' },
          { nombre: 'EMPUMELGAR', imgUrl: 'assets/servicios/recaudos/empumelgar.png', url: 'http://empumelgaresp.com/' },
          { nombre: 'Une', imgUrl: 'assets/servicios/recaudos/une.png', url: 'http://www.ganagana.com.co/index.php/portafolio#' },
        ];
        this.title = 'Recaudos';
        break;
      case 'seguros':
        this.showService = [
          { nombre: 'La Fe', imgUrl: 'assets/servicios/seguros/lafe.png', url: 'http://www.ganagana.com.co/index.php/portafolio/seguros' },
          { nombre: 'misoat', imgUrl: 'assets/servicios/seguros/misoat.png', url: 'http://www.ganagana.com.co/index.php/mi-soat' },
          { nombre: 'migiro', imgUrl: 'assets/servicios/seguros/migiroseguro.png', url: 'http://www.ganagana.com.co/index.php/mi-giro-seguro' },
        ];
        this.title = 'Seguros';
        break;

      default:
        break;
    }
  }
  verPagina(url) {
    this.options = 'location=yes,toolbar=no,hidden=no';
    this.browser = new InAppBrowser(url, '_self', this.options)
  }

}
