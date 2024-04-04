import { LightningElement,api } from 'lwc';
import getRelatedOfAccount from '@salesforce/apex/getContactAndOpportunties.getContactAndOpportunties';


const columns1 = [
    { label : 'Opportunity ID', fieldName: 'Id'},
    { label : 'Opportunity Name', fieldName:'Name'},
]

const columns2 = [
    { label : 'Contact Id', fieldName : 'Id'},
    { label : 'Contact Name', fieldName : 'Name'},
]

export default class LwcDatatableForPracto extends LightningElement {



    @api recordId; 
    showData = false;
    Buttonlabel = 'Show';
    results;
    opportunityData=[];
    contactData=[];
    columns1 = columns1;
    columns2 = columns2; 
    tempArrayOppList;
    tempArrayConList;
    




    connectedCallback(){
        getRelatedOfAccount({recordId : this.recordId})
        .then(res => {
            let Temprec = res;
            console.log("Response" +JSON.stringify(Temprec));
             
            //create a two object for storing opp and con
            let temp = Temprec.map(row => {
                return Object.assign({ OppName: row.Opportunities , ContactName : row.Contacts})   
            })
            console.log("temp>> :"+ JSON.stringify(temp)); 

            temp.forEach(element => {
                this.tempArrayOppList = element.OppName;

                this.tempArrayConList = element.ContactName;
            });

            this.opportunityData =  this.tempArrayOppList;
            this.contactData = this.tempArrayConList;

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