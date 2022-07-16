sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router",

], function(Controller,MessageBox,MessageToast,Router) {
	"use strict";
	/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-console: "error" */
/* "parser": "@babel/eslint-parser" */

	return Controller.extend("COM.EHSMPORTALEHSMPORTAL.controller.LOGINPAGE", { 
		
		
			 
		
		validateInput: function(oEvent){
			var userid = this.byId("empid").getValue().trim(); 
			if(userid===""){
				this.byId("empid").setValueState("Error"); 
				this.byId("empid").setValueStateText("Employee ID cannot be empty")
			     	MessageBox.error("Maintenance Employee ID cannot be empty",{details:"Please enter valid Maintenace employee ID"});
			} 
			else{
					this.byId("empid").setValueState("Success"); 
			}
		}, 
		
		validatePassword:function(oEvent){
				var password = this.byId("emppass").getValue().trim(); 
				if(password==="")
				{
						this.byId("empid").setValueState("Error"); 
			        	this.byId("empid").setValueStateText("Password cannot be empty")
			     	MessageBox.error("Maintenance Employee Password cannot be empty");
				}
					else{
					this.byId("empid").setValueState("Success"); 
			}
		},
		
		
	  go:function(oEvent){
	  	console.log("hello from go function")
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			oRouter.navTo("dashboard",{"value":"900375_101"});
       
       },
		
		login:function(oEvent){ 
			        var userid = this.byId("empid").getValue().trim(); 
		    		var password = this.byId("emppass").getValue().trim();  
		    		var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
		    		
		    		
			        var user; 
			        var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_EHSM_INTERNPROJECT_SRV", true);  
			    
			         var url = "/CREDENTIALSSet(Objnr='"+userid+"',Passkey='"+password+"')?$format=json"       
			       
		    		if(userid==="" || password === "")
		    		{
		    				MessageBox.error("Login Process failed .field cannot be empty");
		    		} 
		    		else{ 
		    			
		    			oModel.read(url,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		         
			 		          console.log("successfully ")
			 	              var fetchedUser = oData.Objnr; 
			 	              var fetchedPassword =oData.Passkey; 
			 	              console.log("hey user id is "+userid);
			 	              //var demo = {
			 	              //	username:"shyam",
			 	              //	password :"hello"
			 	              //};
			 	              
			 	              console.log(oData);
			 	              var data = {
			 	              	"Objnr" : oData.Objnr, 
			 	              	"Passkey" : oData.Passkey,
			 	              	"Designation" : oData.Designation, 
			 	              	"Usnam" : oData.Usnam, 
			 	              	"Iaplant" : oData.Iaplant 
			 	              }
			 	              var compressor = JSON.stringify(data); 
			 	              
			 	              if(fetchedUser === userid && fetchedPassword === password)
			 	              {     
			 	              	 
			 	              		 MessageBox.success("Login Process success."); 
			 	              		 console.log("hello from success function"); 
			 	              	     console.log(oResponse);
			 	              		 oRouter.navTo("dashboard",{"value":compressor});
			 	              		//oRouter.navTo("dashboard");
			 	              		 
			 	              	 
			 	              }
			 	              else{
			 	              		MessageBox.error("Login Process failed .Invalid credentials");
			 	              }
			 
			       	},
			 	                 
			 	    error : function(oData,oResponse){
			 	  
                             	MessageBox.error("Login Process failed .Invalid Process");
                             return ; 
			 	    }
			 }); // odata end 
			 
		    			
		    		}// else end
		}// login function end 
       
      
       
	}); 
	
	
});