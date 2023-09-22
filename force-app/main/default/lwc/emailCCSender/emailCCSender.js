import { LightningElement,track,api } from 'lwc';
import sendEmail from '@salesforce/apex/SendEmailController.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDataEmail from '@salesforce/resourceUrl/email_template';
import getStatemail from '@salesforce/apex/SendEmailController.collectEmails';

import { loadStyle } from 'lightning/platformResourceLoader';
import MY_STATIC_RESOURCE from '@salesforce/resourceUrl/email_template';



export default class EmailCCSender extends LightningElement {

@track getEma;
connectedCallback() {
    this.loadStaticResource();
}

async loadStaticResource() {
    try {
        const response = await fetch(MY_STATIC_RESOURCE);
        if (response.ok) {
            const htmlText = await response.text();
            this.getEma = htmlText;
            console.log(this.getEma);
        } else {
            console.error('Failed to fetch HTML content:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading HTML content:', error);
    }
}

    /* connectedCallback(){
        getStatemail({})
        .then((data) => {
            this.getEma = data;
        })

        
    } */


    
    @api replyTo;
    @api senderName;
    
    // Handler for changes in the recipient's email address
    @track emailList = [];
    @track emailCCList = [];

    handleToAddress(event) {
        const inputString = event.target.value;
        const emails = inputString.split(',').map(email => email.trim());
        this.emailList = emails;
    }

    handleCCAddress(event) {
        const inputCCString = event.target.value;
        const CCemails = inputCCString.split(',').map(email => email.trim());
        this.emailCCList = CCemails;
    }

    handleRischText(event) {
        const inputrichText = event.target.value;
        this.getEma = inputrichText;
    }


    // Function to send the email
    sendEmail() {
        sendEmail({ replyTos : this.replyTo, senderNames : this.senderName, toAddress: this.emailList, toCCAddress : this.emailCCList, subject: this.subject, body: this.message, BodyEmail : this.getEma })
            .then((data) => {
                // Show success toast notification
                if(data === 'true')
                {
                    this.showToast('Success', 'Email sent successfully', 'success');
                    this.clearFields();
                }  
                else
                {
                    this.showToast('Error', data, 'error');
                    this.clearFields();
                }  
            }).catch(error =>{
                this.showToast('Error', error, 'error');
            })
            
    }

    // Function to show toast notifications
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

   
}