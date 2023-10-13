import { LightningElement,api } from 'lwc';
import getRelatedOfAccount from '@salesforce/apex/getContactAndOpportunties.getContactAndOpportunties';

export default class LwcDatatableForPracto extends LightningElement {



    @api recordId; 
    showData = false;
    Buttonlabel = 'Show';
    results;



    connectedCallback(){
        getRelatedOfAccount({recordId : this.recordId})
        .then(res => {
            let Temprec = res;
            console.log("Response" +JSON.stringify(Temprec));

        })
        .catch(error => {
            console.log("error" + JSON.stringify(error));
        })
        
    }

    inputHandler(){
        if(this.Buttonlabel == 'Show'){
            this.Buttonlabel='Hide';
            this.showData = true;
        } 
        else if(this.Buttonlabel == 'Hide'){
            this.Buttonlabel = 'Show';
            this.showData = false;
            
        }
    }

    

    
}