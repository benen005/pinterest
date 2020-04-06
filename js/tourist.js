/**
* 游客点评 部分
*/
KISSY.ready(function(S){
	var DOM = S.DOM, Event = S.Event;

	var DATA_NUMCHECK =  'data-numCheck';

	//点击应 弹出回应的内容
	Event.on('.J_ShowReply', 'click', function(ev){
    DOM.toggleClass(this, 'selected');
		var targetEle = S.one(this).parent().next();
    if(DOM.hasClass(this, 'selected')){
      targetEle.show();
    }else{
      targetEle.hide();
    };
		
	});

	/***J_ReplyItem hover效果显示**/
    Event.on('.J_ReplyItem', 'mouseenter mouseleave', function(ev){
        var CLASS_HOVER = 'item-hover';
    
        if(ev.type == 'mouseenter'){
          DOM.addClass(this, CLASS_HOVER);
        
        }else if(ev.type == 'mouseleave'){
         
          DOM.removeClass(this, CLASS_HOVER);
        }
    });

    /***这是J_ReplyItem J_Delete删除**/
    Event.on('.J_Delete', 'click', function(ev){
        var id=DOM.attr(this, 'data-id');
        
        if(window.confirm("确定真的要删除吗？")){
            var containerId = '#J_ReplyItem'+id;

            S.io({
              type:"get",
              url: "delete.php",
              data: {
                  "id" :  id,
                  "userId" :　global.userId
              }, //参数
              dataType: "jsonp",
              success: function(data){
                  if(data.status && data.status == "success"){
                    var obj = DOM.get(containerId);
                    
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

	/***这是J_ReplyItem 应**/
    Event.on('.J_Ying', 'click', function(ev){
 
        var userName = DOM.attr(this, 'data-name'),
        	parentTarget = DOM.parent(this, 4),
        	targetElement = DOM.get('.J_ReplyArea', parentTarget);

        DOM.val(targetElement, '回应'+userName+":");

        /**if((document.location.href).indexOf('#J_ReplyArea') <= -1){
           document.location.href = document.location.href+'#J_ReplyArea';
        }**/

        DOM.get(targetElement).focus();

    });

    Event.on('.J_FormArea', 'submit', function(ev){
    	ev.halt();

    	var ReplyAreaNum = DOM.get('.J_ReplyAreaNum', this),
    		area = DOM.prev(DOM.parent(ReplyAreaNum));

		if(DOM.hasAttr(area, DATA_NUMCHECK)){
			return false;
		}else{
			DOM.get('#J_Form1').submit();
    		return true;
		}
    });

    Event.on('.J_ReplyArea', 'focusin', function(){
    	
      var length = this.value.length,
      	  parentElement = DOM.parent(this, 3),
          coverEle = DOM.get('.J_Cover', parentElement);

        if(length > 0){
          DOM.hide(coverEle);
        }else{
          DOM.show(coverEle);
        }
    });

		/** ***/
		Event.on('.J_ReplyArea', 'keyup', function(ev){
			var length = this.value.length,
				ReplyAreaNum = DOM.get('.J_ReplyAreaNum', DOM.parent(this, 3)),
				parent = DOM.parent(ReplyAreaNum),
				count = 200-length,
				buttonEle = DOM.prev(parent),
        		coverEle = DOM.get('.J_Cover', DOM.parent(this, 4));

	      if(length > 0){
	        DOM.hide(coverEle);
	      }else{
	         DOM.show(coverEle);
	      }

		if(count <=10 && count >=0){
			
			DOM.html(ReplyAreaNum, count);
			DOM.removeClass(parent, 'error');
			DOM.removeAttr(buttonEle, DATA_NUMCHECK);
			DOM.show(parent);
  

		}else if(count < 0){
			DOM.html(ReplyAreaNum, count);
			DOM.addClass(parent, 'error');
			DOM.attr(buttonEle, DATA_NUMCHECK, 'true');
			DOM.show(parent);
   
		}else{
			DOM.hide(parent);
			DOM.removeAttr(buttonEle, DATA_NUMCHECK);
		}
	});

    /**回应的表单提交**/
	Event.on('#J_Form1', 'submit', function(ev){
		//ev.halt();
		var area = DOM.prev(DOM.parent('#J_ReplyAreaNum'));
		if(DOM.hasAttr(area, DATA_NUMCHECK)){
			return false;
		}else{
			DOM.get('#J_Form1').submit();
    		return true;
		}
	});


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

        //有用的点击
        Event.on('.J_Userful', 'click', function(ev){
        	var that = this,
        		id = DOM.attr(this, 'data-id'),
        		emEle = DOM.get('em', that);

        	S.io({
              type:"get",
              url: "isUseful.php",//有用的接口地址
              data: {
                  "id" :  id,
                  "userId" :　global.userId
              }, //参数
              dataType: "jsonp",
              success: function(data){
                  if(data.status && data.status == "success"){
                  		DOM.html(emEle, data.count);
                  }
                  
              }
            });
        });
        
		//没用的点击
        Event.on('.J_Unuserful', 'click', function(ev){
        	var that = this,
        		id = DOM.attr(this, 'data-id'),
        		emEle = DOM.get('em', that);
        		
        	S.io({
              type:"get",
              url: "isUseful.php", //没有用的接口地址
              data: {
                  "id" :  id,
                  "userId" :　global.userId
              }, //参数
              dataType: "jsonp",
              success: function(data){
                  if(data.status && data.status == "success"){
                  		DOM.html(emEle, data.count);
                  }
                  
              }
            });
        });


});
