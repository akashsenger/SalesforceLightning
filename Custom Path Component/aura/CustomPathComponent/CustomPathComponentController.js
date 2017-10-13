({
    doInit : function(component, event, helper) {
        var costCenter = component.get("c.getStatus");
	    
	    var opts=[];
	    
	    costCenter.setCallback(this, function(a) {
            
	    	if (a.getState() === "SUCCESS") {
		        for(var i=0;i< a.getReturnValue().length;i++){
		            opts.push(a.getReturnValue()[i]);
		        }
                
		        component.set("v.ListOfStatus", opts);
			}else{
                console.log("error");
				cmp.set("v.isError",true);
        		cmp.set("v.Message","Unable to fetch shipping cost center picklist values.");
			}
			
	    });
	    $A.enqueueAction(costCenter);
    },
    handleSaveRecord: function(component, event, helper) {
        component.find("recordEditor").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log("Save completed successfully.");
                	var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "type":"Success",
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();

            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + 
                           JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
    },
    selectedStatus: function(component, event, helper) {
         console.log(event.getSource().get("v.label"));
         component.set("v.simpleRecord.Custom_Status__c", event.getSource().get("v.label"));  
    }
})