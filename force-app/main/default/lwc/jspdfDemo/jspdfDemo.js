import {LightningElement,wire} from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import JS_PDF from '@salesforce/resourceUrl/jsPDFLibrary';
import getContacts from '@salesforce/apex/PdfGenerator.getContactsController';
import JS_PDF_AUTO_TABLE from '@salesforce/resourceUrl/jsPDFAutoTable';

export default class JspdfDemo extends LightningElement {
    jsPDFInitialized = false;
    conData= [];
    contactList = [];
	
    renderedCallback() {
        if (!this.jsPDFInitialized) {
            this.jsPDFInitialized = true;
            loadScript(this, JS_PDF)
                .then(() => {
                    console.log('jsPDF library loaded successfully');
                    // Load jsPDF-AutoTable after jsPDF
                    return loadScript(this, JS_PDF_AUTO_TABLE);
                })
                .then(() => {
                    console.log('jsPDF-AutoTable library loaded successfully');
                })
                .catch((error) => {
                    console.error('Error loading libraries', error);
                });
        }
    }
    


    @wire(getContacts)
    getConAll({ data, error }) {
        if (data) {
            this.contactList = JSON.stringify(data);
        } else if (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    
	/* handleGeneratePDF() {
        
		if (this.jsPDFInitialized) {
            

            console.log('hello ooo 2'+this.contactList);
            const data = [];
            data.push(['Id', 'First Name', 'Last Name']);

            console.log('jsPDF library loaded successfully2');
			// Make sure to correctly reference the loaded jsPDF library.
			const doc = new window.jspdf.jsPDF();

			// Add content to the PDF.
			doc.text('Hello PDF!', 10, 10);
            
			// Save the PDF.
			doc.save('generated_pdf.pdf');
		} else {
			console.error('jsPDF library not initialized');
		}
	} */

    handleGeneratePDF() {
        if (this.jsPDFInitialized) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
    
            doc.text('Contact Data Table', 10, 10);
    
            // Convert the JSON string back to an array of objects
            const contacts = JSON.parse(this.contactList);
    
            const data = [];
            data.push(['Id', 'First Name', 'Last Name']);
    
            contacts.forEach(contact => {
                data.push([contact.Id, contact.FirstName, contact.LastName]);
            });
    
            // Add the table to the PDF using jsPDF-AutoTable
            doc.autoTable({
                head: [data[0]],
                body: data.slice(1),
                startY: 20,
            });
    
            doc.save('contact_data.pdf');
        } else {
            console.error('jsPDF library not initialized');
        }
    }
    
    
}