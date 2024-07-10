sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox"



],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */

    function (Controller, JSONModel, Export, ExportTypeCSV, ODataModel, MessageBox) {
        "use strict";

        return Controller.extend("projectbyak.controller.View1", {
            onInit: function () {
                this.onReadEmpData();
            },
            onReadEmpData: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oBusyDailog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please wait......"
                });
                oBusyDailog.open();
                oModel.read("/Customers", {
                    
                    success: function (response) {
                        oBusyDailog.close();
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel, "EmployeeDataModel");
                    }.bind(this),
                    error: function (error) {
                        oBusyDailog.close();

                    }
                });
            },
            // onNavToDetails: function (oEvent) {
            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     var sCustomerId = oEvent.getSource().getCells()[0].getText();
            //     oRouter.navTo("Detail", { customerId: sCustomerId });
            // },
            // onSubmit: function () {
            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.navTo("local2");
            //     console.log("presseed");
            // }, 
            // onSave: function () {
               
            //     var oTable = this.getView().byId("_IDGenTable1");
            //     var aSelectedItems = oTable.getSelectedItems();
            //     var aListData = [];

                
            //     aSelectedItems.forEach(function (oItem) {
            //         var oContext = oItem.getBindingContext("EmployeeDataModel"); 
            //         var oData = oContext.getObject();
            //         var oListItem = {
            //             CustomerID: oData.CustomerID,
            //             CompanyName: oData.CompanyName,
            //             ContactName: oData.ContactName,
            //             ContactTitle: oData.ContactTitle,
            //             Address: oData.Address,
            //             City: oData.City,
            //             PostalCode: oData.PostalCode,
            //             Country: oData.Country,
            //             Phone: oData.Phone
                        
            //         };
            //         aListData.push(oListItem);
            //         jQuery.ajax({
            //             type: "POST",
            //             contentType: "application/json",
            //             url: "/odata/v4/main/Customers",
            //             data: JSON.stringify(oListItem),
            //             success: function (data) {
            //                 MessageBox.success("Data saved to local database successfully!");
            //             },
            //             error: function (err) {
            //                 MessageBox.error("Error saving data to local database: " + err.responseText);
            //             }
            //         });
            //     });

                
                
            // }
            





        });
    })