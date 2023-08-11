
    import { LightningElement, api, wire, track } from 'lwc';
    import { getRecord, getFieldDisplayValue } from 'lightning/uiRecordApi';
    import SAP_Code__c from '@salesforce/schema/Account.SAP_Code__c';
    
    export default class CustomerLedger extends LightningElement {
    
        @api recordId;
        @track AccountSapId;
    
        @track selectedDate;
    
        // Changed getAccountRecord to getRecord
        @wire(getRecord, { recordId: '$recordId', fields: [SAP_Code__c] })
        accountSapIdRecord;
    
        // Changed getAccountFieldValue to getFieldDisplayValue
        get fieldValue() {
            this.AccountSapId = getFieldDisplayValue(this.accountSapIdRecord, SAP_Code__c);
            return this.AccountSapId;
        }
    
        connectedCallback() {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            this.selectedDate = `${year}-${month}-${day}`; // Corrected the date format to YYYY-MM-DD
        }
    
        handleDateChange(event) {
            this.selectedDate = event.target.value;
        }
    
        handleClick() {
            window.console.log('this.AccountSapId', this.AccountSapId); // Corrected the log statement
            window.console.log('this.selectedDate', this.selectedDate);
        }
    }