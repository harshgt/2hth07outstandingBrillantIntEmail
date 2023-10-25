import { LightningElement, api,wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
    import downloadjs from '@salesforce/resourceUrl/downloadjs';
    import downloadPDF from '@salesforce/apex/PrintJobPDFController.getPdfFileAsBase64String';
    import getContacts from '@salesforce/apex/getContactForAccount.getContactForAccount'; // Replace with your Apex method
  
    import sendEmailWithAttachment from '@salesforce/apex/EmailSender.sendEmailWithAttachment';
   
   

export default class PdfGenarationUsingVFpage extends LightningElement {
    @api recordId;
    contactList = [];
    boolShowSpinner = false;
    pdfString;


    @wire(getContacts, {recordIds : '$recordId'})
    wiredContacts({ data, error }) {
        if (data) {
            this.contactList = data;
        } else if (error) {
            // Handle error
        }
    }


    generatePdf(){


        this.boolShowSpinner = true;
        downloadPDF({ contactList: this.contactList }).then(response => {
            console.log(response);
            this.boolShowSpinner = false;
            var strFile = "data:application/pdf;base64,"+response;
            window.download(strFile, "sample.pdf", "application/pdf");

        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
    renderedCallback() {
        loadScript(this, downloadjs)
        .then(() => console.log('Loaded download.js'))
        .catch(error => console.log(error));
    }        
}

