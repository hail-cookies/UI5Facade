/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseTreeModifier","sap/ui/base/DataType"],function(B,D){"use strict";var X={targets:"xmlTree",setVisible:function(c,v){if(v){c.removeAttribute("visible");}else{this.setProperty(c,"visible",v);}},getVisible:function(c){return this.getProperty(c,"visible");},setStashed:function(c,p){this.setProperty(c,"stashed",p);},getStashed:function(c){return this.getProperty(c,"stashed");},bindProperty:function(c,p,b){c.setAttribute(p,"{"+b+"}");},setProperty:function(c,p,P){c.setAttribute(p,P);},getProperty:function(c,p){var P=this._getControlMetadata(c).getProperty(p);var v=c.getAttribute(p);if(P){var t=P.getType();if(v===null){v=P.getDefaultValue()||t.getDefaultValue();}else{v=t.parseValue(v);}}return v;},setPropertyBinding:function(c,p,P){c.setAttribute(p,P);},getPropertyBinding:function(c,p){return c.getAttribute(p);},createControl:function(c,a,v,s,S){var i,l;if(!this.bySelector(s,a,v)){var C=c.split('.');var n="";if(C.length>1){l=C.pop();n=C.join('.');}var N=v.ownerDocument.createElementNS(n,l);i=this.getControlIdBySelector(s,a);if(i){N.setAttribute("id",i);}if(S){var V;Object.keys(S).forEach(function(k){V=S[k];N.setAttribute(k,V);});}return N;}else{throw new Error("Can't create a control with duplicated id "+i);}},_byId:function(i,v){if(v){if(v.ownerDocument&&v.ownerDocument.getElementById&&v.ownerDocument.getElementById(i)){return v.ownerDocument.getElementById(i);}else{return v.querySelector("[id='"+i+"']");}var n=jQuery.sap.byId(i,v);if(n.length===1){return n[0];}}},getId:function(c){return c.getAttribute("id");},getParent:function(c){var p=c.parentNode;if(!this.getId(p)){p=p.parentNode;}return p;},_getLocalName:function(x){return x.localName||x.baseName||x.nodeName;},getControlType:function(c){var C=c.namespaceURI;C=(C?C+".":"");C+=this._getLocalName(c);return C;},getAllAggregations:function(c){var C=this._getControlMetadata(c);return C.getAllAggregations();},getAggregation:function(p,n){var a=this._findAggregationNode(p,n);var s=this._isSingleValueAggregation(p,n);if(!a){if(s&&this._isAltTypeAggregation(p,n)){return this.getProperty(p,n);}return s?undefined:[];}var c=this._getControlsInAggregation(p,a);if(s){return c[0];}return c;},insertAggregation:function(p,n,o,i,v){var a=this._findAggregationNode(p,n);if(!a){var N=p.namespaceURI;a=this.createControl(N+"."+n,undefined,v);p.appendChild(a);}if(i>=a.childElementCount){a.appendChild(o);}else{var r=this._getControlsInAggregation(p,a)[i];a.insertBefore(o,r);}},removeAggregation:function(p,n,o){var a=this._findAggregationNode(p,n);a.removeChild(o);},removeAllAggregation:function(c,n){var a=this._findAggregationNode(c,n);if(c===a){var C=this._getControlsInAggregation(c,c);C.forEach(function(o){c.removeChild(o);});}else{c.removeChild(a);}},_findAggregationNode:function(p,n){var a;var c=this._children(p);for(var i=0;i<c.length;i++){var N=c[i];if(N.localName===n){a=N;break;}}if(!a&&this._isDefaultAggregation(p,n)){a=p;}return a;},_isDefaultAggregation:function(p,a){var c=this._getControlMetadata(p);var d=c.getDefaultAggregation();return d&&a===d.name;},_isNotNamedAggregationNode:function(p,c){var a=this.getAllAggregations(p);var A=a[c.localName];return p.namespaceURI!==c.namespaceURI||!A;},_isSingleValueAggregation:function(p,a){var A=this.getAllAggregations(p);var o=A[a];return!o.multiple;},_isAltTypeAggregation:function(p,a){var c=this._getControlMetadata(p);var A=c.getAllAggregations()[a];return!!A.altTypes;},_getControlMetadata:function(c){var C=this.getControlType(c);jQuery.sap.require(C);var a=jQuery.sap.getObject(C);return a.getMetadata();},_getControlsInAggregation:function(p,a){var c=Array.prototype.slice.call(this._children(a));return c.filter(this._isNotNamedAggregationNode.bind(this,p));},_children:function(p){if(p.children){return p.children;}else{var c=[];for(var i=0;i<p.childNodes.length;i++){var n=p.childNodes[i];if(n.nodeType===n.ELEMENT_NODE){c.push(n);}}return c;}},getBindingTemplate:function(c,a){var A=this._findAggregationNode(c,a);if(A&&A.childNodes.length===1){return A.childNodes[0];}},updateAggregation:function(c,a){}};return jQuery.sap.extend(true,{},B,X);},true);
