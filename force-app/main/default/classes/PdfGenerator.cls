public with sharing class PdfGenerator
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsController(){
        return [SELECT Id, FirstName, LastName FROM Contact LIMIT 1000];
    }
}
