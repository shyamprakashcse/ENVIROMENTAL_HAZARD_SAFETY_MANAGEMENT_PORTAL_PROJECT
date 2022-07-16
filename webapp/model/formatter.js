sap.ui.define([], function() {
	
	"use strict"; 
	/* eslint no-console: "error" */
	return {
	     PriorityDecoder:function(priority){
	     	var res;
	     	if(priority === "1" ){
	     		res = "Very High";
	     	}
	     	else if(priority === "2"){
	     		res = "High";
	     	}
	     	else if(priority === "3"){
	     		res = "Medium";
	     	}
	     	else if(priority === "4"){
	     		res = "Low";
	     	} 
	     	
	     return res; 
	     }, // end of PriorityDecoder  
	     
	     DateConvertor:function(date){
	     	var res,arr; 
	     	if(date === undefined || date == null || date.length <= 0){
	     		return null;
	     	}
	     	else{
	     	   res = date.toString();	
	     	}
	     	
	     	
	        
	     	arr = res.split(" "); 
	     	//console.log(arr);
	     	return arr[0]+" "+arr[1]+" "+arr[2]+" "+arr[3]; 
	     },//End of DateConvertor 
	     
	     
	     GetPriorityIcon:function(priority){
	     	var res; 
	     	if(priority === "1"){
	     		res = "sap-icon://quality-issue";
	     	
	     	}
	     	else if(priority === "2"){
	     		res = "sap-icon://alert";
	     	}
	     	else if(priority === "3"){
	     		res = "sap-icon://warning2";
	     		
	     	}
	     	else if(priority === "4"){
	     		res = "sap-icon://travel-request";
	     	} 
	     res = "sap-icon://alert";
	     
	    
	     return res; 
	     	
	     },//End of GetPriorityFunction
	     
	    GetPriorityState:function(priority){
	    	
	    	var res; 
	    	if(priority === "1"){
	        res = 'Error' ; 
	    	}
	    	else if(priority === "2"){
	    	res = 'Error';
	    	}
	    	else if(priority === "3"){
	    	res = 'Warning'; 
	    	}
	    	else if (priority === "4") {
	    		res = 'None' ; 
	    	}
	        
	     	console.log(res);
	     return res; 
	    },// end of getPriorityState 
	    
	    GetRiskScoreState:function(score){
	    	var res=""; 
	    	if(score>=1 && score<=5){
	    		res = 'Error' ; 
	    	}
	    	else if(score>=6 && score<=7){
	    		res = 'Warning'
	    	}
	    	else{
	    		res = 'Success' ; 
	    	}
	    	return res;
	    },// end of GetRiskScoreState 
	    
	    GetProbabilityScoreState:function(score){
	    	var res,val; 
	    	if(score == undefined || score == null || score.length<3 )
	    	return 'None' ; 
	    	
	    	val = parseInt(score.charAt(2)); 
	    	if(val>=1 && val<=3){
	    		res = 'Success' ;
	    	}
	    	else if(val>=4 && val<=5){
	    		res = 'Warning' ;
	    	}
	    	else{
	    		res = 'Error' ;
	    	}
	    	return res ; 
	    }
	     
	};
});