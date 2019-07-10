/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/unified/library',"./HeaderRenderer","sap/ui/dom/containsOrEquals"],function(C,l,H,c){"use strict";var a=C.extend("sap.ui.unified.calendar.Header",{metadata:{library:"sap.ui.unified",properties:{textButton0:{type:"string",group:"Appearance"},additionalTextButton0:{type:"string",group:"Appearance"},ariaLabelButton0:{type:"string",group:"Misc"},visibleButton0:{type:"boolean",group:"Appearance",defaultValue:false},textButton1:{type:"string",group:"Appearance"},additionalTextButton1:{type:"string",group:"Appearance"},ariaLabelButton1:{type:"string",group:"Misc"},visibleButton1:{type:"boolean",group:"Appearance",defaultValue:true},textButton2:{type:"string",group:"Appearance"},additionalTextButton2:{type:"string",group:"Appearance"},ariaLabelButton2:{type:"string",group:"Misc"},visibleButton2:{type:"boolean",group:"Appearance",defaultValue:true},enabledPrevious:{type:"boolean",group:"Behavior",defaultValue:true},enabledNext:{type:"boolean",group:"Behavior",defaultValue:true}},events:{pressPrevious:{},pressNext:{},pressButton0:{},pressButton1:{},pressButton2:{}}}});a.prototype.setTextButton0=function(t){_.call(this,0,t);return this;};a.prototype.setAdditionalTextButton0=function(t){b.call(this,0,t);return this;};a.prototype.setAriaLabelButton0=function(t){d.call(this,0,t);return this;};a.prototype.setTextButton1=function(t){_.call(this,1,t);return this;};a.prototype.setAdditionalTextButton1=function(t){b.call(this,1,t);return this;};a.prototype.setAriaLabelButton1=function(t){d.call(this,1,t);return this;};a.prototype.setTextButton2=function(t){_.call(this,2,t);return this;};a.prototype.setAdditionalTextButton2=function(t){b.call(this,2,t);return this;};a.prototype.setAriaLabelButton2=function(t){d.call(this,2,t);return this;};a.prototype._setVisibleButton3=function(v){this._visibleButton3=v;this.invalidate();return this;};a.prototype._getVisibleButton3=function(){return this._visibleButton3;};a.prototype._setTextButton3=function(t){e.call(this,3,t);return this;};a.prototype._getTextButton3=function(){return this._textButton3;};a.prototype._setAdditionalTextButton3=function(t){f.call(this,3,t);return this;};a.prototype._getAdditionalTextButton3=function(){return this._additionalTextButton3;};a.prototype._setAriaLabelButton3=function(t){g.call(this,3,t);return this;};a.prototype._getAriaLabelButton3=function(){return this._ariaLabelButton3;};a.prototype._setVisibleButton4=function(v){this._visibleButton4=v;this.invalidate();return this;};a.prototype._getVisibleButton4=function(){return this._visibleButton4;};a.prototype._setTextButton4=function(t){e.call(this,4,t);return this;};a.prototype._getTextButton4=function(){return this._textButton4;};a.prototype._setAdditionalTextButton4=function(t){f.call(this,4,t);return this;};a.prototype._getAdditionalTextButton4=function(){return this._additionalTextButton4;};a.prototype._setAriaLabelButton4=function(t){g.call(this,4,t);return this;};a.prototype._getAriaLabelButton4=function(){return this._ariaLabelButton4;};a.prototype.setEnabledPrevious=function(E){this.setProperty("enabledPrevious",E,true);if(this.getDomRef()){if(E){this.$("prev").toggleClass("sapUiCalDsbl",false).removeAttr("disabled");}else{this.$("prev").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled");}}return this;};a.prototype.setEnabledNext=function(E){this.setProperty("enabledNext",E,true);if(this.getDomRef()){if(E){this.$("next").toggleClass("sapUiCalDsbl",false).removeAttr("disabled");}else{this.$("next").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled");}}return this;};a.prototype.onclick=function(E){if(E.isMarked("delayedMouseEvent")){return;}if(c(this.getDomRef("prev"),E.target)&&this.getEnabledPrevious()){this.firePressPrevious();}else if(c(this.getDomRef("next"),E.target)&&this.getEnabledNext()){this.firePressNext();}else if(c(this.getDomRef("B0"),E.target)){this.firePressButton0();}else if(c(this.getDomRef("B1"),E.target)){this.firePressButton1();}else if(c(this.getDomRef("B2"),E.target)){this.firePressButton2();}else if(c(this.getDomRef("B3"),E.target)){this.fireEvent("pressButton3");}else if(c(this.getDomRef("B4"),E.target)){this.fireEvent("pressButton4");}};a.prototype.onsapnext=function(E){E.preventDefault();};function _(B,t){this.setProperty("textButton"+B,t,true);if(this.getDomRef()&&this["getVisibleButton"+B]()){if(this.$("B"+B+"-Text").get(0)){this.$("B"+B+"-Text").text(t);}else{this.$("B"+B).text(t);}}}function b(B,t){var r=false;var o=this["getAdditionalTextButton"+B]();if(o==t){return;}if((!o&&t)||(o&&!t)){r=true;}this.setProperty("additionalTextButton"+B,t,!r);if(!r&&this.getDomRef()&&this["getVisibleButton"+B]()){this.$("B"+B+"-AddText").text(t);}}function d(B,t){this.setProperty("ariaLabelButton"+B,t,true);if(this.getDomRef()&&this["getVisibleButton"+B]()){if(t){this.$("B"+B).attr("aria-label",t);}else{this.$("B"+B).removeAttr("aria-label");}}}function e(B,t){this["_textButton"+B]=t;if(this.isActive()&&this["_getVisibleButton"+B]()){if(this.$("B"+B+"-Text").get(0)){this.$("B"+B+"-Text").text(t);}else{this.$("B"+B).text(t);}}}function f(B,t){var r=false;var o=this["_getAdditionalTextButton"+B]();if(o==t){return;}if((!o&&t)||(o&&!t)){r=true;}this["_additionalTextButton"+B]=t;if(!r&&this.isActive()&&this["_getVisibleButton"+B]()){this.$("B"+B+"-AddText").text(t);}if(r){this.invalidate();}}function g(B,t){this["_ariaLabelButton"+B]=t;if(this.isActive()&&this["_getVisibleButton"+B]()){if(t){this.$("B"+B).attr("aria-label",t);}else{this.$("B"+B).removeAttr("aria-label");}}}return a;});
