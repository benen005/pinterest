Ext.data.JsonP.KISSY_Overlay_Extension_Close({"tagname":"class","name":"KISSY.Overlay.Extension.Close","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-KISSY.Overlay.Extension.Close","members":{"cfg":[{"name":"closable","tagname":"cfg","owner":"KISSY.Overlay.Extension.Close","meta":{},"id":"cfg-closable"},{"name":"closeAction","tagname":"cfg","owner":"KISSY.Overlay.Extension.Close","meta":{},"id":"cfg-closeAction"}],"property":[{"name":"closable","tagname":"property","owner":"KISSY.Overlay.Extension.Close","meta":{},"id":"property-closable"},{"name":"closeBtn","tagname":"property","owner":"KISSY.Overlay.Extension.Close","meta":{"readonly":true},"id":"property-closeBtn"}],"method":[{"name":"close","tagname":"method","owner":"KISSY.Overlay.Extension.Close","meta":{"chainable":true},"id":"method-close"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":8,"files":[{"filename":"close.js","href":"close.html#KISSY-Overlay-Extension-Close"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":["KISSY.Overlay"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixed into</h4><div class='dependency'><a href='#!/api/KISSY.Overlay' rel='KISSY.Overlay' class='docClass'>KISSY.Overlay</a></div><h4>Files</h4><div class='dependency'><a href='source/close.html#KISSY-Overlay-Extension-Close' target='_blank'>close.js</a></div></pre><div class='doc-contents'><p>Close extension class. Represent a close button.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-closable' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Overlay.Extension.Close'>KISSY.Overlay.Extension.Close</span><br/><a href='source/close.html#KISSY-Overlay-Extension-Close-cfg-closable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Overlay.Extension.Close-cfg-closable' class='name expandable'>closable</a><span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span></div><div class='description'><div class='short'>Whether close button is visible. ...</div><div class='long'><p>Whether close button is visible.</p>\n\n<p>Defaults to: true.</p>\n</div></div></div><div id='cfg-closeAction' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Overlay.Extension.Close'>KISSY.Overlay.Extension.Close</span><br/><a href='source/close.html#KISSY-Overlay-Extension-Close-cfg-closeAction' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Overlay.Extension.Close-cfg-closeAction' class='name expandable'>closeAction</a><span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span></div><div class='description'><div class='short'>Whether to destroy or hide current element when click close button. ...</div><div class='long'><p>Whether to destroy or hide current element when click close button.\nCan set \"destroy\" to destroy it when click close button.</p>\n\n<p>Defaults to: \"hide\".</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-closable' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Overlay.Extension.Close'>KISSY.Overlay.Extension.Close</span><br/><a href='source/close.html#KISSY-Overlay-Extension-Close-property-closable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Overlay.Extension.Close-property-closable' class='name not-expandable'>closable</a><span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span></div><div class='description'><div class='short'><p>Whether close button is visible.</p>\n</div><div class='long'><p>Whether close button is visible.</p>\n</div></div></div><div id='property-closeBtn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Overlay.Extension.Close'>KISSY.Overlay.Extension.Close</span><br/><a href='source/close.html#KISSY-Overlay-Extension-Close-property-closeBtn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Overlay.Extension.Close-property-closeBtn' class='name not-expandable'>closeBtn</a><span> : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>close button element.</p>\n</div><div class='long'><p>close button element.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-close' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Overlay.Extension.Close'>KISSY.Overlay.Extension.Close</span><br/><a href='source/close.html#KISSY-Overlay-Extension-Close-method-close' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Overlay.Extension.Close-method-close' class='name expandable'>close</a>( <span class='pre'></span> ) : <a href=\"#!/api/KISSY.Overlay.Extension.Close\" rel=\"KISSY.Overlay.Extension.Close\" class=\"docClass\">KISSY.Overlay.Extension.Close</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>hide or destroy according to closeAction ...</div><div class='long'><p>hide or destroy according to <a href=\"#!/api/KISSY.Overlay.Extension.Close-cfg-closeAction\" rel=\"KISSY.Overlay.Extension.Close-cfg-closeAction\" class=\"docClass\">closeAction</a></p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.Overlay.Extension.Close\" rel=\"KISSY.Overlay.Extension.Close\" class=\"docClass\">KISSY.Overlay.Extension.Close</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>"});