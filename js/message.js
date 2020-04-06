/*
*
*/
KISSY.ready(function(S){
	var DOM = S.DOM, Event = S.Event;

	 /**举报初始化*/
    var ReportDialog = function(){
	      var ReportMask = DOM.create('<div id="J_ReportMask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed; z-index: 999998; visibility: visible;" class="ks-ext-mask ks-dialog-mask ks-overlay-mask ks-dialog-mask-shown ks-overlay-mask-shown"></div>');
	      var ReportContainer = DOM.get('#J_ReportContainer');
	      
	      Event.on(S.one('.ks-ext-close', ReportContainer), 'click', function(ev){
	          ReportDialog.hide();
	      });

	      Event.on('#J_ReportReset', 'click', function(ev){
	          ReportDialog.hide();
	      });

	      return {
	        show : function(param){

	          DOM.append(ReportMask, 'body');
	          var w = (DOM.viewportWidth() - 330)/2,
	              h = (DOM.viewportHeight() - 160)/2 + DOM.scrollTop();
	                         
	          DOM.css('#J_ReportContainer',{ left: w+'px', top: h+'px'}); 
	          DOM.val('#J_ReportId', param);

	          DOM.show(ReportContainer);
	        },
	        hide : function(){
	          DOM.remove(ReportMask);
	          DOM.hide(ReportContainer);
	        }
	      }
    }();

    Event.on('.J_Report', 'click', function(ev){
        var id=DOM.attr(this, 'data-id');
        ReportDialog.show(id);
    });


    //删除
    Event.on('.J_Delete', 'click', function(){
    	var id = DOM.attr(this, 'data-id'),
    		messageId = '#J_Message'+id;

        if(window.confirm("确定要删除这条消息吗？")){

        	S.io({
                type:"get",
                url: "delete.php",
                data: {
                    "id":id,
                    "userId":global.userId
                }, //参数
                dataType: "jsonp",
                success: function(data){
                    if(data.status && data.status == "success"){
                    	var obj = DOM.get(messageId);
                    	
                    	if(S.UA.shell != 'ie'){
                    		var anim = new S.Anim(obj, 'opacity:0; height:10px', 0.48, 'fadeout');
    						anim.on('complete', function(){
    							DOM.remove(obj);
    						});

    						anim.run();

                    	}else{
                    		DOM.remove(obj);
                    	}
                    	
                    	
                    }
                    
                }
            });
        }

    });

    //全选当前的input进行删除
    Event.on('#J_AllInput', 'click', function(){
    	var allInput = S.all('input', S.one('.message-bd'));
    	if(true == this.checked){
    		
    		S.each(allInput, function(item){
    			DOM.attr(item, 'checked', true);
    		});
    	}else{
    		
    		S.each(allInput, function(item){
    			DOM.removeAttr(item, 'checked');
    		});
    	}
    });

    Event.on('#J_MessageDeleteForm', 'submit', function(){
    	var allInput = S.all('input', S.one('.message-bd')),
    	 	isVaild = false;
    	
    	S.each(allInput, function(item){
			if(item.checked){
				isVaild = true;
			}
		});

		if(!isVaild){
			return false;
		}
    });

    Event.on('.J_MessageZone', 'mouseenter', function(ev){
    	DOM.addClass(this, 'message-hover');
    });

    Event.on('.J_MessageZone', 'mouseleave', function(ev){
    	DOM.removeClass(this, 'message-hover');
    });


    //发消息
    var msgPostObj={
    	"title" :false,
    	"content":false
    };

    if(!DOM.get('#J_MsgTitle')){
		msgPostObj.title = true;
    }

    if(!DOM.get('#J_MsgTitle2')){
        msgPostObj.title = true;
    }

    //私信提交
    Event.on('#J_MessagePostForm', 'submit', function(ev){
    	
    	if(true == msgPostObj.title && true == msgPostObj.content){
    		return true;
    	}else{
    		return false;
    	}
    });

    //写私信
    Event.on('#J_MsgTitle', 'keyup', function(ev){
    	var that = this;
        msgPostObj.title = true;

    	if(that.value.length > 20){
    		DOM.val(that, that.value.slice(0, 20));
            return;
    	}

        if(that.value.length == 0){
            msgPostObj.title = false;
            return;
        }
    });

    //回复私信
    Event.on('#J_MsgTitle2', 'keyup', function(ev){
        var that = this;

        if(that.value.indexOf("Re:") == 0 && that.value.length > 23){
            DOM.val(that, that.value.slice(0, 23));
            return;
        }else if(that.value.indexOf("Re:") <= -1 && that.value.length > 20){
            DOM.val(that, that.value.slice(0, 20));
            return;
        }

        if(that.value.length == 0){
            msgPostObj.title = false;
            return;
        }

    });

    Event.on('#J_MsgContent', 'keyup', function(ev){
    	var that = this,
    		msgContentNum = DOM.get('#J_MsgContentNum');

    	if(that.value.length > 0 && that.value.length <= 200){
    		DOM.removeClass(msgContentNum, 'error');
    		msgPostObj.content = true;
    	}else{
    		DOM.addClass(msgContentNum, 'error');
    		msgPostObj.content = false;
    	}

    	DOM.html(msgContentNum, that.value.length);
    });
});