/**
** 
* created  in 2013.02.07 
*/
KISSY.ready(function(S){

	var DOM = S.DOM, Event = S.Event, Node = S.Node, $= Node.all;
	LYZ = { "isLoaded" : false};

	//瀑布流
	S.use("waterfall,ajax,gallery/template/1.0/,overlay,tabs,gallery/validation/1.0/", function (S, Waterfall, io, Template, Overlay, Tabs,Validation) {
		//fixedDOM的高度
		var fixedLeft = DOM.get('.ks-waterfall-fixed-left'),
  			fixedHeight = DOM.height(fixedLeft);

  			DOM.css(fixedLeft, 'height', (fixedHeight+10)+'px');

	    var youHtml = '<span class="you"></span>',
	    	videoHtml = '<span class="videoicon"></span>',
	    	headerHtml	= $('#tpl1').html(),
	    	midHtml	= $('#tpl2').html(),
	    	footerHtml = $('#tpl3').html(),
	        nextpage = 1,
	        param = DOM.get('#J_SearchWaterFallParam') ? DOM.val('#J_SearchWaterFallParam') : '',
	        waterfall = null;

	    function  waterfallFun(param){
	    	if(waterfall  != null){
	    		S.each(S.all('.ks-waterfall'), function(item, index){
	    			if(index > 0){
	    				DOM.remove(item);
	    			}
	    		});
	    	}

	        waterfall = new Waterfall.Loader({
	            container:"#ColumnContainer",
	            load:function (success, end) {
	                $('#loadingPins').show();
	                S.ajax({
	                    data:{
	                        'param' : param
	                    },
	                    url:'data.php',
	                    dataType:"jsonp",
	                    jsonp:"callback",
	                    success:function (d) {
	                    	
	                        // 如果数据错误, 则立即结束
	                        if (d.status !== 'success') {
	                            alert('load data error!');
	                            end();
	                            return;
	                        }
	                        // 如果到最后一页了, 也结束加载
	                        nextpage = d.photos.page + 1;
	                        if (nextpage > d.photos.pages) {
	                            end();
	                            return;
	                        }
	                        // 拼装每页数据
	                        var items = [];
	                        S.each(d.photos.photo, function (item) {
	                            item.height = Math.round(Math.random() * (300 - 180) + 480); // fake height
	                    
								var htmlTemple = headerHtml, tpl;
	                          	if(item.itemCategory === 'video'){
	                          		htmlTemple += videoHtml;
	                          	}
	                          	if(true == item.isYou){
	                          		htmlTemple += youHtml;
	                          	}
	                          	htmlTemple += midHtml;
	                          	htmlTemple += footerHtml;
	                          	tpl = Template(htmlTemple);
	                            items.push(new S.Node(tpl.render(item)));
	                        });
	                        
	                        success(items);
	                    },
	                    complete:function () {
	                        $('#loadingPins').hide();
	                    }
	                });
	            },
	            minColCount:2,
	            colWidth:234
	        });
		};

		waterfallFun(param);

		Event.on('.J_Mark', 'click', function(ev){
			ev.halt();
			S.each(S.all('.J_Mark'), function(item){
				DOM.removeClass(item, 'selected');
			});

			DOM.addClass(this, 'selected');
			var param = this.innerHTML;

			if(param != ''){
				waterfallFun(param);
			}
			
		});

		/*
		*图片事件绑定
		*/
		Event.delegate(document, 'mouseenter','.J_Image', function(ev){
			ev.halt();
		    ev.preventDefault();
			var parentNode = DOM.parent(ev.target,3);

			S.one('.J_Cover', parentNode).show();
		});

		Event.delegate(document, 'mouseleave','.J_Image', function(ev){
			ev.halt();
		    ev.preventDefault();
			var parentNode = DOM.parent(ev.target, 3);
			S.one('.J_Cover', parentNode).hide();
		});

		Event.delegate(document, 'mouseenter','.J_Cover', function(ev){
			ev.halt();
		    ev.preventDefault();
			S.one(ev.target).show();
		});
/*
		*图片事件绑定
		*/
		Event.delegate(document, 'mouseenter','.J_Image', function(ev){
			ev.halt();
		    ev.preventDefault();
			var parentNode = DOM.parent(ev.target,3);

			S.one('.J_Cover', parentNode).show();
		});

		Event.delegate(document, 'mouseleave','.J_Image', function(ev){
			ev.halt();
		    ev.preventDefault();
			var parentNode = DOM.parent(ev.target, 3);
			S.one('.J_Cover', parentNode).hide();
		});

		Event.delegate(document, 'mouseenter','.J_Cover', function(ev){
			ev.halt();
		    ev.preventDefault();
			S.one(ev.target).show();
		});

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
	                target:'#header',
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
				                target:'#header',
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
   				param = DOM.attr(S.one('#ColumnContainer'), 'data-param'),
   				errorMsg = DOM.next(that);

   			cancleWanted(S.JSON.parse(param), errorMsg);
   		});

   	 	/**
   	 	*每个item的想去的数据渲染
   	 	*/
   		function renderIntoDOM(data){
   			var wantedContent = DOM.get('.J_WantedContent')[0],
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
       		var that = ev.target,
       			param = {
       				"id" :  DOM.attr(that, 'data-id')
       			};

       		wantedHandleDataFun(param);
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



    });

});