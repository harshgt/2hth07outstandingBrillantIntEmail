public with sharing class customerData { 
    @AuraEnabled
    public static map<String,Object> customerData(String endPointUrl) {
        Map<String, Object> mapJsonData = new Map<String, Object>();
        String strResponse=null;
        if(String.isNotBlank(endPointUrl))
        {
            HttpRequest req = new HttpRequest();
            req.setEndpoint(endPointUrl);
            req.setMethod('GET');
            	String username = 'sb-24bf730e-3805-4349-9d9d-5ed0fb1ed5c9!b587|it-rt-brilliant-polymers-ixuv1tbr!b58';
                String password = '7f126768-61e3-463d-af4f-e18da1d68837$Fxzdcnr7VIF0FPAZtNN7veAglR5njSk_dRdujCyZGhA=';    
                Blob headerValue = Blob.valueOf(username + ':' + password);
                String authorizationHeader = 'BASIC ' + EncodingUtil.base64Encode(headerValue);
                System.debug(authorizationHeader);
                req.setHeader('Authorization', authorizationHeader);
                req.setHeader('Content-Type','application/json');
            //req.setHeader('Authorization', 'OAuth '+UserInfo.getSessionId());
            //req.setHeader('Authorization', 'Bearer '+UserInfo.getSessionId());
            try {
                Http hp = new Http();
                HttpResponse res = hp.send(req);
                System.debug('run1');
                if(res.getStatusCode() == 200)
                {
                    System.debug('getStatusCode => '+res.getStatusCode());
                    System.debug('resgetBody => '+res.getBody());
                    strResponse = res.getBody();
                }
                else{
                    throw new CalloutException(res.getBody());
                }
            } catch (Exception e) {
                throw e;
            }
        }
        System.debug('run2');
         System.debug('strResponse1 => '+strResponse);
            if(String.isNotBlank(strResponse))
            {
                mapJsonData = (map<String,Object>)JSON.deserializeUntyped(strResponse);
                System.debug('mapJsonData => '+mapJsonData);
                System.debug('strResponse2 => '+strResponse);
            }
            return mapJsonData;
    }
}