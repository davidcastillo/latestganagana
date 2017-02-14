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

    copyDbAmulets(){
        /*this.firebaseService.getAmulets().subscribe(
            (res) => {
                console.log(res);
            }
        );*/
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

}