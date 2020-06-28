public virtual class TableSummaryModel {

    public class TableData{
        @AuraEnabled public String id {get;set;}
        @AuraEnabled public String creditorName{get;set;}
        @AuraEnabled public String firstName{get;set;}
        @AuraEnabled public String lastName{get;set;}
        @AuraEnabled public Decimal minPaymentPercentage{get;set;}
        @AuraEnabled public Decimal balance{get;set;}
        
    }
}