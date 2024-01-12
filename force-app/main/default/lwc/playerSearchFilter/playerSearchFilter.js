import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import CRICKET_OBJECT from '@salesforce/schema/Cricketer__c';
import TEAMS_FIELD from "@salesforce/schema/Cricketer__c.Teams__c";

export default class PlayerSearchFilter extends NavigationMixin(LightningElement) {
    getRecordTypeId;
    picklistValues;
    picklistOption;
    selectedPicklistValue;

    getContactName;

    createCricketerHandler(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName:'Cricketer__c',
                actionName:'new'
            }
        })
    }

    @wire(getObjectInfo, {objectApiName : CRICKET_OBJECT})
    getRecordObject({data, error}){
        if(data){
            this.getRecordTypeId = data.defaultRecordTypeId;
            console.log('this.getRecordTypeId '+ JSON.stringify(this.getRecordTypeId));
            

        }
        else if(error){
            console.log('error'+JSON.stringify(error));
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$getRecordTypeId', fieldApiName: TEAMS_FIELD })
    getPicklistValue({data,error}){
        if(data){
            let arr=[];

            this.picklistValues = data.values;
            this.picklistValues.forEach(element => {
                arr.push({label : element.value, value : element.value});
            })

            this.picklistOption = arr;

            console.log('this.picklistOption'+ JSON.stringify(this.picklistOption));

        }else if(error){
            console.log('error'+JSON.stringify(error));
        }
    }

    selectedPickValue(event){
        this.selectedPicklistValue = event.target.value;
        console.log('this.selectedPicklistValue '+ this.selectedPicklistValue);


        this.template.querySelector('c-player-search-result').searchCricketer(this.selectedPicklistValue); 
    }

    getColumnIdName(event){
        this.getContactName = event.detail.playerId;
        console.log('this.getContactName '+ this.getContactName);
    }
}   