public with sharing class currencyConversionRate {
    @AuraEnabled
    public static map<String,Object> currencyConversionRate(String endPointUrl) {
        Map<String, Object> mapJsonData = new Map<String, Object>();
        String strResponse=null;
        if(String.isNotBlank(endPointUrl))
        {
            HttpRequest req = new HttpRequest();
            req.setEndpoint(endPointUrl);
            req.setMethod('GET');
            req.setHeader('Authorization', 'OAuth '+UserInfo.getSessionId());
            req.setHeader('Authorization', 'Bearer '+UserInfo.getSessionId());
            try {
                Http hp = new Http();
                HttpResponse res = hp.send(req);
                if(res.getStatusCode() == 200)
                {
                    strResponse = res.getBody();
                }
                else{
                    throw new CalloutException(res.getBody());
                }
            } catch (Exception e) {
                throw e;
            }
        }
            if(String.isNotBlank(strResponse))
            {
                mapJsonData = (map<String,Object>)JSON.deserializeUntyped(strResponse);
                System.debug('mapJsonData => '+mapJsonData);
            }
        
        return mapJsonData;
    }
}