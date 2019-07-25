/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/fl/registry/ChangeRegistry","sap/ui/fl/FlexControllerFactory","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Element","sap/ui/base/ManagedObject","sap/base/util/includes","sap/ui/fl/variants/VariantManagement","sap/ui/core/Component","sap/ui/thirdparty/jquery"],function(U,C,F,J,E,M,i,V,a,q){"use strict";var b="sap-ui-fl-control-variant-id";var c={_determineParameters:function(o){var A=U.getAppComponentForControl(o);var f=F.createForControl(A);var r=A.getRootControl();var v=U.getViewForControl(o);var d=A.getModel(U.VARIANT_MODEL_NAME);var p={rootControl:r,view:v,variantModel:d,variantManagement:{},flexController:f};var e;var g;q.makeArray(p.rootControl.$().find(".sapUiFlVarMngmt")).map(function(h){e=sap.ui.getCore().byId(h.id);if(e.getMetadata().getName()==="sap.ui.fl.variants.VariantManagement"){g=e.getFor();g.forEach(function(s){p.variantManagement[s]=p.variantModel.getLocalId(h.id,A);});}});return p;},_getVariantManagement:function(o,p){p=p||this._determineParameters(o);var f=function(o){if(!p.variantManagement[o.getId()]&&o.getParent()&&o.getId()!==p.rootControl.getId()){return f(o.getParent());}else if(!o.getParent()||o.getId()===p.rootControl.getId()){return p.variantManagement[o.getId()]||"";}return p.variantManagement[o.getId()];};return f(o);},clearVariantParameterInURL:function(o){var u=[];var A=U.getAppComponentForControl(o);var v=A instanceof a?A.getModel(U.VARIANT_MODEL_NAME):undefined;if(!v){U.setTechnicalURLParameterValues(undefined,b,u);return U.log.warning("Variant model could not be found on the provided control");}if(o instanceof V){var s=v.getLocalId(o.getId(),A);var m=v.getVariantIndexInURL(s);if(m.index>-1){m.parameters[b].splice(m.index,1);u=m.parameters[b].slice(0);}}v.updateHasherEntry({parameters:u,updateURL:true,component:A});},activateVariant:function(e,v){var o;return Promise.resolve().then(function(){if(typeof e==='string'||e instanceof String){o=a.get(e);if(!(o instanceof a)){o=sap.ui.getCore().byId(e);if(!(o instanceof E)){throw new Error("No valid component or control found for the provided ID");}}}else if(e instanceof a||e instanceof E){o=e;}var A=U.getAppComponentForControl(o);if(!A){throw new Error("A valid variant management control or component (instance or ID) should be passed as parameter");}var d=A.getModel(U.VARIANT_MODEL_NAME);if(!d){throw new Error("No variant management model found for the passed control or application component");}var s=d.getVariantManagementReference(v).variantManagementReference;if(!s){throw new Error("A valid control or component, and a valid variant/ID combination are required");}return d.updateCurrentVariant(s,v,A);})["catch"](function(d){U.log.error(d);return Promise.reject(d);});},_checkChangeSpecificData:function(o,l){return Promise.resolve().then(function(){if(!o.changeSpecificData){throw new Error("No changeSpecificData available");}if(!o.changeSpecificData.changeType){throw new Error("No valid changeType");}if(!(o.selectorControl instanceof E)){throw new Error("No valid selectorControl");}var s=o.selectorControl.getMetadata().getName();var d=C.getInstance();return d.getChangeHandler(o.changeSpecificData.changeType,s,o.selectorControl,J,l);}).then(function(d){if(!d){throw new Error("No valid ChangeHandler");}if(!d.revertChange){throw new Error("ChangeHandler has no revertChange function");}});},addPersonalizationChanges:function(p){var s=[];var l=U.getCurrentLayer(true);var P=[];p.controlChanges.forEach(function(o){var m={};Object.assign(m,{developerMode:false,layer:l});function f(){return this._checkChangeSpecificData(o,l).then(function(){var d=this._determineParameters(o.selectorControl);if(!p.ignoreVariantManagement){if(!o.changeSpecificData.variantReference){var v=this._getVariantManagement(o.selectorControl,d);if(v){var e=d.variantModel.oData[v].currentVariant;o.changeSpecificData.variantReference=e;}}}else{delete o.changeSpecificData.variantReference;}return d.flexController.createAndApplyChange(Object.assign(m,o.changeSpecificData),o.selectorControl);}.bind(this)).then(function(A){s.push(A);}).catch(function(e){return Promise.reject({change:o,message:e.message});});}P.push(f.bind(this));}.bind(this));return U.execPromiseQueueSequentially(P).then(function(){return s;});},isPersonalized:function(d,e){if(!d||d.length===0){return this._reject("At least one control ID has to be provided as a parameter");}var A=d[0].appComponent||U.getAppComponentForControl(d[0]);if(!A){return this._reject("App Component could not be determined");}var I=d.map(function(o){return o.id||o.getId();});var f=F.createForControl(A);return f.getComponentChanges({currentLayer:"USER",includeCtrlVariants:true}).then(function(g){return g.filter(this._filterBySelectors.bind(this,A,I)).filter(this._filterByChangeType.bind(this,e)).some(this._ifValidFileType);}.bind(this));},_reject:function(m){U.log.error(m);return Promise.reject(m);},_filterBySelectors:function(A,I,o){var s=o.getSelector();var d=J.getControlIdBySelector(s,A);return i(I,d);},_filterByChangeType:function(d,o){return(Array.isArray(d)&&d.length>0)?i(d,o.getChangeType()):true;},_ifValidFileType:function(o){return o.getFileType()==="change";},resetChanges:function(d,e){if(!d||d.length===0){return this._reject("At least one control ID has to be provided as a parameter");}var A=d[0].appComponent||U.getAppComponentForControl(d[0]);if(!A){return this._reject("App Component could not be determined");}var s=d.map(function(v){var g=v.id||v.getId();var l=A.getLocalId(g);return l||g;});var f=F.createForControl(A);return f.resetChanges("USER",undefined,A,s,e);},saveChanges:function(d,m){if(!(m instanceof M)){var e="A valid sap.ui.base.ManagedObject instance is required as a parameter";U.log.error(e);return Promise.reject(e);}var p=c._determineParameters(m);var v=Object.keys(p.variantManagement).reduce(function(r,s){return r.concat([p.variantManagement[s]]);},[]);return p.flexController.saveSequenceOfDirtyChanges(d).then(function(r){p.variantModel.checkDirtyStateForControlModels(v);return r;});},hasVariantManagement:function(o){try{return!!this._getVariantManagement(o);}catch(e){U.log.error(e.message);return false;}}};return c;},true);
