sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
    
    
   
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    
    function (Controller,History) {
        "use strict";

        return Controller.extend("project18.controller.Detail", {
            
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function(oEvent){
                var sCustomerId = oEvent.getParameter("arguments").customerId;
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oBusyDailog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please wait......"
                });
                oBusyDailog.open();
               
                var oFilter = new sap.ui.model.Filter("CustomerID","EQ",sCustomerId);
                oModel.read("/Orders",{
                    filters:[oFilter],
                    success: function(response){
                        oBusyDailog.close();
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel,"OrdersModel");
                    }.bind(this),
                    error: function(error){
                        oBusyDailog.close();
                        
                    }                   
                });
            },
            onNavToDetails: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var sordersId = oEvent.getSource().getCells()[1].getText();
                oRouter.navTo("Product",{ordersId: sordersId});
            },
            onNavBack: function () {
                var oHistory = History.getInstance();   
                var sPreviousHash = oHistory.getPreviousHash();
              
                if (sPreviousHash !== undefined) {
                  window.history.go(-1);
                } else {
                  var oRouter = this.getOwnerComponent().getRouter();
                  oRouter.navTo("View1", {}, true);
                }
            
              }
            
              
           

        });
    })