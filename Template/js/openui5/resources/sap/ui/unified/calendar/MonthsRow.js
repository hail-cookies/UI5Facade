/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/library'],function(q,C,L,I,D,a,c,l){"use strict";var M=C.extend("sap.ui.unified.calendar.MonthsRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},months:{type:"int",group:"Appearance",defaultValue:12},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}}});M.prototype.init=function(){this._oFormatYyyymm=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMdd",calendarType:sap.ui.core.CalendarType.Gregorian});this._oFormatLong=sap.ui.core.format.DateFormat.getInstance({pattern:"MMMM y"});this._mouseMoveProxy=q.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");};M.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._sInvalidateMonths){q.sap.clearDelayedCall(this._sInvalidateMonths);}};M.prototype.onAfterRendering=function(){_.call(this);s.call(this);};M.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){if(this._bMouseMove){v.call(this,true);n.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;r.call(this);}if(this._bMousedownChange){this._bMousedownChange=false;r.call(this);}}};M.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&!this._sInvalidateMonths){if(this._bInvalidateSync){t.call(this);}else{this._sInvalidateMonths=q.sap.delayedCall(0,this,t);}}};M.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("selectedDates");return R;};M.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var b=this.destroyAggregation("selectedDates");return b;};M.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};M.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var b=this.destroyAggregation("specialDates");return b;};M.prototype.setDate=function(b){h.call(this,c.fromLocalJSDate(b),false);return this;};M.prototype._setDate=function(b){var i=b.toLocalJSDate();this.setProperty("date",i,true);this._oDate=b;};M.prototype._getDate=function(){if(!this._oDate){this._oDate=new c();}return this._oDate;};M.prototype.setStartDate=function(S){a._checkJSDateObject(S);var b,y,O;y=S.getFullYear();a._checkYearInValidRange(y);b=c.fromLocalJSDate(S);this.setProperty("startDate",S,true);this._oStartDate=b;this._oStartDate.setDate(1);if(this.getDomRef()){O=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(S);this._bNoRangeCheck=false;if(O&&this.checkDateFocusable(O)){this.setDate(O);}}return this;};M.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=new c();this._oStartDate.setDate(1);}return this._oStartDate;};M.prototype.displayDate=function(b){h.call(this,c.fromLocalJSDate(b),true);return this;};M.prototype._getLocale=function(){var P=this.getParent();if(P&&P.getLocale){return P.getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};M.prototype._getLocaleData=function(){var P=this.getParent();if(P&&P._getLocaleData){return P._getLocaleData();}else if(!this._oLocaleData){var b=this._getLocale();var i=new sap.ui.core.Locale(b);this._oLocaleData=L.getInstance(i);}return this._oLocaleData;};M.prototype._getFormatLong=function(){var b=this._getLocale();if(this._oFormatLong.oLocale.toString()!=b){var i=new sap.ui.core.Locale(b);this._oFormatLong=sap.ui.core.format.DateFormat.getInstance({style:"long"},i);}return this._oFormatLong;};M.prototype.getIntervalSelection=function(){var P=this.getParent();if(P&&P.getIntervalSelection){return P.getIntervalSelection();}else{return this.getProperty("intervalSelection");}};M.prototype.getSingleSelection=function(){var P=this.getParent();if(P&&P.getSingleSelection){return P.getSingleSelection();}else{return this.getProperty("singleSelection");}};M.prototype.getSelectedDates=function(){var P=this.getParent();if(P&&P.getSelectedDates){return P.getSelectedDates();}else{return this.getAggregation("selectedDates",[]);}};M.prototype.getSpecialDates=function(){var P=this.getParent();if(P&&P.getSpecialDates){return P.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};M.prototype._getShowHeader=function(){var P=this.getParent();if(P&&P._getShowItemHeader){return P._getShowItemHeader();}else{return this.getProperty("showHeader");}};M.prototype.getAriaLabelledBy=function(){var P=this.getParent();if(P&&P.getAriaLabelledBy){return P.getAriaLabelledBy();}else{return this.getAssociation("ariaLabelledBy",[]);}};M.prototype.getLegend=function(){var P=this.getParent();if(P&&P.getLegend){return P.getLegend();}else{return this.getAssociation("ariaLabelledBy",[]);}};M.prototype._checkDateSelected=function(b){var R,S,E,T,w=0,x=0,y=0,i,z,A;a._checkCalendarDate(b);z=this.getSelectedDates();A=new c(b);A.setDate(1);T=A.toUTCJSDate().getTime();for(i=0;i<z.length;i++){R=z[i];S=R.getStartDate();w=0;if(S){S=c.fromLocalJSDate(S);S.setDate(1);w=S.toUTCJSDate().getTime();}E=R.getEndDate();x=0;if(E){E=c.fromLocalJSDate(E);E.setDate(1);x=E.toUTCJSDate().getTime();}if(T==w&&!E){y=1;break;}else if(T==w&&E){y=2;if(E&&T==x){y=5;}break;}else if(E&&T==x){y=3;break;}else if(E&&T>w&&T<x){y=4;break;}if(this.getSingleSelection()){break;}}return y;};M.prototype._getDateType=function(b){a._checkCalendarDate(b);var T,R,i,S,w=0,E,x=0,y,z=this.getSpecialDates(),A=new c(b);A.setDate(1);y=A.toUTCJSDate().getTime();for(i=0;i<z.length;i++){R=z[i];S=R.getStartDate();w=0;if(S){S=c.fromLocalJSDate(S);S.setDate(1);w=S.toUTCJSDate().getTime();}E=R.getEndDate();x=0;if(E){E=c.fromLocalJSDate(E);E.setDate(a._daysInMonth(E));x=E.toUTCJSDate().getTime();}if((y==w&&!E)||(y>=w&&y<=x)){T={type:R.getType(),tooltip:R.getTooltip_AsString()};break;}}return T;};M.prototype._checkMonthEnabled=function(b){a._checkCalendarDate(b);var P=this.getParent();if(P&&P._oMinDate&&P._oMaxDate){if(a._isOutside(b,P._oMinDate,P._oMaxDate)){return false;}}return true;};M.prototype._handleMouseMove=function(E){if(!this.$().is(":visible")){v.call(this,true);}var T=q(E.target);if(T.hasClass("sapUiCalItemText")){T=T.parent();}if(T.hasClass("sapUiCalItem")){var O=this._getDate();var F=c.fromLocalJSDate(this._oFormatYyyymm.parse(T.attr("data-sap-month")));F.setDate(1);if(!F.isSame(O)){this._setDate(F);n.call(this,F,true);this._bMoveChange=true;}}};M.prototype.onmouseup=function(E){if(this._bMouseMove){v.call(this,true);var F=this._getDate();var b=this._oItemNavigation.getItemDomRefs();for(var i=0;i<b.length;i++){var $=q(b[i]);if($.attr("data-sap-month")==this._oFormatYyyymm.format(F.toUTCJSDate(),true)){$.focus();break;}}if(this._bMoveChange){var T=q(E.target);if(T.hasClass("sapUiCalItemText")){T=T.parent();}if(T.hasClass("sapUiCalItem")){F=c.fromLocalJSDate(this._oFormatYyyymm.parse(T.attr("data-sap-month")));F.setDate(1);}n.call(this,F);this._bMoveChange=false;this._bMousedownChange=false;r.call(this);}}if(this._bMousedownChange){this._bMousedownChange=false;r.call(this);}};M.prototype.onsapselect=function(E){var S=n.call(this,this._getDate());if(S){r.call(this);}E.stopPropagation();E.preventDefault();};M.prototype.onsapselectmodifiers=function(E){this.onsapselect(E);};M.prototype.onsappageupmodifiers=function(E){var F=new c(this._getDate());var y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(y-10);}else{var i=this.getMonths();if(i<=12){F.setYear(y-1);}else{F.setMonth(F.getMonth()-i);}}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});E.preventDefault();};M.prototype.onsappagedownmodifiers=function(E){var F=new c(this._getDate());var y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(y+10);}else{var i=this.getMonths();if(i<=12){F.setYear(y+1);}else{F.setMonth(F.getMonth()+i);}}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});E.preventDefault();};M.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return;}this._bNamesLengthChecked=undefined;this._bLongWeekDays=undefined;var b=this._getLocaleData();var w=b.getMonthsStandAlone("wide");var x=this.$("months").children();var y=this._getStartDate().getMonth();for(var i=0;i<x.length;i++){var $=q(q(x[i]).children(".sapUiCalItemText"));$.text(w[(i+y)%12]);}s.call(this);};M.prototype.checkDateFocusable=function(b){a._checkJSDateObject(b);if(this._bNoRangeCheck){return false;}var S=this._getStartDate();var E=new c(S);E.setDate(1);E.setMonth(E.getMonth()+this.getMonths());var i=c.fromLocalJSDate(b);return i.isSameOrAfter(S)&&i.isBefore(E);};M.prototype.applyFocusInfo=function(i){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this;};function _(){var b=this._getDate();var y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);var w=0;var R=this.$("months").get(0);var x=this.$("months").children(".sapUiCalItem");for(var i=0;i<x.length;i++){var $=q(x[i]);if($.attr("data-sap-month")===y){w=i;break;}}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,d,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,e,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,f,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true);}this._oItemNavigation.setRootDomRef(R);this._oItemNavigation.setItemDomRefs(x);this._oItemNavigation.setFocusedIndex(w);this._oItemNavigation.setPageSize(x.length);}function d(b){var i=b.getParameter("index");var E=b.getParameter("event");if(!E){return;}var O=this._getDate();var F=new c(O);var w=this._oItemNavigation.getItemDomRefs();var $=q(w[i]);F=c.fromLocalJSDate(this._oFormatYyyymm.parse($.attr("data-sap-month")));F.setDate(1);this._setDate(F);this.fireFocus({date:F.toLocalJSDate(),notVisible:false});if(E.type=="mousedown"){g.call(this,E,F,i);}}function e(b){var i=b.getParameter("index");var E=b.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var F=this._getDate();g.call(this,E,F,i);}}function f(b){var E=b.getParameter("event");var i=this.getMonths();var O=this._getDate();var F=new c(O);if(E.type){switch(E.type){case"sapnext":case"sapnextmodifiers":F.setMonth(F.getMonth()+1);break;case"sapprevious":case"sappreviousmodifiers":F.setMonth(F.getMonth()-1);break;case"sappagedown":F.setMonth(F.getMonth()+i);break;case"sappageup":F.setMonth(F.getMonth()-i);break;default:break;}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});}}function g(E,F,i){if(E.button){return;}var S=n.call(this,F);if(S){this._bMousedownChange=true;}if(this._bMouseMove){v.call(this,true);this._bMoveChange=false;}else if(S&&this.getIntervalSelection()&&this.$().is(":visible")){u.call(this,true);}E.preventDefault();E.setMark("cancelAutoClose");}function h(b,N){a._checkCalendarDate(b);var y=b.getYear();a._checkYearInValidRange(y);var F=true;if(!this.getDate()||!b.isSame(c.fromLocalJSDate(this.getDate()))){var i=new c(b);i.setDate(1);F=this.checkDateFocusable(b.toLocalJSDate());if(!this._bNoRangeCheck&&!F){throw new Error("Date must be in visible date range; "+this);}this.setProperty("date",b.toLocalJSDate(),true);this._oDate=i;}if(this.getDomRef()){if(F){j.call(this,this._oDate,N);}else{k.call(this,N);}}}function j(b,N){var y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);var w=this._oItemNavigation.getItemDomRefs();var $;for(var i=0;i<w.length;i++){$=q(w[i]);if($.attr("data-sap-month")==y){if(document.activeElement!=w[i]){if(N){this._oItemNavigation.setFocusedIndex(i);}else{this._oItemNavigation.focusItem(i);}}break;}}}function k(N){var b=this._getStartDate();var $=this.$("months");if($.length>0){var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderMonths(R,this,b);R.flush($[0]);R.destroy();}m.call(this);_.call(this);if(!N){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());}}function m(){var S=this._getStartDate();if(this._getShowHeader()){var $=this.$("Head");if($.length>0){var b=this._getLocaleData();var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(R,this,b,S);R.flush($[0]);R.destroy();}}}function n(b,w){if(!this._checkMonthEnabled(b)){return false;}var S=this.getSelectedDates();var x;var y=this._oItemNavigation.getItemDomRefs();var $;var Y;var i=0;var P=this.getParent();var A=this;var z;if(P&&P.getSelectedDates){A=P;}if(this.getSingleSelection()){if(S.length>0){x=S[0];z=x.getStartDate();if(z){z=c.fromLocalJSDate(z);z.setDate(1);}}else{x=new sap.ui.unified.DateRange();A.addAggregation("selectedDates",x,true);}if(this.getIntervalSelection()&&(!x.getEndDate()||w)&&z){var E;if(b.isBefore(z)){E=z;z=b;if(!w){x.setProperty("startDate",z.toLocalJSDate(),true);x.setProperty("endDate",E.toLocalJSDate(),true);}}else if(b.isSameOrAfter(z)){E=b;if(!w){x.setProperty("endDate",E.toLocalJSDate(),true);}}o.call(this,z,E);}else{o.call(this,b);x.setProperty("startDate",b.toLocalJSDate(),true);x.setProperty("endDate",undefined,true);}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection");}else{var B=this._checkDateSelected(b);if(B>0){for(i=0;i<S.length;i++){z=S[i].getStartDate();if(z){z=c.fromLocalJSDate(z);z.setDate(1);if(b.isSame(z)){A.removeAggregation("selectedDates",i,true);break;}}}}else{x=new sap.ui.unified.DateRange({startDate:b.toLocalJSDate()});A.addAggregation("selectedDates",x,true);}Y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);for(i=0;i<y.length;i++){$=q(y[i]);if($.attr("data-sap-month")==Y){if(B>0){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}else{$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}}}}}return true;}function o(S,E){var b=this._oItemNavigation.getItemDomRefs();var $;var i=0;var w=false;var x=false;if(!E){var y=this._oFormatYyyymm.format(S.toUTCJSDate(),true);for(i=0;i<b.length;i++){$=q(b[i]);w=false;x=false;if($.attr("data-sap-month")==y){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");w=true;}else if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}p.call(this,$,w,x);}}else{var z;for(i=0;i<b.length;i++){$=q(b[i]);w=false;x=false;z=c.fromLocalJSDate(this._oFormatYyyymm.parse($.attr("data-sap-month")));z.setDate(1);if(z.isSame(S)){$.addClass("sapUiCalItemSelStart");w=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");if(E&&z.isSame(E)){$.addClass("sapUiCalItemSelEnd");x=true;}$.removeClass("sapUiCalItemSelBetween");}else if(E&&a._isBetween(z,S,E)){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.addClass("sapUiCalItemSelBetween");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelEnd");}else if(E&&z.isSame(E)){$.addClass("sapUiCalItemSelEnd");x=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelBetween");}else{if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}}p.call(this,$,w,x);}}}function p($,S,E){if(!this.getIntervalSelection()){return;}var b="";var w=[];var x=this.getId();var y=false;b=$.attr("aria-describedby");if(b){w=b.split(" ");}var z=-1;var A=-1;for(var i=0;i<w.length;i++){var B=w[i];if(B==(x+"-Start")){z=i;}if(B==(x+"-End")){A=i;}}if(z>=0&&!S){w.splice(z,1);y=true;if(A>z){A--;}}if(A>=0&&!E){w.splice(A,1);y=true;}if(z<0&&S){w.push(x+"-Start");y=true;}if(A<0&&E){w.push(x+"-End");y=true;}if(y){b=w.join(" ");$.attr("aria-describedby",b);}}function r(){if(this._bMouseMove){v.call(this,true);}this.fireSelect();}function s(){if(!this._bNamesLengthChecked){var i=0;var w=this.$("months").children();var T=false;var x=this.getMonths();var B=Math.ceil(12/x);var y=0;var z=this._getLocaleData();var A=z.getMonthsStandAlone("wide");var $;for(var b=0;b<B;b++){if(x<12){for(i=0;i<w.length;i++){$=q(q(w[i]).children(".sapUiCalItemText"));$.text(A[(i+y)%12]);}y=y+x;if(y>11){y=11;}}for(i=0;i<w.length;i++){var E=w[i];if(Math.abs(E.clientWidth-E.scrollWidth)>1){T=true;break;}}if(T){break;}}if(x<12){y=this._getStartDate().getMonth();for(i=0;i<w.length;i++){$=q(q(w[i]).children(".sapUiCalItemText"));$.text(A[(i+y)%12]);}}if(T){this._bLongMonth=false;var F=z.getMonthsStandAlone("abbreviated");y=this._getStartDate().getMonth();for(i=0;i<w.length;i++){$=q(q(w[i]).children(".sapUiCalItemText"));$.text(F[(i+y)%12]);}}else{this._bLongMonth=true;}this._bNamesLengthChecked=true;}}function t(){this._sInvalidateMonths=undefined;k.call(this,this._bNoFocus);this._bDateRangeChanged=undefined;this._bNoFocus=undefined;}function u(){q(window.document).bind('mousemove',this._mouseMoveProxy);this._bMouseMove=true;}function v(){q(window.document).unbind('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined;}return M;},true);
