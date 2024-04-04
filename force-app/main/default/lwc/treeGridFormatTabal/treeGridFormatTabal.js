import { LightningElement,track } from 'lwc';
import getContactData from '@salesforce/apex/getContactAndOpportunties.getContact';

const gridColumn = [
    {label: 'Name', fieldName : 'Name', type:'text'},
    {label: 'First Name', fieldName : 'FirstName', type:'text'},
    {label: 'Last Name', fieldName : 'LastName', type:'text'},
]

export default class TreeGridFormatTabal extends LightningElement {

    @track gridData;
    gridColumn = gridColumn;

    connectedCallback(){
        getContactData()
        .then(result => {
            console.log("data"+ JSON.stringify(result));

            var tempContact = JSON.parse(JSON.stringify(result));
            //console.log("tempContact"+ JSON.stringify(tempContact));

            for(var i=0; i<tempContact.length; i++){
                var newContact = tempContact[i]['Contacts'];
                //console.log("newContact"+ JSON.stringify(newContact));

                if(newContact)
                {
                    tempContact[i]._children = newContact;
                    //console.log("tempContact[i]._children"+ JSON.stringify(tempContact[i]._children));

                    //delete tempContact[i].Contacts;
                }


            }
            this.gridData = tempContact;
        })
        .catch(error => {
            console.error("error"+ JSON.stringify(error));
        })
    }


    getSelectedRows(event){
        const sele = event.detail.selectedRows;
        //console.log("selected Rows"+ JSON.stringify(sele));
    }

}