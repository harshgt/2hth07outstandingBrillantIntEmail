public with sharing class pocksListRetrive {
    @AuraEnabled
    public static List<Pockemon__c> pocksListRetrive(String searchKey) {

        if(searchKey != '' && searchKey != null){
            string key = '%'+ searchKey +'%';
            List<Pockemon__c> pockSearchedList = [SELECT id, Name, Height__c,Weight__c,image__c,Contact__r.Name 
                                                    FROM Pockemon__c WHERE Name Like :key];
            return pockSearchedList;
        }
        else{
            List<Pockemon__c> pockList = [SELECT id, Name, Height__c,Weight__c,image__c,Contact__r.Name FROM Pockemon__c];
            if(!pockList.isEmpty()){
                return pockList;
            }
        }
        

        return null;
    }
}