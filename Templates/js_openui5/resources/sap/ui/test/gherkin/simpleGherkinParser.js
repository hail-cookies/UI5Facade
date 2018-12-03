/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.sjax","sap/ui/thirdparty/jquery"],function(q,Q){"use strict";var a={parse:function(t){if(Q.type(t)!=="string"){throw new Error("simpleGherkinParser.parse: parameter 'sText' must be a valid string");}var l=t.split("\n").map(function(s){return s.replace(/^\s*#.*/,"").trim();});var f=null,S=null,o=null,T=[],F=[],b=[];for(var i=0;i<l.length;++i){var L=l[i];var c=!!L.match(/^(?:@[^ @]+)(?:\s+@[^ @]+)*$/);if(c){T=L.split(/\s+/);continue;}var d=L.match(/^Feature:(.+)$/);if(d){F=T;f={tags:F,name:d[1].trim(),scenarios:[]};T=[];continue;}var B=!!L.match(/^Background:/);if(B){S=f.background={name:"<background>",steps:[]};continue;}var e=L.match(/^Scenario Outline:(.+)/);var g=L.match(/^Scenario:(.+)/)||e;if(g){b=F.concat(T);S={tags:b,name:g[1].trim(),steps:[]};if(e){S.examples=[];}f.scenarios.push(S);T=[];continue;}var h=L.match(/^(Given|When|Then|And|But|\*)\s+(.+)$/);if(h){o={text:h[2].trim(),keyword:h[1].trim()};S.steps.push(o);continue;}var E=L.match(/^Examples:(.+)?/);if(E){S.examples.push({tags:b.concat(T),name:(E[1])?E[1].trim():"",data:[]});T=[];continue;}var r=L.match(/^\|(.*)\|$/);if(r){var D=r[1].split("|").map(function(s){return s.trim();});if(D.length===1){D=D[0];}if(S.examples){S.examples[S.examples.length-1].data.push(D);continue;}o.data=o.data||[];o.data.push(D);}}f.scenarios.forEach(function(S){S.steps.forEach(function(o){if(Q.isArray(o.data)&&(o.data.length===1)&&(Q.type(o.data[0])==="array")){o.data=o.data[0];}});});return f;},parseFile:function(p){if(Q.type(p)!=="string"){throw new Error("simpleGherkinParser.parseFile: parameter 'sPath' must be a valid string");}p=sap.ui.require.toUrl((p).replace(/\./g,"/"))+".feature";var r=q.sap.sjax({url:p,dataType:"text"});if(!r.success){throw new Error("simpleGherkinParser.parseFile: error loading URL: "+p);}return this.parse(r.data);}};return a;},true);
