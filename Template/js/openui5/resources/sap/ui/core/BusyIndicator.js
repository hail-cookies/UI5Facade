/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../base/EventProvider','./Popup','./Core','./BusyIndicatorUtils'],function(q,E,P,C,B){"use strict";var a=q.extend(new E(),{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1000,sDOM_ID:"sapUiBusyIndicator"});a.M_EVENTS={Open:"Open",Close:"Close"};a._bShowIsDelayed=undefined;a._init=function(){var r=document.createElement("div");r.id=this.sDOM_ID;var b=document.createElement("div");this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");var t=this._oResBundle.getText("BUSY_TEXT");delete this._oResBundle;b.className="sapUiBusy";b.setAttribute("tabindex","0");b.setAttribute("role","progressbar");b.setAttribute("alt","");b.setAttribute("title",t);r.appendChild(b);var o=B.getElement("Big");o.setAttribute("title",t);r.appendChild(o);var i=sap.ui.getCore().getStaticAreaRef();i.appendChild(r);this.oDomRef=r;this.oPopup=new P(r);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false);this.oPopup.attachOpened(function(e){this._onOpen(e);},this);};a._onOpen=function(e){var d=q.sap.domById(a.sDOM_ID);d.style.height="100%";d.style.width="100%";var A=d.querySelector(".sapUiLocalBusyIndicator");A.className+=" sapUiLocalBusyIndicatorFade";q.sap.focus(d);q("body").attr("aria-busy",true);this.fireOpen({$Busy:this.oPopup._$()});};a.show=function(d){q.sap.log.debug("sap.ui.core.BusyIndicator.show (delay: "+d+") at "+new Date().getTime());if(!document.body||!sap.ui.getCore().isInitialized()){if(a._bShowIsDelayed===undefined){sap.ui.getCore().attachInit(function(){if(a._bShowIsDelayed){a.show(d);}});}a._bShowIsDelayed=true;return;}if((d===undefined)||((d!=0)&&(parseInt(d,10)==0))||(parseInt(d,10)<0)){d=this.iDEFAULT_DELAY_MS;}if(q.sap.fesr.getActive()){this._fDelayedStartTime=q.sap.now()+d;}if(!this.oDomRef){this._init();}this.bOpenRequested=true;if(d===0){this._showNowIfRequested();}else{q.sap.delayedCall(d,this,"_showNowIfRequested");}};a._showNowIfRequested=function(){q.sap.log.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+new Date().getTime());if(!this.bOpenRequested){return;}var o=(window.scrollX===undefined?window.pageXOffset:window.scrollX);var O=(window.scrollY===undefined?window.pageYOffset:window.scrollY);var s=o+" "+O;this.bOpenRequested=false;this.oPopup.open(0,P.Dock.LeftTop,P.Dock.LeftTop,document,s);};a.hide=function(){q.sap.log.debug("sap.ui.core.BusyIndicator.hide at "+new Date().getTime());if(this._fDelayedStartTime){var b=q.sap.now()-this._fDelayedStartTime;q.sap.fesr.addBusyDuration((b>0)?b:0);delete this._fDelayedStartTime;}var c=a;if(a._bShowIsDelayed===true){a._bShowIsDelayed=false;}c.bOpenRequested=false;if(c.oDomRef){q("body").removeAttr("aria-busy");var A=c.oDomRef.querySelector(".sapUiLocalBusyIndicator");q(A).removeClass("sapUiLocalBusyIndicatorFade");this.fireClose({$Busy:this.oPopup._$()});c.oPopup.close(0);}};a.attachOpen=function(f,l){this.attachEvent(a.M_EVENTS.Open,f,l);return this;};a.detachOpen=function(f,l){this.detachEvent(a.M_EVENTS.Open,f,l);return this;};a.attachClose=function(f,l){this.attachEvent(a.M_EVENTS.Close,f,l);return this;};a.detachClose=function(f,l){this.detachEvent(a.M_EVENTS.Close,f,l);return this;};a.fireOpen=function(p){this.fireEvent(a.M_EVENTS.Open,p);};a.fireClose=function(p){this.fireEvent(a.M_EVENTS.Close,p);};return a;},true);
