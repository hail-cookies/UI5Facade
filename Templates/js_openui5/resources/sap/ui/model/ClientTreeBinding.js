/*!
  * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ChangeReason','./TreeBinding','sap/ui/model/SorterProcessor','sap/ui/model/FilterProcessor','sap/ui/model/FilterType',"sap/ui/thirdparty/jquery"],function(C,T,S,F,a,q){"use strict";var b=T.extend("sap.ui.model.ClientTreeBinding",{constructor:function(m,p,c,A,P,s){T.apply(this,arguments);if(!this.oContext){this.oContext="";}this._mLengthsCache={};this.filterInfo={};this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};this.oCombinedFilter=null;if(A){this.oModel.checkFilterOperation(A);if(this.oModel._getObject(this.sPath,this.oContext)){this.filter(A,a.Application);}}}});b.prototype.getRootContexts=function(s,l){if(!s){s=0;}if(!l){l=this.oModel.iSizeLimit;}var r=this.oModel.resolve(this.sPath,this.oContext),t=this,c,o,d;if(!r){return[];}if(!this.oModel.isList(r)){o=this.oModel.getContext(r);if(this.bDisplayRootNode){c=[o];}else{c=this.getNodeContexts(o,s,l);}}else{c=[];d=this._sanitizePath(r);q.each(this.oModel._getObject(d),function(i,O){t._saveSubContext(O,c,d,i);});this._applySorter(c);this._setLengthCache(d,c.length);c=c.slice(s,s+l);}return c;};b.prototype.getNodeContexts=function(c,s,l){if(!s){s=0;}if(!l){l=this.oModel.iSizeLimit;}var d=this._sanitizePath(c.getPath());var e=[],t=this,n=this.oModel._getObject(d),A=this.mParameters&&this.mParameters.arrayNames,k;if(n){if(Array.isArray(n)){n.forEach(function(o,i){t._saveSubContext(o,e,d,i);});}else{k=A||Object.keys(n);k.forEach(function(K){var o=n[K];if(o){if(Array.isArray(o)){o.forEach(function(f,g){t._saveSubContext(f,e,d,K+"/"+g);});}else if(typeof o=="object"){t._saveSubContext(o,e,d,K);}}});}}this._applySorter(e);this._setLengthCache(d,e.length);return e.slice(s,s+l);};b.prototype.hasChildren=function(c){if(c==undefined){return false;}return this.getChildCount(c)>0;};b.prototype.getChildCount=function(c){var p=c?c.sPath:this.getPath();if(this.oContext){p=this.oModel.resolve(p,this.oContext);}p=this._sanitizePath(p);if(this._mLengthsCache[p]===undefined){if(c){this.getNodeContexts(c);}else{this.getRootContexts();}}return this._mLengthsCache[p];};b.prototype._sanitizePath=function(c){if(!c.endsWith("/")){c=c+"/";}if(!c.startsWith("/")){c="/"+c;}return c;};b.prototype._saveSubContext=function(n,c,s,N){if(n&&typeof n=="object"){var o=this.oModel.getContext(s+N);if(this.oCombinedFilter&&!this.bIsFiltering){if(this.filterInfo.aFilteredContexts.indexOf(o)!=-1){c.push(o);}}else{c.push(o);}}};b.prototype.filter=function(f,s){if(f&&!Array.isArray(f)){f=[f];}this.oModel.checkFilterOperation(f);if(s==a.Application){this.aApplicationFilters=f||[];}else if(s==a.Control){this.aFilters=f||[];}else{this.aFilters=f||[];this.aApplicationFilters=[];}this.oCombinedFilter=F.combineFilters(this.aFilters,this.aApplicationFilters);if(this.oCombinedFilter){this.applyFilter();}this._mLengthsCache={};this._fireChange({reason:"filter"});this._fireFilter({filters:f});return this;};b.prototype.applyFilter=function(){this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};this._applyFilterRecursive();};b.prototype._applyFilterRecursive=function(p){var t=this,f=[];if(!this.oCombinedFilter){return;}this.bIsFiltering=true;var u;if(p){u=this.getNodeContexts(p,0,Number.MAX_VALUE);}else{u=this.getRootContexts(0,Number.MAX_VALUE);}this.bIsFiltering=false;if(u.length>0){q.each(u,function(i,c){c._parentContext=p;t._applyFilterRecursive(c);});f=F.apply(u,this.oCombinedFilter,function(c,P){return t.oModel.getProperty(P,c);});if(f.length>0){q.merge(this.filterInfo.aFilteredContexts,f);this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p;}if(u.indexOf(this.filterInfo.oParentContext)!=-1){this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p;}}};b.prototype.sort=function(s){s=s||[];this.aSorters=Array.isArray(s)?s:[s];this._fireChange({reason:C.Sort});return this;};b.prototype._applySorter=function(c){var t=this;S.apply(c,this.aSorters,function(o,p){return t.oModel.getProperty(p,o);},function(o){return o.getPath();});};b.prototype._setLengthCache=function(k,l){this._mLengthsCache[k]=l;};b.prototype.checkUpdate=function(f){this.applyFilter();this._mLengthsCache={};this._fireChange();};return b;});
