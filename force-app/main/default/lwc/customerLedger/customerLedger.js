/* eslint-disable no-alert */
import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getCustomerLedgerData from '@salesforce/apex/customerLedgerData.customerLedgerData';
import getCustomerOutStandingData from '@salesforce/apex/customerOutStandingData.customerOutStandingData';
   
// Define fields to fetch
const FIELDS = ['Account.SAP_Code__c'];
export default class CustomerLedger extends LightningElement {
    columnHeader = ['businessPartnerId', 'FirstName', 'LastName', 'OrganizationBPName' ]
       
    @api recordId;
    AccountSapId;
    @track currentDate;
    @track startDate;
    @track endDate;
    @track isButtonDisabled = true;
    data;
    
    businessPartnerId;
    firstName;
    lastName;
    OrganizationBPName;
    @track isShowLedger = false;

    @track conatctData = {}


    hideLedgerModal() {  
        this.isShowLedger = false;
    }



    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    accountRecord({ error, data }) {
        if (data) {
            this.AccountSapId = data.fields.SAP_Code__c.value;
        } else if (error) {
            console.error(error);
        }
    }

    connectedCallback() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        this.currentDate = `${year}-${month}-${day}`; // Corrected the date format to YYYY-MM-DD    
    }

    //user input for Date Range (Strat Date and End Date) ledger
    /* handleStartDateChangeLedger(event) {
        this.startDate = event.target.value;
        this.isButtonDisabled = this.startDate === '';
    }
    handleEndDateChangeLedger(event) {
        this.endDate = event.target.value;
        this.isButtonDisabled = this.endDate === '';
    } */

    handleStartDateChangeLedger(event)
    {
        if (event.target.name === 'startDate') {
            this.startDate = event.target.value;
        } else if(event.target.name === 'endDate') {
            this.endDate = event.target.value;
        }
        this.isButtonDisabled = !this.startDate || !this.endDate; 
    }



    //take default date Outstanding
    handleDefaultDateOutstanding(event)
    {
        this.currentDate = event.target.value;
    }

    //call Http class of ledger
    ledgerFetchHandler() {
        //eslint-disable-next-line no-alert
        window.alert(this.startDate + ' and ' + this.endDate);
        this.isShowLedger =true;
        //call rest api
        //check the response 
        //display response 
        let endpoint = 'https://brilliant-polymers-ixuv1tbr.it-cpi011-rt.cfapps.jp20.hana.ondemand.com/http/TEST/ODATA';
       
        //call apex class with endpoint
        getCustomerLedgerData({endPointUrl:endpoint, startDate : this.startDate, endDate : this.endDate, recordId : this.recordId })
        .then(data => {
            console.log(JSON.stringify(data));
            if(data){
                this.conatctData=data;
                this.businessPartnerId = data.BusinessPartner;
                this.firstName = data.FirstName;
                this.lastName = data.LastName;
                this.OrganizationBPName = data.OrganizationBPNameStart;
            }
            else{
                window.console.log('Data Not Found'); 
            }
                
        }).catch(error => {
            window.console.log('callout error '+JSON.stringify(error));
        })

       // window.location.reload(); //for refresh page
            
    }  
    
    

    //call Http class of OutStanding
    handleClickForOutStanding()
    {   
        window.alert(this.currentDate + ' and ' + this.AccountSapId);
        //call rest api
        //check the response 
        //display response 
        let endpoint = 'testapi';
       
        //call apex class with endpoint
        getCustomerOutStandingData({endPointUrl:endpoint})
        .then(data => {
            console.log(JSON.stringify(data));

            });
        
    }



    exportLedgerData(){
        console.log('hello');
        // Prepare a html table
        let doc = '<table>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';          
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        this.columnHeader.forEach(element => {            
            doc += '<th>'+ element +'</th>'           
        });
        doc += '</tr>';
        // Add the data rows
        console.log('conatctData');
        console.log(this.conatctData);
        /* this.conatctData.forEach(record => {
            doc += '<tr>';
            doc += '<th>'+record.BusinessPartner+'</th>'; 
            doc += '<th>'+record.FirstName+'</th>'; 
            doc += '<th>'+record.LastName+'</th>';
            doc += '<th>'+record.OrganizationBPNameStart+'</th>'; 
            doc += '</tr>';
        }); */
        doc += '<tr>';
            doc += '<th>'+this.conatctData.BusinessPartner+'</th>'; 
            doc += '<th>'+this.conatctData.FirstName+'</th>'; 
            doc += '<th>'+this.conatctData.LastName+'</th>';
            doc += '<th>'+this.conatctData.OrganizationBPNameStart+'</th>'; 
            doc += '</tr>';
        doc += '</table>';
        
        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = 'Ledger Data.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }


    exportLedgerDatapdf() {
        console.log('hello');
    
        // Create a new jsPDF instance
        const jsPDF = require('jspdf');
        const doc = new jsPDF();
    
        // Add styles for the table
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        // Define table headers
        const headers = this.columnHeader;
    
        // Define table data (assuming this.contactData is an array of objects)
        const data = this.contactData.map(record => [
            record.BusinessPartner,
            record.FirstName,
            record.LastName,
            record.OrganizationBPNameStart
        ]);
    
        // Auto page break if table doesn't fit on the current page
        const pageHeight = doc.internal.pageSize.height;
        const startY = 20; // Adjust this value to change the starting Y position of the table
        const margin = 10;
        const tableHeight = data.length * 10; // Adjust this value for row height
        const tablePageCount = doc.internal.getNumberOfPages() + 1;
    
        // Check if the table fits on the current page
        if (startY + tableHeight > pageHeight - margin) {
            doc.addPage();
        }
    
        // Create the table
        doc.autoTable({
            head: [headers],
            body: data,
            startY: startY,
            margin: { top: 20 },
        });
    
        // Save or download the PDF
        doc.save('LedgerData.pdf');
    }
        
  

}