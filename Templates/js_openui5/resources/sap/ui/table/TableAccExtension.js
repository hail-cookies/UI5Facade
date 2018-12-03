/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","./TableExtension","./TableAccRenderExtension","./TableUtils","sap/ui/Device"],function(C,l,T,a,b,D){"use strict";var S=l.SelectionMode;var c=b.CELLTYPE;var A={getAccInfoOfControl:function(o){if(o&&typeof o.getAccessibilityInfo==="function"){if(typeof o.getVisible==="function"&&!o.getVisible()){return A._normalize({});}var s=o.getAccessibilityInfo();if(s){var t={};A._flatten(s,t);return t;}}return null;},_normalize:function(i){if(!i){return null;}if(i._normalized){return i;}i.role=i.role||"";i.type=i.type||"";i.description=i.description||"";i.enabled=(i.enabled===true||i.enabled===false)?i.enabled:null;i.editable=(i.editable===true||i.editable===false)?i.editable:null;i.children=i.children||[];i._normalized=true;return i;},_flatten:function(s,t,L){L=L?L:0;A._normalize(s);if(L==0){A._normalize(t);t._descriptions=[];}t._descriptions.push(A._getFullDescription(s));s.children.forEach(function(o){if(!o.getAccessibilityInfo||(o.getVisible&&!o.getVisible())){return;}var e=o.getAccessibilityInfo();if(e){A._flatten(e,t,L+1);}});if(L==0){t.description=t._descriptions.join(" ").trim();t._descriptions=undefined;}},_getFullDescription:function(i){var s=i.type+" "+i.description;if(i.enabled===false){s=s+" "+b.getResourceText("TBL_CTRL_STATE_DISABLED");}else if(i.editable===false){s=s+" "+b.getResourceText("TBL_CTRL_STATE_READONLY");}return s.trim();}};var E={getColumnIndexOfFocusedCell:function(e){var t=e.getTable();var i=b.getFocusedItemInfo(t);return i.cellInRow-(b.hasRowHeader(t)?1:0);},getInfoOfFocusedCell:function(e){var t=e.getTable();var i=t._getItemNavigation();var o=t.getDomRef();if(!e.getAccMode()||!o||!i){return null;}var f=i.getFocusedDomRef();if(!f||f!==document.activeElement){return null;}return b.getCellInfo(f);},getRelevantColumnHeaders:function(t,o){if(!t||!o){return[];}var h=b.getHeaderRowCount(t),s=o.getId(),L=[s];if(h>1){for(var i=1;i<h;i++){L.push(s+"_"+i);}var e=b.Column.getParentSpannedColumns(t,s);if(e&&e.length){for(var i=0;i<e.length;i++){var f=e[i].level;var p=e[i].column.getId();L[f]=f===0?p:(p+"_"+f);}}}return L;},isHiddenCell:function($,o){var g=b.Grouping.isInGroupingRow($);var s=b.Grouping.isInSumRow($);var e=!!o&&!!o.hasStyleClass;var i=$.parent().hasClass("sapUiTableRowHidden");var I=$.hasClass("sapUiTableCellHidden");var n=g&&$.hasClass("sapUiTableTdFirst")&&!$.hasClass("sapUiTableMeasureCell");var G=g&&e&&o.hasStyleClass("sapUiAnalyticalTableGroupCellHidden");var f=s&&e&&o.hasStyleClass("sapUiAnalyticalTableSumCellHidden");return i||I||n||G||f;},isTreeColumnCell:function(e,$){return b.Grouping.isTreeMode(e.getTable())&&$.hasClass("sapUiTableTdFirst");},getColumnTooltip:function(o){if(!o){return null;}var t=o.getTooltip_AsString();if(t){return t;}var L=o.getLabel();if(L instanceof C){t=L.getTooltip_AsString();}if(t){return t;}return null;},updateRowColCount:function(e){var t=e.getTable(),i=t._getItemNavigation(),I=false,f=false,g=false;if(i){var h=E.getColumnIndexOfFocusedCell(e)+1;var r=b.getRowIndexOfFocusedCell(t)+t._getFirstRenderedRowIndex()+1;var j=b.getVisibleColumnCount(t)+(b.hasRowActions(t)?1:0);var R=b.isNoDataVisible(t)?0:b.getTotalRowCount(t,true);I=e._iLastRowNumber!=r||(e._iLastRowNumber==r&&e._iLastColumnNumber==h);f=e._iLastColumnNumber!=h;g=!e._iLastRowNumber&&!e._iLastColumnNumber;t.$("rownumberofrows").text(I?b.getResourceText("TBL_ROW_ROWCOUNT",[r,R]):" ");t.$("colnumberofcols").text(f?b.getResourceText("TBL_COL_COLCOUNT",[h,j]):" ");t.$("ariacount").text(g?b.getResourceText("TBL_DATA_ROWS_COLS",[R,j]):" ");e._iLastRowNumber=r;e._iLastColumnNumber=h;}return{rowChange:I,colChange:f,initial:g};},cleanupCellModifications:function(e){if(e._cleanupInfo){e._cleanupInfo.cell.attr(e._cleanupInfo.attr);e._cleanupInfo=null;}},storeDefaultsBeforeCellModifications:function(e,$,f,g){e._cleanupInfo={cell:$,attr:{"aria-labelledby":f&&f.length?f.join(" "):null,"aria-describedby":g&&g.length?g.join(" "):null}};},performCellModifications:function(e,$,f,g,L,h,t,i){E.storeDefaultsBeforeCellModifications(e,$,f,g);var o=E.updateRowColCount(e);e.getTable().$("cellacc").text(t||" ");if(i){i(L,h,o.rowChange,o.colChange,o.initial);}var s="";if(o.initial){var j=e.getTable();s=j.getAriaLabelledBy().join(" ")+" "+j.getId()+"-ariadesc "+j.getId()+"-ariacount";if(j.getSelectionMode()!==S.None){s=s+" "+j.getId()+"-ariaselection";}}if(L&&L.length){s=s+" "+L.join(" ");}$.attr({"aria-labelledby":s?s:null,"aria-describedby":h&&h.length?h.join(" "):null});},modifyAccOfDATACELL:function($,o){var t=this.getTable(),s=t.getId(),i=t._getItemNavigation();if(!i){return;}var r=b.getRowIndexOfFocusedCell(t),e=E.getColumnIndexOfFocusedCell(this),f=b.getRowColCell(t,r,e,false),I=null,h=E.isHiddenCell($,f.cell),g=E.isTreeColumnCell(this,$),j=b.Grouping.isInGroupingRow($),k=b.Grouping.isInSumRow($),m=E.getAriaAttributesFor(this,d.ELEMENTTYPES.DATACELL,{index:e,column:f.column,fixed:b.isFixedColumn(t,e)})["aria-labelledby"]||[],n=[],L=[s+"-rownumberofrows",s+"-colnumberofcols"];if(j){L.push(s+"-ariarowgrouplabel");L.push(s+"-rows-row"+r+"-groupHeader");}if(k){var p=$.parent().data("sap-ui-level");if(p==0){L.push(s+"-ariagrandtotallabel");}else if(p>0){L.push(s+"-ariagrouptotallabel");L.push(s+"-rows-row"+r+"-groupHeader");}}if(b.hasRowHighlights(t)&&!j&&!k){L.push(f.row.getId()+"-highlighttext");}L=L.concat(m);if(!h){I=A.getAccInfoOfControl(f.cell);L.push(I?(s+"-cellacc"):f.cell.getId());if(b.getInteractiveElements($)!==null){n.push(s+"-toggleedit");}if(b.Grouping.isTreeMode(t)&&!!$.parent().attr("aria-selected")){L.push(s+"-ariarowselected");}}var q=I?I.description:" ";if(g&&!h){var u=E.getAriaAttributesFor(this,d.ELEMENTTYPES.TREEICON,{row:f.row});if(u&&u["aria-label"]){q=u["aria-label"]+" "+q;}}E.performCellModifications(this,$,m,null,L,n,q,function(L,n,R,v,w){if(!h&&b.isRowSelectionAllowed(t)&&R){n.push(f.row.getId()+"-rowselecttext");}});},modifyAccOfROWHEADER:function($,o){var t=this.getTable(),s=t.getId(),i=b.Grouping.isInGroupingRow($),I=b.Grouping.isInSumRow($),r=t.getRows()[$.attr("data-sap-ui-rowindex")],e=E.getAriaAttributesFor(this,d.ELEMENTTYPES.ROWHEADER)["aria-labelledby"]||[],L=e.concat([s+"-rownumberofrows"]);if(!I&&!i){if(!$.hasClass("sapUiTableRowHidden")){L.push(r.getId()+"-rowselecttext");if(b.hasRowHighlights(t)){L.push(r.getId()+"-highlighttext");}}}if(i){L.push(s+"-ariarowgrouplabel");}if(I){var f=$.data("sap-ui-level");if(f==0){L.push(s+"-ariagrandtotallabel");}else if(f>0){L.push(s+"-ariagrouptotallabel");}}E.performCellModifications(this,$,e,null,L,null,null);},modifyAccOfCOLUMNHEADER:function($,o){var t=this.getTable(),e=sap.ui.getCore().byId($.attr("data-sap-ui-colid")),m=E.getAriaAttributesFor(this,d.ELEMENTTYPES.COLUMNHEADER,{headerId:$.attr("id"),column:e,index:$.attr("data-sap-ui-colindex")}),s=E.getColumnTooltip(e),L=[t.getId()+"-colnumberofcols"].concat(m["aria-labelledby"]),f=b.getCellInfo($),i=f.columnSpan;if(i>1){L.push(t.getId()+"-ariacolspan");t.$("ariacolspan").text(b.getResourceText("TBL_COL_DESC_SPAN",[""+i]));}if(s){L.push(t.getId()+"-cellacc");}if(i<=1&&e&&e.getSorted()){L.push(t.getId()+(e.getSortOrder()==="Ascending"?"-ariacolsortedasc":"-ariacolsorteddes"));}if(i<=1&&e&&e.getFiltered()){L.push(t.getId()+"-ariacolfiltered");}if(i<=1&&$.attr("aria-haspopup")==="true"){L.push(t.getId()+"-ariacolmenu");}E.performCellModifications(this,$,m["aria-labelledby"],m["aria-describedby"],L,m["aria-describedby"],s);},modifyAccOfCOLUMNROWHEADER:function($,o){var t=this.getTable(),e=$.hasClass("sapUiTableSelAllEnabled");t.$("sapUiTableGridCnt").removeAttr("role");var m=E.getAriaAttributesFor(this,d.ELEMENTTYPES.COLUMNROWHEADER,{enabled:e,checked:e&&!t.$().hasClass("sapUiTableSelAll")});E.performCellModifications(this,$,m["aria-labelledby"],m["aria-describedby"],m["aria-labelledby"],m["aria-describedby"],null);},modifyAccOfROWACTION:function($,o){var t=this.getTable(),s=t.getId(),i=b.Grouping.isInGroupingRow($),I=b.Grouping.isInSumRow($),r=$.attr("data-sap-ui-rowindex"),R=t.getRows()[r],h=E.isHiddenCell($),e=E.getAriaAttributesFor(this,d.ELEMENTTYPES.ROWACTION)["aria-labelledby"]||[],L=[s+"-rownumberofrows",s+"-colnumberofcols"].concat(e),f=[];if(i){L.push(s+"-ariarowgrouplabel");L.push(s+"-rows-row"+r+"-groupHeader");}if(I){var g=$.data("sap-ui-level");if(g==0){L.push(s+"-ariagrandtotallabel");}else if(g>0){L.push(s+"-ariagrouptotallabel");L.push(s+"-rows-row"+r+"-groupHeader");}}if(!I&&!i&&$.attr("aria-selected")=="true"){L.push(s+"-ariarowselected");}if(b.hasRowHighlights(t)&&!i&&!I){L.push(R.getId()+"-highlighttext");}var j="";if(!h){var k=R.getAggregation("_rowAction");if(k){var m=k.getAccessibilityInfo();if(m){L.push(s+"-cellacc");j=m.description;if(b.getInteractiveElements($)!==null){f.push(s+"-toggleedit");}}}}E.performCellModifications(this,$,e,[],L,f,j);},getAriaAttributesFor:function(e,t,p){var m={},o=e.getTable(),s=o.getId();function f(o,u,O,v){var M="";if(O&&v){M="overlay,nodata";}else if(O&&!v){M="overlay";}else if(!O&&v){M="nodata";}var w=false;if(O&&o.getShowOverlay()||v&&b.isNoDataVisible(o)){w=true;}if(w){m["aria-hidden"]="true";}if(M){m["data-sap-ui-table-acc-covered"]=M;}}switch(t){case d.ELEMENTTYPES.COLUMNROWHEADER:m["aria-labelledby"]=[s+"-ariacolrowheaderlabel"];var g=false;m["role"]=["button"];if(p&&p.enabled){m["aria-pressed"]=p.checked?"true":"false";}else{g=true;m["aria-disabled"]="true";m["aria-pressed"]="false";}if(g||!o._getShowStandardTooltips()){m["aria-labelledby"].push(s+"-ariaselectall");}break;case d.ELEMENTTYPES.ROWHEADER:m["aria-labelledby"]=[s+"-ariarowheaderlabel"];if(!b.Grouping.isTreeMode(o)){m["role"]=["rowheader"];}if(o.getSelectionMode()!==S.None&&(!p||!p.rowHidden)){var h=p&&p.rowSelected;m["aria-selected"]=""+h;var j=e.getAriaTextsForSelectionMode(true);m["title"]=j.mouse[h?"rowDeselect":"rowSelect"];}break;case d.ELEMENTTYPES.ROWACTION:m["role"]=["gridcell"];m["aria-labelledby"]=[s+"-rowacthdr"];if(o.getSelectionMode()!==S.None&&(!p||!p.rowHidden)){var h=p&&p.rowSelected;m["aria-selected"]=""+h;}break;case d.ELEMENTTYPES.COLUMNHEADER:var k=p&&p.column;var H=p&&p.colspan;m["role"]="columnheader";var L=[];if(p&&p.headerId){var n=E.getRelevantColumnHeaders(o,k);var I=n.indexOf(p.headerId);L=I>0?n.slice(0,I+1):[p.headerId];}for(var i=0;i<L.length;i++){L[i]=L[i]+"-inner";}m["aria-labelledby"]=L;if(p&&(p.index<o.getComputedFixedColumnCount())){m["aria-labelledby"].push(s+"-ariafixedcolumn");}if(!H&&k&&k.getSorted()){m["aria-sort"]=k.getSortOrder()==="Ascending"?"ascending":"descending";}if(!H&&k&&k._menuHasItems()){m["aria-haspopup"]="true";}break;case d.ELEMENTTYPES.DATACELL:m["role"]="gridcell";var L=[],k=p&&p.column?p.column:null;if(k){L=E.getRelevantColumnHeaders(o,k);m["headers"]=L.join(" ");for(var i=0;i<L.length;i++){L[i]=L[i]+"-inner";}if(p&&p.fixed){L.push(s+"-ariafixedcolumn");}}m["aria-labelledby"]=L;if(b.Grouping.isTreeMode(o)&&p&&p.firstCol&&p.row){var B=o.mBindingInfos["rows"];if(p.row.getBindingContext(B&&B.model)){m["aria-level"]=p.row._iLevel+1;m["aria-expanded"]=""+p.row._bIsExpanded;}}break;case d.ELEMENTTYPES.ROOT:break;case d.ELEMENTTYPES.TABLE:m["role"]="presentation";f(o,m,true,true);break;case d.ELEMENTTYPES.CONTENT:m["role"]=b.Grouping.isGroupMode(o)||b.Grouping.isTreeMode(o)?"treegrid":"grid";m["aria-labelledby"]=[].concat(o.getAriaLabelledBy());if(o.getTitle()){m["aria-labelledby"].push(o.getTitle().getId());}if(o.getSelectionMode()===S.Multi||o.getSelectionMode()===S.MultiToggle){m["aria-multiselectable"]="true";}break;case d.ELEMENTTYPES.TABLEHEADER:m["role"]="heading";f(o,m,true,false);break;case d.ELEMENTTYPES.COLUMNHEADER_TBL:m["role"]="presentation";break;case d.ELEMENTTYPES.COLUMNHEADER_ROW:m["role"]="row";f(o,m,true,false);break;case d.ELEMENTTYPES.ROWHEADER_COL:f(o,m,true,true);break;case d.ELEMENTTYPES.TH:var q=o.getComputedFixedColumnCount()>0;if(!q){m["role"]="presentation";}m["scope"]="col";if(q){if(p&&p.column){m["aria-owns"]=p.column.getId();m["aria-labelledby"]=[p.column.getId()];}}else{m["aria-hidden"]="true";}break;case d.ELEMENTTYPES.ROWHEADER_TD:m["role"]="rowheader";m["aria-labelledby"]=[s+"-ariarowheaderlabel"];m["headers"]=s+"-colsel";if(p&&typeof p.index==="number"){m["aria-owns"]=s+"-rowsel"+p.index;}if(o.getSelectionMode()!==S.None){var h=p&&p.rowSelected;m["aria-selected"]=""+h;}break;case d.ELEMENTTYPES.TR:m["role"]="row";var h=false;if(p&&typeof p.index==="number"&&o.getSelectionMode()!==S.None&&o.isIndexSelected(p.index)){m["aria-selected"]="true";h=true;}if(b.isRowSelectionAllowed(o)&&o.getContextByIndex(p.index)){var j=e.getAriaTextsForSelectionMode(true);m["title"]=j.mouse[h?"rowDeselect":"rowSelect"];}break;case d.ELEMENTTYPES.TREEICON:if(b.Grouping.isTreeMode(o)){m={"aria-label":"","title":"","role":""};if(o.getBinding("rows")){m["role"]="button";if(p&&p.row){if(p.row._bHasChildren){var r=b.getResourceText(p.row._bIsExpanded?"TBL_COLLAPSE":"TBL_EXPAND");if(o._getShowStandardTooltips()){m["title"]=r;}else{m["aria-label"]=r;}m["aria-expanded"]=""+(!!p.row._bIsExpanded);m["aria-hidden"]="false";}else{m["aria-label"]=b.getResourceText("TBL_LEAF");m["aria-hidden"]="true";}}}}break;case d.ELEMENTTYPES.NODATA:m["role"]="gridcell";var N=o.getNoData();m["aria-labelledby"]=[N instanceof C?N.getId():(s+"-noDataMsg")];f(o,m,true,false);break;case d.ELEMENTTYPES.OVERLAY:m["role"]="region";m["aria-labelledby"]=[].concat(o.getAriaLabelledBy());if(o.getTitle()){m["aria-labelledby"].push(o.getTitle().getId());}m["aria-labelledby"].push(s+"-ariainvalid");break;case d.ELEMENTTYPES.TABLEFOOTER:case d.ELEMENTTYPES.TABLESUBHEADER:f(o,m,true,false);break;case d.ELEMENTTYPES.ROWACTIONHEADER:m["aria-hidden"]="true";break;case"PRESENTATION":m["role"]="presentation";break;}return m;}};var d=T.extend("sap.ui.table.TableAccExtension",{_init:function(t,s,m){this._accMode=sap.ui.getCore().getConfiguration().getAccessibility();this._busyCells=[];t.addEventDelegate(this);T.enrich(t,a);return"AccExtension";},_debug:function(){this._ExtensionHelper=E;this._ACCInfoHelper=A;},destroy:function(){this.getTable().removeEventDelegate(this);this._busyCells=[];T.prototype.destroy.apply(this,arguments);},getAriaAttributesFor:function(t,p){return E.getAriaAttributesFor(this,t,p);},onfocusin:function(e){var t=this.getTable();if(!t||b.getCellInfo(e.target).cell==null){return;}if(t._mTimeouts._cleanupACCExtension){clearTimeout(t._mTimeouts._cleanupACCExtension);t._mTimeouts._cleanupACCExtension=null;}this.updateAccForCurrentCell(true);},onfocusout:function(e){var t=this.getTable();if(!t){return;}t.$("sapUiTableGridCnt").attr("role",E.getAriaAttributesFor(this,"CONTENT",{}).role);t._mTimeouts._cleanupACCExtension=setTimeout(function(){var t=this.getTable();if(!t){return;}this._iLastRowNumber=null;this._iLastColumnNumber=null;E.cleanupCellModifications(this);t._mTimeouts._cleanupACCExtension=null;}.bind(this),100);}});d.ELEMENTTYPES={DATACELL:"DATACELL",COLUMNHEADER:"COLUMNHEADER",ROWHEADER:"ROWHEADER",ROWACTION:"ROWACTION",COLUMNROWHEADER:"COLUMNROWHEADER",ROOT:"ROOT",CONTENT:"CONTENT",TABLE:"TABLE",TABLEHEADER:"TABLEHEADER",TABLEFOOTER:"TABLEFOOTER",TABLESUBHEADER:"TABLESUBHEADER",COLUMNHEADER_TBL:"COLUMNHEADER_TABLE",COLUMNHEADER_ROW:"COLUMNHEADER_ROW",ROWHEADER_COL:"ROWHEADER_COL",TH:"TH",ROWHEADER_TD:"ROWHEADER_TD",TR:"TR",TREEICON:"TREEICON",ROWACTIONHEADER:"ROWACTIONHEADER",NODATA:"NODATA",OVERLAY:"OVERLAY"};d.prototype.getAccMode=function(){return this._accMode;};d.prototype.updateAccForCurrentCell=function(o){if(!this._accMode||!this.getTable()._getItemNavigation()){return;}var t=this.getTable();if(o){E.cleanupCellModifications(this);}var I=E.getInfoOfFocusedCell(this);var s;if(!I||!I.cell){return;}if(I.isOfType(c.DATACELL)){s=d.ELEMENTTYPES.DATACELL;}else if(I.isOfType(c.COLUMNHEADER)){s=d.ELEMENTTYPES.COLUMNHEADER;}else if(I.isOfType(c.ROWHEADER)){s=d.ELEMENTTYPES.ROWHEADER;}else if(I.isOfType(c.ROWACTION)){s=d.ELEMENTTYPES.ROWACTION;}else if(I.isOfType(c.COLUMNROWHEADER)){s=d.ELEMENTTYPES.COLUMNROWHEADER;}if(!E["modifyAccOf"+s]){return;}if(!o){if(I.isOfType(c.DATACELL|c.ROWHEADER)){if(t._mTimeouts._cleanupACCCellBusy){clearTimeout(t._mTimeouts._cleanupACCCellBusy);t._mTimeouts._cleanupACCCellBusy=null;}t._mTimeouts._cleanupACCCellBusy=setTimeout(function(){for(var i=0;i<this._busyCells.length;i++){this._busyCells[i].removeAttr("aria-hidden");this._busyCells[i].removeAttr("aria-busy");}t._mTimeouts._cleanupACCCellBusy=null;this._busyCells=[];}.bind(this),100);if(D.browser.chrome){I.cell.attr("aria-hidden","true");}I.cell.attr("aria-busy","true");this._busyCells.push(I.cell);}else{return;}}E["modifyAccOf"+s].apply(this,[I.cell,o]);};d.prototype.updateAriaStateOfColumn=function(o){if(!this._accMode){return;}var m=E.getAriaAttributesFor(this,d.ELEMENTTYPES.COLUMNHEADER,{headerId:o.getId(),column:o,index:this.getTable().indexOfColumn(o)});var h=E.getRelevantColumnHeaders(this.getTable(),o);for(var i=0;i<h.length;i++){var H=jQuery(document.getElementById(h[i]));if(!H.attr("colspan")){H.attr({"aria-sort":m["aria-sort"]||null});}}};d.prototype.updateAriaStateOfRow=function(r,R,i){if(!this._accMode){return;}if(!R){R=r.getDomRefs(true);}if(R.row){R.row.children("td").add(R.row).attr("aria-selected",i?"true":null);if(i&&R.rowSelectorText){var t=R.rowSelectorText.text();if(t){t=b.getResourceText("TBL_ROW_DESC_SELECTED")+" "+t;}R.rowSelectorText.text(t);}}};d.prototype.updateAriaExpandAndLevelState=function(r,s,R,f,$,g,e,L,t){if(!this._accMode){return;}var h=null,o=this.getTable(),j=[s,s.children(),R,f,f?f.children():null,$],k=!!t,B=o.getBinding("rows");if(!g&&R&&!k){var I=R.attr("data-sap-ui-rowindex");var m=E.getAriaAttributesFor(this,d.ELEMENTTYPES.ROWHEADER,{rowSelected:!r._bHidden&&o.isIndexSelected(I)});h=m["title"]||null;}if(R&&!k){R.attr({"aria-haspopup":g?"true":null,"title":h});}if(B&&B.hasTotaledMeasures&&L>0&&(!B.bProvideGrandTotals||!B.hasTotaledMeasures())){L=L-1;}for(var i=0;i<j.length;i++){if(j[i]){j[i].attr({"aria-expanded":g?e+"":null,"aria-level":L<0?null:(L+1)});}}if(k){t.attr(E.getAriaAttributesFor(this,d.ELEMENTTYPES.TREEICON,{row:r}));}};d.prototype.updateAriaStateOfRowHighlight=function(r){if(!this._accMode||!r){return;}var R=r._getRow();if(R){var h=R.getDomRef("highlighttext");h.innerText=r._getHighlightText();}};d.prototype.updateAriaStateForOverlayAndNoData=function(){var t=this.getTable();if(!t||!t.getDomRef()||!this._accMode){return;}if(t.getShowOverlay()){t.$().find("[data-sap-ui-table-acc-covered*='overlay']").attr("aria-hidden","true");}else{t.$().find("[data-sap-ui-table-acc-covered*='overlay']").removeAttr("aria-hidden");if(b.isNoDataVisible(t)){t.$().find("[data-sap-ui-table-acc-covered*='nodata']").attr("aria-hidden","true");}else{t.$().find("[data-sap-ui-table-acc-covered*='nodata']").removeAttr("aria-hidden");}}};d.prototype.getAriaTextsForSelectionMode=function(e,s){var t=this.getTable();if(!s){s=t.getSelectionMode();}var f=t._getShowStandardTooltips();var m={mouse:{rowSelect:"",rowDeselect:""},keyboard:{rowSelect:"",rowDeselect:""}};var i=t._getSelectedIndicesCount();if(s===S.Single){m.mouse.rowSelect=f?b.getResourceText("TBL_ROW_SELECT"):"";m.mouse.rowDeselect=f?b.getResourceText("TBL_ROW_DESELECT"):"";m.keyboard.rowSelect=b.getResourceText("TBL_ROW_SELECT_KEY");m.keyboard.rowDeselect=b.getResourceText("TBL_ROW_DESELECT_KEY");}else if(s===S.MultiToggle){m.mouse.rowSelect=f?b.getResourceText("TBL_ROW_SELECT_MULTI_TOGGLE"):"";m.mouse.rowDeselect=f?b.getResourceText("TBL_ROW_DESELECT"):"";m.keyboard.rowSelect=b.getResourceText("TBL_ROW_SELECT_KEY");m.keyboard.rowDeselect=b.getResourceText("TBL_ROW_DESELECT_KEY");if(e===true&&i===0){m.mouse.rowSelect=f?b.getResourceText("TBL_ROW_SELECT"):"";}}return m;};d.prototype.setSelectAllState=function(s){var t=this.getTable();if(t){t.$("selall").attr("aria-pressed",s?"true":"false");}};d.prototype.addColumnHeaderLabel=function(o,e){var t=this.getTable();if(!this._accMode||!e.getAriaLabelledBy||!t){return;}var L=t.getColumnHeaderVisible()?o.getId():null;if(!L){var f=o.getAggregation("label");if(f){L=f.getId();}}var g=e.getAriaLabelledBy();if(L&&g.indexOf(L)<0){e.addAriaLabelledBy(L);}};return d;});
