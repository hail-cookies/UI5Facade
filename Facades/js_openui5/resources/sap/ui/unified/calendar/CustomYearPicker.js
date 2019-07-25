/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/unified/Calendar","sap/ui/unified/CalendarRenderer","sap/ui/unified/calendar/Header","sap/ui/unified/DateRange","sap/ui/thirdparty/jquery"],function(R,C,a,H,D,q){"use strict";var b=C.extend("sap.ui.unified.internal.CustomYearPicker",{renderer:R.extend(a)});b.prototype._initializeHeader=function(){var h=new H(this.getId()+"--Head",{visibleButton1:false});h.attachEvent("pressPrevious",this._handlePrevious,this);h.attachEvent("pressNext",this._handleNext,this);h.attachEvent("pressButton2",this._handleButton2,this);this.setAggregation("header",h);};b.prototype.onAfterRendering=function(){C.prototype.onAfterRendering.apply(this,arguments);var h=this.getAggregation("header");h.$("B2").css("background-color","inherit").css("color","inherit").css("cursor","inherit").css("pointer-events","none");this._showYearPicker();};b.prototype.onThemeChanged=function(){C.prototype.onThemeChanged.apply(this,arguments);var h=this.getAggregation("header");h.$("B2").css("background-color","inherit").css("color","inherit").css("cursor","inherit").css("pointer-events","none");};b.prototype._selectYear=function(){var y=this.getAggregation("yearPicker");var d=this.getSelectedDates()[0];if(!d){d=new D();}d.setStartDate(y.getDate());this.addSelectedDate(d);this.fireSelect();};b.prototype.onsapescape=function(e){this.fireCancel();};b.prototype._shouldFocusB2OnTabPrevious=function(e){return false;};return b;},true);
