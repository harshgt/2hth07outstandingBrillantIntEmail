public with sharing class RenderAsPDFController {

    // Property to store the text that will be displayed in the PDF
    public String displayText { get; set; }
    
    public RenderAsPDFController() {
        // Retrieve the 'displayText' parameter from the page URL
        displayText = ApexPages.currentPage().getParameters().get('displayText');
    }
}
