import { LightningElement, track } from 'lwc';
import getAccountForComboBox12 from '@salesforce/apex/getAccountForComboBox.getAccountForComboBox';
import getContactForSelectedAccount from '@salesforce/apex/getAccountForComboBox.getContactForSelectedAccount'

const columns = [
    {label : 'Contact Name', fieldName : 'Name'},  //, editable: true
    {label : 'Email', fieldName : 'Email'},
    
]

export default class ComboboxForCheck extends LightningElement {
    @track value = '';
    @track accOption = [];
    @track data;
    @track columns=columns;
    @track isVisible = false;

    get options(){
        return this.accOption;
    }
    
    connectedCallback()
    {
        getAccountForComboBox12()
        .then(result => {
            console.log(result);
            let arr=[];
            for(let i=0; i<result.length; i++)
            {
                arr.push ({label : result[i].Name, value : result[i].Id})
            }
            this.accOption = arr;
        })
    }

    handleChange(event){
        this.isVisible =true;
        this.value = event.target.value;

        getContactForSelectedAccount({SelectedAccount : this.value})
        .then(result => {
            this.data = result;
            
        })
        .catch(error => {
            throw error; //window.alert("error found! No Data Found", error);
        })
    }

    


}