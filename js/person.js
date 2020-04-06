/**
** LYZ 首页
* created  in 2013.02.07 
*/
KISSY.ready(function(S){

	var DOM = S.DOM, Event = S.Event, Node = S.Node, $= Node.all;

	LYZ = { "isLoaded" : false};
	


	//瀑布流
	S.use("waterfall,ajax,gallery/template/1.0/,overlay,tabs,gallery/validation/1.0/", function (S, Waterfall, io, Template, Overlay, Tabs, Validation) {
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
		
				//更多 下拉框
				Event.on('.J_More' , 'mouseenter mouseleave', function(ev){
					var that = this,
						container = DOM.get('.J_MoreContainer', that);

					if(ev.type == 'mouseenter'){
						DOM.show(container);
					}

					if(ev.type == 'mouseleave'){
						DOM.hide(container);
					}
				});
				

				//修改 描述
				var modifyContainer = S.one('.J_ModifyContainer'),
					textarea = DOM.get('textarea', modifyContainer),
					ele = DOM.get('em', modifyContainer),
					msg = DOM.parent(ele);

				Event.delegate(document, 'click','.J_Modify', function(ev){
					ev.halt();
					DOM.hide(DOM.parent(ev.target));
					DOM.show(modifyContainer);
					textarea.focus();
				});

				Event.on('#J_AnswerRewrite', 'click', function(ev){
					ev.halt();
				textarea.value = '用相片记录一生的旅行！';
				DOM.removeClass(ele, 'error');
				ele.innerHTML = (70-11);
				});

				//保存按钮
			Event.on('#J_AnswerSave', 'click', function(ev){
					
				var value = textarea.value;
				if(value.length <= 70 && value.length > 0){
		
					S.io({
						type:"get",
							url: "personAnswer.php",
							data: {
								"userId": global.userId,
								"description" : value
							},  //参数
							dataType: "jsonp",
							jsonpCallback: "personAnswer",
							success: function(data){
								if(data.status == "success"){
									S.one(DOM.parent('.J_Modify')).html(value+'<a href="javascript:;" target="_self" class="J_Modify">（修改）</a>').show();
									modifyContainer.hide();
								}
							}
					});
				}
				});

	//自己页面的 描述输入框
				Event.on(textarea, 'keyup focusout focusin', function(ev){
					var length = this.value.length;

					ele.innerHTML = 70-length;

					if(length >= 0 && length <= 70){
						DOM.removeClass(ele, 'error');
					}

					if(length > 70){
						DOM.addClass(ele, 'error');
					}

				});

				/**备注 **/
				var remarkContainer = DOM.get('#J_Remark'),
							remark = DOM.get('#J_UserRemark');

			 Event.on('#J_UserRemark', 'click', function(ev){
							DOM.hide(this);
							DOM.show(remarkContainer);
							remarkContainer.focus();
			});

			Event.on(remarkContainer, 'focusout' , function(ev){
					var that = this;
					if(that.value.length !=0){
										S.io({
												type:"get",
													url: "remark.php",
													data: {
														"userId": global.userId,
														"value" : that.value
													},  //参数
													dataType: "jsonp",
													jsonpCallback: "remark",
													success: function(data){
														if(data.status == "success"){
																	S.one(remark).html(that.value).show();
																	DOM.hide(that);
														}else{
																	DOM.hide(this);
																	DOM.show(remark);
														}
													}
											});
					}else{
							DOM.hide(this);
							DOM.show(remark);
					}

			});


			//f分组
			var GroupContainer = S.one('#J_GroupContainer'),
					lastArr = S.all('li.last', GroupContainer),
					groupNumber = 0,
					msgEle =DOM.get('.label', lastArr[0]);
				 

			Event.delegate(document, 'click', '.J_Group' , function(ev){
					ev.halt();
					
					var that = ev.target,
							inputValeue = DOM.get('input', that),
							currentValue = DOM.attr(that, 'data-name');
							groupNumber++,
							Group = DOM.query('.J_Group');

					//  DOM.attr(inputValeue, 'checked', true);
				that.checked = true;
			 	
				S.later(function(){

					S.each(Group, function(item){
				 		item.checked = false;
				 	})
				}, 1000);
				 

						 S.io({
											type:"get",
												url: "group.php",   //地址
												data: {
													"userId": global.userId,
													"value" : currentValue
												},  //参数
												dataType: "jsonp",
												jsonpCallback: "group"+groupNumber,
												success: function(data){
													//debugger;
													

														if(data.status == "success"){
																	//渲染到页面 
																	DOM.get('#J_CroupName').innerHTML = currentValue;
																	DOM.hide(lastArr[0]);
																	return false;
														}
														if(data.status == "failure"){
																	msgEle.innerHTML = data.msg;
																	DOM.show(lastArr[0]);
																	return false;
														}
												}
						 });
				
			});

				Event.on('#J_CreatGroup', "click", function(ev){
						var that = this,
								inputEle = DOM.prev(DOM.parent(that));

						if(inputEle.value.length !=0 && inputEle.value.length <=12){
										S.io({
												type:"get",
													url: "group.php",   //地址
													data: {
														"userId": global.userId,
														"value" : inputEle.value
													},  //参数
													dataType: "jsonp",
													jsonpCallback: "group",
													success: function(data){
														if(data.status == "success"){
																	//渲染到页面
																	var  temp ='<li> <a href="javascript:void(0);" class="J_Group">'+
																											'<input  type="radio" name="group" data-name="{groupName}"/><label>{groupName}</label>'+
																											'</a></li>',
																					datahtml = S.substitute(temp, data);

																					DOM.insertBefore(new Node(datahtml),  lastArr[0]);
																					DOM.hide(lastArr[0]);
														}
														
														if(data.status == "failure"){
																 msgEle.innerHTML = data.msg;
																	DOM.show(lastArr[0]);
																	return;
														}
													}
							 });
						}else{
										lastArr[0].innerHTML = '不得超过6个汉字或12个字符';
										DOM.show(lastArr[0]);
										return false;
						}
				});

				//想去 && 去过
			 
				Event.on('.J_Ideal', 'click', function(ev){
						var that = this;
							var  goDialog = new Dialog({
										width:420,
										elCls:'goDialog currentMonthContainer',
										elStyle:{
												overflow:'hidden'
										},
										align:{
												points:['cc', 'cc']
										},
										effect:{
												target: that,
												easing:'easingStrong',
												duration:.3
										},
										mask : true,
										bodyContent: DOM.get('#J_GoContainer').innerHTML
								});

							goDialog.show();

					var  goDialogTabs = [];
					
					S.all('.ks-tabs', DOM.get('.goDialog')).each(function(n,index){
							goDialogTabs[index] = new Tabs({
										srcNode: n
								}).render();
					});

				});


				//申请 
				var applyDialog = function(){
					var ApplyMask = DOM.create('<div id="J_ApplyMask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed; z-index: 999998; visibility: visible;" class="ks-ext-mask ks-dialog-mask ks-overlay-mask ks-dialog-mask-shown ks-overlay-mask-shown"></div>');
					var ApplyContainer = DOM.get('#J_ApplyContainer');
					
					Event.on(S.one('.ks-ext-close', ApplyContainer), 'click', function(ev){
						applyDialog.hide();
					});

					return {
						show : function(){
							
							DOM.append(ApplyMask, 'body');
							var w = (DOM.viewportWidth() - 414)/2,
										h = (DOM.viewportHeight() - 240)/2 + DOM.scrollTop();
														 
										DOM.css('#J_ApplyContainer',{ left: w+'px', top: h+'px'});  
							DOM.show(ApplyContainer);
						},
						hide : function(){
							DOM.remove('#J_ApplyMask');
							DOM.hide(ApplyContainer);
						}
					}
				}();

				//创建表单验证
				var applyForm = new Validation('#J_ApplyForm', {
										anim:0.3,
										style:'under'
								});

				function checkApllyForm(){
					var Recommend = S.all('.J_Recommend',"#J_ApplyContainer"),
							checked = false;

					S.each(Recommend, function(item){
						if(item.value.length !=0){
							checked = true;
						}
					});

					return checked;
				}
				//事件监控，每次表单提交前的验证
				Event.on('#J_ApplyForm', "submit", function(ev) {
						
						if(!applyForm.isValid() || false == checkApllyForm()){   
								return false; 
						}
				});

				Event.on(S.one('.ks-ext-close', '#J_ApplyContainer'), 'click', function(ev){
						applyDialog.hide();
				});

				Event.on(S.one('.rewrite','#J_ApplyContainer'), 'click', function(ev){
						applyDialog.hide();
				});

				Event.on('.J_Apply', 'click', function(ev){
						ev.halt();
						applyDialog.show();
				});

				//申请 - 头衔
				Event.on(DOM.parent('#J_SelectDown'), 'mouseleave mouseenter', function(ev){
						if(ev.type =='mouseenter'){
								S.one('#J_SelectDown').show();
						}else{
								S.one('#J_SelectDown').hide();
						}
				});

				Event.on('.J_DownTitleLi', 'click', function(ev){
						ev.halt();
						var value = this.innerHTML,
								selectDown = DOM.get('#J_SelectDown'),
								prev = DOM.prev(selectDown);

						prev.value=value;
						S.one('#J_SelectDown').hide();
				});


				//go-headeritem  想去&&去过的切换
				Event.delegate(document, 'click', '.go-headeritem', function(ev){
					var that = ev.target,
							index = DOM.attr(that, 'data-id'),
							currentContainer = DOM.parent(that, 2),
							currentContent = S.all('.go-content', currentContainer);

					S.each(S.all('.go-headeritem',currentContainer), function(item, index){
							DOM.removeClass(item, 'selected');
							DOM.hide(currentContent[index]);
					});

					DOM.addClass(that, 'selected');
					DOM.show(currentContent[index]);

				});


				//关注此人的异步
				Event.on('#J_Attention', 'click', function(ev){
						ev.halt();
						var id = DOM.attr(this, 'data-userId'),
								that = this;
						S.io({
								type:"get",
								url: "group.php",   //地址
								data: {
									"userId": global.userId,
									"attentionId" : id
								},  //参数
								dataType: "jsonp",
								jsonpCallback: "group",
								success: function(data){
										if(data.status == "success"){
											DOM.attr(that, 'id', '');
											DOM.attr(that, 'class', 'already-attention');
										}
								}
						});
				});
		});

});