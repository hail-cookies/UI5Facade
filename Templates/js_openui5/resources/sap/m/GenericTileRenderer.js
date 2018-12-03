/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS"],function(l,e){"use strict";var G=l.GenericTileMode;var a=l.GenericTileScope;var L=l.LoadState;var b={};b.render=function(r,c){var t=c._getTooltipText();var A=c._getAriaText();A="GenericTile"+"\n"+A;var h=c.getHeaderImage();var H=c.hasListeners("press");var s=c.getState();var S=c.getScope();var d=e("sapMGTState"+s);var f=e("sapMGTScope"+S);r.write("<div");r.writeControlData(c);if(t){r.writeAttributeEscaped("title",t);}r.addClass("sapMGT");r.addClass(d);r.addClass(f);if(S!==a.Actions&&c._bShowActionsView){r.addClass("sapMGTScopeActions");}r.addClass(c.getFrameType());if(H){r.writeAttribute("role","button");}else{r.writeAttribute("role","presentation");}r.writeAttributeEscaped("aria-label",A);if(s!==L.Disabled){r.addClass("sapMPointer");r.writeAttribute("tabindex","0");}if(c.getBackgroundImage()){r.write(" style='background-image:url(");r.writeEscaped(c.getBackgroundImage());r.write(");'");r.addClass("sapMGTBackgroundImage");}if(c.getMode()===G.HeaderMode){r.addClass("sapMGTHeaderMode");}r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMGTHdrContent");r.addClass(c.getFrameType());if(t){r.writeAttributeEscaped("title",t);}r.writeClasses();r.write(">");if(h){r.renderControl(c._oImage);}this._renderHeader(r,c);if(c.getSubheader()){this._renderSubheader(r,c);}r.write("</div>");r.write("<div");r.addClass("sapMGTContent");r.writeClasses();r.writeAttribute("id",c.getId()+"-content");r.write(">");var T=c.getTileContent();var g=T.length;for(var i=0;i<g;i++){c._checkFooter(T[i],c);r.renderControl(T[i]);}r.write("</div>");if(s!==L.Loaded){this._renderStateOverlay(r,c,t);}if(s!==L.Disabled){this._renderHoverOverlay(r,c);this._renderFocusDiv(r,c);}if(S===a.Actions){this._renderActionsScope(r,c);}r.write("</div>");};b._renderFocusDiv=function(r,c){r.write("<div");r.addClass("sapMGTFocusDiv");r.writeClasses();r.writeAttribute("id",c.getId()+"-focus");r.write(">");r.write("</div>");};b._renderStateOverlay=function(r,c,t){var s=c.getState();r.write("<div");r.addClass("sapMGTOverlay");r.writeClasses();r.writeAttribute("id",c.getId()+"-overlay");if(t){r.writeAttributeEscaped("title",t);}r.write(">");switch(s){case L.Loading:c._oBusy.setBusy(s==L.Loading);r.renderControl(c._oBusy);break;case L.Failed:r.write("<div");r.writeAttribute("id",c.getId()+"-failed-ftr");r.addClass("sapMGenericTileFtrFld");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-failed-icon");r.addClass("sapMGenericTileFtrFldIcn");r.writeClasses();r.write(">");r.renderControl(c._oWarningIcon);r.write("</div>");if(c.getScope()!==a.Actions&&!c._bShowActionsView){r.write("<div");r.writeAttribute("id",c.getId()+"-failed-text");r.addClass("sapMGenericTileFtrFldTxt");r.writeClasses();r.write(">");r.renderControl(c.getAggregation("_failedMessageText"));r.write("</div>");}r.write("</div>");break;default:}r.write("</div>");};b._renderActionsScope=function(r,c){if(c.getState()!==L.Disabled){r.renderControl(c._oRemoveButton);r.renderControl(c._oMoreIcon);}};b._renderHoverOverlay=function(r,c){r.write("<div");if(c.getBackgroundImage()){r.addClass("sapMGTWithImageHoverOverlay");}else{r.addClass("sapMGTWithoutImageHoverOverlay");}r.writeClasses();r.writeAttribute("id",c.getId()+"-hover-overlay");r.write(">");r.write("</div>");};b._renderHeader=function(r,c){r.write("<div");r.addClass("sapMGTHdrTxt");r.writeClasses();r.writeAttribute("id",c.getId()+"-hdr-text");r.write(">");r.renderControl(c._oTitle);r.write("</div>");};b._renderSubheader=function(r,c){r.write("<div");r.addClass("sapMGTSubHdrTxt");r.writeClasses();r.writeAttribute("id",c.getId()+"-subHdr-text");r.write(">");r.writeEscaped(c.getSubheader());r.write("</div>");};return b;},true);
