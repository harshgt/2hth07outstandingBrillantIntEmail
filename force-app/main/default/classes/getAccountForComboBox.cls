public with sharing class getAccountForComboBox {
    @AuraEnabled
    public static list<account> getAccountForComboBox()
    {
        list<account> accList = [select Id, Name from Account];
        return accList;
    }

    @AuraEnabled
    public static list<Contact> getContactForSelectedAccount(String SelectedAccount)
    {
        List<Contact> ConList = [Select Id, Name, Email from Contact where AccountId =: SelectedAccount];
        if(ConList.isEmpty()){
            return NULL;
        }
        return ConList;
    }
}