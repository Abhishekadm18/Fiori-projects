sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("project19.controller.Master", {
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
                        // oBusyDailog.close();
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel, "EmployeeDataModel");
                    }.bind(this),
                    error: function (error) {
                        // oBusyDailog.close();

                    }
                });
            },
            onCreate: function () {
                var oView = this.getView();

                // Show the appropriate action buttons
                oView.byId("Table").setVisible(false);
                oView.byId("From").setVisible(true);

            },

            onCancel: function () {
                var oView = this.getView();

                // Show the appropriate action buttons
                oView.byId("Table").setVisible(true);
                oView.byId("From").setVisible(false);

                var a = this.byId("name");
                a.setValue("");
                var b = this.byId("emailid");
                b.setValue("");
                var c = this.byId("managerjh");
                c.setValue("");
                var c = this.byId("department");
                c.setValue("");
            },
            
            onupdate: function (oEvent) {
                var oView = this.getView();
                // Show the appropriate action buttons

                oView.byId("Table").setVisible(false);
                oView.byId("From2").setVisible(true);

                var oTable = this.getView().byId("Table");
                var aSelectedItems = oTable.getSelectedItems();
                var na = aSelectedItems[0].getBindingContext("EmployeeDataModel").getObject().ID;
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oFilter = new sap.ui.model.Filter("ID", "EQ", na);
                oModel.read("/Employees", {

                    filters: [oFilter],
                    success: function (resp) {
                        oJSONModel.setData(resp.results);
                        this.getView().setModel(oJSONModel, "newemp");
                    }.bind(this),
                    error: function (error) {

                    }
                })

            },
            onCancelupdate: function () {
                var oView = this.getView();

                // Show the appropriate action buttons
                oView.byId("Table").setVisible(true);
                oView.byId("From2").setVisible(false);
                
                var d = this.byId("uid");
                d.setValue("");
                var a = this.byId("uname");
                a.setValue("");
                var b = this.byId("uemail");
                b.setValue("");
                var c = this.byId("umanager");
                c.setValue("");
                var c = this.byId("udepartment");
                c.setValue("SAP-ABAP");
            },

            

            onSave: function () {

                var that = this;
                that.onReadEmpData();
                

                const myUniversallyUniqueID = globalThis.crypto.randomUUID();
                
                var b = this.byId("name");
                var fname = b.getValue();
                
                var c = this.byId("emailid");
                var fmail = c.getValue();
                console.log(fmail);

                var a = this.byId("managerjh");
                var fmana = a.getValue();
                console.log(fmana);

                var d = this.byId("department");
                var fdept = d.getSelectedKey();


                var record = {
                    "ID": myUniversallyUniqueID,
                    "name": fname,
                    "email_id": fmail,
                    "manager": fmana,
                    "department_ID": fdept
                }

                console.log(record);
                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/v2/odata/v4/employee-services/Employees",
                    data: JSON.stringify(record),
                    success: function (data) {
                        MessageBox.success("Data saved to local database successfully!");
                        that.onCancel();
                        that.onReadEmpData();
                    },
                    error: function (err) {
                        MessageBox.error("Error saving data to local database: " + err.responseText);
                    }
                });

            },

            onDelete: function (oEvent) {

                var oTable = this.getView().byId("Table");
                var aSelectedItems = oTable.getSelectedItems();
                var that = this;

                that.onReadEmpData();

                aSelectedItems.forEach(function (oItem) {

                    var oContext = oItem.getBindingContext("EmployeeDataModel");
                    var oData = oContext.getObject();
                    var oModel = that.getOwnerComponent().getModel();

                    //console.log(oData); 

                    oModel.remove("/Employees(" + oData.ID + ")", {
                        success: function (response) {

                            that.onReadEmpData();
                        }.bind(this),
                        error: function (error) {

                        }
                    });

                    MessageBox.alert("Your DATA is Successfully Deleted.");

                });
            },
            onupdatesave: function (oEvent) {
                

                var d = this.byId("uid");
                var uid = d.getValue();
                console.log(uid);
                var a = this.byId("uname");
                var uname = a.getValue();
                var b = this.byId("uemail");
                var uemail = b.getValue();
                var c = this.byId("umanager");
                var umanager = c.getValue();
                var d = this.byId("udepartment");
                var udepartment = c.getValue();

                var urecord = {
                    "ID": uid,
                    "createdAt": null,
                    "createdBy": null,
                    "modifiedAt": null,
                    "modifiedBy": null,
                    "name": uname,
                    "email_id": uemail,
                    "manager": umanager,
                    "department/dep_name": udepartment
                }
                
                var that = this;
                that.onReadEmpData();
                

                jQuery.ajax({
                    type: "PUT",
                    contentType: "application/json",
                    url: "/v2/odata/v4/employee-services/Employees(" + uid + ")",
                    data: JSON.stringify(urecord),
                    success: function (data) {
                        MessageBox.success("Data Updated successfully!");
                        //window.location.reload();
                        that.onCancelupdate();
                        that.onReadEmpData();
                    },
                    error: function (err) {
                        MessageBox.error("Error Updating data: " + err.responseText);
                    }
                });
            }
        });
    });
