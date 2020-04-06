Ext.data.JsonP.KISSY_Loader_ComboLoader({"tagname":"class","name":"KISSY.Loader.ComboLoader","extends":null,"mixins":["KISSY.Loader.Target"],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"private":true},"private":true,"id":"class-KISSY.Loader.ComboLoader","members":{"cfg":[],"property":[],"method":[{"name":"add","tagname":"method","owner":"KISSY.Loader.ComboLoader","meta":{},"id":"method-add"},{"name":"calculate","tagname":"method","owner":"KISSY.Loader.ComboLoader","meta":{"private":true},"id":"method-calculate"},{"name":"detach","tagname":"method","owner":"KISSY.Loader.Target","meta":{},"id":"method-detach"},{"name":"fire","tagname":"method","owner":"KISSY.Loader.Target","meta":{},"id":"method-fire"},{"name":"getComboUrls","tagname":"method","owner":"KISSY.Loader.ComboLoader","meta":{"private":true},"id":"method-getComboUrls"},{"name":"on","tagname":"method","owner":"KISSY.Loader.Target","meta":{},"id":"method-on"},{"name":"use","tagname":"method","owner":"KISSY.Loader.ComboLoader","meta":{},"id":"method-use"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":27,"files":[{"filename":"loader.js","href":"loader.html#KISSY-Loader-ComboLoader"}],"html_meta":{"private":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixins</h4><div class='dependency'><a href='#!/api/KISSY.Loader.Target' rel='KISSY.Loader.Target' class='docClass'>KISSY.Loader.Target</a></div><h4>Files</h4><div class='dependency'><a href='source/loader.html#KISSY-Loader-ComboLoader' target='_blank'>loader.js</a></div></pre><div class='doc-contents'><p class='private'><strong>NOTE</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p><p>using combo to load module files</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-add' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Loader.ComboLoader'>KISSY.Loader.ComboLoader</span><br/><a href='source/loader.html#KISSY-Loader-ComboLoader-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Loader.ComboLoader-method-add' class='name expandable'>add</a>( <span class='pre'>name, fn, config</span> )</div><div class='description'><div class='short'>add module ...</div><div class='long'><p>add module</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>fn</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-calculate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Loader.ComboLoader'>KISSY.Loader.ComboLoader</span><br/><a href='source/loader.html#KISSY-Loader-ComboLoader-method-calculate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Loader.ComboLoader-method-calculate' class='name expandable'>calculate</a>( <span class='pre'>modNames</span> ) : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a><strong class='private signature' >private</strong></div><div class='description'><div class='short'>calculate dependency ...</div><div class='long'><p>calculate dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>modNames</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-detach' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Loader.Target' rel='KISSY.Loader.Target' class='defined-in docClass'>KISSY.Loader.Target</a><br/><a href='source/target.html#KISSY-Loader-Target-method-detach' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Loader.Target-method-detach' class='name expandable'>detach</a>( <span class='pre'>[eventName], [callback]</span> )</div><div class='description'><div class='short'>remove callback for specified eventName from loader ...</div><div class='long'><p>remove callback for specified eventName from loader</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>eventName from kissy loader.\nif undefined remove all callbacks for all events</p>\n</div></li><li><span class='pre'>callback</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a>  (optional)<div class='sub-desc'><p>function to be executed when event of eventName is fired.\nif undefined remove all callbacks fro this event</p>\n</div></li></ul></div></div></div><div id='method-fire' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Loader.Target' rel='KISSY.Loader.Target' class='defined-in docClass'>KISSY.Loader.Target</a><br/><a href='source/target.html#KISSY-Loader-Target-method-fire' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Loader.Target-method-fire' class='name expandable'>fire</a>( <span class='pre'>eventName, obj</span> )</div><div class='description'><div class='short'>Fire specified event. ...</div><div class='long'><p>Fire specified event.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>obj</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getComboUrls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Loader.ComboLoader'>KISSY.Loader.ComboLoader</span><br/><a href='source/loader.html#KISSY-Loader-ComboLoader-method-getComboUrls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Loader.ComboLoader-method-getComboUrls' class='name expandable'>getComboUrls</a>( <span class='pre'>modNames</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><strong class='private signature' >private</strong></div><div class='description'><div class='short'>Get combo urls ...</div><div class='long'><p>Get combo urls</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>modNames</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-on' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Loader.Target' rel='KISSY.Loader.Target' class='defined-in docClass'>KISSY.Loader.Target</a><br/><a href='source/target.html#KISSY-Loader-Target-method-on' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Loader.Target-method-on' class='name expandable'>on</a>( <span class='pre'>eventName, callback</span> )</div><div class='description'><div class='short'>register callback for specified eventName from loader ...</div><div class='long'><p>register callback for specified eventName from loader</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>event name from kissy loader</p>\n</div></li><li><span class='pre'>callback</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>function to be executed when event of eventName is fired</p>\n</div></li></ul></div></div></div><div id='method-use' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Loader.ComboLoader'>KISSY.Loader.ComboLoader</span><br/><a href='source/loader.html#KISSY-Loader-ComboLoader-method-use' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Loader.ComboLoader-method-use' class='name expandable'>use</a>( <span class='pre'>modNames, callback, _forceSync</span> )</div><div class='description'><div class='short'>use, _forceSync for kissy.js, initialize dom,event sync ...</div><div class='long'><p>use, _forceSync for kissy.js, initialize dom,event sync</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>modNames</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>callback</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>_forceSync</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});