import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PDFGeneratorLWC extends LightningElement {
    downloadPDF() {
        const dataStr = [1, 2, 3, 4];
        const vfPageUrl = '/apex/MyPDFPage?data=' + encodeURIComponent(dataStr);
        window.open(vfPageUrl);
    }
}
