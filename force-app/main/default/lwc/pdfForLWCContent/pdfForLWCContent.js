import { LightningElement } from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jspdf';
import getContacts from '@salesforce/apex/PdfGenerator.getContactsController';
import IMAGE_RESOURCE from '@salesforce/resourceUrl/ImageResource';



export default class PdfForLWCContent extends LightningElement {

  imgData =  IMAGE_RESOURCE;

  contactList = [];
	headers = this.createHeaders([
		"Id",
		"FirstName",
		"LastName"
	]);

	renderedCallback() {
		Promise.all([
			loadScript(this, JSPDF)
		]);
	}

	generatePdf(){
    console.log('its working');
    console.log(this.contactList);
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF({
			/* encryption: {
				userPassword: "user",
				ownerPassword: "owner",
				userPermissions: ["print", "modify", "copy", "annot-forms"]
				// try changing the user permissions granted
			} */
		});
    console.log('its working1');

		
    doc.text("Hello this is used for Contact", 40, 40); // Adjusted Y-coordinate

    //imageData, format, x, y, width, height, alias, compression, rotation
    doc.addImage(this.imgData, 'PNG', 30, 60, 30, 30); // Adjusted Y-coordinate


    doc.setFontSize(20);
    doc.setFont('helvetica');
    doc.text("CUSTOMER LEDGER", 90, 20);

    // Adjusted table position
    doc.table(40, 100, this.contactList, this.headers, { autosize: true });
		doc.save("demo.pdf");
	}

	generateData(){
		getContacts().then(result=>{
			this.contactList = result;
			this.generatePdf();
		});
	}

	createHeaders(keys) {
		var result = [];
		for (let i = 0; i < keys.length; i += 1) {
			result.push({
				id: keys[i],
				name: keys[i],
				prompt: keys[i],
				width: 65,
				align: "center",
				padding: 0
			});
		}
		return result;
	}

}