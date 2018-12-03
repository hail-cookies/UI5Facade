/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.require([
    "sap/m/Shell",
    "sap/ui/core/ComponentContainer"
], function(
    Shell,
    ComponentContainer
) {
    "use strict";
    sap.ui.getCore().attachInit(function() {
        new Shell({
            app : new ComponentContainer({
                height : "100%",
                name : "manageApps",
                settings : {
                    id : "manageApps"
                }
            })
        }).placeAt("content");
    });
});