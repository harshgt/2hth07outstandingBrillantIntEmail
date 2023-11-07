import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import generatePDFContent from '@salesforce/apex/PDFGeneratorController.PDFGeneratorController';


export default class MyLwcComponent extends LightningElement {
    
    
    @api recordId;

    generatePDF() {
        const dataList = ['Data1', 'Data2', 'Data3'];
        generatePDFContent({ dataList: dataList })
        .then(result => {
            if (result) {
                const blob = this.base64ToBlob(result);
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'generated.pdf'; // Set the desired file name
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
            } else {
                // Handle the case when the result is empty
            }
        })
            .catch(error => {
                
            });
    }
}