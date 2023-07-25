public with sharing class getOpportunityForAccount {
    
    @AuraEnabled(Cacheable = true)
    public static List<Opportunity> getOpportunityForAccount(Id recordId) {
        return [Select Id,Name, StageName,AccountID,Amount from Opportunity where AccountId =: recordId  ] ; 

    }


    

    
}