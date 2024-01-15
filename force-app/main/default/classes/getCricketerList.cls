public with sharing class getCricketerList {
    @AuraEnabled(cacheable=true)
    public static List<Cricketer__c> getCricketerList(String selectedTeam) {
          
        if(selectedTeam != null){
            List<Cricketer__c> playersData = [Select Id, Name, Teams__c,Specialization__c,Price__c,Image__c from Cricketer__c where Teams__c = : selectedTeam];
               return playersData;
        }
    else{ 
            List<Cricketer__c> playersData1 = [Select Id, Name, Teams__c,Specialization__c,Price__c,Image__c from Cricketer__c];
            return playersData1;
    }
       
} 
}