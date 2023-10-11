import { LightningElement,wire } from 'lwc';
import {publish, messageContext} from 'lightning/messageService';
import UPDATING_MESSAGE_CHANNEL from '@salesforce/messageChannel/Count_Update__c';

export default class PubLWC extends LightningElement {

    @wire(messageContext)
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
            constant : 1
        };

        payload(this.messageContext, UPDATING_MESSAGE_CHANNEL, payload);
    }
}