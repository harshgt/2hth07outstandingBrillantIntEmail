import { LightningElement, wire } from 'lwc';
import {subscribe, MessageContext} from 'lightning/messageService';
import UPDATING_MESSAGE_CHANNEL from '@salesforce/messageChannel/Count_Update__c';

export default class SubLWC extends LightningElement {
    counter=0;
   subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel(){
        this.subscription = subscribe(
            this.messageContext,
            UPDATING_MESSAGE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message){
        //alert('message'+JSON.stringify(message));
        if(message.operator === 'addition'){
            this.counter += message.constant;
        }
        else if(message.operator === 'subtract'){
            this.counter -= message.constant;
        }
        else if(message.operator === 'multiply'){
            this.counter *= message.constant;
        }
    }
}