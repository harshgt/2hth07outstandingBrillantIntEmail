public with sharing class getContactAndOpportunties {
    @AuraEnabled
    public static List<Account> getContactAndOpportunties(Id recordId) {
        list<Account> accList = [Select Id, (Select Id,Name from Contacts), (Select Id, Name from Opportunities) 
        From Account where Id =: recordId];

        System.debug(accList);

        if(!accList.isEmpty())
        {
            return accList;
        }

        return null;
    }
}