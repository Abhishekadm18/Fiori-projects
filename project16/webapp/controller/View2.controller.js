sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";
  
  return Controller.extend("project16.controller.View1", {
    onInit: function () {
      this.getView().setModel(new JSONModel({ data: [] }));
    },
    
    onUploadPress: function () {
      this.getView().byId("fileUploader").$().click();
    },
    
    onFileChange: function (oEvent) {
      var oFileUploader = oEvent.getSource();
      var oFile = oEvent.getParameter("files")[0];
      
      if (oFile && window.FileReader) {
        var oReader = new FileReader();
        
        oReader.onload = (e) => {
          var sData = e.target.result;
          var workbook = XLSX.read(sData, { type: 'binary' });
          var firstSheetName = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[firstSheetName];
          var json = XLSX.utils.sheet_to_json(worksheet);
          
          var oModel = this.getView().getModel();
          oModel.setProperty("/data", json);
        };
        
        oReader.readAsBinaryString(oFile);
      }
    }
  });
});