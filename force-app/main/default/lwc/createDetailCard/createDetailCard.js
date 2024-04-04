import { LightningElement,wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_PLAYER from '@salesforce/messageChannel/SelectedPlayer__c';
import  getSelectedPlayerData  from '@salesforce/apex/getCricketerList.getSelectedPlayerData';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateDetailCard extends NavigationMixin(LightningElement) {
    @wire(MessageContext)
    messageContext;

    data;
    retriveDetailPlayerId;

    connectedCallback(){
        subscribe(this.messageContext, 
            SELECTED_PLAYER, 
            (message) => {
                console.log('Message Channel Player Id : '+ JSON.stringify(message));
                this.handleSelectedId(message.cricketerId);
            }
        )

        
           
    }
 
    handleSelectedId(getCrickName){
        this.retriveDetailPlayerId = getCrickName;

        getSelectedPlayerData({sendDataId : this.retriveDetailPlayerId})
        .then(result => {
            
                this.data = result;
                console.log(result);
           
        }).catch(error =>{
            
        })
    }

    handleNavigateToRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.retriveDetailPlayerId,
                objectApiName:'Cricketer__c',
                actionName:'view'
            }
        })
    }
    
}