public with sharing class getEmailCont {
    
    @AuraEnabled(Cacheable = true)
    public static List<Email_Contact_Status__c> getEmailCont(Id recIds) {
        String IdsOfOpp = (String)recIds;
        //system.debug('abcd'+IdsOfOpp);
        //system.debug('Idabcd'+recIds);
        return [select Id, Name,createdDate, Status__c,Contact_Email__c,Contact_Name__c,Opportunity_Name__c,OpportunityId__c from Email_Contact_Status__c where OpportunityId__c =: recIds  ] ; 
        //
    }

}