public with sharing class EmailHandler {
  @AuraEnabled
  Public static Void sendEmail(List<Id> toAddress, String subject, String body, List<Id> selectOpp) { 
     

//Comment line code  for email
 
//System.debug('Success 1', toAddress);
      
           List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
           List<Email_Contact_Status__c> emailStatuses = new List<Email_Contact_Status__c>();

      list<contact> conList = [Select Id , name,email from Contact where Id IN:toAddress];
      list<Opportunity>oppList = [Select Id , name,AccountId from Opportunity where Id IN:selectOpp];
      System.debug(conList);
      System.debug(oppList);
      
             for(contact cons:conList)
             {
              System.debug(cons.Email); 
      //}
      
      //for(Id cc:toAddress)
            // {
              //System.debug(cc);
              
             
             Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
  
             // Step 2: Set list of people who should get the email
                List<String> sendTo = new List<String>();
                sendTo.add(cons.Email);
                mail.setToAddresses(sendTo);
             
             // Step 3: Set who the email is sent from
                mail.setReplyTo('harshgthakare@gmail.com'); // change it with your mail address.
                mail.setSenderDisplayName('salesforce test User'); 
             
             // Step 4. Set email contents - you can use variables!
               mail.setSubject(subject);
               //mail.setHtmlBody(body);
               mail.setSaveAsActivity(true);
             
             // Step 5. Add your email to the master list
               mails.add(mail); 
               
              for(Opportunity occ: oppList)
              {
                Email_Contact_Status__c status = new Email_Contact_Status__c();
               
                
                //status.name = 'Shyamtest 1 ';
                status.Status__c = 'Pending';
                status.Contact_Name__c = cons.Name;
                status.Contact_Email__c = cons.Email;
                status.Opportunity_Name__c = occ.Name;
                status.OpportunityId__c = occ.Id;
                emailStatuses.add(status);
               
              }

               
                
              
               
             }
              
             // Step 6: Send all emails in the master list
             System.debug('success 1');
            //Messaging.sendEmail(mails);
              //System.debug(mails);
              //return Messaging.sendEmail(mails);
          List<Messaging.SendEmailResult> emailResults = Messaging.sendEmail(mails);
          system.debug(emailResults);
          insert emailStatuses;
              for (Integer i = 0; i < emailResults.size(); i++) {
                if (emailResults[i].isSuccess()) {
                    system.debug('true');
                    emailStatuses[i].Status__c = 'Sent';
                } else {
                    emailStatuses[i].Status__c = 'Failed';
                    system.debug('Failed');
                    //emailStatuses[i].ErrorMessage = emailResults[i].getErrors()[0].getMessage();
                }
            }

            //(Email_Contact_Status__c:{Status__c=Pending, Contact_Name__c=Babara Levy, 
              //Contact_Email__c=shyamgt10@gmail.com, Id=a000l00000KQgzrAAD})
            update emailStatuses;

            system.debug(emailStatuses); //1 con 1
                                          // 2 con 2
            /*
            List<Email_Contact_Status__c> emailStatuses1 = new List<Email_Contact_Status__c>();


              for(Opportunity opp : oppList )
                {
                  for(Email_Contact_Status__c p : emailStatuses)
                  {
                    //Email_Contact_Status__c status1 = new Email_Contact_Status__c();

                    system.debug(p.Opportunity_Name__c);

                    //Email_Contact_Status__c status1 = new Email_Contact_Status__c();
                    //p.Opportunity_Name__c = opp.Name+' '+opp.Id;
                    //emailStatuses1.add(emailStatuses);
                    //system.debug(emailStatuses);
                    //system.debug(opp.name);
                    //emailStatuses1.add(p);
                  }
                    
              }
            upsert emailStatuses1;
              
            */
      
  } 


}

