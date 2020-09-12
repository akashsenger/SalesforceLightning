public class CustomPath_ctrl {
	@AuraEnabled
	//Test commit
    public static List<String> getStatus(){
		List<String> options = new List<String>();
		Schema.DescribeFieldResult fieldResult = Expense__c.Custom_Status__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for (Schema.PicklistEntry f: ple) {
		    options.add(f.getLabel());
		}

		return options;
	}
}
