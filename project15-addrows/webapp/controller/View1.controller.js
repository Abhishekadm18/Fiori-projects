sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project15addrows.controller.View1", {
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
                    this.getView().setModel(oJSONModel, "EmployeeDataModel");
                }.bind(this),
                error: function (error) {
                   

                }
            });
        },
        onAdd: function (oEvent) {                               //to add a new row
            var oItem = new sap.m.ColumnListItem({
               cells: [new sap.m.Input(),new sap.m.Input(),new sap.m.Input(), new sap.m.Input(), new sap.m.Input({
                   showValueHelp: true

               }), ]
           });

           var oTable = this.getView().byId("tableId1");
           oTable.addItem(oItem);
        },
        deleteRow: function (oEvent) {
			var oTable = this.getView().byId("tableId1");
			oTable.removeItem(oEvent.getParameter("listItem"));
		},
    });
});
