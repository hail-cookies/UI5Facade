/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/core/Control','sap/ui/core/ResizeHandler','./library','./DataSetRenderer','sap/ui/model/SelectionModel','sap/ui/commons/SegmentedButton','sap/ui/commons/SearchField','sap/ui/commons/Toolbar','sap/ui/commons/Button','sap/base/Log'],function(q,C,R,a,D,S,b,c,T,B,L){"use strict";var d=C.extend("sap.ui.ux3.DataSet",{metadata:{library:"sap.ui.ux3",properties:{showToolbar:{type:"boolean",group:"Misc",defaultValue:true},showFilter:{type:"boolean",group:"Misc",defaultValue:true},showSearchField:{type:"boolean",group:"Misc",defaultValue:true},multiSelect:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{items:{type:"sap.ui.ux3.DataSetItem",multiple:true,singularName:"item",bindable:"bindable"},views:{type:"sap.ui.ux3.DataSetView",multiple:true,singularName:"view"},filter:{type:"sap.ui.core.Control",multiple:true,singularName:"filter"},_viewSwitches:{type:"sap.ui.core.Control",multiple:true,singularName:"_viewSwitch",visibility:"hidden"},_toolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"}},associations:{selectedView:{type:"sap.ui.ux3.DataSetView",multiple:false}},events:{selectionChanged:{parameters:{oldLeadSelectedIndex:{type:"int"},newLeadSelectedIndex:{type:"int"}}},search:{parameters:{query:{type:"string"}}}}}});d.prototype.init=function(){var t=this,o;this.selectionModel=new S(sap.ui.model.SelectionModel.SINGLE_SELECTION);this._oSegBut=new b();this._oSegBut.attachSelect(function(e){t.press(e);},t);this._oSegBut.show=false;this._oSearchField=new c(this.getId()+"-searchValue");this._oSearchField.setShowListExpander(false);this._oSearchField.setEnableListSuggest(false);this._oSearchField.setEnableFilterMode(true);this._oSearchField.setEnableClear(true);this._oSearchField.show=false;t=this;this._oSearchField.attachSearch(function(e){t.fireSearch(e.getParameters());});this.selectionModel.attachSelectionChanged(function(e){var f,n;var p=e.getParameters();if(p){n=p.leadIndex;f=p.oldIndex;}t.fireSelectionChanged({oldLeadSelectedIndex:f,newLeadSelectedIndex:n});L.debug("Selection Change fired");});o=new T();this._setToolbar(o);this._iShiftStart=null;};d.prototype.exit=function(){this._oSegBut.destroy();this._oSearchField.destroy();this.destroyAggregation("_toolbar");};d.prototype._prepareToolbar=function(){var v=this.getViews().length,t=this._getToolbar();if(v>1&&this._oSegBut.show==false){t.insertItem(this._oSegBut,0);this._oSegBut.show=true;}else if(v<=1&&this._oSegBut.show){t.removeItem(this._oSegBut);this._oSegBut.show=false;}if(this.getShowSearchField()&&this._oSearchField.show==false){t.insertRightItem(this._oSearchField,t.getRightItems().length);this._oSearchField.show=true;}else if(!this.getShowSearchField()&&this._oSearchField.show==true){t.removeRightItem(this._oSearchField);this._oSearchField.show=false;}};d.prototype.press=function(e,s){var o=e.getParameters().selectedButtonId,v=o.substring(o.lastIndexOf('-')+1),f=sap.ui.getCore().byId(this.getSelectedView());f.exitView(this.getItems());this.setSelectedView(v);};d.prototype.filter=function(){this.fireFilter({filterValue:this.getFilterValue()});};d.prototype.sort=function(){this.fireSort();};d.prototype.addSelectionInterval=function(i,I){this.selectionModel.addSelectionInterval(i,I);return this;};d.prototype.setSelectionInterval=function(i,I){this.selectionModel.setSelectionInterval(i,I);return this;};d.prototype.removeSelectionInterval=function(i,I){this.selectionModel.removeSelectionInterval(i,I);return this;};d.prototype.getSelectedIndex=function(){return this.selectionModel.getLeadSelectedIndex();};d.prototype.getSelectedIndices=function(){return this.selectionModel.getSelectedIndices()||[];};d.prototype.clearSelection=function(){this.selectionModel.clearSelection();return this;};d.prototype.selectItem=function(e){var p=e.getParameters(),i=e.getParameters().itemId,I=sap.ui.getCore().byId(i),f=this.getItems(),g=f.indexOf(I),o=this.getLeadSelection();if(!this.getMultiSelect()){if(o==g&&!p.shift){this.setLeadSelection(-1);}else{this.setLeadSelection(g);}this._iShiftStart=null;}else{if(p.ctrl){if(!this.isSelectedIndex(g)){this.addSelectionInterval(g,g);}else{this.removeSelectionInterval(g,g);}if(this._iShiftStart>=0){this._iShiftStart=g;}}if(p.shift){if(!this._iShiftStart&&this._iShiftStart!==0){this._iShiftStart=o;}if(this._iShiftStart>=0&&p.ctrl){this.addSelectionInterval(this._iShiftStart,g);}else if(this._iShiftStart>=0&!p.ctrl){this.setSelectionInterval(this._iShiftStart,g);}else{this.setLeadSelection(g);this._iShiftStart=g;}}if(!p.shift&&!p.ctrl){if(o==g&&g!=this._iShiftStart){this.setLeadSelection(-1);}else{this.setLeadSelection(g);}this._iShiftStart=null;}}};d.prototype.prepareRendering=function(){var v,V=this.getViews().length;if(V==0){return;}this._prepareToolbar();if(this._bDirty){v=sap.ui.getCore().byId(this.getSelectedView());if(v.exitView){v.exitView(this.getItems());}if(v.initView){v.initView(this.getItems());}this._bDirty=false;}};d.prototype.getLeadSelection=function(){return this.selectionModel.getLeadSelectedIndex();};d.prototype.setLeadSelection=function(i){this.selectionModel.setLeadSelectedIndex(i);};d.prototype.isSelectedIndex=function(i){return(this.selectionModel.isSelectedIndex(i));};d.prototype.getSelectedItemId=function(i){return this.getItems()[i].getId();};d.prototype.createViewSwitch=function(v,i){var V;if(v.getIcon()){V=new B({id:this.getId()+"-view-"+v.getId(),lite:true,icon:v.getIcon(),iconHovered:v.getIconHovered(),iconSelected:v.getIconSelected()});}else if(v.getName()){V=new B({id:this.getId()+"-view-"+v.getId(),text:v.getName(),lite:true});}else{V=new B({id:this.getId()+"-view-"+v.getId(),text:v.getId(),lite:true});}V._viewIndex=i;return V;};d.prototype._rerenderToolbar=function(){var $=this.$("toolbar");this._prepareToolbar();if($.length>0){var r=sap.ui.getCore().createRenderManager();D.renderToolbar(r,this);r.flush($[0]);r.destroy();}};d.prototype._rerenderFilter=function(){var $=this.$("filter");if($.length>0){var r=sap.ui.getCore().createRenderManager();D.renderFilterArea(r,this);r.flush($[0]);if(this.getShowFilter()){$.removeClass("noPadding");}else{$.addClass("noPadding");}r.destroy();}};d.prototype.setMultiSelect=function(m){this.clearSelection();if(!m){this.setProperty("multiSelect",false);if(!!this.selectionModel){this.selectionModel.setSelectionMode(sap.ui.model.SelectionModel.SINGLE_SELECTION);}}else{this.setProperty("multiSelect",true);if(!!this.selectionModel){this.selectionModel.setSelectionMode(sap.ui.model.SelectionModel.MULTI_SELECTION);}}return this;};d.prototype.removeItem=function(i){var r=this.removeAggregation("items",i,true);if(r){r.detachSelected(this.selectItem,this);r.destroyAggregation("_template",true);this._bDirty=true;}return r;};d.prototype.removeAllItems=function(){var I=this.getItems(),r;q.each(I,function(i,o){o.destroyAggregation("_template",true);o.detachSelected(this.selectItem,this);});r=this.removeAllAggregation("items");this._bDirty=true;return r;};d.prototype.destroyItems=function(){var r=this.destroyAggregation("items");this._bDirty=true;this.invalidate();return r;};d.prototype.addItem=function(i){this.addAggregation("items",i,true);i.attachSelected(this.selectItem,this);this._bDirty=true;return this;};d.prototype.insertItem=function(i,I){this.insertAggregation("items",i,I,true);i.attachSelected(this.selectItem,this);this._bDirty=true;return this;};d.prototype.setFilterValue=function(f){this.setProperty("filterValue",f,true);return this;};d.prototype.getFilterValue=function(){return this.getProperty("filterValue");};d.prototype.insertView=function(v,i){var V=this.createViewSwitch(v,i,true);if(!this.getSelectedView()){this.setSelectedView(v);}this.insertAggregation("views",v,i);this._oSegBut.insertButton(V,i);this._rerenderToolbar();return this;};d.prototype.addView=function(v){var i=this.getViews().length,V=this.createViewSwitch(v,i);if(!this.getSelectedView()){this.setSelectedView(v);}this.addAggregation("views",v,true);this._oSegBut.addButton(V);this._rerenderToolbar();return this;};d.prototype.removeView=function(v){var r=this.removeAggregation("views",v,true);if(r){if(this.getSelectedView()==r.getId()){this.setSelectedView(this.getViews()[0]);this._bDirty=true;r.invalidate();}else{this._rerenderToolbar();}this._oSegBut.removeButton(this.getId()+"-view-"+r.getId()).destroy();}return r;};d.prototype.destroyViews=function(){this._oSegBut.destroyButtons();this.destroyAggregation("views");return this;};d.prototype.removeAllViews=function(){var r=this.removeAllAggregation("views");this._oSegBut.destroyButtons();return r;};d.prototype.setEnableSorting=function(e){this.setProperty("enableSorting",e,true);this._rerenderToolbar();return this;};d.prototype.setEnableFiltering=function(e){this.setProperty("enableFiltering",e,true);this._rerenderToolbar();return this;};d.prototype.setSelectedView=function(v){var o=this.getSelectedView();this.setAssociation("selectedView",v);if(o!=this.getSelectedView()){this._bDirty=true;}if(this.getId()+"-view-"+this.getSelectedView()!==this._oSegBut.getSelectedButton()){this._oSegBut.setSelectedButton(this.getId()+"-view-"+this.getSelectedView());}return this;};d.prototype.addToolbarItem=function(t){this._getToolbar().addItem(t);this._rerenderToolbar();};d.prototype.removeToolbarItem=function(t){this._getToolbar().removeItem(t);this._rerenderToolbar();};d.prototype.setShowToolbar=function(s){this.setProperty("showToolbar",s,true);this._rerenderToolbar();return this;};d.prototype.setShowFilter=function(s){this.setProperty("showFilter",s,true);this._rerenderFilter();return this;};d.prototype.setShowSearchField=function(s){this.setProperty("showSearchField",s,true);this._rerenderToolbar();return this;};d.prototype._setToolbar=function(t){this.setAggregation("_toolbar",t,true);this._rerenderToolbar();};d.prototype._getToolbar=function(){return this.getAggregation("_toolbar");};d.prototype.refreshItems=function(){var o=this.getBinding("items"),s=sap.ui.getCore().byId(this.getSelectedView());o.bUseExtendedChangeDetection=true;if(s&&s.getItemCount&&s.getItemCount()){var i=Math.max(s.getItemCount(),this.getItems().length);if(i){o.getContexts(0,i);}else{o.getContexts();}}else{o.getContexts();}};d.prototype.updateItems=function(s){var o=this.mBindingInfos["items"],A=this.getMetadata().getAggregation("items"),e=sap.ui.getCore().byId(this.getSelectedView()),f=o.binding,F=o.factory,g,I,h,j,t=this,k=[];f.bUseExtendedChangeDetection=true;if(e&&e.getItemCount&&e.getItemCount()){var m=Math.max(e.getItemCount(),this.getItems().length);if(m){k=f.getContexts(0,m);}else{k=f.getContexts();}}else{k=f.getContexts();}if(k.diff&&s){var n=k.diff;for(var i=0;i<n.length;i++){I=this.getItems();j=n[i].index;if(n[i].type==="delete"){h=I[j];n[i].item=h;this.removeItem(h);}else if(k.diff[i].type==="insert"){h=F("",k[j]);h.setBindingContext(k[j],o.model);n[i].item=h;this.insertItem(h,j);}}if(e&&e.updateView){e.updateView(n);}}else{this[A._sDestructor]();q.each(k,function(j,p){var r=t.getId()+"-"+j;g=F(r,p);g.setBindingContext(p,o.model);t[A._sMutator](g);});}I=this.getItems();for(var i=0,l=k.length;i<l;i++){I[i].setBindingContext(k[i],o.model);}};return d;});
