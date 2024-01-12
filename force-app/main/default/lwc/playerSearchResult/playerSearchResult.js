import { LightningElement,wire,api } from 'lwc';
import  getCricketerList  from '@salesforce/apex/getCricketerList.getCricketerList';

export default class PlayerSearchResult extends LightningElement {


    retrivePlayerData;
    selectedPlayerId;

    @wire(getCricketerList)
    getAllPlayerList({data, error}){
        if(data){
            console.log(data);
            this.retrivePlayerData = data;
        }
        else if(error){
            console.log('ERROR ' + JSON.stringify(error));
        }
    }

    handleClickPlayerCard(event){
        this.selectedPlayerId = event.currentTarget.dataset.id;
        console.log(this.selectedPlayerId);

        let boxClass = this.template.querySelectorAll('.selected');
        console.log(boxClass);
        if(boxClass.length > 0){
            this.removeClass();
        }

        let playerBox = this.template.querySelector(`[data-id="${this.selectedPlayerId}"]`);

        if(playerBox){
            playerBox.className= 'title_wrapper selected';
        }


        this.dispatchEvent(new CustomEvent( 'select', {
            detail : {
                playerId : this.selectedPlayerId
            }
         }));
    }

    removeClass(){
        this.template.querySelectorAll('.selected')[0].classList.remove('selected');
    }

    @api searchCricketer(teamOfCricketer){
        console.log(' the child class is teamOfCricketer '+teamOfCricketer);
    }

}