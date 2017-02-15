import Dexie from 'dexie';

export class Dbase extends Dexie {
    constructor() {
        super('ganagana');
        this.version(1).stores({
            amulets: `
            ++id,
            title,
            content,
            imgUrl
            `
        });
        
    }
}

export interface Idb {
    id?: string;
    code: string;
    imgUrl: string;
    find?: boolean;
}

export class ganaganaDb {
    db:Dbase = new Dbase();
    item:Dexie.Table<Idb,number>;
    constructor(){
        
    }
    getAmulet(key){
        return this.db.table('amulets').get(key);
    }

    getAll(){
        return this.db.table('amulets').toArray();
        
    }

    updateAmulet(key,changes) {
        return this.db.table('amulets').update(key,changes);
    }

    addAmulet(amulet){
        let item = {
            code: amulet.code,
            name: amulet.name,
            imgUrl: amulet.imgUrl,
            find: false 
        }
        return this.db.table('amulets').put(item);
    }

    deleteTable(table: string){
        return this.db.table(table).clear();
    }

}