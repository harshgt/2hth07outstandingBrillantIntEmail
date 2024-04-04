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

    @AuraEnabled
    public static List<Account> getContact() {
        list<Account> accList = [Select Id,Name, (Select Id,FirstName,LastName from Contacts) From Account];
        if(!accList.isEmpty())
        {
            return accList;
        }

        return null;
    }
}