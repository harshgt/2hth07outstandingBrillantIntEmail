import { LightningElement,wire } from 'lwc';
import {publish, MessageContext} from 'lightning/messageService';
import UPDATING_MESSAGE_CHANNEL from '@salesforce/messageChannel/Count_Update__c';

export default class PubLWC extends LightningElement {

    @wire(MessageContext)
    messageContext;

    addHandler(){
        const payload = {
            operator : 'addition',
            constant : 1
        };

        publish(this.messageContext, UPDATING_MESSAGE_CHANNEL, payload);
    }


    divHandler(){
        const payload = {
            operator : 'subtract',
            constant : 1
        };

        publish(this.messageContext, UPDATING_MESSAGE_CHANNEL, payload);
    }


    mulHandler(){
        const payload = {
            operator : 'multiply',
            constant : 2
        };

        publish(this.messageContext, UPDATING_MESSAGE_CHANNEL, payload);
    }
}