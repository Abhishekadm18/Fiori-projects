sap.ui.define([
    "sap/ui/core/mvc/Controller",
   
    
],
    function (Controller) {
        "use strict";

        return Controller.extend("project17.controller.View2", {
            onInit: function () {
                this.onReadEmpData();

            },
            onReadEmpData: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oModel.read("/Employees",{
                    urlParameters:{
                        "$expand": "department"
                    },
                    

                    success: function (response) {
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel, "EmployeeDataModel2");
                    }.bind(this),
                    error: function (error) {

                    }
                });
            },
            
            onNavBack: function () {
                var oHistory = sap.ui.core.routing.History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
           
                if (sPreviousHash !== undefined) {
                  window.history.go(-1);
                } else {
                  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                  oRouter.navTo("view1", {}, true);
                }
              }
            

        });
    });
