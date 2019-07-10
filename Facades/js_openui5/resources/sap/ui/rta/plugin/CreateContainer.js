/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/fl/Utils","sap/ui/rta/Utils","sap/ui/dt/Util","sap/base/util/uid"],function(P,F,R,D,u){"use strict";var C=P.extend("sap.ui.rta.plugin.CreateContainer",{metadata:{library:"sap.ui.rta",properties:{},associations:{},events:{}}});C.prototype._isEditable=function(o){return{asSibling:this._isEditableCheck(o,true),asChild:this._isEditableCheck(o,false)};};C.prototype._isEditableCheck=function(o,O){var e=false;var p=this._getParentOverlay(O,o);var a;if(!p||!p.getParentElementOverlay()){return false;}if(O){a=o.getParentAggregationOverlay().getAggregationName();}e=this.checkAggregationsOnSelf(p,"createContainer",a);if(e){var b=F.getViewForControl(p.getElement());return this.hasStableId(o)&&F.checkControlId(b);}return false;};C.prototype._getParentOverlay=function(s,o){var p;if(s){p=o.getParentElementOverlay();}else{p=o;}return p;};C.prototype.getCreateAction=function(s,o){var p=this._getParentOverlay(s,o);var d=p.getDesignTimeMetadata();var a=d.getActionDataFromAggregations("createContainer",o.getElement());return a[0];};C.prototype.isAvailable=function(s,e){return this._isEditableByPlugin(e[0],s);};C.prototype.isEnabled=function(s,e){var E=e[0];var a=this.getCreateAction(s,E);if(!a){return false;}if(a.isEnabled&&typeof a.isEnabled==="function"){var i=a.isEnabled;var p=this._getParentOverlay(s,E);return i(p.getElement());}return true;};C.prototype.getCreatedContainerId=function(a,n){var i=n;if(a.getCreatedContainerId&&typeof a.getCreatedContainerId==="function"){var m=a.getCreatedContainerId;i=m.call(null,n);}return i;};C.prototype._determineIndex=function(p,s,a,g){return R.getIndex(p,s,a,g);};C.prototype._getText=function(a,e,d,t){if(!a){return t;}var A=d.getAggregationDescription(a.aggregation,e);if(!A){return t;}var c=A.singular;var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");return T.getText(t,c);};C.prototype.getCreateContainerText=function(s,o){var a=this.getCreateAction(s,o);var p=this._getParentOverlay(s,o);var d=p.getDesignTimeMetadata();var e=p.getElement();var t="CTX_CREATE_CONTAINER";return this._getText(a,e,d,t);};C.prototype._getContainerTitle=function(a,e,d){var t="TITLE_CREATE_CONTAINER";return this._getText(a,e,d,t);};C.prototype.handleCreate=function(s,o){var a=this.getCreateAction(s,o);var p=this._getParentOverlay(s,o);var b=p.getElement();var d=p.getDesignTimeMetadata();var v=F.getViewForControl(b);var S;if(s){S=o.getElement();}var n=v.createId(u());var g=d.getAggregation(a.aggregation).getIndex;var i=this._determineIndex(b,S,a.aggregation,g);var V=this.getVariantManagementReference(p,a);return this.getCommandFactory().getCommandFor(b,"createContainer",{newControlId:n,label:this._getContainerTitle(a,b,d),index:i,parentId:b.getId()},d,V).then(function(c){this.fireElementModified({command:c,action:a,newControlId:n});}.bind(this)).catch(function(m){throw D.createError("CreateContainer#handleCreate",m,"sap.ui.rta");});};C.prototype.getMenuItems=function(e){var o=true;var p="CTX_CREATE_SIBLING_CONTAINER";var r=40;var m=[];for(var i=0;i<2;i++){if(this.isAvailable(o,e)){var M=this.getCreateContainerText.bind(this,o);m.push({id:p,text:M,handler:this.handler.bind(this,o),enabled:this.isEnabled.bind(this,o),icon:"sap-icon://add-folder",rank:r,group:"Add"});}o=false;p="CTX_CREATE_CHILD_CONTAINER";r=50;}return m;};C.prototype.getActionName=function(){return"createContainer";};C.prototype.handler=function(o,e){this.handleCreate(o,e[0]);};return C;},true);
