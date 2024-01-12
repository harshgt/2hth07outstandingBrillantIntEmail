import { LightningElement, wire } from 'lwc';
import getAllAccount from '@salesforce/apex/showAllAccountData.getAccountList'
import updateAccountData from '@salesforce/apex/showAllAccountData.updateData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    {label: "Name", fieldName:"Name", editable:true},
    {label: "Website", fieldName:"Website", editable:true},
    {label: "Phone", FieldName:"Phone", editable:true},
]
export default class LWCDataTable extends LightningElement {

    columns=columns;
    data;
    error;
    savefrsaveDraftValue;

    @wire(getAllAccount)
    getAllAcc(result){
        console.log('result '+JSON.stringify(result));
        if(result.data){
            this.data = result.data;
            this.error = undefined;
            
        }
        else if(result.error){
            this.data = undefined;
            this.error = result.error;
           
        }
    }

    handleSave(event){
        const updateVal = event.detail.draftValues;
        console.log('updateVal' + JSON.stringify(updateVal));

        updateAccountData({allAccountData : updateVal})
        .then(result => {
           console.log('this.result '+result);

           this.dispatchEvent(
                new ShowToastEvent({
                    title:result,
                    message: result,
                    variant:'success'
                })
        );

        })
        .catch(error =>{
            console.log('this.error '+error);
        })
    }

    
}