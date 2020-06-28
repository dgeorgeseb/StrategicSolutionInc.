({
    scriptsLoaded : function(component, event, helper) {
        var today = new Date();
        component.set("v.startDate",today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
        console.log('Script loaded..');
    },
    doInit : function(component, event, helper) {
        
        helper.getTablelist(component,event,helper);
    },
    checkedValue: function(component, event, helper){
        var checkvalue = component.find("checkRow");
        var countchecks = 0;
        var checkedbalance = 0;
        var balancevalue =  component.find("balance");
        if(checkvalue){
            for (var i = 0; i < checkvalue.length; i++) {
                if (checkvalue[i].get("v.value") == true) {
                    countchecks = countchecks + 1;
                    checkedbalance = checkedbalance + balancevalue[i].get("v.value");
                    
                }
            }
            component.set('v.totalbalance', checkedbalance);
            component.set('v.checkrowcount', countchecks);
        }
        
    },
    handleSelectAllRows: function(component, event, helper) {
        var getID = component.get("v.tabledata");
        var checkvalue = component.find("selectAll").get("v.value");        
        var checkRow = component.find("checkRow"); 
        var checkedbalance = 0;
        var balancevalue =  component.find("balance");
        
        if(checkvalue == true){
            for(var i=0; i<checkRow.length; i++){
                checkRow[i].set("v.value",true);
                checkedbalance = checkedbalance + balancevalue[i].get("v.value");
            }
            component.set('v.totalbalance', checkedbalance);
            component.set('v.checkrowcount', checkRow.length);
        }
        else{ 
            for(var i=0; i<checkRow.length; i++){
                checkRow[i].set("v.value",false);
            }
            component.set('v.totalbalance', 0);
            component.set('v.checkrowcount', 0);
        }
        
    },
    addRow: function(component,event,helper){
        
        helper.helperaddRow(component,event,helper);
    },
    removeRow: function(component,event,helper){
        helper.helperremoveRow(component,event,helper);
    },
    saveRow:function(component,event,helper){
        helper.helpersaveRow(component,event,helper);
    }
})