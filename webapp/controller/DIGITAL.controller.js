sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/routing/Router"
], function(Controller,Router) {
	"use strict";
		/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-console: "error" */
/* "parser": "@babel/eslint-parser" */

	return Controller.extend("COM.EHSMPORTALEHSMPORTAL.controller.DIGITAL", {
         go:function(){
    	    var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			oRouter.navTo("portfolio");
    }

	});

});