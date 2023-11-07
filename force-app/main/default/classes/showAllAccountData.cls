public with sharing class showAllAccountData {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [
            SELECT Id, Name, review_Data__c FROM Account ORDER BY CreatedDate DESC
        ];
    }
    
}