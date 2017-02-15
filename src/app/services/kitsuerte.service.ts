import { Injectable } from '@angular/core';

//import db
import { ganaganaDb } from '../../localDb/amuletsDb';

//services
import { FirebaseService } from './firebase.service';

@Injectable()
export class kitsuerteService {
    
    private db: ganaganaDb;

    constructor(
        private firebaseService: FirebaseService
    ){

    }

    intanceGanaganaDb(){
        this.db = new ganaganaDb();
    }

    getAllAmulets(){
        return this.db.getAll();
    }

    addAmulet(amulet){
        return this.db.addAmulet(amulet);
    }

    updateAmulte(key, changes){
        return this.db.updateAmulet(key,changes);
    }

    copyDbAmulets(){
        this.intanceGanaganaDb();
        var data;
        this.getAllAmulets().then(
            (amulets)=>{
                console.log(amulets.length);
                if(amulets.length == 0){
                    this.firebaseService.getAmulets().subscribe(
                        (amuletsFire) => {
                            console.log('copydbAmulets - amuletFire');
                            amuletsFire.forEach(elementFire => {
                            console.log(elementFire);
                                
                               this.firebaseService.getKitSuerteSaves(this.firebaseService.getuid()).subscribe(
                                   (amuletSave) =>{
                                       console.log("copydbamulets - amuletSave");
                                       var amuletos;
                                       amuletSave.forEach(element => {
                                           console.log(element.amuletos);
                                           amuletos = element.amuletos;
                                           amuletos.forEach(elementos => {
                                               if(elementos.code == elementFire.code){
                                                console.log('yes');
                                                data = {
                                                  code: elementos.code,
                                                  imgUrl: elementFire.imgUrl,
                                                  name: elementFire.name,
                                                  fin: elementos.find  
                                                }
                                                this.addAmulet(data);
                                               }
                                           });
                                       });
                                       /*amuletSave.forEach(element => {
                                           data  = {
                                            code: element.code,
                                            imgUrl: elementFire.imgUrl,
                                            name: elementFire.name,
                                            find: element.find
                                           }
                                           this.addAmulet(data);
                                       });*/
                                   }
                               );
                               //this.addAmulet(element);

                            });
                        }
                    )
                }else {
                    console.log('hay amulets');
                }
            }
        ).catch(
            (err)=>{
                console.log('Error getAllAmulets: ' + err);
            }
        ).finally(
            () =>{
                console.log('se ha completo con exito la duplicacion');
            }
        );
    }

    deleteTable(table: string){
        return this.db.deleteTable(table);
    }

}