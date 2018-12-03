/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/assert','../Device','./Control','./IconPool','./InvisibleText','./library',"./IconRenderer","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(a,D,C,I,b,l,c,K,q){"use strict";var d=l.IconColor;var e=C.extend("sap.ui.core.Icon",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.ui.core",designtime:"sap/ui/core/designtime/Icon.designtime",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},size:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},color:{type:"string",group:"Appearance",defaultValue:null},hoverColor:{type:"string",group:"Appearance",defaultValue:null},activeColor:{type:"string",group:"Appearance",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},hoverBackgroundColor:{type:"string",group:"Appearance",defaultValue:null},activeBackgroundColor:{type:"string",group:"Appearance",defaultValue:null},decorative:{type:"boolean",group:"Accessibility",defaultValue:true},useIconTooltip:{type:"boolean",group:"Accessibility",defaultValue:true},alt:{type:"string",group:"Accessibility",defaultValue:null},noTabStop:{type:"boolean",group:"Accessibility",defaultValue:false}},aggregations:{_invisibleText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});e.prototype[D.support.touch?"ontouchstart":"onmousedown"]=function(E){if(this.hasListeners("press")){E.setMarked();}var A=this.getActiveColor(),s=this.getActiveBackgroundColor(),i;if(A||s){if(!E.targetTouches||(E.targetTouches&&E.targetTouches.length===1)){i=this.$();i.addClass("sapUiIconActive");if(A){this._addColorClass(A,"color");}if(s){this._addColorClass(s,"background-color");}}}};e.prototype[D.support.touch?"ontouchend":"onmouseup"]=function(E){if(!E.targetTouches||(E.targetTouches&&E.targetTouches.length===0)){this.$().removeClass("sapUiIconActive");this._restoreColors(D.system.desktop?"hover":undefined);}};e.prototype.onmouseover=function(){var h=this.getHoverColor(),H=this.getHoverBackgroundColor();if(h){this._addColorClass(h,"color");}if(H){this._addColorClass(H,"background-color");}};e.prototype.onmouseout=function(){this._restoreColors();};e.prototype[D.support.touch&&!D.system.desktop?"ontap":"onclick"]=function(E){if(this.hasListeners("press")){E.setMarked();}this.firePress({});};e.prototype.onkeydown=function(E){if(E.which===K.SPACE||E.which===K.ENTER){E.preventDefault();var i=this.$(),A=this.getActiveColor(),s=this.getActiveBackgroundColor();i.addClass("sapUiIconActive");if(A){this._addColorClass(A,"color");}if(s){this._addColorClass(s,"background-color");}}};e.prototype.onkeyup=function(E){if(E.which===K.SPACE||E.which===K.ENTER){this.$().removeClass("sapUiIconActive");this._restoreColors();this.firePress({});}};e.prototype._restoreColors=function(m){var s,B;if(m==="hover"){s=this.getHoverColor();B=this.getHoverBackgroundColor();}s=s||this.getColor();B=B||this.getBackgroundColor();this._addColorClass(s||"","color");this._addColorClass(B||"","background-color");};e.prototype.setSrc=function(s){a(s==null||I.isIconURI(s),this+": Property 'src' (value: '"+s+"') should be a valid Icon URI (sap-icon://...)");var i=I.getIconInfo(s,undefined,"mixed"),$=this.$(),f,t,u,L,o;this.setProperty("src",s,!!i);if(i instanceof Promise){i.then(this.invalidate.bind(this));}else if(i&&$.length){$.css("font-family",i.fontFamily);$.attr("data-sap-ui-icon-content",i.content);$.toggleClass("sapUiIconMirrorInRTL",!i.suppressMirroring);t=this.getTooltip_AsString();L=this.getAriaLabelledBy();u=this.getUseIconTooltip();f=this._getIconLabel(i);if(t||(u&&i.text)){$.attr("title",t||i.text);}else{$.attr("title",null);}if(L.length===0){if(f){$.attr("aria-label",f);}else{$.attr("aria-label",null);}}else{o=this.getAggregation("_invisibleText");if(o){o.setText(f);}}}return this;};e.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",w);return this;};e.prototype.setHeight=function(h){this.setProperty("height",h,true);this.$().css({"height":h,"line-height":h});return this;};e.prototype.setSize=function(s){this.setProperty("size",s,true);this.$().css("font-size",s);return this;};e.prototype.setColor=function(s){this.setProperty("color",s,true);this._addColorClass(s,"color");return this;};e.prototype._addColorClass=function(s,f){var i=this.$(),t=this;var g="";if(f==="color"){g="sapUiIconColor";}else if(f==="background-color"){g="sapUiIconBGColor";}else{return;}q.each(d,function(p,P){t.removeStyleClass(g+P);});if(s in d){i.css(f,"");this.addStyleClass(g+s);}else{i.css(f,s);}};e.prototype.setActiveColor=function(s){return this.setProperty("activeColor",s,true);};e.prototype.setHoverColor=function(s){return this.setProperty("hoverColor",s,true);};e.prototype.setBackgroundColor=function(s){this.setProperty("backgroundColor",s,true);this._addColorClass(s,"background-color");return this;};e.prototype.setActiveBackgroundColor=function(s){return this.setProperty("activeBackgroundColor",s,true);};e.prototype.setHoverBackgroundColor=function(s){return this.setProperty("hoverBackgroundColor",s,true);};e.prototype.attachPress=function(){var m=Array.prototype.slice.apply(arguments);m.unshift("press");C.prototype.attachEvent.apply(this,m);if(this.hasListeners("press")){this.$().toggleClass("sapUiIconPointer",true).attr({role:"button",tabindex:this.getNoTabStop()?undefined:0});}return this;};e.prototype.detachPress=function(){var m=Array.prototype.slice.apply(arguments);m.unshift("press");C.prototype.detachEvent.apply(this,m);if(!this.hasListeners("press")){this.$().toggleClass("sapUiIconPointer",false).attr({role:this.getDecorative()?"presentation":"img"}).removeAttr("tabindex");}return this;};e.prototype._getOutputTitle=function(i){var t=this.getTooltip_AsString(),u=this.getUseIconTooltip();if(t||(u&&i&&i.text)){return t||i.text;}};e.prototype._getIconLabel=function(i){var A=this.getAlt(),t=this.getTooltip_AsString(),u=this.getUseIconTooltip(),L=A||t||(u&&i&&(i.text||i.name)),o=this._getOutputTitle(i);if(L&&L!==o){return L;}};e.prototype._createInvisibleText=function(t){var i=this.getAggregation("_invisibleText");if(!i){i=new b(this.getId()+"-label",{text:t});this.setAggregation("_invisibleText",i,true);}else{i.setProperty("text",t,true);}return i;};e.prototype._getAccessibilityAttributes=function(i){var L=this.getAriaLabelledBy(),A={},s=this._getIconLabel(i),o;if(this.getDecorative()){A.role="presentation";A.hidden="true";}else{if(this.hasListeners("press")){A.role="button";}else{A.role="img";}}if(L.length>0){if(s){o=this._createInvisibleText(s);L.push(o.getId());}A.labelledby=L.join(" ");}else if(s){A.label=s;}return A;};e.prototype.getAccessibilityInfo=function(){if(this.getDecorative()){return null;}var h=this.hasListeners("press");var i=I.getIconInfo(this.getSrc(),undefined,"sync");return{role:h?"button":"img",type:sap.ui.getCore().getLibraryResourceBundle("sap.ui.core").getText(h?"ACC_CTR_TYPE_BUTTON":"ACC_CTR_TYPE_IMAGE"),description:this.getAlt()||this.getTooltip_AsString()||(i?i.text||i.name:""),focusable:h};};return e;});
