sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
    
    
   
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    
    function (Controller,History) {
        "use strict";

        return Controller.extend("project18.controller.Product", {
            
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Product").attachPatternMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function(oEvent){
                var sordersId = oEvent.getParameter("arguments").ordersId;
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oBusyDailog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please wait......"
                });
                oBusyDailog.open();
               
                var oFilter = new sap.ui.model.Filter("OrderID","EQ",sordersId);
                oModel.read("/Order_Details",{
                    filters:[oFilter],
                    success: function(response){
                        oBusyDailog.close();
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel,"ProductModel");
                    }.bind(this),
                    error: function(error){
                        oBusyDailog.close();
                        
                    }                   
                });
            },
            
            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
              
                if (sPreviousHash !== undefined) {
                  window.history.go(-1);
                } else {
                  var oRouter = this.getOwnerComponent().getRouter();
                  oRouter.navTo("view1", {}, true);
                }
            
              }
            
              
           

        });
    })