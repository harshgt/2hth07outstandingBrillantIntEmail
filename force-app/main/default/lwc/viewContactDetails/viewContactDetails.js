import {
    LightningElement,
    track,
    api,
    wire
} from 'lwc';
import getContactList from '@salesforce/apex/ViewContactDetails.getContactList';

export default class ViewContactDetails extends LightningElement {
    @track error;;
    @track contactsList;

    @track createSMSRec;

    @api recordId;
    @track isModalOpen = false;
    @track isViewModalOpen = false;

    @track columns = [

        {

            type: 'button',

            typeAttributes:

            {

                label: 'View',

                name: 'viewRecord',

                title: 'view',

                disabled: false,

                value: 'View',

            }



        },
        {

            label: 'Contact Name',

            fieldName: 'Name',

            type: 'text',

            sortable: true

        },

        {

            label: 'Phone Number',

            fieldName: 'Phone',

            type: 'phone',

            sortable: true

        }


    ];
    @wire(getContactList, {
        accountId: '$recordId'
    })

    wiredContacts({
        error,
        result
    }) {

        if (result) {
            console.log('Displaying Results:');
            this.contactsList = result;

        } else if (error) {

            this.error = error;

        }

    }

    /*

    @wire(createNewSMS, { caseID: '$recordId'})

        wiredcreateSMS({ error, data }) {

            if (data) {

                this.createSMSRec = data;

            } else if (error) {

                this.error = error;

            }

    }
*/
    handleSuccess(event) {

        this.dispatchEvent(

            new ShowToastEvent({

                title: 'Success',

                message: event.detail.apiName + ' created.',

                variant: 'success',

            }),

        );

    }



    handleChange(event) {

        // console.log("You selected an record: " + event.detail.value[0]);

    }





    openModal() {

        // to open modal set isModalOpen tarck value as true

        this.isModalOpen = true;

    }

    closeModal() {

        // to close modal set isModalOpen tarck value as false

        this.isModalOpen = false;

    }



    openViewModal(event) {

        // to open modal set isModalOpen tarck value as true

        this.isViewModalOpen = true;



    }

    closVieweModal() {

        // to close modal set isModalOpen tarck value as false

        this.isViewModalOpen = false;

    }



    submitDetails() {

        // to close modal set isModalOpen tarck value as false

        //Add your code to call apex method or do some processing

        this.isModalOpen = false;

    }
}