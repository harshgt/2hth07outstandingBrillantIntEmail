import { LightningElement,wire,api } from 'lwc';
import  getCricketerList  from '@salesforce/apex/getCricketerList.getCricketerList';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_PLAYER from '@salesforce/messageChannel/SelectedPlayer__c';

export default class PlayerSearchResult extends LightningElement {


    retrivePlayerData;
    selectedPlayerId;
    selectedVal='';


    @wire(getCricketerList, {selectedTeam : '$selectedVal'})
    getAllPlayerList({data, error}){
        if(data){
            console.log(data);
            this.retrivePlayerData = data;
        }
        else if(error){
            console.log('ERROR ' + JSON.stringify(error));
        }
    }
    
    @wire(MessageContext)
    messageContext;

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

        //publishing selected player id to LMS Channel
        publish(this.messageContext, SELECTED_PLAYER, {cricketerId : this.selectedPlayerId});

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
        this.selectedVal = teamOfCricketer;
    }

}