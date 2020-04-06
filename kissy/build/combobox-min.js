/*
Copyright 2012, KISSY UI Library v1.30
MIT Licensed
build time: Dec 28 15:36
*/
KISSY.add("combobox/base",function(d,c,i,k,j,h){function b(){this.get("input")[0].focus();o.call(this)}function a(g,a){var b=g.get("el"),e=g.get("prefixCls")+"combobox-invalid",h=g.get("invalidEl");a?(b.addClass(e),h.attr("title",a),h.show()):(b.removeClass(e),h.hide())}function e(g,a){var b=g.get("menu");if(b&&!b.isController)if(a)b=i.create(b,g),g.setInternal("menu",b);else return null;return b}function q(){var g=e(this);g&&g.get("visible")&&this.alignInternal()}function f(){var g=this;g._focusoutDismissTimer=
setTimeout(function(){g.set("collapsed",!0)},30)}function o(){var g;if(g=this._focusoutDismissTimer)clearTimeout(g),this._focusoutDismissTimer=null}function s(){var g;this._stopNotify||(g=this.getValueInternal(),g===h?this.set("collapsed",!0):(this._savedInputValue=g,this.sendRequest(g)))}function r(g){var a,b=[],h,f,c=e(this,1),g=this.normalizeData(g);c.removeChildren(!0);c.set("highlightedItem",null);if(g&&g.length){for(f=0;f<g.length;f++)a=g[f],b.push(c.addChild(a));g=this.getValueInternal();for(f=
0;f<b.length;f++)if(b[f].get("textContent")==g){c.set("highlightedItem",b[f]);h=!0;break}if(!h&&this.get("autoHighlightFirst"))for(f=0;f<b.length;f++)if(!b[f].get("disabled")){c.set("highlightedItem",b[f]);break}this.set("collapsed",!1);q.call(this)}else this.set("collapsed",!0)}var m,j=c.all,n=c.KeyCodes,p={points:["bl","tl"],overflow:{adjustX:1,adjustY:1}},l=j(d.Env.host);return m=i.Controller.extend({_savedInputValue:null,_stopNotify:0,normalizeData:function(g){var a,b,e;if(g&&g.length){g=g.slice(0,
this.get("maxItemCount"));a=this.get("format")?this.get("format").call(this,this.getValueInternal(),g):[];for(e=0;e<g.length;e++)b=g[e],a[e]=d.mix({content:b,textContent:b,value:b},a[e])}return a},bindUI:function(){this.get("input").on("valuechange",s,this)},getValueInternal:function(){return this.get("input").val()},setValueInternal:function(g){this.get("input").val(g)},alignInternal:function(){var g=this.get("menu"),a=d.clone(g.get("align"));a.node=this.get("el");d.mix(a,p,!1);g.set("align",a)},
handleFocus:function(){var g;a(this,!1);(g=this.get("placeholderEl"))&&g.hide()},handleBlur:function(){var g=this,b=g.get("placeholderEl"),e;m.superclass.handleBlur.apply(g,arguments);f.call(g);e=g.get("input");g.validate(function(b,f){b?!g.get("focused")&&f==e.val()&&a(g,b):a(g,!1)});b&&!e.val()&&b.show()},handleMouseDown:function(g){var a,b;m.superclass.handleMouseDown.apply(this,arguments);a=g.target;b=this.get("trigger");if(this.get("hasTrigger")&&(b[0]==a||b.contains(a)))a=this.get("input"),
this.get("collapsed")?(a[0].focus(),this.sendRequest("")):this.set("collapsed",!0),g.preventDefault()},handleKeyEventInternal:function(a){var b,f,c;f=e(this);if(!f)return h;this.get("input");if(b=this.get("updateInputOnDownUp"))this._stopNotify=d.inArray(a.keyCode,[n.UP,n.DOWN,n.ESC])?1:0;if(f.get("visible")){c=f.handleKeydown(a);if(a.keyCode==n.ESC)return this.set("collapsed",!0),b&&this.setValueInternal(this._savedInputValue),!0;f=f.get("activeItem");b&&d.inArray(a.keyCode,[n.DOWN,n.UP])&&this.setValueInternal(f.get("textContent"));
return a.keyCode==n.TAB&&f&&(f.performActionInternal(),this.get("multiple"))?!0:c}return a.keyCode==n.DOWN||a.keyCode==n.UP?(this.sendRequest(this.getValueInternal()),!0):h},syncUI:function(){var a,b;this.get("placeholder")&&(a=this.get("input"),b=this.get("inputValue"),b!=h&&a.val(b),a.val()||this.get("placeholderEl").show())},validate:function(a){var b=this.get("validator"),e=this.get("input").val();b?b(e,function(b){a(b,e)}):a(!1,e)},bindMenu:function(){var a=this,e,h;h=a.get("menu");h.on("click",
function(b){b=b.target.get("textContent");a._stopNotify=1;a.setValueInternal(b);a._savedInputValue=b;a.set("collapsed",!0);setTimeout(function(){a._stopNotify=0},50)});l.on("resize",a.__repositionBuffer=d.buffer(q,50),a);e=h.get("el");h=h.get("contentEl");e.on("focusout",f,a);e.on("focusin",o,a);h.on("mouseover",b,a);a.bindMenu=d.noop},sendRequest:function(a){this.get("dataSource").fetchData(a,r,this)},_onSetCollapsed:function(a){if(a)(a=e(this))&&a.hide();else{var a=this.get("el"),b=e(this,1);o.call(this);
b&&!b.get("visible")&&(b.render(),this.bindMenu(),this.get("matchElWidth")&&b.set("width",a.innerWidth()),b.show(),this.get("input").attr("aria-owns",b.get("el").attr("id")))}},destructor:function(){var a=this.__repositionBuffer;l.detach("resize",a,this);a.stop()}},{ATTRS:{input:{view:1},inputValue:{view:1},trigger:{view:1},placeholder:{view:1},placeholderEl:{view:1},validator:{},invalidEl:{view:1},allowTextSelection:{value:!0},hasTrigger:{view:1},menu:{value:{},setter:function(a){a&&a.isController&&
a.setInternal("parent",this)}},defaultChildXClass:{value:"popupmenu"},collapsed:{view:1},dataSource:{},maxItemCount:{value:99999},matchElWidth:{value:!0},format:{},updateInputOnDownUp:{value:!0},autoHighlightFirst:{},xrender:{value:k}}},{xclass:"combobox",priority:10})},{requires:["node","component/base","./render","menu"]});
KISSY.add("combobox",function(d,c,i,k,j,h){c.LocalDataSource=j;c.RemoteDataSource=h;c.FilterSelect=k;c.MultiValueComboBox=i;return c},{requires:["combobox/base","combobox/multi-value-combobox","combobox/filter-select","combobox/LocalDataSource","combobox/RemoteDataSource"]});
KISSY.add("combobox/cursor",function(d,c){function i(b){var a=j,e;a||(a=c.create(k));"textarea"==""+b.type?c.css(a,"width",c.css(b,"width")):c.css(a,"width",9999);d.each(h,function(e){c.css(a,e,c.css(b,e))});j||(e=b.ownerDocument.body,e.insertBefore(a,e.firstChild));return j=a}var k="<div style='z-index:-9999;overflow:hidden;position: fixed;left:-9999px;top:-9999px;opacity:0;white-space:pre-wrap;word-wrap:break-word;'></div>",j,h="paddingLeft,paddingTop,paddingBottom,paddingRight,marginLeft,marginTop,marginBottom,marginRight,borderLeftStyle,borderTopStyle,borderBottomStyle,borderRightStyle,borderLeftWidth,borderTopWidth,borderBottomWidth,borderRightWidth,line-height,outline,height,fontFamily,fontSize,fontWeight,fontVariant,fontStyle".split(",");
return function(b){var b=c.get(b),a=b.ownerDocument,e,h,f=b.scrollTop,o=b.scrollLeft;if(a.selection)return a=a.selection.createRange(),{left:a.boundingLeft+o+c.scrollLeft(),top:a.boundingTop+f+a.boundingHeight+c.scrollTop()};e=c.offset(b);if("textarea"!=b.type)return e.top+=b.offsetHeight,e;h=i(b);a=b.selectionStart;h.innerHTML=d.escapeHTML(b.value.substring(0,a-1))+"<span>x</span>";c.offset(h,e);e=h.lastChild;b=c.offset(e);b.top+=c.height(e);0<a&&(b.left+=c.width(e));b.top-=f;b.left-=o;return b}},
{requires:["dom"]});KISSY.add("combobox/filter-select",function(d,c){var i=c.extend({validate:function(c){var d=this;i.superclass.validate.call(d,function(h,b){h?c(h,b):d.get("dataSource").fetchData(b,function(a){a:{if(a=d.normalizeData(a))for(var e=0;e<a.length;e++)if(a[e].textContent==b){a=a[e];break a}a=!1}c(a?"":d.get("invalidMessage"),b,a)})})}},{ATTRS:{invalidMessage:{value:"invalid input"}}});return i},{requires:["./base"]});
KISSY.add("combobox/LocalDataSource",function(d){function c(){c.superclass.constructor.apply(this,arguments)}c.ATTRS={data:{value:[]},parse:{value:function(c,k){var j=[],h=0;if(!c)return k;d.each(k,function(b){-1!=b.indexOf(c)&&j.push(b);h++});return j}}};d.extend(c,d.Base,{fetchData:function(c,d,j){var h=this.get("parse"),b=this.get("data"),b=h(c,b);d.call(j,b)}});return c},{requires:["component/base"]});
KISSY.add("combobox/multi-value-combobox",function(d,c,i){function k(a,b){return b&&-1!=a.indexOf(b)}function j(a){var e=a.get("input"),c=e.val(),f=[],d=[],j=a.get("literal"),i=a.get("separator"),a=a.get("separatorType"),m=!1,n=a!=h,e=e.prop("selectionStart"),p,l,g=-1;for(p=0;p<c.length;p++)(l=c.charAt(p),j&&l==j&&(m=!m),m)?d.push(l):(p==e&&(g=f.length),n&&b.test(l))?(d.length&&f.push(d.join("")),d=[],d.push(l)):k(i,l)?a==h?(d.push(l),d.length&&f.push(d.join("")),d=[]):(d.length&&f.push(d.join("")),
d=[],d.push(l)):d.push(l);d.length&&f.push(d.join(""));f.length||f.push("");-1==g&&(a==h&&k(i,l)&&f.push(""),g=f.length-1);return{tokens:f,cursorPosition:e,tokenIndex:g}}var h="suffix",b=/\s|\xa0/;return i.extend({getValueInternal:function(){this.get("input");var a=j(this),b=a.tokens,c=a.tokenIndex,a=this.get("separator"),f=this.get("separatorType"),b=b[c],c=b.length-1;if(f!=h)if(k(a,b.charAt(0)))b=b.slice(1);else return;else f==h&&k(a,b.charAt(c))&&(b=b.slice(0,c));return b},setValueInternal:function(a){var e=
this.get("input"),c=j(this),f=c.tokens,c=Math.max(0,c.tokenIndex),d=this.get("separator"),i=this.get("separatorType"),r=f[c+1]||"",m=f[c];if(i!=h){if(f[c]=m.charAt(0)+a,!r||!b.test(r.charAt(0)))f[c]+=" "}else f[c]=a,a=m.length-1,k(d,m.charAt(a))?f[c]+=m.charAt(a):1==d.length&&(f[c]+=d);a=f.slice(0,c+1).join("").length;e.val(f.join(""));e.prop("selectionStart",a);e.prop("selectionEnd",a)},alignInternal:function(){if(this.get("alignWithCursor")){var a=j(this),b=a.tokens,h=this.get("menu"),f=a.cursorPosition,
d=a.tokenIndex,a=this.get("input"),b=b.slice(0,d).join("").length;0<b&&++b;a.prop("selectionStart",b);a.prop("selectionEnd",b);b=c(a);a.prop("selectionStart",f);a.prop("selectionEnd",f);h.set("xy",[b.left,b.top])}else i.prototype.alignInternal.apply(this,arguments)}},{ATTRS:{separator:{value:",;"},separatorType:{value:h},literal:{value:'"'},alignWithCursor:{}}},{xclass:"multi-value-combobox",priority:20})},{requires:["./cursor","./base"]});
KISSY.add("combobox/RemoteDataSource",function(d,c){function i(){i.superclass.constructor.apply(this,arguments);this.io=null;this.caches={}}i.ATTRS={paramName:{value:"q"},allowEmpty:{},cache:{},parse:{},xhrCfg:{value:{}}};d.extend(i,d.Base,{fetchData:function(d,i,h){var b=this,a,e=b.get("paramName"),q=b.get("parse"),f=b.get("cache"),o=b.get("allowEmpty");b.io&&(b.io.abort(),b.io=null);if(!d&&!0!==o)return i.call(h,[]);if(f&&(a=b.caches[d]))return i.call(h,a);a=b.get("xhrCfg");a.data=a.data||{};a.data[e]=
d;a.success=function(a){q&&(a=q(d,a));b.setInternal("data",a);f&&(b.caches[d]=a);i.call(h,a)};b.io=c(a)}});return i},{requires:["ajax"]});
KISSY.add("combobox/render",function(d,c,i){var k=d.all,j=c.Render.extend({createDom:function(){var c,b=this.get("input"),a=this.get("prefixCls"),e=this.get("el"),j=this.get("trigger");this.get("srcNode")||(e.append(d.substitute('<div class="{prefixCls}combobox-input-wrap"></div>',{prefixCls:a})),c=e.one("."+a+"combobox-input-wrap"),b=b||d.all(d.substitute('<input aria-haspopup="true" aria-autocomplete="list" aria-haspopup="true" role="autocomplete" autocomplete="off" class="{prefixCls}combobox-input" />',{prefixCls:a})),
c.append(b),this.setInternal("input",b));j||this.setInternal("trigger",d.all(d.substitute('<div class="{prefixCls}combobox-trigger"><div class="{prefixCls}combobox-trigger-inner">&#x25BC;</div></div>',{prefixCls:a})));this.get("trigger").unselectable(i);this.setInternal("invalidEl",k("<div class='"+a+"combobox-invalid-el'><div class='"+a+"combobox-invalid-inner'></div></div>").insertBefore(b.parent(i,i),i));if(j=this.get("placeholder")){if(!(c=b.attr("id")))b.attr("id",c=d.guid("ks-combobox-input"));
this.setInternal("placeholderEl",k('<label for="'+c+'" class="'+a+'combobox-placeholder">'+j+"</label>").appendTo(e))}},getKeyEventTarget:function(){return this.get("input")},_onSetCollapsed:function(c){this.get("input").attr("aria-expanded",c)},_onSetHasTrigger:function(c){var b=this.get("trigger");c?this.get("el").prepend(b):b.remove()},_onSetDisabled:function(c){j.superclass._onSetDisabled.apply(this,arguments);this.get("input").attr("disabled",c)}},{ATTRS:{collapsed:{value:!0},hasTrigger:{value:!0},
input:{},trigger:{},placeholder:{},placeholderEl:{},invalidEl:{}},HTML_PARSER:{input:function(c){return c.one("."+this.get("prefixCls")+"combobox-input")},trigger:function(c){return c.one("."+this.get("prefixCls")+"combobox-trigger")}}});return j},{requires:["component/base"]});
