public with sharing class customerLedgerData {
    @AuraEnabled
    public static map<String,String > customerLedgerData(String endPointUrl, Date startDate, Date endDate, Id recordId) {
        
        System.debug('endPointUrl ==> ' +endPointUrl);
        System.debug('startDate ==> ' +startDate);
        System.debug('endDate ==> ' +endDate);
        //convert date to string 
        String formattedDate = String.valueOf(startDate.day()) + '-' + (startDate.month() < 10 ? '0' : '') + String.valueOf(startDate.month()) + '-' + String.valueOf(startDate.year());
        System.debug(formattedDate);
        
        
        Map<String, String> result = new Map<String, String>();
        
        // call HTTP request and get response 
        String rawLogResponse = makeHttpRequest(endPointUrl);
        
        String businessPartnerStart = '<d:BusinessPartner>';
        String businessPartnerEnd = '</d:BusinessPartner>';
        String firstNameStart = '<d:FirstName>';
        String firstNameEnd = '</d:FirstName>';
        String lastNameStart = '<d:LastName>';
        String lastNameEnd = '</d:LastName>';
        String OrganizationBPNameStart = '<d:OrganizationBPName1>';
        String OrganizationBPNameEnd =  '</d:OrganizationBPName1>';   
        
        result.put('BusinessPartner', extractValue(rawLogResponse, businessPartnerStart, businessPartnerEnd));
        result.put('FirstName', extractValue(rawLogResponse, firstNameStart, firstNameEnd));
        result.put('LastName', extractValue(rawLogResponse, lastNameStart, lastNameEnd));
        result.put('OrganizationBPNameStart', extractValue(rawLogResponse, OrganizationBPNameStart, OrganizationBPNameEnd));
        
		String BusinessPartner = extractValue(rawLogResponse, businessPartnerStart, businessPartnerEnd);
        system.debug(BusinessPartner);
        system.debug(recordId);
        
        Integer BusinessPartnerInt = Integer.valueOf(BusinessPartner);
        changeIdAccSapId(BusinessPartnerInt, recordId);
        return result;
    }
    
    //for complete raw log
    private static String extractValue(String text, String startTag, String endTag) {
        Integer startIndex = text.indexOf(startTag) + startTag.length();
        Integer endIndex = text.indexOf(endTag);
        if (startIndex >= 0 && endIndex > startIndex) {
            return text.substring(startIndex, endIndex);
        }
        return null;
    }
    
    
    // HTTP request and get the XML response
    private static String makeHttpRequest(String endPointUrl) {
        String strResponse=null;
        
        if (String.isNotBlank(endPointUrl)) {
            HttpRequest req = new HttpRequest();
            
            req.setEndpoint(endPointUrl);
            req.setMethod('POST'); // Change the method to POST for sending data
            String username = 'harshal.thakare@sapours.net.in';
            String password = '@Shyam004';
            Blob headerValue = Blob.valueOf(username + ':' + password);
            String authorizationHeader = 'BASIC ' + EncodingUtil.base64Encode(headerValue);
            System.debug(authorizationHeader);           
            req.setHeader('Authorization', authorizationHeader);
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('Accept', 'application/json');
            String requestBody = '{"FirstName": "Shyam","MiddleName": "Gg","LastName": "gtThakare","OrganizationBPName1": "shyamgt10","BusinessPartnerCategory": "2"}';
            req.setBody(requestBody);
            
            try 
            {
                Http hp = new Http();
                //req.setTimeout(60000);
                HttpResponse res = hp.send(req);
                System.debug('run1'+res);                   
                if (res.getStatusCode() == 201) 
                {
                    System.debug('getStatusCode => ' + res.getStatusCode());
                    System.debug('res.getBody => ' + res.getBody());	
                    strResponse = res.getBody();
                } 
                else 
                {
                    throw new CalloutException(res.getBody());
                }
            } 
            catch (Exception e) {
                throw e;              
            }            
        }         
        return strResponse;        
    }
    
    public static void changeIdAccSapId(Integer BusinessPartnerInt, Id recordId)
    {
        List<Account> accListUpt = new List<Account>();
         system.debug(BusinessPartnerInt);
         system.debug(recordId);
        
        List<Account> accList = [Select id, name, SAP_Code__c from Account where Id =: recordId  ];
        for(Account acc : accList)
        {
            system.debug(BusinessPartnerInt);
            acc.SAP_Code__c = BusinessPartnerInt;
            accListUpt.add(acc);
        }
        update accListUpt;
    }
}