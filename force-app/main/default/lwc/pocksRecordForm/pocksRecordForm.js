import { LightningElement,api,wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import GET_TRAINERID from '@salesforce/schema/Pockemon__c.Contact__c';

export default class PocksRecordForm extends LightningElement {

    @api recordId;

    @wire(getRecord, {recordId : '$recordId', fields : GET_TRAINERID})
    getRecordFromUIProperty;

    get TrainerId(){
        return getFieldValue(this.getRecordFromUIProperty.data, GET_TRAINERID);
    }

}