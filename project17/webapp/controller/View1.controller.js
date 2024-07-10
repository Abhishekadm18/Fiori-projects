sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    function (Controller, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("project17.controller.View1", {
            onInit: function () {
                this.onReadEmpData();

            },
            onReadEmpData: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oModel.read("/Employees", {
                
                    success: function (response) {
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel, "EmployeeDataModel");
                    }.bind(this),
                    error: function (error) {

                    }
                });
            },
            onCreate: function () {
                var oView = this.getView();
                if (!this.byId("helloDialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "project17.view.Dialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this.byId("helloDialog").open();
                }
            },
            
            

            savedata: function () {

                var that = this;
                that.onReadEmpData();


                const myUniversallyUniqueID = globalThis.crypto.randomUUID();

                var b = this.byId("name2");
                var fname = b.getValue();

                var c = this.byId("name3");
                var fmail = c.getValue();
                

                var a = this.byId("name1");
                var fmana = a.getValue();
                

                var d = this.byId("name41");
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
            onCancel: function () {
                this.byId("helloDialog").close();
                var a = this.byId("name2");
                a.setValue("");
                var b = this.byId("name3");
                b.setValue("");
                var c = this.byId("name1");
                c.setValue("");
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
            onupdate: function () {
                var oView = this.getView();
                if (!this.byId("helloDialog2")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "project17.view.dailog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this.byId("helloDialog2").open();
                }
                var oView = this.getView();
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
            onCancel2: function () {
                this.byId("helloDialog2").close();
                var d = this.byId("uid");
                d.setValue("");
                var a = this.byId("uname");
                a.setValue("");
                var b = this.byId("uemail");
                b.setValue("");
                var c = this.byId("umanager");
                c.setValue("");
            },
            updatedata: function (oEvent) {
                

                var d = this.byId("uid");
                var uid = d.getValue();
                console.log(uid);
                var a = this.byId("uname");
                var uname = a.getValue();
                var b = this.byId("uemail");
                var uemail = b.getValue();
                var c = this.byId("umanager");
                var umanager = c.getValue();
                // var d = this.byId("department2");
                // var udepartment = c.getValue();

                var urecord = {
                    "ID": uid,
                    "createdAt": null,
                    "createdBy": null,
                    "modifiedAt": null,
                    "modifiedBy": null,
                    "name": uname,
                    "email_id": uemail,
                    "manager": umanager,
                    // "department/dep_name": udepartment
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
            },
            
            onNavToDetails: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View2");
            },
        });
    });
