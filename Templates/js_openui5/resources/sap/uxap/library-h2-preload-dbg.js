/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/uxap/library',["sap/ui/core/Core","sap/ui/base/DataType","sap/ui/Device","sap/ui/core/library","sap/m/library","sap/ui/layout/library"],function(C,D,a){"use strict";sap.ui.getCore().initLibrary({name:"sap.uxap",dependencies:["sap.ui.core","sap.m","sap.ui.layout"],designtime:"sap/uxap/designtime/library.designtime",types:["sap.uxap.BlockBaseColumnLayout","sap.uxap.ObjectPageConfigurationMode","sap.uxap.ObjectPageHeaderDesign","sap.uxap.ObjectPageHeaderPictureShape","sap.uxap.ObjectPageSubSectionLayout","sap.uxap.ObjectPageSubSectionMode"],interfaces:["sap.uxap.IHeaderTitle","sap.uxap.IHeaderContent"],controls:["sap.uxap.AnchorBar","sap.uxap.BlockBase","sap.uxap.BreadCrumbs","sap.uxap.HierarchicalSelect","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageDynamicHeaderTitle","sap.uxap.ObjectPageDynamicHeaderContent","sap.uxap.ObjectPageHeaderActionButton","sap.uxap.ObjectPageHeaderContent","sap.uxap.ObjectPageLayout","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageSectionBase","sap.uxap.ObjectPageSubSection"],elements:["sap.uxap.ModelMapping","sap.uxap.ObjectPageHeaderLayoutData"],version:"1.60.1",extensions:{flChangeHandlers:{"sap.uxap.ObjectPageHeader":"sap/uxap/flexibility/ObjectPageHeader","sap.uxap.ObjectPageLayout":"sap/uxap/flexibility/ObjectPageLayout","sap.uxap.ObjectPageSection":"sap/uxap/flexibility/ObjectPageSection","sap.uxap.ObjectPageSubSection":"sap/uxap/flexibility/ObjectPageSubSection","sap.uxap.ObjectPageDynamicHeaderTitle":"sap/uxap/flexibility/ObjectPageDynamicHeaderTitle","sap.uxap.ObjectPageHeaderActionButton":"sap/uxap/flexibility/ObjectPageHeaderActionButton","sap.ui.core._StashedControl":{"unstashControl":{"changeHandler":"default","layers":{"USER":true}},"stashControl":{"changeHandler":"default","layers":{"USER":true}}}},"sap.ui.support":{publicRules:true}}});sap.uxap.BlockBaseColumnLayout=D.createType('sap.uxap.BlockBaseColumnLayout',{isValid:function(v){return/^(auto|[1-4]{1})$/.test(v);}},D.getType('string'));sap.uxap.BlockBaseFormAdjustment={BlockColumns:"BlockColumns",OneColumn:"OneColumn",None:"None"};sap.uxap.ObjectPageConfigurationMode={JsonURL:"JsonURL",JsonModel:"JsonModel"};sap.uxap.ObjectPageHeaderDesign={Light:"Light",Dark:"Dark"};sap.uxap.ObjectPageHeaderPictureShape={Circle:"Circle",Square:"Square"};sap.uxap.ObjectPageSubSectionLayout={TitleOnTop:"TitleOnTop",TitleOnLeft:"TitleOnLeft"};sap.uxap.ObjectPageSubSectionMode={Collapsed:"Collapsed",Expanded:"Expanded"};sap.uxap.Importance={Low:"Low",Medium:"Medium",High:"High"};sap.uxap.Utilities={getClosestOPL:function(c){while(c&&!(c instanceof sap.uxap.ObjectPageLayout)){c=c.getParent();}return c;},isPhoneScenario:function(r){if(a.system.phone){return true;}return sap.uxap.Utilities._isCurrentMediaSize("Phone",r);},isTabletScenario:function(r){return sap.uxap.Utilities._isCurrentMediaSize("Tablet",r);},_isCurrentMediaSize:function(m,r){return r&&r.name===m;}};return sap.uxap;});
sap.ui.require.preload({
	"sap/uxap/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.uxap","type":"library","embeds":["component"],"applicationVersion":{"version":"1.60.1"},"title":"SAP UxAP","description":"SAP UxAP","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.60","libs":{"sap.ui.core":{"minVersion":"1.60.1"},"sap.m":{"minVersion":"1.60.1"},"sap.ui.layout":{"minVersion":"1.60.1"}}},"library":{"i18n":"messagebundle.properties","content":{"controls":["sap.uxap.AnchorBar","sap.uxap.BlockBase","sap.uxap.BreadCrumbs","sap.uxap.HierarchicalSelect","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageDynamicHeaderTitle","sap.uxap.ObjectPageDynamicHeaderContent","sap.uxap.ObjectPageHeaderActionButton","sap.uxap.ObjectPageHeaderContent","sap.uxap.ObjectPageLayout","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageSectionBase","sap.uxap.ObjectPageSubSection"],"elements":["sap.uxap.ModelMapping","sap.uxap.ObjectPageHeaderLayoutData"],"types":["sap.uxap.BlockBaseColumnLayout","sap.uxap.ObjectPageConfigurationMode","sap.uxap.ObjectPageHeaderDesign","sap.uxap.ObjectPageHeaderPictureShape","sap.uxap.ObjectPageSubSectionLayout","sap.uxap.ObjectPageSubSectionMode"],"interfaces":["sap.uxap.IHeaderTitle","sap.uxap.IHeaderContent"]}}}}'
},"sap/uxap/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/uxap/AnchorBar.js":["sap/base/Log.js","sap/m/Button.js","sap/m/MenuButton.js","sap/m/Toolbar.js","sap/m/library.js","sap/ui/Device.js","sap/ui/core/CustomData.js","sap/ui/core/IconPool.js","sap/ui/core/Item.js","sap/ui/core/ResizeHandler.js","sap/ui/core/delegate/ScrollEnablement.js","sap/ui/events/F6Navigation.js","sap/ui/events/KeyCodes.js","sap/ui/layout/HorizontalLayout.js","sap/ui/thirdparty/jquery.js","sap/uxap/AnchorBarRenderer.js","sap/uxap/HierarchicalSelect.js","sap/uxap/library.js"],
"sap/uxap/AnchorBarRenderer.js":["sap/m/BarInPageEnabler.js","sap/m/ToolbarRenderer.js","sap/ui/core/Renderer.js","sap/uxap/library.js"],
"sap/uxap/BlockBase.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/core/Component.js","sap/ui/core/Control.js","sap/ui/core/CustomData.js","sap/ui/layout/form/ResponsiveGridLayout.js","sap/ui/layout/library.js","sap/ui/model/Context.js","sap/ui/thirdparty/jquery.js","sap/uxap/BlockBaseMetadata.js","sap/uxap/library.js"],
"sap/uxap/BlockBaseMetadata.js":["sap/base/Log.js","sap/ui/core/ElementMetadata.js","sap/ui/thirdparty/jquery.js"],
"sap/uxap/BreadCrumbs.js":["sap/m/Link.js","sap/m/Select.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/Icon.js","sap/ui/core/InvisibleText.js","sap/ui/core/Item.js","sap/ui/core/ResizeHandler.js","sap/ui/core/delegate/ItemNavigation.js","sap/ui/thirdparty/jquery.js","sap/uxap/BreadCrumbsRenderer.js","sap/uxap/library.js"],
"sap/uxap/HierarchicalSelect.js":["sap/m/Select.js","sap/ui/Device.js","sap/ui/thirdparty/jquery.js","sap/ui/thirdparty/jqueryui/jquery-ui-position.js","sap/uxap/HierarchicalSelectRenderer.js","sap/uxap/library.js"],
"sap/uxap/HierarchicalSelectRenderer.js":["sap/m/SelectRenderer.js","sap/ui/core/Renderer.js"],
"sap/uxap/LazyLoading.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/base/Metadata.js","sap/ui/thirdparty/jquery.js","sap/uxap/ObjectPageSubSection.js","sap/uxap/library.js"],
"sap/uxap/ModelMapping.js":["sap/ui/core/Element.js","sap/uxap/library.js"],
"sap/uxap/ObjectImageHelper.js":["sap/m/Image.js","sap/ui/base/ManagedObject.js","sap/ui/core/Icon.js","sap/ui/core/IconPool.js"],
"sap/uxap/ObjectPageDynamicHeaderContent.js":["sap/base/Log.js","sap/uxap/ObjectPageDynamicHeaderContentRenderer.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageDynamicHeaderContentRenderer.js":["sap/f/DynamicPageHeaderRenderer.js","sap/ui/core/Renderer.js"],
"sap/uxap/ObjectPageDynamicHeaderTitle.js":["sap/base/Log.js","sap/uxap/ObjectPageDynamicHeaderContent.js","sap/uxap/ObjectPageDynamicHeaderTitleRenderer.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageDynamicHeaderTitleRenderer.js":["sap/f/DynamicPageTitleRenderer.js","sap/ui/core/Renderer.js"],
"sap/uxap/ObjectPageHeader.js":["sap/m/ActionSheet.js","sap/m/Breadcrumbs.js","sap/m/Button.js","sap/m/library.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/CustomData.js","sap/ui/core/IconPool.js","sap/ui/core/ResizeHandler.js","sap/ui/thirdparty/jquery.js","sap/uxap/ObjectImageHelper.js","sap/uxap/ObjectPageHeaderActionButton.js","sap/uxap/ObjectPageHeaderContent.js","sap/uxap/ObjectPageHeaderRenderer.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageHeaderActionButton.js":["sap/m/Button.js","sap/uxap/ObjectPageHeaderActionButtonRenderer.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageHeaderActionButtonRenderer.js":["sap/m/ButtonRenderer.js","sap/ui/core/Renderer.js"],
"sap/uxap/ObjectPageHeaderContent.js":["sap/m/Button.js","sap/ui/core/Control.js","sap/uxap/ObjectImageHelper.js","sap/uxap/ObjectPageHeaderContentRenderer.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageHeaderContentRenderer.js":["sap/uxap/ObjectImageHelper.js","sap/uxap/ObjectPageHeaderRenderer.js"],
"sap/uxap/ObjectPageHeaderLayoutData.js":["sap/ui/core/LayoutData.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageHeaderRenderer.js":["sap/ui/Device.js","sap/uxap/ObjectImageHelper.js"],
"sap/uxap/ObjectPageLayout.js":["sap/base/Log.js","sap/base/assert.js","sap/m/ScrollBar.js","sap/ui/Device.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/core/delegate/ScrollEnablement.js","sap/ui/core/library.js","sap/ui/dom/getScrollbarSize.js","sap/ui/events/KeyCodes.js","sap/ui/thirdparty/jquery.js","sap/uxap/LazyLoading.js","sap/uxap/ObjectPageHeaderContent.js","sap/uxap/ObjectPageLayoutABHelper.js","sap/uxap/ObjectPageLayoutRenderer.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSectionBase.js","sap/uxap/ObjectPageSubSection.js","sap/uxap/ThrottledTaskHelper.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageLayoutABHelper.js":["sap/m/Button.js","sap/m/Menu.js","sap/m/MenuButton.js","sap/m/MenuItem.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/base/Metadata.js","sap/ui/core/CustomData.js","sap/ui/core/IconPool.js","sap/ui/thirdparty/jquery.js","sap/uxap/AnchorBar.js"],
"sap/uxap/ObjectPageLayoutRenderer.js":["sap/ui/Device.js"],
"sap/uxap/ObjectPageLazyLoader.js":["sap/base/assert.js","sap/ui/core/Element.js","sap/ui/core/StashedControlSupport.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageSection.js":["sap/m/Button.js","sap/m/library.js","sap/ui/Device.js","sap/ui/core/InvisibleText.js","sap/ui/core/StashedControlSupport.js","sap/uxap/ObjectPageSectionBase.js","sap/uxap/ObjectPageSectionRenderer.js","sap/uxap/ObjectPageSubSection.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageSectionBase.js":["sap/base/Log.js","sap/ui/core/Control.js","sap/ui/core/library.js","sap/ui/dom/jquery/Focusable.js","sap/ui/events/KeyCodes.js","sap/ui/thirdparty/jquery.js","sap/uxap/library.js"],
"sap/uxap/ObjectPageSubSection.js":["sap/base/Log.js","sap/m/Button.js","sap/m/TitlePropagationSupport.js","sap/m/library.js","sap/ui/Device.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/StashedControlSupport.js","sap/ui/dom/jquery/Focusable.js","sap/ui/events/KeyCodes.js","sap/ui/layout/Grid.js","sap/ui/layout/GridData.js","sap/ui/thirdparty/jquery.js","sap/uxap/BlockBase.js","sap/uxap/ObjectPageLazyLoader.js","sap/uxap/ObjectPageSectionBase.js","sap/uxap/ObjectPageSubSectionRenderer.js","sap/uxap/library.js"],
"sap/uxap/ThrottledTaskHelper.js":["sap/ui/base/Object.js","sap/ui/thirdparty/jquery.js"],
"sap/uxap/changeHandler/MoveObjectPageSection.js":["sap/ui/fl/changeHandler/MoveControls.js","sap/ui/thirdparty/jquery.js"],
"sap/uxap/changeHandler/RenameObjectPageSection.js":["sap/ui/fl/Utils.js","sap/ui/fl/changeHandler/BaseRename.js"],
"sap/uxap/component/Component.js":["sap/base/Log.js","sap/ui/core/Component.js","sap/ui/core/UIComponent.js","sap/ui/core/library.js","sap/uxap/library.js"],
"sap/uxap/component/ObjectPageComponentContainer.js":["sap/base/Log.js","sap/ui/core/Component.js","sap/ui/core/ComponentContainer.js"],
"sap/uxap/component/ObjectPageLayoutUXDrivenFactory.controller.js":["jquery.sap.global.js","sap/base/Log.js","sap/base/util/ObjectPath.js","sap/ui/base/ManagedObject.js","sap/ui/core/mvc/Controller.js","sap/ui/model/BindingMode.js","sap/ui/model/Context.js","sap/ui/thirdparty/jquery.js"],
"sap/uxap/component/ObjectPageLayoutUXDrivenFactory.view.xml":["sap/ui/core/mvc/XMLView.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js","sap/uxap/component/ObjectPageLayoutUXDrivenFactory.controller.js"],
"sap/uxap/designtime/ObjectPageLayout.create.fragment.xml":["sap/m/Text.js","sap/ui/core/Fragment.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js"],
"sap/uxap/designtime/ObjectPageLayout.designtime.js":["sap/uxap/library.js"],
"sap/uxap/designtime/ObjectPageSection.designtime.js":["sap/uxap/library.js"],
"sap/uxap/flexibility/ObjectPageDynamicHeaderTitle.flexibility.js":["sap/f/changeHandler/MoveDynamicPageTitleActions.js","sap/m/changeHandler/CombineButtons.js","sap/m/changeHandler/SplitMenuButton.js"],
"sap/uxap/flexibility/ObjectPageHeader.flexibility.js":["sap/m/changeHandler/CombineButtons.js","sap/m/changeHandler/SplitMenuButton.js"],
"sap/uxap/flexibility/ObjectPageHeaderActionButton.flexibility.js":["sap/ui/fl/changeHandler/BaseRename.js"],
"sap/uxap/flexibility/ObjectPageLayout.flexibility.js":["sap/uxap/changeHandler/MoveObjectPageSection.js"],
"sap/uxap/flexibility/ObjectPageSection.flexibility.js":["sap/uxap/changeHandler/RenameObjectPageSection.js"],
"sap/uxap/flexibility/ObjectPageSubSection.flexibility.js":["sap/m/changeHandler/CombineButtons.js","sap/m/changeHandler/SplitMenuButton.js","sap/ui/fl/changeHandler/BaseRename.js"],
"sap/uxap/library.js":["sap/m/library.js","sap/ui/Device.js","sap/ui/base/DataType.js","sap/ui/core/Core.js","sap/ui/core/library.js","sap/ui/layout/library.js"],
"sap/uxap/library.support.js":["sap/uxap/rules/ObjectPageLayout.support.js"],
"sap/uxap/rules/ObjectPageLayout.support.js":["sap/ui/support/library.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map