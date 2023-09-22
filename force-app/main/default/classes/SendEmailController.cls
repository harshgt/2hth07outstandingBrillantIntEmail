public with sharing class SendEmailController {
    @AuraEnabled
    public static String sendEmail(String replyTos, String senderNames,List<String> toAddress,List<String> toCCAddress, String subject, String body,String BodyEmail) {
        // Create a new SingleEmailMessage object
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        //system.debug(replyTos);
        //system.debug(senderNames);  

        // Set the recipient's email address
        mail.setReplyTo('harshgthakare@gmail.com'); // change it with your mail address.
        mail.setSenderDisplayName('salesforce test User'); 
        
        system.debug(toAddress);
        Id templateId;
          
        mail.setToAddresses(toAddress );

        if(toCCAddress != NULL && toCCAddress.isEmpty()){
             mail.setccAddresses(toCCAddress);
        }
       

        // Set the email subject
        mail.setSubject('Showing Outstanding data...! for Contact <strong> HARSHAL </strong>');
        // Reference the Static Resource name here
            String resourceName = 'email_template';

            // Read the content of the Static Resource
            if(BodyEmail == null){
                String emailBodyContent = getEmailTemplateContent(resourceName);
                
                emailBodyContent = emailBodyContent.replace('[RECIPIENT_NAME]', 'harshgthakare@gmail.com');
                emailBodyContent = emailBodyContent.replace('[MESSAGE_CONTENT]', 'message regarding the test Template');
                emailBodyContent = emailBodyContent.replace('[YOUR_NAME]', 'harshgthakare@gmail.com');
                // Set the HTML email body
                mail.setHtmlBody(emailBodyContent);
            }
            
            BodyEmail = BodyEmail.replace('[RECIPIENT_NAME]', 'Harshal');
            BodyEmail = BodyEmail.replace('[MESSAGE_CONTENT]', 'message regarding the test Template');
            BodyEmail = BodyEmail.replace('[YOUR_NAME]', 'Shyam');
                
            
            system.debug('demo'+BodyEmail);
            //String hpgt = '<h1>Hello, [RECIPIENT_NAME]!</h1><p>[MESSAGE_CONTENT]</p><p>You can include any content you like here, such as:</p><ul><li>Text</li><li>Images</li><li>Links</li><li>Formatted text</li><li><strong>harshal</strong></li></ul><p>Feel free to customize this template to suit your needs.</p><p>Best regards,</p><p> [YOUR_NAME]</p>';
            //mail.setHtmlBody(hpgt);
            //mail.setPlainTextBody(BodyEmail);
             // Set the email body (HTML content)
           mail.setHtmlBody('<p> HIIII {!toAddress}</p> <br>   '+BodyEmail+' <p>thank You!<br>SHYAM GT 10 </p>');
     
         //mail.setTemplateId('00X5j0000032nsNEAQ');
        mail.setSaveAsActivity(true);

        // Send the email using the Messaging.sendEmail method
        try {
             Messaging.sendEmail(new List<Messaging.Email> { mail });
             return 'true';
        } catch (EmailException e) {
            system.debug('EmailException: ' + e.getMessage());
            //system.debug('EmailException: ' + e.);
            return e.getMessage(); // Email sending failed
        }
    }


   




    // Function to read the content of the HTML file
public static String getEmailTemplateContent(String templateName) {
    PageReference pageRef = PageReference.forResource(templateName);
    Blob contentBlob;
    
    try {
        contentBlob = pageRef.getContent();
    } catch (VisualforceException e) {
        // Handle the exception
        contentBlob = Blob.valueOf('Error: Unable to load email template.');
    }
    
    return contentBlob.toString();
}

 @AuraEnabled
 public static String collectEmails(){
        //use wire method 
            String resourceName = 'email_template';

            // Read the content of the Static Resource
            String emailBodyContent = getEmailTemplateContent(resourceName);
            return emailBodyContent;
            /* emailBodyContent = emailBodyContent.replace('[RECIPIENT_NAME]', 'harshgthakare@gmail.com');
            emailBodyContent = emailBodyContent.replace('[MESSAGE_CONTENT]', 'message regarding the test Template');
            emailBodyContent = emailBodyContent.replace('[YOUR_NAME]', 'harshgthakare@gmail.com');
 */

    }


}