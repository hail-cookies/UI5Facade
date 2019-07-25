/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/core/library','sap/ui/core/IconPool','sap/m/library','sap/ui/core/InvisibleText',"sap/base/security/encodeXML"],function(D,c,I,l,a,e){"use strict";var B=l.ButtonType;var T=c.TextDirection;var b={};b.render=function(R,o){var t=o.getType();var E=o.getEnabled();var w=o.getWidth();var s=o._getTooltip();var d=o._getText();var f=o.getTextDirection();var i=D.browser.internet_explorer||D.browser.edge;var g=(f===T.Inherit)&&!i;var h=I.getIconURI("nav-back");R.write("<button");R.writeControlData(o);R.addClass("sapMBtnBase");if(!o._isUnstyled()){R.addClass("sapMBtn");if((t===B.Back||t===B.Up)&&o.getIcon()&&!d){R.addClass("sapMBtnBack");}}var m={};var j=b.getButtonTypeAriaLabelId(t);if(j){m["describedby"]={value:j,append:true};}if(o._determineSelfReferencePresence()){m["labelledby"]={value:o.getId()+"-content",append:true};}m["disabled"]=null;if(this.renderAccessibilityAttributes){this.renderAccessibilityAttributes(R,o,m);}R.writeAccessibilityState(o,m);if(!E){R.writeAttribute("disabled","disabled");if(!o._isUnstyled()){R.addClass("sapMBtnDisabled");}}else{switch(t){case B.Accept:case B.Reject:case B.Emphasized:R.addClass("sapMBtnInverted");break;default:break;}}if(s){R.writeAttributeEscaped("title",s);}R.writeClasses();if(w!=""||w.toLowerCase()==="auto"){R.addStyle("width",w);R.writeStyles();}r(o,R);R.write(">");R.write("<span");R.writeAttribute("id",o.getId()+"-inner");if(!o._isUnstyled()){R.addClass("sapMBtnInner");}if(o._isHoverable()){R.addClass("sapMBtnHoverable");}if(E){R.addClass("sapMFocusable");if(i){R.addClass("sapMIE");}}if(!o._isUnstyled()){if(d){R.addClass("sapMBtnText");}if(t===B.Back||t===B.Up){R.addClass("sapMBtnBack");}if(o.getIcon()){if(o.getIconFirst()){R.addClass("sapMBtnIconFirst");}else{R.addClass("sapMBtnIconLast");}}}if(this.renderButtonAttributes){this.renderButtonAttributes(R,o);}if(!o._isUnstyled()&&t!==""){R.addClass("sapMBtn"+e(t));}R.writeClasses();r(o,R);R.write(">");if(t===B.Back||t===B.Up){this.writeInternalIconPoolHtml(R,o,h);}if(o.getIcon()){this.writeImgHtml(R,o);}if(d){R.write("<span ");R.addClass("sapMBtnContent");if(f!==T.Inherit){R.writeAttribute("dir",f.toLowerCase());}R.writeClasses();R.writeAttribute("id",o.getId()+"-content");R.write(">");if(g){R.write("<bdi");R.writeAttribute("id",o.getId()+"-BDI-content");R.write(">");}R.writeEscaped(d);if(g){R.write("</bdi>");}R.write("</span>");}if(i&&E){R.write('<span class="sapMBtnFocusDiv"></span>');}R.write("</span>");R.write("</button>");};b.writeImgHtml=function(R,o){R.renderControl(o._getImage((o.getId()+"-img"),o.getIcon(),o.getActiveIcon(),o.getIconDensityAware()));};b.writeInternalIconPoolHtml=function(R,o,u){R.renderControl(o._getInternalIconBtn((o.getId()+"-iconBtn"),u));};function r(o,R){if(o._bExcludeFromTabChain){R.writeAttribute("tabindex",-1);}}var A={Accept:"BUTTON_ARIA_TYPE_ACCEPT",Reject:"BUTTON_ARIA_TYPE_REJECT",Emphasized:"BUTTON_ARIA_TYPE_EMPHASIZED"};b.getButtonTypeAriaLabelId=function(t){return a.getStaticId("sap.m",A[t]);};return b;},true);
