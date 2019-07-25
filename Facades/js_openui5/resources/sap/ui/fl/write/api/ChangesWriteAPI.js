/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/ChangesController","sap/ui/fl/descriptorRelated/api/DescriptorInlineChangeFactory","sap/ui/fl/descriptorRelated/api/DescriptorChangeFactory","sap/ui/fl/Utils","sap/ui/core/Component","sap/ui/core/Element","sap/base/util/includes"],function(C,D,a,U,b,E,i){"use strict";var c={create:function(o,s){if(i(D.getDescriptorChangeTypes(),o.changeType)){return D.createDescriptorInlineChange(o.changeType,o.content,o.texts).then(function(A){return new a().createNew(o.reference,A,o.layer,s);}).catch(function(e){U.log.error("the change could not be created.",e.message);throw e;});}var f=C.getFlexControllerInstance(s.appComponent||s);if(s instanceof b){return f.createBaseChange(o,s);}return f.createChange(o,s);},isChangeHandlerRevertible:function(o,s){return C.getFlexControllerInstance(s.appComponent||s).isChangeHandlerRevertible(o,s);},getControlIfTemplateAffected:function(o,p){return C.getFlexControllerInstance(p.appComponent)._getControlIfTemplateAffected(p.change,o,o.getMetadata().getName(),p);},apply:function(o,d,p){var f=C.getFlexControllerInstance(p.appComponent);var e=f.checkForOpenDependenciesForControl(o.getSelector(),p.modifier,p.appComponent);if(!e&&d instanceof E){return f.checkTargetAndApplyChange(o,d,p);}return Promise.reject(new Error("The following Change cannot be applied because of a dependency: "+o.getId()));}};return c;},true);
