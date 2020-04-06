/*
* Global 旅游志整站的公共JS
*/
KISSY.add('util/placeholder', function(S) {

    var $=S.all,
        WRAP_TMPL='<div class="placeholder" style="position: relative;display:'+(S.UA.ie>7?'inline-block':'inline')+';zoom:1;"></div>',
        TIP_TMPL='<label class="placeholder-label">{tip}</label>',
        isSupport = "placeholder" in document.createElement("input");
        
    /**
     * config{
     *  el：{HtmlElement}目标表单元素
     *  wrap: {Boolean} default true 需要创建一个父容器
     * }
     *
     * 支持两种方式：
     * 1、html5的placeholder属性
     * 2、其他浏览器的支持
     */
    function placeholder(el, cfg) {  
        //支持html5的placeHolder属性
        if(isSupport) return;

        var self=this,
        defaultCfg = {
            wrap:true
        };

        if(self instanceof placeholder) {
            var config = S.merge(defaultCfg, cfg);
            self._init(el, config);
        } else {
            return new placeholder(el, cfg);
        }
    }

    S.augment(placeholder, {
        _init:function(target, cfg) {
            var self = this;

            if(!target) {
                //S.log('[placeholder] has no target to decorate');
                return;
            }

            target = $(target);

            var placeHolderTip = target.attr('placeholder');

            if(!placeHolderTip) return;

            function _decorate() {
                //创建一个label
                var str=S.substitute(TIP_TMPL, {
                    tip:placeHolderTip
                });
                var triggerLabel = self.triggerLabel = $(str);
                triggerLabel.css("width",target.css("width"));
                if(target.attr('id')) {
                    triggerLabel.attr('for', target.attr('id'));
                } else {
                    triggerLabel.on('click', function() {
                        target[0].focus();
                    });
                }

                //create parent               
                var targetBox = $(WRAP_TMPL);
                targetBox.appendTo(target.parent())
                .append(target);

                //insertbefore target
               triggerLabel.insertBefore(target);

                //judge value && init form reset
                S.later(function() {
                    if(!target.val()) {
                        triggerLabel.show();
                    }
                }, 100);
            };

            target.on('focus', function(ev) {
                self.triggerLabel.hide();
            });

            target.on('blur', function(ev) {
                if(!target.val()) {
                    self.triggerLabel.show();
                }
            });

            _decorate();

        },
        /**
         * 可以修改tip文案
         * @param newTip
         */
        text:function(newTip) {
            this.triggerLabel.text(newTip);
        }
    });

    return placeholder;
});


