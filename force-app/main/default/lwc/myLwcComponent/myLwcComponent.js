import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import generatePDFContent from '@salesforce/apex/PDFGeneratorController.PDFGeneratorController';


export default class MyLwcComponent extends LightningElement {
    
    
    @api recordId;

    generatePDF() {
        
    }
}