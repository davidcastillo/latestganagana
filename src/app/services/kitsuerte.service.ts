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
        this.getAllAmulets().then(
            (res)=>{
                if(res.length == 0){
                    this.firebaseService.getAmulets().subscribe(
                        (res) => {
                            res.forEach(element => {
                               this.addAmulet(element);
                            });
                        }
                    )
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