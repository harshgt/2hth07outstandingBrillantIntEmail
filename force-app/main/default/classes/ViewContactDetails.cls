public with sharing class ViewContactDetails {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String accountId) {
        system.debug('accountId is:'+accountId);
         return [SELECT Id,Name,Phone from Contact where AccountId=:accountId];
 
     }
 }