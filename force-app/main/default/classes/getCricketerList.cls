public with sharing class getCricketerList {
    @AuraEnabled(cacheable=true)
    public static List<Cricketer__c> getCricketerList(String selectedTeam) {
          
        if(selectedTeam == ''){
            List<Cricketer__c> playersData = [Select Id, Name, Teams__c,Specialization__c,Price__c,Image__c from Cricketer__c];
            return playersData;
        }
    else{ 
            
            List<Cricketer__c> playersData = [Select Id, Name, Teams__c,Specialization__c,Price__c,Image__c from Cricketer__c where Teams__c = : selectedTeam];
            return playersData;
        }
       
    } 

    

    @AuraEnabled(cacheable=true)
    public static Cricketer__c getSelectedPlayerData(String sendDataId) {
          
       
            Cricketer__c playersData = [Select Id, Name, Teams__c,Specialization__c,Price__c,Image__c from Cricketer__c where Id =: sendDataId];
            System.debug(playersData);
            return playersData;
        
    
       
    } 
}