public with sharing class PDFGeneratorController {
    public static List<String> data { get; set; }
    
    public PDFGeneratorController() {
        data = new List<String>();
    }
    @AuraEnabled
    public static void setData(List<String> inputData) {
        data = inputData;
    }
}