KISSY.ready(function(S){
	var DOM = S.DOM, Event = S.Event, Node = S.Node, $= Node.all;

	S.use("gallery/suggest/1.0/,util/placeholder,overlay,tabs", function(S,Suggest,placeholder,Overlay, Tabs) {
		var selectable = DOM.get('#J_Selectable'),
			selectResult = DOM.get('#J_SelectResult'),
			itemList = S.all('a', selectResult),
			searchCatogery = S.one('span', selectResult),
			searchCatogeryInput = S.one('input', selectResult),
			number = 0;

		//搜索分类下拉
		Event.on(selectResult, 'mouseenter mouseleave', function(ev){
			if(ev.type == 'mouseenter'){
				S.one(selectable).show();
			}

			if(ev.type == 'mouseleave'){
				S.one(selectable).hide();
			}
		});

		//搜索分类下拉项点击事件绑定
		Event.on(itemList, 'click', function(ev){
			ev.halt();
			var selectItemValue = this.innerHTML;
			DOM.get('span', selectResult).innerHTML = selectItemValue;
			DOM.val(S.one('input', selectResult), selectItemValue);
			S.one(selectable).hide();
		});	

		//占位符
        S.all('.J_Placeholder').each(function(el) {
            placeholder(el);
        });    
        
		
	    // 类似Baidu搜索词
	    var dataUrl = 'suggest.php?cb=window.bdsug.sug';
	    var sug = new Suggest('#J_keywordInput', dataUrl, {
	        resultFormat: '',
	        containerCls: 'bd-sug',
	        charset: 'utf-8',
	        queryName: 'wd',
	        callbackFn: 'bdsug.sug'
	    });

		
	    sug.on('dataReturn', function() {
	        this.returnedData = this.returnedData.s || [];
	    });
		
		//导航右边的下拉
	    Event.on('.J_DropList', 'mouseenter mouseleave', function(ev){
	    	if(ev.type == 'mouseenter'){
	    		if(DOM.attr(this, 'id') == 'J_UserMessage'){
	    			S.all('.drop-container').hide();
	    		}
	    		DOM.attr(this, 'data-open', 'true');
	    		var dropContainer = DOM.get('.drop-container', this);
	    		DOM.show(dropContainer);

	    	}else if(ev.type == 'mouseleave'){
	    		var dropContainer = DOM.get('.drop-container', this);
	    		DOM.removeAttr(this, 'data-open');
	    		DOM.hide(dropContainer);
	    	}
	    });

	    //让导航飘一会
	    var isFloated = false;

	    function navFloatHander(){
	    	var doc = document,
	    		header = DOM.get('#header'),
	    		headerHeight = DOM.height(header);

	    	if(S.UA.ie <= 6){
	    		return;
	    	}

	    	if(headerHeight <= DOM.scrollTop(doc)){
	    		if(!isFloated){
	    			DOM.insertAfter(DOM.create('<div id="J_HeaderPlaceHolder" style="height:49px; overflow:hidden;"></div>'), header);
	    			DOM.css(header,{
	    				"position":"fixed",
	    				"z-index": 99,
	    				"left":0,
	    				"top":0,
	    				"width":"100%"
	    			});

	    			isFloated = true;
	    		}
	    		
	    	}else{
	    		if(DOM.get('#J_HeaderPlaceHolder')){
	    			DOM.remove('#J_HeaderPlaceHolder');
	    			DOM.css(header,{
	    				"position":"static"
	    			});
	    		}
	    	
	    		isFloated = false;
	    	}
	    }

		Event.on(window, 'scroll', navFloatHander);


		//私信的异步请求
		//var MessageCount = 0;
		function messageAjax(param){
			
			//MessageCount++;

			S.io({
				type:"get",
		        url: "getMessageList.php",
		        data: param,  //参数
		        dataType: "jsonp",
		       	jsonpCallback: "MessageList",
		        success: function(data){
		        	if(data.status == "success"){

		        		if(data.totalMessageCount != 0){
		        			renderMessageList(data);
		        		}
		        		//递归
		        		//messageAjax(param);
		        		
			        }
		        }
			});
		}

		/**
		*私信 DOM 渲染
		*/
		function renderMessageList(data){
			var messageList = DOM.get('#J_MessageList'),
				dropList = DOM.get('.drop-list', messageList),
				totalCount = DOM.get('em', '#J_UserMessage'),
				htmlTemp = '';

			if(!dropList){
				return;
			}

			var userNotice = '<li><a href="#" target="_blank" class="user-notice">{noticeCount}个通知</a></li>',
                userWanted = '<li><a href="#" target="_blank" class="user-wanted">{wantCount}次想去</a></li>',
                userCalled = '<li><a href="#" target="_blank" class="user-called">{yingCount}次被应</a></li>',
                userMessage = '<li><a href="#" target="_blank" class="user-message">{privateMessage}个私信</a></li>',
                userAt = '<li><a href="#" target="_blank" class="user-at">{mention}个@</a></li>',
                userUsual  = '<li><a href="javascript:;" target="_self" class="user-usual" id="J_AlreadtKnow">已经知道</a></li>',
                userFen = '<li><a href="#" target="_blank" class="user-fen">{fenCount}个新粉</a></li>';

           	if(data.noticeCount != 0){
           		htmlTemp+=userNotice;
           	}
          	if(data.wantCount != 0){
           		htmlTemp+=userWanted;
          	}
           	if(data.yingCount != 0){
           		htmlTemp+=userCalled;
           	}
           	if(data.privateMessage != 0){
           		htmlTemp+=userMessage;
           	}
           	if(data.mention != 0){
           		htmlTemp+=userAt;
           	}

           	if(data.fenCount != 0){
           		htmlTemp+=userFen;
           	}

			htmlTemp+=userUsual;
			totalCount.innerHTML = data.totalMessageCount;

			var newNode = S.substitute(htmlTemp, data);

			DOM.html(dropList, newNode);

			if(!DOM.hasAttr('#J_UserMessage', 'data-open')){
				DOM.show(messageList);
			}

		}

		/**
		*私信入口
		*/
		function messageInit(){
			var global = window['global'];

			Event.delegate(document, 'click', '#J_AlreadtKnow', function(ev){
				S.one('#J_MessageList').hide();
			});
			
			if(true == global.isLoaded){
				var param = {
					"userId" : global['userId']
				};

				messageAjax(param);
			}
		}
		
		messageInit();


	/**漂浮栏yoyo*/
		(function(){
			/*
			*漂浮栏 静态值
			*/
			var backBanner = DOM.get('#J_BackBanner'),
				backTheme = DOM.get('.back-theme', backBanner),
				backContainer = DOM.get('.back-container', backBanner);

			if(!backBanner){
				return;
			}
			 // scrollTo top
			$('#J_BackToTop').on('click', function (ev) {
		       ev.halt();
		       ev.preventDefault();
		       $(window).stop();

		       $(window).animate({
		            scrollTop:0
		       }, 1, "easeOut");
			});

			/*
			*获取漂浮栏的更新数量
			*/
			function getUpdateCount(target){
				var count;
				number++;
				S.io({
					type:"get",
			        url: "getUpdateCount.php",
			        data: {}, //参数
			        dataType: "jsonp",
			       	jsonpCallback: "updateCount"+ number,
			        success: function(data){
			        	
			        	if(data && data.totalCount){
			        		if(data.totalCount > 99){
				        		count = '99+';
				        	}else{
				        		count = data.totalCount;
				        	}

				        	DOM.html(target, '更新'+count);
				        }
			        }
				});
			}


			
			/*
			*漂浮栏的高亮效果
			*/
			Event.on('#J_BackBanner', 'mouseenter mouseleave', function(ev){
				
				DOM.toggleClass(this, 'back-banner-hover');

				if(ev.type == 'mouseenter'){
					var target = S.one('.J_BackUpdate', this);
					getUpdateCount(target);
				}
			});

			/*
			*漂浮栏的IE6下 fixed position：fixed的bug
			*/
			var sto = null,
				fCollect = function(){
	                DOM.css(backBanner, {
	                    display: '',
						top:(DOM.scrollTop()+ DOM.viewportHeight() -270)+"px"
	                });
	            };

			Event.on(window, 'scroll', function(){
				if (S.UA.ie == 6) {
					if (sto) clearTimeout(sto);
					DOM.hide(backBanner);
					sto = setTimeout(fCollect, 500);
				}
			});

			if(S.UA.ie == 6){
				fCollect();
			}
			
			
			/**
			*计算漂浮栏 主题的浮出层定位；
			*高度超出108 才会生效 ->>  108 = 112(漂浮栏的高度) -4(padding-top)
			*/
			function countBoxPosition(){
				var boxHeight = DOM.height(backContainer),
					minusCount = boxHeight > 108 ? (boxHeight-108) : 0; 

				if(minusCount != 0 ){
					DOM.css(backContainer, {"top": "-"+ minusCount +"px"});
					DOM.css(DOM.get('s', backContainer), {"margin-top": (minusCount+5) +"px"});
				}
			}

			Event.on(backTheme, 'mouseenter', function(ev){
				countBoxPosition();
				DOM.show(backContainer);
			});

			Event.on(backTheme, 'mouseleave', function(ev){
				DOM.hide(backContainer);
			});

		})();
		




	});
});