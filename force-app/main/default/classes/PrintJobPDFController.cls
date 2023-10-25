public with sharing class PrintJobPDFController {
    @AuraEnabled 
    public static Blob  getPdfFileAsBase64String(List<Contact> contactList) {
          // Create a Visualforce Page URL with data as a parameter
        PageReference pageRef = Page.YourVisualforcePage;
        pageRef.getParameters().put('data', contactList);
        

        // Generate the PDF
        Blob pdfBlob;
        pdfBlob = pageRef.getContentAsPDF();

        // Convert the PDF Blob to Base64
        String pdfBase64 = EncodingUtil.base64Encode(pdfBlob);
        return pdfBase64;
    } 

    
}