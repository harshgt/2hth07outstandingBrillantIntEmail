public with sharing class showAllAccountData {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [
            SELECT Id, Name,Website,Phone FROM Account ORDER BY CreatedDate DESC
        ];
    }


    @AuraEnabled
    public static string updateData(Object allAccountData) {
        
        List<Account> accountData = (List<Account>) JSON.deserialize(
            JSON.serialize(allAccountData), List<Account>.class
        );

        System.debug(accountData);

        if(!accountData.isEmpty()){
            update accountData;
            return 'success';
        }
        return 'failed';

       
    }
    
}