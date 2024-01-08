import { LightningElement } from 'lwc';
import pocksListRetrive from '@salesforce/apex/pocksListRetrive.pocksListRetrive';

export default class PocksTrakerList extends LightningElement {
    pokemonList;
    error;
    searchWords = '';

    connectedCallback(){
        this.pocksSearchRetrive(this.searchWords);

    }

    getWords(event){
        this.searchWords = event.target.value;
        this.pocksSearchRetrive(this.searchWords);
    }


 
    pocksSearchRetrive(key){
        pocksListRetrive({searchKey : key})
        .then(result => {
            this.pokemonList = result;
            console.log('this.pokemonList'+ JSON.stringify(this.pokemonList));
        })
        .catch(error => {
            this.error = error;
            console.log('this.error'+ JSON.stringify(this.error));
        })
    }
    

    


}