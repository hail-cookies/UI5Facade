/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/ResizeHandler','sap/ui/core/Icon','sap/ui/core/delegate/ScrollEnablement',"./SideNavigationRenderer"],function(l,C,R,I,S,a){'use strict';var b=C.extend('sap.tnt.SideNavigation',{metadata:{library:'sap.tnt',properties:{expanded:{type:'boolean',group:'Misc',defaultValue:true},selectedKey:{type:"string",group:"Data"}},defaultAggregation:"item",aggregations:{item:{type:'sap.tnt.NavigationList',multiple:false,bindable:"bindable"},fixedItem:{type:'sap.tnt.NavigationList',multiple:false},footer:{type:'sap.tnt.NavigationList',multiple:false},_topArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_bottomArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.tnt.NavigationListItem",multiple:false}},events:{itemSelect:{parameters:{item:{type:'sap.ui.core.Item'}}}}}});b.prototype.init=function(){this._scroller=new S(this,this.getId()+"-Flexible-Content",{horizontal:false,vertical:true});this.data('sap-ui-fastnavgroup','true',true);};b.prototype.setAggregation=function(c,o){if(o&&o.attachItemSelect){o.attachItemSelect(this._itemSelectionHandler.bind(this));}return sap.ui.base.ManagedObject.prototype.setAggregation.apply(this,arguments);};b.prototype.setExpanded=function(i){if(this.getExpanded()===i){return this;}var t=this,$=this.$(),c=t.getAggregation('item'),f=t.getAggregation('fixedItem'),w;if(!this.getDomRef()){this.setProperty('expanded',i);if(c){c.setExpanded(i);}if(f){f.setExpanded(i);}return this;}this.setProperty('expanded',i,true);if(t._hasActiveAnimation){t._finishAnimation(!i);$.stop();}if(i){$.toggleClass('sapTntSideNavigationNotExpanded',!i);if(c){c.setExpanded(i);}if(f){f.setExpanded(i);}}else{this._scroller.setVertical(false);}t._hasActiveAnimation=true;w=i?'15rem':'3rem';$.animate({width:w},{duration:300,complete:function(){var i=t.getExpanded();t._finishAnimation(i);}});return this;};b.prototype._finishAnimation=function(i){if(!this._hasActiveAnimation||!this.getDomRef()){return;}this.$().toggleClass('sapTntSideNavigationNotExpandedWidth',!i);if(!i){this.$().toggleClass('sapTntSideNavigationNotExpanded',!i);if(this.getAggregation('item')){this.getAggregation('item').setExpanded(i);}if(this.getAggregation('fixedItem')){this.getAggregation('fixedItem').setExpanded(i);}this._scroller.setVertical(true);}this.$().css('width','');this._hasActiveAnimation=false;setTimeout(this._toggleArrows.bind(this),0);};b.prototype.onBeforeRendering=function(){var s=this.getSelectedItem(),c=this.getSelectedKey();if(c){this.setSelectedKey(c);}else if(s){this.setSelectedItem(s);}this._deregisterControl();};b.prototype.onAfterRendering=function(){this._ResizeHandler=R.register(this.getDomRef(),this._toggleArrows.bind(this));this._toggleArrows();};b.prototype.setSelectedKey=function(s){var c,n,f;if(s){n=this.getAggregation('item');if(n){c=n._findItemByKey(s);if(!c){f=this.getAggregation('fixedItem');c=f._findItemByKey(s);}}}if(c){this.setSelectedItem(c);}this.setProperty('selectedKey',s,true);return this;};b.prototype.setSelectedItem=function(s){var n=this.getAggregation('item');var f=this.getAggregation('fixedItem');var c;var d;if(!s){if(n.setSelectedItem){n.setSelectedItem(null);}if(f.setSelectedItem){f.setSelectedItem(null);}}if(typeof s==='string'){c=sap.ui.getCore().byId(s);}else{c=s;}d=c?c._getUniqueKey():'';this.setProperty('selectedKey',d,true);var e=c&&c.getNavigationList&&c.getNavigationList()===n;var g=c&&c.getNavigationList&&c.getNavigationList()===f;if(e){n.setSelectedItem(c);if(f){f.setSelectedItem(null);}}if(g){f.setSelectedItem(c);n.setSelectedItem(null);}return C.prototype.setAssociation.call(this,'selectedItem',c,true);};b.prototype.exit=function(){if(this._scroller){this._scroller.destroy();this._scroller=null;}this._deregisterControl();};b.prototype._itemSelectionHandler=function(e){var i=e.getParameter('item');this.setSelectedItem(i);this.fireItemSelect({item:i});};b.prototype._deregisterControl=function(){if(this._ResizeHandler){R.deregister(this._ResizeHandler);this._ResizeHandler=null;}};b.prototype._getTopArrowControl=function(){var i=this.getAggregation('_topArrowControl');var t=this;if(!i){i=new I({src:'sap-icon://navigation-up-arrow',noTabStop:true,useIconTooltip:false,tooltip:'',press:this._arrowPress.bind(t)}).addStyleClass('sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconUp');this.setAggregation("_topArrowControl",i,true);}return i;};b.prototype._getBottomArrowControl=function(){var i=this.getAggregation('_bottomArrowControl');var t=this;if(!i){i=new I({src:'sap-icon://navigation-down-arrow',noTabStop:true,useIconTooltip:false,tooltip:'',press:this._arrowPress.bind(t)}).addStyleClass('sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconDown');this.setAggregation("_bottomArrowControl",i,true);}return i;};b.prototype._toggleArrows=function(){var d=this.getDomRef();if(!d){return;}var s=this.$('Flexible')[0];var c=this.$('Flexible-Content')[0];var i=this.getExpanded();if(this._hasActiveAnimation){d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='none';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='none';return;}if((c.offsetHeight>s.offsetHeight)&&!i){d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='block';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='block';d.querySelector('.sapTntSideNavigationScrollIconDown').classList.remove('sapTntSideNavigationScrollIconDisabled');}else{d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='none';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='none';}};b.prototype._arrowPress=function(e){e.preventDefault();var s=document.getElementById(e.oSource.sId);var i=s.classList.contains('sapTntSideNavigationScrollIconDown')?true:false;var $=this.$('Flexible');var c=i?40:-40;$[0].scrollTop+=c;};return b;},true);
