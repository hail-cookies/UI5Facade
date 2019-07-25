/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/cssgrid/GridLayoutBase","sap/ui/layout/cssgrid/GridSettings","sap/ui/Device"],function(G,a,D){"use strict";var S=/^([X][L](?:[1-9]|1[0-2]))? ?([L](?:[1-9]|1[0-2]))? ?([M](?:[1-9]|1[0-2]))? ?([S](?:[1-9]|1[0-2]))?$/i;var b=S.exec("XL7 L6 M4 S2");var s={"Phone":"sapUiLayoutCSSGridBoxLayoutSizeS","Tablet":"sapUiLayoutCSSGridBoxLayoutSizeM","Desktop":"sapUiLayoutCSSGridBoxLayoutSizeL","LargeDesktop":"sapUiLayoutCSSGridBoxLayoutSizeXL"};var c={"XL":"sapUiLayoutCSSGridBoxLayoutSpanXL7","L":"sapUiLayoutCSSGridBoxLayoutSpanL6","M":"sapUiLayoutCSSGridBoxLayoutSpanM4","S":"sapUiLayoutCSSGridBoxLayoutSpanS2"};var d=G.extend("sap.ui.layout.cssgrid.GridBoxLayout",{metadata:{library:"sap.ui.layout",properties:{boxMinWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxesPerRowConfig:{type:"sap.ui.layout.BoxesPerRowConfig",group:"Behavior",defaultValue:"XL7 L6 M4 S2"}}}});d.prototype.getActiveGridSettings=function(){return new a({gridTemplateColumns:this._getTemplateColumns(),gridGap:"0.5rem 0.5rem"});};d.prototype._applySingleGridLayout=function(e){if(this.isGridSupportedByBrowser()){G.prototype._applySingleGridLayout.call(this,e);}};d.prototype.renderSingleGridLayout=function(r){this._addSpanClasses(r);if(this.isGridSupportedByBrowser()){r.addClass("sapUiLayoutCSSGridBoxLayoutContainer");}else{r.addClass("sapUiLayoutCSSGridBoxLayoutPolyfill");}};d.prototype.onGridAfterRendering=function(g){G.prototype.onGridAfterRendering.call(this,g);if(!this._hasBoxWidth()){this._applySizeClass(g);}if(!this.isGridSupportedByBrowser()){this._calcWidth(g);this._flattenHeight(g);if(!this._hasBoxWidth()){this._applyClassForLastItem(g);}}if(g.isA("sap.f.GridList")&&g.getGrowing()){var C=g._oGrowingDelegate._onAfterPageLoaded;g._oGrowingDelegate._onAfterPageLoaded=function(){C.call(g._oGrowingDelegate);if(!this.isGridSupportedByBrowser()){this._flattenHeight(g);this._calcWidth(g);this._loopOverGridItems(g,function(o){if(!o.classList.contains("sapMGHLI")&&!o.classList.contains("sapUiBlockLayerTabbable")){o.classList.add("sapUiLayoutCSSGridItem");}});if(!this._hasBoxWidth()){this._applyClassForLastItem(g);}}else if(g.isA("sap.f.GridList")&&g.isGrouped()){this._flattenHeight(g);}}.bind(this);}};d.prototype._setGridLayout=function(e,g){var o=sap.ui.getCore().byId(e.parentElement.id);G.prototype._setGridLayout.call(this,e,g);if(this.isGridSupportedByBrowser()&&(o&&o.isA("sap.f.GridList")&&o.isGrouped())){this._flattenHeight(o);}};d.prototype.isResponsive=function(){return true;};d.prototype.onGridResize=function(e){if(!this.isGridSupportedByBrowser()||(e.control&&e.control.isA("sap.f.GridList")&&e.control.isGrouped())){this._flattenHeight(e.control);}if(!this.isGridSupportedByBrowser()&&!this._hasBoxWidth()){this._applyClassForLastItem(e.control);}if(e){if(!this._hasBoxWidth()){this._applySizeClass(e.control);}}};d.prototype._calcWidth=function(C){var w;if(this._hasBoxWidth()){w=this.getBoxWidth()||this.getBoxMinWidth();}this._loopOverGridItems(C,function(g){if(!g.classList.contains("sapMGHLI")){g.style.width=w;}});};d.prototype._flattenHeight=function(C){var m=0;var $=jQuery('<div style="position:absolute;top=-10000px;left=-10000px"></div>').appendTo(document.body);this._loopOverGridItems(C,function(g){if(!g.classList.contains("sapMGHLI")){var e=jQuery(jQuery.clone(g)).appendTo($);e.css({height:'auto',width:g.getBoundingClientRect().width});m=Math.max(e.outerHeight(),m);e.remove();}});$.remove();this._loopOverGridItems(C,function(g){if(!g.classList.contains("sapMGHLI")){g.style.height=m+"px";}});};d.prototype._applyClassForLastItem=function(C){var i=0;var B=this.getBoxesPerRowConfig().split(" ");var r=D.media.getCurrentRange("StdExt",C.$().width());var e=s[r.name].substring("sapUiLayoutCSSGridBoxLayoutSize".length);var m;B.forEach(function(f){if(f.indexOf(e)!=-1){m=parseInt(f.substring(e.length));}});this._loopOverGridItems(C,function(g){if(g.classList.contains("sapUiLayoutCSSGridItem")){i++;if(i==m){g.classList.add("sapUiLayoutCSSGridItemLastOnRow");i=0;}else{g.classList.remove("sapUiLayoutCSSGridItemLastOnRow");}}else if(g.classList.contains("sapMGHLI")){i=0;}});};d.prototype._applySizeClass=function(C){var r=D.media.getCurrentRange("StdExt",C.$().width()),e=s[r.name];C.getGridDomRefs().forEach(function(o){if(!o.classList.contains(e)){Object.keys(s).map(function(f){o.classList.remove(s[f]);});o.classList.add(e);}});};d.prototype._getTemplateColumns=function(){var t="";if(this.getBoxWidth()){t="repeat(auto-fit, "+this.getBoxWidth()+")";}else if(this.getBoxMinWidth()){t="repeat(auto-fit, minmax("+this.getBoxMinWidth()+", 1fr))";}return t;};d.prototype._hasBoxWidth=function(){if(this.getBoxWidth()||this.getBoxMinWidth()){return true;}else{return false;}};d.prototype._addSpanClasses=function(r){var e,f,g=this.getBoxesPerRowConfig(),h,j,k,l;if(this._hasBoxWidth()){return;}if(!g||!g.length===0){e=b;}else{e=S.exec(g);}if(e){for(var i=1;i<e.length;i++){f=e[i];if(f){f=f.toUpperCase();switch(f.substr(0,1)){case"X":if(f.substr(1,1)==="L"){h=this._getBoxesPerRowClass(f,2);}break;case"L":j=this._getBoxesPerRowClass(f,1);break;case"M":k=this._getBoxesPerRowClass(f,1);break;case"S":l=this._getBoxesPerRowClass(f,1);break;default:break;}}}}h=h||c.XL;j=j||c.L;k=k||c.M;l=l||c.S;r.addClass([h,j,k,l].join(" "));};d.prototype._getBoxesPerRowClass=function(e,i){var f=parseInt(e.substr(i,e.length));if(f&&f>0&&f<13){return"sapUiLayoutCSSGridBoxLayoutSpan"+e;}};d.prototype._loopOverGridItems=function(C,f){C.getGridDomRefs().forEach(function(o){if(o&&o.children){for(var i=0;i<o.children.length;i++){f(o.children[i]);}}});};return d;});
