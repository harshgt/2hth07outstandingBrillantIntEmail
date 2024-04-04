public class EmailSender {
    @AuraEnabled
    public static void sendEmailWithAttachment(String recipientEmail, String pdfBase64) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[] {recipientEmail});
        email.setSubject('Your Subject');
        email.setPlainTextBody('Your email body.');

        // Attach the PDF
        Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
        attachment.setFileName('YourPDF.pdf');
        attachment.setBody(Blob.valueOf(pdfBase64));
        email.setFileAttachments(new Messaging.EmailFileAttachment[] {attachment});

        // Send the email
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
    }
}

