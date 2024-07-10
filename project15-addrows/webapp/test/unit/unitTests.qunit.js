/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project15-addrows/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
