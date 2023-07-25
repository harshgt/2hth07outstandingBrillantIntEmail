import { LightningElement,track } from 'lwc';
import getCurrencyData from '@salesforce/apex/currencyConversionRate.currencyConversionRate';
const options = 
[
    {label:'USD', value:'USD'},
    {label:'EUR', value:'EUR'},
    {label:'CAD', value:'CAD'},
    {label:'GBP', value:'GBP'},
    {label:'INR', value:'INR'},
    
]
export default class UdemyOrgSfdx extends LightningElement {

    @track fromCurrencyValue;
    @track toCurrencyValue;
    @track formCurrencyOptions=options;
    @track toCurrencyOptions=options;
    @track showData;

    handleFromCurrencyChange(event)
    {
        this.fromCurrencyValue=event.detail.value;
        console.log('this.fromCurrencyValue ===> '+this.fromCurrencyValue)
    }

    handleToCurrencyChange(event)
    {
        this.toCurrencyValue=event.detail.value;
        console.log('this.toCurrencyValue ===> '+this.toCurrencyValue);
    }

    handleCurrencyConversion()
    {
        //call rest api
        //check the response 
        //display response 
        let endpoint = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + this.fromCurrencyValue + '&to_currency=' + this.toCurrencyValue + '&apikey=SR7RFFLCXVDG35LJ';
       
        //call apex class with endpoint
        getCurrencyData({endPointUrl:endpoint})
        .then(data => {
            let objData={
                From_Currency_Code:'',
                From_Currency_Name:'',
                To_Currency_Code:'',
                To_Currency_Name:'',
                Last_Refreshed:''
            };
        


       /* fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + this.fromCurrencyValue + '&to_currency=' + this.toCurrencyValue + '&apikey=SR7RFFLCXVDG35LJ',
            {
                method : "GET",
                headers : {
                    "Content-type":"application/json",
                    "Authorization":"OAuth 00D0w0000002Uhz!AQcAQElEi.oeNTKXgi9CYKzO1QxsPc2g94uKg4XcHXv1MNGcu7mrJ5rlmvht46ElMDH1oz8huIGhjqRgWEQtRYYyVYcGPX6q"
                }
            })
            .then((response) =>
            {
                return response.json();
            })
            .then((jsonResponse) => 
            {
                let objData={
                    From_Currency_Code:'',
                    From_Currency_Name:'',
                    To_Currency_Code:'',
                    To_Currency_Name:'',
                    Last_Refreshed:'',
                };
           */


            //window.console.log('JSONresponse'+JSON.stringify(jsonResponse));
            //let exchangeData = jsonResponse['Realtime Currency Exchange Rate']; //use for js 
            let exchangeData = data['Realtime Currency Exchange Rate'];
            window.console.log('exchangeData => '+JSON.stringify(exchangeData));
            
            objData.From_Currency_Code=exchangeData['1. From_Currency Code'];
            objData.From_Currency_Name=exchangeData['2. From_Currency Name'];
            objData.To_Currency_Code=exchangeData['3. To_Currency Code'];
            objData.To_Currency_Name=exchangeData['4. To_Currency Name'];
            objData.Last_Refreshed=exchangeData['6. Last Refreshed'];
            this.showData = objData;
            window.console.log('objData1 =>'+JSON.stringify(objData));
            console.log('objData2 =>'+JSON.stringify(objData));
            
        }).catch(error => {
            window.console.log('callout error '+JSON.stringify(error));
        })
   
    }

}

