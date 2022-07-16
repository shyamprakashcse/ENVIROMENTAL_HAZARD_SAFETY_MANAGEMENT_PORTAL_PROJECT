sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"COM/EHSMPORTALEHSMPORTAL/model/formatter"
	
], function(Controller,MessageBox,MessageToast,Router,Filter,FilterOperator,formatter) {
	"use strict";
	/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-console: "error" */
/* "parser": "@babel/eslint-parser" */
    
    var URL,UserObject,userId,data,IncidentSet,RiskSet; 
    var ProductionDataObject; 
    var IncSortFlag=0,RiskSortFlag=0; 
    
   
	return Controller.extend("COM.EHSMPORTALEHSMPORTAL.controller.HOME", {   
	    formatter:formatter,
		onInit:function(){
			 
			this.getRouter().getRoute("home").attachMatched(this.onRouteMatched,this); 
			
		
	},// end of onInit function 
		
		getRouter:function(){
		    return sap.ui.core.UIComponent.getRouterFor(this); 
		    
		},
		onRouteMatched:function(oEvent){
		  
		  var oArguments = oEvent.getParameter("arguments"); 
		  var view = this.getView(); 
		  var compressedObject = oArguments.value;   
		  UserObject = JSON.parse(compressedObject);
		  userId = UserObject["Objnr"]; 
	      console.log(UserObject); 
	    
	      UserObject["SortCount"] = "";
	      UserObject["RsortCount"] = "";
	      // modelling and binding into the first page 
	        var FirstPage = this.getView().byId("detail")
	 	    var FPModel = new sap.ui.model.json.JSONModel(); 
	 	    FPModel.setData(UserObject); 
	 	    FirstPage.setModel(FPModel,"usermodel"); 
	      // planned order reading 
	       var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_EHSM_INTERNPROJECT_SRV/", true);   
		 
		// incident set
		 
		URL = "INCIDENTSet?$filter=(Objnr eq '"+userId+"')&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	IncidentSet = oData.results;  
			 	                
			 	                console.log("Incident set is")
			 	              	console.log(IncidentSet); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read   
			 
		var NotificationModel = new sap.ui.model.json.JSONModel();  
	    
	    NotificationModel.setData({
	    	"results":IncidentSet
	    });// end of set data function  
	    
	    this.getView().byId("idNotificationTable").setModel(NotificationModel);
	    console.log(this.getView().byId("idNotificationTable").getModel()); 
			 
		   // risk set  
			 
			 //URL = "PRODORDERSet?$filter=Plant eq '"+ userHeader["Plwrk"] + "'&$format=json";
			 URL = "RISKSet?$filter=(Objnr eq '"+userId+"')&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	RiskSet = oData.results;  
			 	                console.log("risk set");
			 	              	console.log(RiskSet); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read 
		     
		     
		 var ProductionModel = new sap.ui.model.json.JSONModel();  
	    
	    ProductionModel.setData({
	    	"results":RiskSet
	    });// end of set data function  
	    
	    this.getView().byId("idProductionTable").setModel(ProductionModel);
	    console.log(this.getView().byId("idProductionTable").getModel());  
	    
	    
	    
	    // detail2 page count model 
	    
	     var ProductionPage = this.getView().byId("detail2")
	 	 var ProdModel = new sap.ui.model.json.JSONModel();  
	 	 
	 	 ProdModel.setData(UserObject); 
	 	 ProductionPage.setModel(ProdModel,"usermodel"); 
		  
		   
		 
	 	  
	 	    
	 	    
	    
		}, // end of routematched 
		
		onPressNavToDetail: function () {
			this.getSplitContObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack: function () {
			this.getSplitContObj().backDetail();
		},

		onPressMasterBack: function () {
			this.getSplitContObj().backMaster();
		},

		onPressGoToMaster: function () {
			this.getSplitContObj().toMaster(this.createId("master2"));
		},

		onListItemPress: function (oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
            console.log("sToPageId is "+sToPageId)
            if(sToPageId == "dash"){
            	var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	 			var compressedData = JSON.stringify(UserObject);
			    oRouter.navTo("dashboard",{"value":compressedData});
            }
			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn: function (oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitContObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
		},// ennd of onPressModeBtn 

		getSplitContObj: function () {
			var result = this.byId("SplitContDemo");
			if (!result) {
				Log.error("SplitApp object can't be found");
			}
			return result;
		}, // end of getSplitContObj
		
		 onTablePress:function(evt){
	 		MessageBox.success("Item Pressed");
	 	    var obj = evt.getSource().getCells()[0];
	 	    var index = parseInt(obj.sId.split("-").slice(-1)[0]); 
	 	    var selectedNotifID = evt.getSource().getCells()[0].getText();
	 	    var notificationData = this.getView().byId("idNotificationTable").getModel().getData()["results"]; 
	 	    var selectedRowData = notificationData[index]; 
	 	    
	 	    
	 	     console.log(selectedRowData)
	 	    
	 	    
	 	    
	 	  
	 
	 	    var oPage = this.getView().byId("detailDetail")
	 	    var oModel = new sap.ui.model.json.JSONModel(); 
	 	    oModel.setData(selectedRowData); 
	 	    oPage.setModel(oModel,"notifymodel"); 
	 	    
	 	    // console.log(this.getView().byId("detailDetail").getModel("notifymodel").getData()); 
	 	     this.getSplitContObj().to(this.createId("detailDetail"));
	 	  
	 	 
	 	  
	 	  
	 	
	 }, // end of on table press    
	 
	 onProdTablePress:function(evt){
	 	MessageBox.success("Item Pressed");
	 	    var obj = evt.getSource().getCells()[0];
	 	    var index = parseInt(obj.sId.split("-").slice(-1)[0]); 
	 	    var selectedNotifID = evt.getSource().getCells()[0].getText();
	 	    var notificationData = this.getView().byId("idProductionTable").getModel().getData()["results"]; 
	 	    var selectedRowData = notificationData[index]; 
	 	    
	 	    
	 	     console.log(selectedRowData)
	 	    
	 	    
	 	    
	 	  
	 
	 	    var oPage = this.getView().byId("detail3")
	 	    var oModel = new sap.ui.model.json.JSONModel(); 
	 	    oModel.setData(selectedRowData); 
	 	    oPage.setModel(oModel,"prodmodel"); 
	 	    
	 	    // console.log(this.getView().byId("detailDetail").getModel("notifymodel").getData()); 
	 	     this.getSplitContObj().to(this.createId("detail3"));
	 	  
	 	
	 }, // end of on product table press
	 
	 	onFilterSelect: function (oEvent) { 
	 		 var oBinding = this.byId("idNotificationTable").getBinding("items") ; 
	 		  var aFilters = [];
	 		  var sKey = oEvent.getParameter("key"); 
	 		  	
	 		  if(sKey == "Prodord"){
	 		  		this.getSplitContObj().to(this.createId("detail2"));
	 		  }
	 	
	 	else if(sKey === "Profile"){
	 		this.getSplitContObj().to(this.createId("detail2"));
	 	}
	 	
	 	else if(sKey === "dashboard"){
	 			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	 			var compressedData = JSON.stringify(UserObject);
			   oRouter.navTo("dashboard",{"value":compressedData});
	 	}
	 	
	 	else if(sKey === "production"){ 
	 	
	    
	    var ProductionModel = new sap.ui.model.json.JSONModel();  
	    
	     ProductionModel.setData({
	    	"results":RiskSet
	    });// end of set data function  
	    
	    this.getView().byId("idProductionTable").setModel(ProductionModel); 
	    
	    UserObject["RiskCount"] = RiskSet.length;
	    UserObject["RsortCount"] = ""; 
	    var FirstPage = this.getView().byId("detail2")
	 	    var FPModel = new sap.ui.model.json.JSONModel(); 
	 	    FPModel.setData(UserObject); 
	 	    FirstPage.setModel(FPModel,"usermodel");  
	     
		  
	 	}
	 	
	 	else if (sKey === "Plorder"){ 
	    UserObject["SortCount"] = ""; 
	    UserObject["IncidentCount"] = IncidentSet.length; 
	 	var NotificationModel = new sap.ui.model.json.JSONModel();  
	    
	    NotificationModel.setData({
	    	"results":IncidentSet
	    });// end of set data function  
	    
	     this.getView().byId("idNotificationTable").setModel(NotificationModel); 
	       
	    
	        var FirstPage = this.getView().byId("detail")
	 	    var FPModel = new sap.ui.model.json.JSONModel(); 
	 	    FPModel.setData(UserObject); 
	 	    FirstPage.setModel(FPModel,"usermodel");   
	 	    this.getSplitContObj().to(this.createId("detail"));
	 	}
	 	else if (sKey === "inmonyrsort"){ 
	 		IncSortFlag = 1 ; 
	 		RiskSortFlag = 0; 
	 		if(! this.monthDialog){
	 		this.monthDialog = sap.ui.xmlfragment("COM.EHSMPORTALEHSMPORTAL.fragments.MONTHPICKER",this);  
	 		 this.getView().addDependent(this.monthDialog);
	 		}
	 		this.monthDialog.open();  
	 	}
	 	else if (sKey === "riskmonyrsorter"){
	 		IncSortFlag = 0 ; 
	 		RiskSortFlag = 1; 
	 		if(! this.monthDialog){
	 		this.monthDialog = sap.ui.xmlfragment("COM.EHSMPORTALEHSMPORTAL.fragments.MONTHPICKER",this);  
	 		 this.getView().addDependent(this.monthDialog);
	 		}
	 		this.monthDialog.open();  
	 	}
	 	
	 	
	 	
	 	else if (sKey === "Logout"){
	 		var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			oRouter.navTo("");
	 	}//end of else if 
	 	
	 	  
	   oBinding.filter(aFilters);
	 		
	 	},// end of onFilterSelect 
	    
	    onMonthClose:function(evt){
	    	
	     this.monthDialog.close();
	    	
	    },//end of onMonthClose 
	    
	    onMonthSelect:function(evt){ 
	    	this.monthDialog.close();
	    	var date = sap.ui.getCore().byId("month").getValue();  
	    	console.log("hello")
	    	console.log(date)
	    	var datearr = date.split("-"); 
	    	var year = datearr[0]; 
	    	var month = parseInt(datearr[1]);  
	    	
	    	console.log(year,month)
	    	
	    	var tempRec=[]
	    	var Rec=[]
	    	var field = ""
	    	if(IncSortFlag == 1){
               Rec = IncidentSet ; 
               field = 'E'
	    	}
	    	else{
	    		Rec = RiskSet ; 
	    		field = 'A'
	    	}
	    	
	    	
	    	Rec.forEach(function(Item){  
	    		var rowdate = "";
	    		if(field === 'E')
	    		rowdate=Item.Evdat
	    		else 
	    		rowdate = Item.Planenddat       
	    		var rowyear="" ; 
	    		var rowmonth=-1;
	    	
	    		
	    		if(rowdate!=null && rowdate!=undefined){
	    		 rowyear = rowdate.getFullYear().toString() ; 
	    		 rowmonth = parseInt(rowdate.getMonth())   
	    		 
	    	
	    		}
	    		else{
	    			rowmonth = -2; 
	    			rowyear = "";
	    		}
	    		
	    		console.log(rowmonth,rowyear)
	    	
	    		
	    	
	        	
	        	if(rowmonth+1 === month && rowyear===year){
	        		tempRec.push(Item)
	        	}
	    	}); 
	    	
	    	console.log(Rec)
	    	console.log(tempRec);
	    	
	    	if(IncSortFlag ===1 ){
	    	var NotificationModel = new sap.ui.model.json.JSONModel();  
	    
	        NotificationModel.setData({
	    	"results":tempRec 
	    });// end of set data function  
	    
	    this.getView().byId("idNotificationTable").setModel(NotificationModel);
	    console.log(this.getView().byId("idNotificationTable").getModel());   
	    
	    UserObject["IncidentCount"] = ""; 
	    UserObject["SortCount"] = tempRec.length; 
	    UserObject["RsortCount"] = "" 
	    
	     
	    
	    	}
	    	
	    else{
	    	 var ProductionModel = new sap.ui.model.json.JSONModel();  
	    
	    ProductionModel.setData({
	    	"results":tempRec
	    });// end of set data function  
	    
	    this.getView().byId("idProductionTable").setModel(ProductionModel); 
	    UserObject["IncidentCount"] = ""; 
	    UserObject["SortCount"] = "";
	    UserObject["RsortCount"] = tempRec.length 
	    UserObject["RiskCount"] = ""
	    } 
	    
	    
	        var FirstPage = this.getView().byId("detail2")
	 	    var FPModel = new sap.ui.model.json.JSONModel(); 
	 	    FPModel.setData(UserObject); 
	 	    FirstPage.setModel(FPModel,"usermodel");  
	    
	    	
	    	
	    	
	    }             
	    

	
	
	}); 
	
});