public class YourVisualforceController {
    public String data { get; set; }

    public YourVisualforceController() {
        // Retrieve the data from the parameter
        data = ApexPages.currentPage().getParameters().get('data');
    }
}

