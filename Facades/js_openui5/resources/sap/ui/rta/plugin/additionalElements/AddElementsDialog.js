/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/m/Label","sap/m/Dialog","sap/ui/model/json/JSONModel","sap/m/SearchField","sap/m/Button","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/List","sap/m/CustomListItem","sap/m/ScrollContainer","sap/ui/model/Sorter","sap/base/Log","sap/m/VBox","sap/ui/rta/Utils","sap/m/library"],function(M,L,D,J,S,B,T,a,F,b,c,d,e,f,g,V,U,m){"use strict";var h=m.ListType;var i=m.LabelDesign;var A=M.extend("sap.ui.rta.plugin.additionalElements.AddElementsDialog",{metadata:{library:"sap.ui.rta",properties:{customFieldEnabled:{type:"boolean",defaultValue:false},title:{type:"string"}},events:{opened:{},openCustomField:{}}}});A.prototype.init=function(){this._oTextResources=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");this._bAscendingSortOrder=false;this._oDialog=new D().addStyleClass("sapUIRtaFieldRepositoryDialog");this._oDialog.addStyleClass(U.getRtaStyleClassName());this._oDialog.removeStyleClass("sapUiPopupWithPadding");this._oDialog.setModel(new J({elements:[]}));var C=this._createContent();var j=this._createButtons();C.forEach(function(o){this._oDialog.addContent(o);},this);j.forEach(function(o){this._oDialog.addButton(o);},this);this._oDialog.setInitialFocus(this._oInput);};A.prototype.exit=function(){this._oDialog.destroy();};A.prototype._createContent=function(){this._oInput=new S({width:"100%",liveChange:[this._updateModelFilter,this]});var r=new B({text:"",icon:"sap-icon://sort",press:[this._resortList,this]});this._oCustomFieldButton=new B({text:"",icon:"sap-icon://add",tooltip:this._oTextResources.getText("BTN_FREP_CCF"),enabled:this.getCustomFieldEnabled(),press:[this._redirectToCustomFieldCreation,this]});this._oToolbarSpacer1=new a();this.oInputFields=new T({content:[this._oInput,r,this._oToolbarSpacer1,this._oCustomFieldButton]});var o=new L({design:i.Standard,tooltip:"{tooltip}",text:{parts:[{path:"label"},{path:"referencedComplexPropertyName"},{path:"duplicateComplexName"}],formatter:function(n,R,p){if(p&&R){n+=" ("+R+")";}return n;}}});var j=new L({text:{parts:[{path:"originalLabel"}],formatter:function(O){if(O){return this._oTextResources.getText("LBL_FREP",O);}return"";}.bind(this)},visible:{parts:[{path:"originalLabel"}],formatter:function(O){if(O){return true;}return false;}}});var v=new V();v.addItem(o);v.addItem(j);var s=new f("label",this._bAscendingSortOrder);this._oList=new c({mode:"MultiSelect",includeItemInSelection:true,growing:true,growingScrollToLoad:true}).setNoDataText(this._oTextResources.getText("MSG_NO_FIELDS",this._oTextResources.getText("MULTIPLE_CONTROL_NAME").toLowerCase()));var l=new d({type:h.Active,selected:"{selected}",content:[v]});this._oList.bindItems({path:"/elements",template:l,sorter:s,key:function(C){switch(C.getProperty("type")){case"invisible":return C.getProperty("elementId");case"odata":return C.getProperty("name");case"custom":return C.getProperty("key");default:g.error("sap.ui.rta.plugin.additionalElements.AddElementsDialog#_createContent: unsupported data type");}}});var k=new e({content:this._oList,vertical:true,horizontal:false}).addStyleClass("sapUIRtaCCDialogScrollContainer");return[this.oInputFields,k];};A.prototype._createButtons=function(){this._oOKButton=new B({text:this._oTextResources.getText("BTN_FREP_OK"),press:[this._submitDialog,this]});var C=new B({text:this._oTextResources.getText("BTN_FREP_CANCEL"),press:[this._cancelDialog,this]});return[this._oOKButton,C];};A.prototype._submitDialog=function(){this._oDialog.close();this._fnResolve();};A.prototype._cancelDialog=function(){this._oList.removeSelections();this._oDialog.close();this._fnReject();};A.prototype.setElements=function(E){this._oDialog.getModel().setProperty("/elements",E);};A.prototype.getElements=function(){return this._oDialog.getModel().getProperty("/elements");};A.prototype.getSelectedElements=function(){return this._oDialog.getModel().getObject("/elements").filter(function(E){return E.selected;});};A.prototype.open=function(){return new Promise(function(r,j){this._fnResolve=r;this._fnReject=j;this._oDialog.attachAfterOpen(function(){this.fireOpened();}.bind(this));this._oDialog.open();}.bind(this));};A.prototype._resortList=function(){this._bAscendingSortOrder=!this._bAscendingSortOrder;var o=this._oList.getBinding("items");var s=[];s.push(new f("label",this._bAscendingSortOrder));o.sort(s);};A.prototype._updateModelFilter=function(E){var v=E.getParameter("newValue");var o=this._oList.getBinding("items");if((typeof v)==="string"){var j=new F("label",b.Contains,v);var O=new F("originalLabel",b.Contains,v);var r=new F("referencedComplexPropertyName",b.Contains,v);var k=new F("duplicateComplexName",b.EQ,true);var C=new F({filters:[r,k],and:true});var l=new F({filters:[j,O,C],and:false});o.filter([l]);}else{o.filter([]);}};A.prototype._redirectToCustomFieldCreation=function(){this.fireOpenCustomField();this._oDialog.close();};A.prototype.setTitle=function(t){M.prototype.setProperty.call(this,"title",t,true);this._oDialog.setTitle(t);};A.prototype.setCustomFieldEnabled=function(C){this.setProperty("customFieldEnabled",C,true);this._oCustomFieldButton.setEnabled(this.getProperty("customFieldEnabled"));};A.prototype.getList=function(){return this._oList;};return A;},true);
