// photo_add_more.tpl js
$(document).ready(function() {
	$("#uploadify").uploadify({
		'uploader'       : 'images/uploadify.swf',
		'script'         : 'uploadify.php?rnd=' + Math.ceil(Math.random()*1000),
		'cancelImg'      : 'images/cancel.png',
		'folder'         : 'upload',
		'buttonImg'      : 'images/uploadify.jpg',
		'queueID'        : 'fileQueue',
		'auto'           : false,
		'multi'          : true,
        'onError'        : function(){alert('出错')}, 
        'onComplete'     : function(event,queueID,fileObj,response,data){},
        'onAllComplete'  : function(event,data){if(data.errors == 0){alert('上传成功_from_js');}},
        'queueSizeLimit' : 100
	});
});

function upload(){
    $('#uploadify').uploadifySettings('scriptData', {user_id: $('#user_id').val(), title:$('#J_Decription').val(), tags:$('#J_TagArea').val()});
    $('#uploadify').uploadifyUpload();    
}





    KISSY.ready(function(S){
        var DOM =S.DOM, Event = S.Event;
        
        S.use("tabs", function(S, Tabs){


            //标签
            var preferTag = '',
                preferTagArr = [];

            function initTagDisplay(){
                if(preferTagArr.length > 0){

                    S.each(S.all('.J_ItemTag'), function(item, index){
                        var value = item.innerHTML;
                        if(S.inArray(value, preferTagArr)){
                            DOM.addClass(item, 'selected');
                        }
                    });
                }
            }

            Event.on('#J_TagArea', 'focusout', function(){
                var value = S.trim(DOM.val('#J_TagArea'));
                
                var arr = value.split(' '), temp = '';
                if(arr.length > 8){
                   S.each(arr, function(item, index){
                        if(index < 8){
                           temp = temp +  item + ' ';
                           preferTagArr[index] = arr[index];
                        }
                    });

                   temp = S.trim(temp);
                }else{
                    temp = arr.join(' ');
                    preferTagArr = arr;
                }

                DOM.val('#J_TagArea', temp);

                initTagDisplay();
            });


            Event.on('.J_ItemTag', 'click', function(){
                var value = this.innerHTML;
               
                if(!S.inArray(value, preferTagArr) && preferTagArr.length < 8 && !DOM.hasClass(this, 'selected')){
                    DOM.addClass(this, 'selected');
                    preferTagArr.push(value);
                    DOM.val('#J_TagArea', preferTagArr.join(' '));
                    return;
                }

                if(S.inArray(value, preferTagArr) && preferTagArr.length <= 8 && DOM.hasClass(this, 'selected')){

                    DOM.removeClass(this, 'selected');
                    S.each(preferTagArr, function(item, index){
                        if(item == value){
                            localIndex = index;
                        }
                    });
                
                    preferTagArr.splice(localIndex, 1);
                    DOM.val('#J_TagArea', preferTagArr.join(' '));
                    return;
                }

                if(S.inArray(value, preferTagArr) && preferTagArr.length < 8 && DOM.hasClass(this, 'selected')){
                   
                    DOM.removeClass(this, 'selected');
                    S.each(preferTagArr, function(item, index){
                        if(item == value){
                            localIndex = index;
                        }
                    });
                
                    preferTagArr.splice(localIndex, 1);
                    DOM.val('#J_TagArea', preferTagArr.join(' '));
                    return;
                }

            });

            //进度条关闭叉叉
            Event.delegate(document, 'click', '.J_ScheduleClose', function(ev){
                S.one(ev.target).parent().remove();
            });

            var currentPlaceInputElement = null,
                searchContainer = DOM.get('#J_SearchContainer');

            Event.on('#J_TravelPlace', 'focusin', function(ev){
                var obj = DOM.offset(this);

                currentPlaceInputElement = DOM.attr(this, 'id');
                DOM.addClass(searchContainer, 'opening-tab');

                if(searchContainer){
                    DOM.css(searchContainer, {"left":(obj.left)+"px", "top":(obj.top+23)+"px"});
                    DOM.show(searchContainer);
                }
            });

            Event.on('#J_TravelPlace', 'focusout', function(ev){
              
                
            });

            Event.on('#J_SearchContainer', 'mouseleave', function(ev){
                DOM.removeClass(searchContainer, "opening-tab");
                DOM.hide(searchContainer);
            });

            Event.on('#J_SearchContainer', 'mouseenter', function(ev){
                if(searchContainer){
                    DOM.addClass(searchContainer, "opening-tab");
                }
            });


            (function(){
            var searchTabContainer = DOM.get('#J_SearchContainer'),
                allPanels = S.all('.tab-citybox', searchTabContainer),
                newPlaceSubmit = DOM.get('#J_NewPlaceSubmit'),
                newPlaceButton = DOM.get('button', newPlaceSubmit);

            if(!searchTabContainer){
                return;
            }

            var tabContainerDialogTabs = new Tabs({
                srcNode: DOM.get('.ks-tabs', DOM.get('.tabContainer'))
            }).render();

            
            //省与城市联动
            Event.delegate(document, 'click', '.J_ProvinceClick', function(ev){
                ev.halt();
                DOM.hide(newPlaceSubmit);
                var self = ev.target,
                    dataId = DOM.attr(self, 'data-id'),
                    id = '#J_TabCity'+dataId;

                S.each(S.all('.J_ProvinceClick', searchTabContainer), function(item, index){
                    DOM.removeClass(item, 'selected');
                    DOM.hide(allPanels[index]);
                });

                DOM.addClass(self, 'selected');
                DOM.show(id);

            });

            //城市与景点的联动
            Event.delegate(document, 'click', '.J_CityClick', function(ev){
                ev.halt();
                DOM.hide(newPlaceSubmit);
                var self = ev.target,
                    currentCityContainer = DOM.parent(self, 2),
                    dataId = DOM.attr(self, 'data-id'),
                    id = '#J_ViewPointer'+dataId,
                    viewContainer = DOM.query('.tab-viewpointcontainer', currentCityContainer);

                S.each(S.all('.J_CityClick', currentCityContainer), function(item, index){
                    DOM.removeClass(item, 'selected');
                    DOM.hide(viewContainer[index]);
                });

                DOM.addClass(self, 'selected');
                DOM.show(id);
                //改变搜索框文案
                DOM.get('#J_TravelPlace').value = self.innerHTML;
                DOM.get('#city_id').value = dataId;  //add by benen005
                DOM.get('#spot_id').value = 0;  //add by benen005
            });

            Event.on('.J_AddNewPlace', 'click', function(ev){
                DOM.show(newPlaceSubmit);
            });
            
            Event.on(S.all('.ks-button', searchTabContainer),'click', function(ev){
                DOM.hide(newPlaceSubmit);
            });

            Event.on('.J_ViewPointerClick','click', function(ev){
                var self = ev.target,
                    dataId = DOM.attr(self, 'data-id'); //add by benen005
                
                S.each(S.all('.J_ViewPointerClick', DOM.parent(this)), function(item, index){
                    DOM.removeClass(item, 'selected');
                });
                DOM.addClass(this, 'selected');
                //改变搜索框文案
                DOM.get('#J_TravelPlace').value = this.innerHTML;
                DOM.get('#spot_id').value = dataId;  //add by benen005
            });


            Event.on('.J_CityLetterClick', 'click', function(ev){
                var letterContent = DOM.query('.tab-letterContent' , DOM.parent(this, 2)),
                    id = DOM.attr(this, 'data-id');
                S.each(S.all('.J_CityLetterClick', DOM.parent(this)) ,function(item, index){
                    DOM.removeClass(item, 'selected');
                    DOM.hide(letterContent[index]);
                });
                DOM.show('#J_CityLetterClick'+id);
                DOM.addClass(this, 'selected');
            });
            /**
            *新地方名提交
                errorObj{obj}
                    labelEle 错误信息文本元素
                    errorEle 错误信息的DIV元素
            */ 
            function submitNewPlaceData(param, errorObj){
                S.io({
                    type:"get",
                    url: "submitNewPlace.php",
                    data: param, //参数
                    dataType: "jsonp",
                    jsonpCallback: "submitNewPlace",
                    success: function(data){
                        DOM.removeClass(DOM.parent(errorObj.labelEle), 'error ok');
                        
                        if(data && data.status == 'success'){
                            errorObj.labelEle.html(data.msg);
                            DOM.addClass(DOM.parent(errorObj.labelEle),'ok');
                            errorObj.errorEle.show();
                        }else{
                            errorObj.labelEle.html(data.msg);
                            DOM.addClass(DOM.parent(errorObj.labelEle),'error');
                            errorObj.errorEle.show();
                        }
                    }
                });
            }

            //新地方名提交
            Event.on(newPlaceButton, 'click', function(ev){
                var self = this,
                    input = DOM.query('input', newPlaceSubmit),
                    isNull = false,
                    param = {
                        "chinese" : false,
                        "english" : false
                    },
                    obj = {
                        "errorEle" : S.one('.valid-under', searchTabContainer),
                        "labelEle" : S.one('.label', searchTabContainer)
                    };

                      S.each(input , function(item ,index){
                    
                        if(item.value.length == 0){
                            isNull = true;
                        }
                        if(index == 0){
                            param.chinese = item.value;
                        }
                        if(index == 1){
                            param.english = item.value;
                        }

                    });

                    if(isNull){
                        obj.labelEle.html('输入框不能为空');
                        DOM.removeClass(DOM.parent(obj.labelEle), 'error ok');
                        DOM.addClass(DOM.parent(obj.labelEle),'error');

                        DOM.show(obj.errorEle);
                    }else{
                       
                        DOM.hide(obj.errorEle);
                        S.each(input , function(item){
                            item.value = '';
                        });

                        submitNewPlaceData(param, obj);
                    }
            });
            
            //如果同城  benen005
            Event.on('#J_samecity', 'click', function(ev){
                var self = this;
                if(true == self.checked){
                    DOM.get('#J_TravelPlace').value = DOM.get('#city_id2_name').value;
                    DOM.get('#city_id').value = DOM.get('#city_id2').value;
                    DOM.get('#spot_id').value = 0;   //benen005
                }
                
            });


        })();
    });
});
