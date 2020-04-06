/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Jan 29 20:43
*/
KISSY.add("editor/plugin/link/dialog",function(e,d,i,g){function h(a,b){this.editor=a;this.config=b||{};d.Utils.lazyRun(this,"_prepareShow","_real")}var j=i.Dialog,k=g._ke_saved_href;e.augment(h,{_prepareShow:function(){var a=this.editor.get("prefixCls"),b=(new j({width:500,headerContent:"链接",bodyContent:e.substitute("<div style='padding:20px 20px 0 20px'><p><label>链接网址： <input  data-verify='^(https?://[^\\s]+)|(#.+)$'  data-warning='请输入合适的网址格式' class='{prefixCls}editor-link-url {prefixCls}editor-input' style='width:390px;' /></label></p><p style='margin: 15px 0 10px 0px;'><label>链接名称： <input class='{prefixCls}editor-link-title {prefixCls}editor-input' style='width:100px;'></label> <label><input class='{prefixCls}editor-link-blank' style='vertical-align: middle; margin-left: 21px;' type='checkbox'/> &nbsp; 在新窗口打开链接</label></p></div>",
{prefixCls:a}),footerContent:e.substitute("<div style='padding:5px 20px 20px;'><a href='javascript:void('确定')' class='{prefixCls}editor-link-ok {prefixCls}editor-button ks-inline-block' style='margin-left:65px;margin-right:20px;'>确定</a> <a href='javascript:void('取消')' class='{prefixCls}editor-link-cancel {prefixCls}editor-button ks-inline-block'>取消</a></div>",{prefixCls:a}),mask:!0})).render();this.dialog=b;var c=b.get("body"),f=b.get("footer");b.urlEl=c.one("."+a+"editor-link-url");b.urlTitle=c.one("."+
a+"editor-link-title");b.targetEl=c.one("."+a+"editor-link-blank");c=f.one("."+a+"editor-link-cancel");f.one("."+a+"editor-link-ok").on("click",this._link,this);c.on("click",function(a){a&&a.halt();b.hide()});d.Utils.placeholder(b.urlEl,"http://")},_link:function(a){a.halt();var b=this,a=b.dialog,c=a.urlEl.val();if(d.Utils.verifyInputs(a.get("el").all("input"))){a.hide();var f={href:c,target:a.targetEl[0].checked?"_blank":"_self",title:e.trim(a.urlTitle.val())};setTimeout(function(){g.applyLink(b.editor,
f,b._selectedEl)},0)}},_real:function(){var a=this.config,b=this.dialog,c=this._selectedEl;c?(a=c.attr(k)||c.attr("href"),d.Utils.valInput(b.urlEl,a),b.urlTitle.val(c.attr("title")||""),b.targetEl[0].checked="_blank"==c.attr("target")):(d.Utils.resetInput(b.urlEl),b.urlTitle.val(""),a.target&&(b.targetEl[0].checked=!0));b.show()},show:function(a){this._selectedEl=a;this._prepareShow()}});return h},{requires:["editor","../overlay/","./utils"]});
