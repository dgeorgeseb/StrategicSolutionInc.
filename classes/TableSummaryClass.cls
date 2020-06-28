public with sharing class TableSummaryClass extends TableSummaryModel{
    @AuraEnabled
    public static Object TableSummaryApiCall(){
        String Url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
        try{
            System.debug('Initate api call...');
            Http http = new Http();
			HttpRequest request = new HttpRequest();
			request.setEndpoint(Url);
            request.setMethod('GET');
            HttpResponse response = new HttpResponse();
			response = http.send(request);
            
            System.debug('response received: ' + response.getStatus() + ' | ' + response.getStatusCode() + ' | getBody(): ' + response.getBody());
            System.debug('response body received:' + response.getBody());
            	if(response.getStatus() == 'OK' && response.getStatusCode() == 200 ) {
                    
                    if(response.getBody() != null) {
                        List<TableData> result = new List<TableData>();
                        result = (List<TableData>) JSON.deserializeStrict(response.getBody(), List<TableData>.class);
                        System.debug('Result: '+ result);
                        
                        return result;
                        
                    }
                    else{
                         return 'response.getBody is null';
                    }
                }
                else{
                   return response.getStatus();
                }
        }
        catch(Exception e){
            system.debug('exe: ' + e + ' | '+e.getLineNumber());
            return e.getMessage();
        }
      
    }
   
}