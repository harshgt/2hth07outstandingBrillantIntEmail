public with sharing class getAccountForComboBox {
    @AuraEnabled
    public static list<account> getAccountForComboBox()
    {
        list<account> accList = [select Id, Name from Account];
        return accList;
    }

    @AuraEnabled
    public static list<Contact> getContactForSelectedAccount() //
    {
        List<Contact> ConList = [Select Id, Name, Email from Contact];  //where AccountId =: SelectedAccount
        if(ConList.isEmpty()){
            return NULL;
        }
        return ConList;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getEmailsForAccount(String accountId) {
        List<String> emailList = new List<String>();
        List<Contact> contacts = [SELECT Id, Email FROM Contact WHERE AccountId = :accountId LIMIT 10];
        
        for (Contact contact : contacts) {
            if (contact.Email != null) {
                emailList.add(contact.Email);
            }
        }

        return emailList;
    }
}