import { LightningElement,wire } from 'lwc';
import getAccountData from '@salesforce/apex/showAllAccountData.getAccountList';

const columns =  [
    { label: 'Customer Name', fieldName: 'Name' },
   
]
export default class SalesforceLightningCompoList extends LightningElement {

    data;
    error;
    columns =columns;

    @wire(getAccountData)
    accountRecord({ data, error }) {
        if(data){
            this.data = data;
            this.error = undefined;
        }
        else if(error) {
            this.error = error;
            this.data = undefined;
        }   
    }

}