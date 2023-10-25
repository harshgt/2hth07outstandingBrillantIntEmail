public with sharing class PDFGeneratorRendered {
    public List<Contact> relatedContacts { get; private set; }
    @AuraEnabled
    public static Blob generatePDF(Id accountId) {
        relatedContacts = [SELECT Id, Name, Email FROM Contact WHERE AccountId = :accountId];
        String pdfContent = '<html><head><title>Related Contacts</title></head><body>';
        
        for (Contact c : relatedContacts) {
            pdfContent += '<p>Name: ' + c.Name + '</p>';
            pdfContent += '<p>Email: ' + c.Email + '</p>';
        }
        
        pdfContent += '</body></html>';
        
        PageReference pdfPage = Page.MyPDFPage;
        pdfPage.getParameters().put('relatedContacts', pdfContent);
        
        
        
        Blob pdfBlob = pdfPage.getContentAsPDF();
        
        return pdfBlob;
    }
}