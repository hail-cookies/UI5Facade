/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/security/encodeXML"],function(e){"use strict";var M=5;var H={};H.render=function(r,h){var l=sap.ui.getCore().getConfiguration().getLocale().getLanguage();var t=h.getTooltip_AsString();var I=h.getId();var a={};var L=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("CALENDAR_BTN_NEXT");var s=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("CALENDAR_BTN_PREV");r.write("<div");r.writeControlData(h);r.addClass("sapUiCalHead");r.writeClasses();if(t){r.writeAttributeEscaped('title',t);}r.writeAccessibilityState(h);r.write(">");r.write("<button");r.writeAttributeEscaped('id',I+'-prev');r.writeAttributeEscaped("title",s);r.writeAccessibilityState(null,{label:s});r.addClass("sapUiCalHeadPrev");if(!h.getEnabledPrevious()){r.addClass("sapUiCalDsbl");r.writeAttribute('disabled',"disabled");}r.writeAttribute('tabindex',"-1");r.writeClasses();r.write(">");r.writeIcon("sap-icon://slim-arrow-left",null,{title:null});r.write("</button>");var f=-1;var b=-1;var i=0;var B;for(i=0;i<M;i++){if(this.getVisibleButton(h,i)){if(f<0){f=i;}b=i;}}for(i=0;i<M;i++){if(l.toLowerCase()==="ja"||l.toLowerCase()==="zh"){B=M-1-i;}else{B=i;}this.renderCalendarButtons(r,h,I,f,b,a,B);}r.write("<button");r.writeAttributeEscaped('id',I+'-next');r.writeAttributeEscaped("title",L);r.writeAccessibilityState(null,{label:L});r.addClass("sapUiCalHeadNext");if(!h.getEnabledNext()){r.addClass("sapUiCalDsbl");r.writeAttribute('disabled',"disabled");}r.writeAttribute('tabindex',"-1");r.writeClasses();r.write(">");r.writeIcon("sap-icon://slim-arrow-right",null,{title:null});r.write("</button>");r.write("</div>");};H.renderCalendarButtons=function(r,h,I,f,l,a,i){if(this.getVisibleButton(h,i)){r.write("<button");r.writeAttributeEscaped('id',I+'-B'+i);r.addClass("sapUiCalHeadB");r.addClass("sapUiCalHeadB"+i);if(f==i){r.addClass("sapUiCalHeadBFirst");}if(l==i){r.addClass("sapUiCalHeadBLast");}r.writeAttribute('tabindex',"-1");r.writeClasses();if(this.getAriaLabelButton(h,i)){a["label"]=e(this.getAriaLabelButton(h,i));}r.writeAccessibilityState(null,a);a={};r.write(">");var t=this.getTextButton(h,i)||"";var A=this.getAdditionalTextButton(h,i)||"";if(A){r.write("<span");r.writeAttributeEscaped('id',I+'-B'+i+"-Text");r.addClass("sapUiCalHeadBText");r.writeClasses();r.write(">");r.writeEscaped(t);r.write("</span>");r.write("<span");r.writeAttributeEscaped('id',I+'-B'+i+"-AddText");r.addClass("sapUiCalHeadBAddText");r.writeClasses();r.write(">");r.writeEscaped(A);r.write("</span>");}else{r.writeEscaped(t);}r.write("</button>");}};H.getVisibleButton=function(h,b){var v=false;if(h["getVisibleButton"+b]){v=h["getVisibleButton"+b]();}else if(h["_getVisibleButton"+b]){v=h["_getVisibleButton"+b]();}return v;};H.getAriaLabelButton=function(h,b){var a;if(h["getAriaLabelButton"+b]){a=h["getAriaLabelButton"+b]();}else if(h["_getAriaLabelButton"+b]){a=h["_getAriaLabelButton"+b]();}return a;};H.getTextButton=function(h,b){var t;if(h["getTextButton"+b]){t=h["getTextButton"+b]();}else if(h["_getTextButton"+b]){t=h["_getTextButton"+b]();}return t;};H.getAdditionalTextButton=function(h,b){var t;if(h["getAdditionalTextButton"+b]){t=h["getAdditionalTextButton"+b]();}else if(h["_getAdditionalTextButton"+b]){t=h["_getAdditionalTextButton"+b]();}return t;};return H;},true);
