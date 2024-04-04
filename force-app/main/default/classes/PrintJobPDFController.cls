public with sharing class PrintJobPDFController {
    @AuraEnabled   
    public static Blob getPdfFileAsBase64String(List<Contact> contactList) {
        // Create a Visualforce Page URL with data as a parameter
        PageReference pageRef = Page.MyPDFPage;
        pageRef.getParameters().put('data', JSON.serialize(contactList)); // Serialize the list to a JSON string
    
        // Generate the PDF
        Blob pdfBlob;
        pdfBlob = pageRef.getContentAsPDF();
    
        return pdfBlob;
    }

    
}