public with sharing class getCricketerList {
    @AuraEnabled(cacheable=true)
    public static List<Cricketer__c> getCricketerList() {
        List<Cricketer__c> playersData = [Select Id, Name, Teams__c,Specialization__c,Price__c,Image__c from Cricketer__c];
        if(playersData != null )
        {   
            System.debug(playersData);
            return playersData;
        }
        
        return null;
    } 
}