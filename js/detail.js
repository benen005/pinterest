/**
* detail JS 
* @log 删除功能全站换成系统的confirm提示；我要回应 在无没内容时变灰，不可点击； by 20130323
*/
KISSY.ready(function(S){

	S.use("overlay,gallery/validation/1.0/", function (S, Overlay, Validation) {

		var DOM = S.DOM,
			Event = S.Event,
			Node = S.Node,
			title =encodeURIComponent(DOM.get('#J_ShareTitle') ? DOM.get('#J_ShareTitle').innerHTML : document.title),
			url = encodeURIComponent(document.location.href),
			DATA_NUMCHECK =  'data-numCheck';

		//detail游记页 - 点击更多想去展示所有的想去
		if(DOM.get('#J_MoreBetter')){
			Event.on('#J_MoreBetter', 'click', function(ev){
				var self = this,
					elements = DOM.query('.togo-item', '#J_Togo');

				if(elements.length <= 0){
					return;
				}

				S.each(elements, function(item){
					DOM.show(item);
				});

				DOM.remove(self);
			});
		}

		/**
		*分享漂浮区域 start
		*/
		if(DOM.get('#J_Tencent')){
			var href = 'http://v.t.qq.com/share/share.php?title='+title+'&url='+url;
			if(DOM.get('#J_ImageLink')){
				href = href + '&pic='+ encodeURIComponent(DOM.attr(DOM.get('#J_ImageLink'), 'src'));
			}

			DOM.attr(DOM.get('#J_Tencent'), 'href', href);
		}

		if(DOM.get('#J_Weibo')){
			var href = 'http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url;
			if(DOM.get('#J_ImageLink')){
				href = href + '&pic='+ encodeURIComponent(DOM.attr(DOM.get('#J_ImageLink'), 'src'));
			}

			DOM.attr(DOM.get('#J_Weibo'), 'href', href);
		}

		if(DOM.get('#J_Douban')){
			var href = 'http://www.douban.com/recommend/?title='+title+'&url='+url;
			DOM.attr(DOM.get('#J_Douban'), 'href', href);
		}

		if(DOM.get('#J_Renren')){
			var href = 'http://share.renren.com/share/buttonshare.do?title='+title+'&url='+url +'&from=maxthon';
			DOM.attr(DOM.get('#J_Renren'), 'href', href);
		}
		/**
		*分享漂浮区域 end
		*/
		Event.on('#J_ReplyArea', 'focusin', function(){
      var length = this.value.length,
          coverEle = DOM.get('#J_Cover');

        if(length > 0){
          DOM.hide(coverEle);
        }else{
           DOM.show(coverEle);
        }
    });

		/** ***/
		Event.on('#J_ReplyArea', 'keyup', function(ev){
			var length = this.value.length,
				parent = DOM.parent('#J_ReplyAreaNum'),
				count = 200-length,
				buttonEle = DOM.prev(parent),
        coverEle = DOM.get('#J_Cover');

      if(length > 0){
        DOM.hide(coverEle);
      }else{
         DOM.show(coverEle);
      }

			if(count <=10 && count >=0){
				
				DOM.html('#J_ReplyAreaNum', count);
				DOM.removeClass(parent, 'error');
				DOM.removeAttr(buttonEle, DATA_NUMCHECK);
				DOM.show(parent);
      

			}else if(count < 0){
				DOM.html('#J_ReplyAreaNum', count);
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

    /***J_ReplyItem hover效果显示**/
    Event.on('.J_ReplyItem', 'mouseenter mouseleave', function(ev){
        var CLASS_HOVER = 'item-hover';
    
        if(ev.type == 'mouseenter'){
          DOM.addClass(this, CLASS_HOVER);
        
        }else if(ev.type == 'mouseleave'){
         
          DOM.removeClass(this, CLASS_HOVER);
        }
    });

    /***这是J_ReplyItem 应**/
    Event.on('.J_Ying', 'click', function(ev){
        var userName = DOM.attr(this, 'data-name');
        DOM.val('#J_ReplyArea', '回应'+userName+":");

        if((document.location.href).indexOf('#J_ReplyArea') <= -1){
           document.location.href = document.location.href+'#J_ReplyArea';
        }

        DOM.get('#J_ReplyArea').focus();

    });

    
  


	  /**Mini登录框初始化*/
	  var LoadDialog = function(){
      		var LoadMask = DOM.create('<div id="J_LoadMask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed; z-index: 999998; visibility: visible;" class="ks-ext-mask ks-dialog-mask ks-overlay-mask ks-dialog-mask-shown ks-overlay-mask-shown"></div>');
      		var LoadContainer = DOM.get('#J_LoadContainer');
      		
      		Event.on(S.one('.ks-ext-close', LoadContainer), 'click', function(ev){
      			LoadDialog.hide();
      		});

      		return {
      			show : function(){
      				
      				DOM.get('#email', LoadContainer).value = '';
      				DOM.get('#password', LoadContainer).value = '';
      				DOM.get('button',LoadContainer).click();
      				DOM.append(LoadMask, 'body');
      				var w = (DOM.viewportWidth() - 780)/2,
                    h = (DOM.viewportHeight() - 240)/2 + DOM.scrollTop();
                             
                   	DOM.css('#J_LoadContainer',{ left: w+'px', top: h+'px'});  
      				DOM.show(LoadContainer);
      				
      			},
      			hide : function(){
      				DOM.remove('#J_LoadMask');
      				DOM.hide(LoadContainer);
      			}
      		}
      	}();


     	/**
		*J_Wanted
		*/
		//想去弹出层-常用标签 临时数组
      var tempTag = [];
    	var Dialog = Overlay.Dialog, wantedDialog,
	        //取消想去
	        cancleDialog = new Dialog({   
	            width:340,
	            elCls:'cancal-container',
	            elStyle:{
	                overflow:'hidden'
	            },
	            align:{
	                points:['cc', 'cc']
	            },
	            effect:{
	                target:'.J_Wanted',
	                easing:'easingStrong',
	                duration:.3
	            },
	            mask : true,
	            bodyContent: DOM.get('#J_CancleContainer').innerHTML
	        });

    	/**
   	 	*每个item的想去的数据请求
   	 	*/
   		function wantedHandleDataFun(param){
   			S.io({
				type:"get",
		        url: "getWantedData.php",
		        data: param,  //参数
		        dataType: "jsonp",
		       	jsonpCallback: "getWantedData",
		        success: function(data){
		        	
		        	if(data && true == data.isLoaded && false == data.isWanted){
		        		renderIntoDOM(data);

		        		//弹出层的
	        			wantedDialog = new Dialog({
				            width:664,
				            elCls:'my',
				            elStyle:{
				                overflow:'hidden'
				            },
				            align:{
				                points:['cc', 'cc']
				            },
				            effect:{
				                target:'.J_Wanted',
				                easing:'easingStrong',
				                duration:.3
				            },
				            mask : true,
				            bodyContent: DOM.get('#J_WantedContainer').innerHTML
				        });

		        		wantedDialog.show();
			        }

			        if(data && true == data.isLoaded && true == data.isWanted){
			        	DOM.attr(S.one('#ColumnContainer'), 'data-param', S.JSON.stringify(param));

			        	cancleDialog.show();
			        	return;
			        }

			        //未登录则提示登录
			        if(!data.isLoaded){

			        	LoadDialog.show();
			        }
		        }
			});
   		}


   		/**
   	 	*取消想去 ajax
   	 	*/
   		function cancleWanted(param, errorMsg){

   			S.io({
				type:"get",
		        url: "cancleWanted.php",
		        data: param,  //参数
		        dataType: "jsonp",
		       	jsonpCallback: "cancleWanted",
		        success: function(data){

		        	if(data && data.status == "success"){
		        		cancleDialog.hide();
		        		DOM.hide(errorMsg);
		        	}

		        	if(data && data.status != "success"){
		        		DOM.show(errorMsg);	
		        	}		
		        }
		    });
   		}

   		/**
   	 	*取消想去 确定按钮 事件绑定
   	 	*/
   		Event.delegate(document, 'click', '.J_CancleButton', function(ev){
   			var that = ev.target,
   				param = DOM.attr(that, 'data-param'),
   				errorMsg = DOM.next(that);

   			cancleWanted(S.JSON.parse(param), errorMsg);
   		});

   	 	/**
   	 	*每个item的想去的数据渲染
   	 	*/
   		function renderIntoDOM(data){
   		
   			var wantedContent = DOM.get('.J_WantedContent'),
   			    img = DOM.get('img', wantedContent),
   			  	travelPlace = DOM.get('.J_TravelPlace', wantedContent),
   			  	shootTime = DOM.query('.J_ShootTime', wantedContent),
   			  	inputArr = DOM.query('input', wantedContent),
   			  	usualTag = DOM.get('.usual-tag', wantedContent),
   			  	wantedButton = DOM.get('.J_WantedButton', wantedContent),
   			  	tags = data.usualTags,
   			  	userTags = tags.split(','),
   			  	tagsList = '',
   			  	stringifyData = KISSY.JSON.stringify(data);

   			  	DOM.attr(wantedButton, 'data-source', stringifyData);
   			  	
		  		DOM.attr(img, 'src', data.picUrl);
		  		DOM.html(travelPlace, data.travlPalce);
		  		DOM.attr(inputArr[0], 'checked', data.isSameCity);
		  		DOM.attr(inputArr[1], 'checked', data.isOriginal);
		  		DOM.attr(inputArr[2], 'checked', data.isCollect);

		  		shootTime[0].innerHTML = data.timeStart;
		  		shootTime[1].innerHTML = data.collectTimeEnd;

		  		S.each(userTags, function(item){
		  			tagsList += '<li><a href="javascript:;" target="_self" class="J_ItemTag">'+item+'</a></li>';
		  		});

		  		var itemTagList = new Node(tagsList), dataTag;
		  		DOM.append(itemTagList, usualTag);

		  		if(data.existTags!= ''){
		  			tempTag = data.existTags.split(',');

		  			S.each(S.all('.J_ItemTag'), function(item){
		  				if(S.inArray(item.innerHTML, tempTag)){
		  					DOM.addClass(item, 'selected');	
		  				}
		  			});

		  			dataTag = tempTag.join(' ');
		  		}else{
		  			dataTag = data.existTags;
		  		}

		  		DOM.get('.J_TagArea', wantedContent).innerHTML = dataTag;
		  		DOM.get('.J_WantedDecription', wantedContent).innerHTML = data.existDescription;
		  		
		  		var msgEle = DOM.get('.msg', wantedContent);
		  		DOM.get('em', msgEle).innerHTML = data.existDescription.length;
		  		
   		}

   		/**
   	 	*想去 按钮事件绑定
   	 	*/
       	Event.delegate(document,"click", ".J_Wanted", function(ev){

       		ev.halt();
       		var that = ev.target,
				flag = $('#J_flag').val(),
       			param = {
					"action" : "want",
       				"id" :  DOM.attr(that, 'data-id')
       			};
			if(flag == 0){	
				S.io({
					type:"get",
					url: "action.php", //提交的地址
					data: param,  //参数
					dataType: "jsonp",
					jsonpCallback: "getWantedData",
					success: function(data){
						if(data.status != "success"){
							alert('系统出错');
						}

						if(data.status == "success"){
							$('#J_flag').val(1);
							alert('谢谢支持!');
						}
					}
				});
			}
			else
				alert('已经点过');
				
       		//wantedHandleDataFun(param);
        });    	

        /**
   	 	*想去弹出层-常用标签 事件绑定
   	 	*/
        Event.delegate(document, "click", ".J_ItemTag", function(ev){

        	var that = ev.target,
        		DATA_SELECTED = 'selected',
        		currentTagName = that.innerHTML,
        		localIndex,
        		multicontainer = DOM.parent(that, 4),
        		tagArea = DOM.get('.J_TagArea', multicontainer);
        		//labelArea = DOM.get('.J_LabelArea', multicontainer);
  
        	
        	//标签最多8个	
        	if(tempTag.length < 8 && !DOM.hasClass(that, DATA_SELECTED)){
        		DOM.addClass(that, DATA_SELECTED);
        		tempTag.push(currentTagName);
        		
        	}else if(tempTag.length < 8 && S.inArray(currentTagName, tempTag)){
        		DOM.removeClass(that, DATA_SELECTED);

        		S.each(tempTag, function(item, index){
        			if(item == currentTagName){
        				localIndex = index;
        			}
        		});
        		
        		tempTag.splice(localIndex, 1);
        	}

        	tagArea.value = tempTag.join(' ');
        	tagArea.focus();
        });

        /**
   	 	*想去弹出层-标签输入框 事件绑定
   	 	*/
		Event.delegate(document, "focusin focusout", '.J_TagArea', function(ev){
            var that = ev.target;
            if(ev.type == 'focusout'){
                if(ev.target.value == ''){
                    DOM.show(DOM.next(that));
                }else{
                    DOM.hide(DOM.next(that));
                }
            }

            if(ev.type == 'focusin'){
                DOM.hide(DOM.next(that));
            }
        });

		/**
   	 	*想去弹出层-常用标签输入框为空时 提示文字
   	 	
        Event.delegate(document, 'click', '.J_LabelArea' ,function(ev){
            DOM.hide(ev.target);
            DOM.prev(ev.target).focus();
        });*/

        /**
   	 	*想去弹出层-常用标签输入框 校验 与 下面的常用标签联动
   	 	*/
        Event.delegate(document, 'keyup focusin', '.J_TagArea' ,function(ev){
            var value = S.trim(DOM.get(ev.target).value),
            	myArr = value.split(' '),
            	grandParent = DOM.parent(ev.target, 2),
            	itemTags = DOM.query('.J_ItemTag', grandParent);

            	if(myArr.length > 8){
            		myArr.splice(8,1);
            	}

            	S.each(itemTags, function(item){
            		DOM.removeClass(item, 'selected');

            		if(S.inArray(item.innerHTML, myArr)){
            			DOM.addClass(item, 'selected');
            		}

            		tempTag = myArr;
            	});

            	DOM.get(ev.target).value = myArr.join(' ');

        });

        /**
   	 	*想去弹出层-想去描述 事件绑定 && 校验长度不能超过200
   	 	*/
        Event.delegate(document, 'keyup', '.J_WantedDecription' ,function(ev){
        	var currentValue = ev.target.value,
        		parent = DOM.parent(ev.target, 2),
        		emEle = DOM.query('em', parent)[1],
        		msgEle = DOM.next(ev.target);

        	DOM.removeClass(emEle, 'error');
        	DOM.hide(msgEle);
        	DOM.attr(ev.target, 'data-check', 1);

            if(currentValue.length > 200){
            	DOM.addClass(emEle, 'error');
            	DOM.attr(ev.target, 'data-check', 0);
            	DOM.show(msgEle);
            }

            emEle.innerHTML = currentValue.length;
        });

        /**
   	 	*想去弹出层-取消按钮 事件
   	 	*/
        Event.delegate(document, "click", ".J_WantedClear", function(ev){
        	wantedDialog.hide();
        });

        /**
   	 	*想去弹出层-想去按钮事件 
   	 	*/
        Event.delegate(document, 'click', '.J_WantedButton' ,function(ev){
        	var that = ev.target,
        		stringifyData= DOM.attr(that, 'data-source'),
        		data = S.JSON.parse(stringifyData),
        		parent = DOM.parent(that, 2),
        		tagsValue = DOM.get('.J_TagArea', parent),
        		description = DOM.get('.J_WantedDecription', parent),
        		desChecked = DOM.attr(description, 'data-check'),
        		multiMsgEle = DOM.get('.J_MultiMsg', parent);

        	if(desChecked != 1){
        		return;
        	}

        	S.merge(data, {
        		"tagsValue" : tagsValue.value,
        		"description" : description.value
        	});

        	wantedDataSubmit(data, multiMsgEle);
        		
        });

        /**
   	 	*想去弹出层-想去按钮ajax 提交
   	 	*/
        function wantedDataSubmit(param, target){

        	S.io({
				type:"get",
		        url: "wantedDataSubmit.php", //提交的地址
		        data: param,  //参数
		        dataType: "jsonp",
		       	jsonpCallback: "getWantedData",
		        success: function(data){
		        	if(data.status != "success"){
		        		DOM.show(target);
		        	}

		        	if(data.status == "success"){
		        		DOM.hide(target);
		        		wantedDialog.hide();
		        	}
		        }
        	});
        }


        	//创建表单验证
        var form = new Validation('#J_Form', {
                anim:0.3,
                style:'under'
            });

        //事件监控，每次表单提交前的验证
       	Event.on('#J_Form', "submit", function() {

            if(!form.isValid()){   
                return false; 
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

      /**删除初始化*/
    /**
    var DeleteDialog = function(){
          var DeleteMask = DOM.create('<div id="J_DeleteMask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed; z-index: 999998; visibility: visible;" class="ks-ext-mask ks-dialog-mask ks-overlay-mask ks-dialog-mask-shown ks-overlay-mask-shown"></div>');
          var DeleteContainer = DOM.get('#J_DeleteContainer');
          
          Event.on(S.one('.ks-ext-close', DeleteContainer), 'click', function(ev){
              DeleteDialog.hide();
          });

          return {
            show : function(param){

              DOM.append(DeleteMask, 'body');
              var w = (DOM.viewportWidth() - 330)/2,
                  h = (DOM.viewportHeight() - 160)/2 + DOM.scrollTop();
                             
              DOM.css('#J_DeleteContainer',{ left: w+'px', top: h+'px'}); 
              DOM.val('#J_DeleteId', param);

              DOM.show(DeleteContainer);
            },
            hide : function(){
              DOM.remove(DeleteMask);
              DOM.hide(DeleteContainer);
            }
          }
        }();
**/

        /***这是J_ReplyItem J_Delete删除**/
        Event.on('.J_Delete', 'click', function(ev){
            var id=DOM.attr(this, 'data-id');
            
            if(window.confirm("确定真的要删除吗？")){
                var containerId = '#J_ReplyItem'+id;

                S.io({
                  type:"get",
                  url: "action.php",
                  data: {
                      "id" :  id,
                      "action" :　"comment_del"
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

        /***这是页面 J_Delete删除**/
        Event.on('.J_DeletePage', 'click', function(ev){
            var id=DOM.attr(this, 'data-id');

            if(window.confirm("确定真的要删除吗？")){
                //DOM.get('#J_DeleteForm').submit();
                S.io({
                  type:"get",
                  url: "action.php",
                  data: {
                      "id" :  id,
					  "action" : 'photo_del'
                  }, //参数
                  dataType: "jsonp",
                  success: function(data){
                      if(data.status && data.status == "success"){
							alert("删除成功");
							location.href='index.php';
                      }
					  else
						  alert('删除失败');
                      
                  }
              });
                return;
            }

        });
	
    /*复制网址Flash*/    
        
        Event.on('#J_CopyButton', 'click', function(ev){
            var copyText = DOM.attr('#J_CopyButton', 'data-clipboard-text');
            if(window.clipboardData){
                window.clipboardData.setData("Text",copyText);
                alert('复制成功');
            }
            else if(window.chrome){
                alert('复制失败');
            }
    /*
    var clip= new ZeroClipboard.Client();// 新建一个对象 
    clip.setHandCursor(true);// 设置鼠标为手型
    clip.setText("哈哈");// 设置要复制的文本。
    clip.glue("J_CopyButton");
    */
    
        });
      
    /***漂浮栏**/
    var shareFloat = DOM.get('.share-float');

    var shareTo = null,
        fShare= function(){
            DOM.css(shareFloat, {
              display: '',
              position:'absolute',
              top:(DOM.scrollTop()+ DOM.viewportHeight() -400)+"px"
            });
        };

      Event.on(window, 'scroll', function(){
        if (S.UA.ie == 6) {
          if (shareTo) clearTimeout(shareTo);
          DOM.hide(shareFloat);
          shareTo = setTimeout(fShare, 500);
        }
      });

      if(S.UA.ie == 6){
        fShare();
      }

	});	
});



$(document).ready(function() {

        $("#add_comment").click(function(){
			var photo_id = $('#photo_id').val();
			
        if($('#J_ReplyArea')[0].value=="")
			{
				alert('未填写');
				return;
			}
		
        $.post('action.php?action=comment_add&id='+photo_id,
			{comment:$('#J_ReplyArea')[0].value,photo_id:$('#photo_id')[0].value},
			function(text,status){
                if(text.type==0){
                    alert('未登陆');
                }
				else if(text.type==2){
					alert('评论过于频繁，请稍后再试！');
				}
                else if(text.type == 1){
 
                    var liuyan="";
					
					
                    liuyan = "<div class=\"reply-item ks-clear J_ReplyItem\"><div class=\"reply-img\"><a href=\"http://www.lvyouzhi.net/user/show/id/"+text.user_id+"\" title=\"\"><img src=\""+text.user_face+"\" /></a></div><div class=\"reply-content\"><p><em>"+text.user_name+"</em><span class=\"time\">"+text.pubtime+"</span><p class=\"reply-text\">"+$('#J_ReplyArea')[0].value+"</p></p></div><div class=\"operating ks-hidden\"><a href=\"javascript:;\" target=\"_self\" class=\"J_Delete\" city-photo-comment-id=\""+text.cid+"\" city-photo-id = \""+text.id+"\">删除</a><a href=\"javascript:;\" class=\"J_Ying\" data-name=\""+text.user_name+"\">应</a><a href=\"javascript:;\" class=\"report J_Report\" data-id=\""+ text.cid +"\">举报</a></div></div>";
					

                    $('.reply-bd')[0].innerHTML = liuyan + $('.reply-bd')[0].innerHTML;

                    $('#J_ReplyArea')[0].value="";
					//alert('ok');
				}
                },"json");
        });
		
});