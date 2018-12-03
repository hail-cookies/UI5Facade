/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/Opa5","sap/ui/test/OpaPlugin","sap/ui/test/actions/Press","sap/ui/test/_LogCollector","sap/ui/thirdparty/jquery","sap/ui/base/ManagedObjectMetadata"],function(U,O,a,P,_,$,M){"use strict";var p=new a();var b=U.extend("sap.ui.test._ControlFinder",{});var l=_.getInstance('^((?!autowaiter).)*$');var L=[];b._findControls=function(o){if(o.ancestor){var A={};if($.isArray(o.ancestor)){A={id:o.ancestor[0]};}else{A=o.ancestor;}var c=b._findControls(A)[0];if(!c){return[];}var d=$.extend({},o,{matchers:{ancestor:c}});delete d.ancestor;return b._findControls(d);}else{var C=p._getFilteredControlsByDeclaration(o);var r;if(C===a.FILTER_FOUND_NO_CONTROLS){r=[];}else{r=$.isArray(C)?C:[C];}return r;}};b._findElements=function(o){l.start();var c=b._findControls(o);var g=function(C){return new P().$(C)[0]||C.getDomRef();};var e=c.map(function(C){switch(o.interaction){case"root":return C.getDomRef();case"focus":return C.getFocusDomRef();case"press":var i=new P()._getAdapter(C.getMetadata());return C.$(i)[0];case"auto":return g(C);default:i=o.interaction&&o.interaction.idSuffix;return i?C.$(i)[0]:g(C);}});L.push(l.getAndClearLog());l.stop();return e;};b._getControlForElement=function(e){var s=Object.prototype.toString.call(e)==="[object String]"?"#"+e:e;var c=b._getIdentifiedDOMElement(s).control();return c&&c[0];};b._getControlProperty=function(c,s){var d=$.extend({},c.mProperties,{id:c.getId()});return Object.keys(d).indexOf(s)>-1?d[s]:null;};b._getDomElementIDSuffix=function(e){var i=e.id;var d="-";if(!M.isGeneratedId(i)){var D;var c=1;while(c<i.length-1&&!D){if(i[c]===d&&i[c-1]!==d&&i[c+1]!==d){D=c;}else{c++;}}if(D){var C=i.substring(D+1);if(!C.match(/[0-9]$/)){return C;}}}};b._getIdentifiedDOMElement=function(s){return $(s).closest("[data-sap-ui]");};b._getLatestLog=function(){return L&&L.pop();};return b;});
