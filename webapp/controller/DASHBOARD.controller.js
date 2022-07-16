sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router"
], function(Controller,MessageBox,MessageToast,Router) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/

    
    
   
    var userHeader,userId,riskSet,incidentSet;
    var data; 
	return Controller.extend("COM.EHSMPORTALEHSMPORTAL.controller.DASHBOARD", {

	  onInit:function(){
	  		this.getRouter().getRoute("dashboard").attachMatched(this.onRouteMatched,this);  
	  		
	  },//end of oninit function
	  
      getRouter:function(){
		    return sap.ui.core.UIComponent.getRouterFor(this); 
		    
		},// END OF GETROUTER 
		
	  	onRouteMatched:function(oEvent){
	  		
		  var oArguments = oEvent.getParameter("arguments"); 
		  var view = this.getView(); 
		  var compressedData = oArguments.value;  
		  userHeader = JSON.parse(compressedData); 
		  userId = userHeader["Objnr"];
		  console.log(userHeader)
		  var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_EHSM_INTERNPROJECT_SRV/", true);   
		  	// Incident set  
		 
		 URL = "INCIDENTSet?$filter=(Objnr eq '"+userId+"')&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	incidentSet = oData.results;  
			 	                
			 	                console.log("Incident set is")
			 	              	console.log(incidentSet); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read   
			 
			 
			 
			 // risk set  
			 
			 //URL = "PRODORDERSet?$filter=Plant eq '"+ userHeader["Plwrk"] + "'&$format=json";
			 URL = "RISKSet?$filter=(Objnr eq '"+userId+"')&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	riskSet = oData.results;  
			 	                console.log("risk set");
			 	              	console.log(riskSet); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read  
			 
		       userHeader["RiskCount"]=riskSet.length;
		       userHeader["IncidentCount"]=incidentSet.length; 
			 	        
			 	        
			var oPage = this.getView().byId("TileBoard")
	 	    var oModel = new sap.ui.model.json.JSONModel(); 
	 	    oModel.setData(userHeader); 
	 	    oPage.setModel(oModel,"planmodel"); 
			 
			 
	  	},// end of onRouteMatched function 
		 
	    onFilterSelect:function(oEvent){
	  		var sKey = oEvent.getParameter("key");  
	  		console.log(sKey)
	  		if(sKey === 'Logout'){
	  			console.log(sKey);
	  			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			   oRouter.navTo("");
	  		}
	  		else if (sKey === "planord" || sKey === "prodord"){
	  			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	  		   var compressor = JSON.stringify(userHeader); 
	  		   oRouter.navTo("home",{"value":compressor}); 
	  		}
	  	
	  	
	  }, // end of onFilter 
	  
	  pltile:function(){
	  		var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	  		var compressor = JSON.stringify(userHeader); 
	  		oRouter.navTo("home",{"value":compressor}); 
	  }, 
	  
	  prtile:function(){
	  		var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	  		var compressor = JSON.stringify(userHeader); 
	  		oRouter.navTo("home",{"value":compressor}); 
	  }
	  
		
	  
		
	});

});