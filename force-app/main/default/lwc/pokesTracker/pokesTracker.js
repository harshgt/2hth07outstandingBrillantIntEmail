import { LightningElement,api,wire,track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const NAME = 'Pockemon__c.Name';
const LATITUDE = 'Pockemon__c.Location__Latitude__s';
const LONGITUDE = 'Pockemon__c.Location__Longitude__s'; 

//const fieldsValue = ['Pockemon__c.Name', 'Pockemon__c.Location__Latitude__s', 'Pockemon__c.Location__Longitude__s'];
const fieldsValue = [NAME, LATITUDE, LONGITUDE];


export default class PokesTracker extends LightningElement {

    @api recordId;
    @track mapMarkers=[];
    name;
    cardTitle;


    @wire(getRecord, {recordId : '$recordId', fields : fieldsValue})
    getPokemon({error, data}){  //2. Using Function
        if(error){
            console.error('Error '+ JSON.stringify(error));
        }else if(data){
            this.name = getFieldValue(data, NAME);
            this.name 
            //this.name = data.fields.Name.value;
            
            console.log(this.name);
            this.cardTitle = this.name;
            const Latitude = data.fields.Location__Latitude__s.value; //getFieldValue(data, LATITUDE);
            const Longitude = data.fields.Location__Longitude__s.value; //getFieldValue(data, LONGITUDE);

            this.mapMarkers = [{
                location : {Latitude, Longitude},
                title : this.name,
                description : `Coords is : ${Latitude}, ${Longitude} `, // to pass the property value in template literal use $  
            }]

            console.log('this.mapMarkers '+ JSON.stringify(this.mapMarkers));
        }
    }  
    
}