({
    getTablelist : function(component,event,helper) {
        
        console.log('In getTablelist....');
        component.set("v.Spinner", true);
        var action = component.get("c.TableSummaryApiCall");
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var getData = response.getReturnValue();
                console.log('getData: ' + getData);
                if(getData) {
                    component.set('v.tabledata', response.getReturnValue());
                    component.set('v.totalrowcount' ,(response.getReturnValue()).length );
                    setTimeout(function(){ 
                        $('#tableId').DataTable(
                            {
                                "searching": false,
                                'columnDefs': [ {
                                    'targets': [0],
                                    
                                    'orderable': false, 
                                }],
                                "destroy" : true
                            }
                        );
                        
                        $('div.dataTables_filter input').css("marginBottom", "10px");
                    }, 500); 
                    
                    component.set("v.Spinner", false);
                }
                else{
                    alert('Data is empty.');
                }
                
            }
            else{
                alert('Error in getting data');
            }
        });
        $A.enqueueAction(action);      
    },
    helperaddRow: function(component,event,helper){
        component.set("v.addrowSection", true);
        var tableList = component.get("v.addtabledata");
        var totalrowcount = component.get("v.totalrowcount");
        tableList.push({
            'id' : totalrowcount +1,
            'creditorName' : '',
            'firstName':'',
            'lastName':'',
            'minPaymentPercentage':'',
            'balance':''
        });
        
        component.set("v.addtabledata", tableList);
        
    },
    helperremoveRow: function(component,event,helper){
        var tableList = component.get("v.tabledata");
        var checkvalue = component.find("checkRow");
        for (var i = 0; i < checkvalue.length; i++) {
            if (checkvalue[i].get("v.value") == true) {
                tableList.splice(i, 1);
            }
        }
        component.set("v.tabledata", tableList);    
    },
    helpersaveRow:function(component,event,helper){
         component.set("v.addrowSection", false);
         var addtableList = component.get("v.addtabledata");
         var tableList = component.get("v.tabledata");
         var validRecords = [];
        for(var i = 0; i < addtableList.length; i++) {
            if(addtableList[i].Name != "") {
                tableList.push(addtableList[i]);
            }
        }
       
         component.set("v.addtabledata", []);  
         component.set("v.tabledata", tableList);  
        
        
    }
})