public with sharing class getContactForAccount {
    
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getContactForAccount(Id recordIds) {
        return [Select Id,Name,Email,MobilePhone, AccountId,Account.Name from Contact where AccountId =: recordIds] ; 

    }
}