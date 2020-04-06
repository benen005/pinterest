



KISSY.ready(function(S){

	var DOM = S.DOM, Event = S.Event, Node = S.Node, $= Node.all;
    
    Event.on('#J_FindTPhoto', 'click', function(ev){
        var pic = $('#picture').val();
        if(!pic){
            alert('请输入网址');
            return;
        }
        S.ajax({
            data:{
                'pic' : pic
            },
            url:'seize_pic.php',
            dataType:"jsonp",
            jsonp:"callback",
            success:function (d) {
                if(d.status == 'success'){
                    var items = [];
                    var p='';
                    S.each(d.picture, function (item) {
                        p+="<a href='#' onclick='aa(\""+item+"\")'><img width=50 height=50 src=\"" + item + "\" /></a>";
                    });
                    
                    $('#photo1').append(p);
                }
                else if(d.status == 'failure'){
                    alert('出现了未知的错误, 请刷新');
                    
                }
            },
            complete:function () {
                $('#photo1').show();
            }
        });
        
    });
    
    Event.on('.new_photo', 'click', function(ev){
        
        alert(1);
        //$('#photo2').append(that);
    });
    
    Event.on('#J_ClearUrl', 'click', function(ev){
        
        DOM.get('#picture').value= '';
    });
    
    Event.on('#submit', 'click', function(ev){
        
        if(DOM.get('#picture').value == ''){
            alert('请输入网址');
            return false;
        }
        
        
        if(DOM.get('#photo2').value == ''){
            alert('请选择图片');
            return false;
        }
            
    });
    
    
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

            var isVailed = true;

            Event.on('#J_Decription', 'keyup', function(){
               
                var length = this.value.length,
                    decriptionNum = DOM.get('#J_DecriptionNum');

                if(length <= 200){
                    DOM.removeClass(decriptionNum, 'error');
                    isVailed = true;
                }else{
                    DOM.addClass(decriptionNum, 'error');
                    isVailed = false;
                }

                DOM.html(decriptionNum, length);
            });

            Event.on('#J_Form','submit', function(ev){
                if(!isVailed){
                    return false;
                }
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
            
            
            //触发 input = file 的浏览 benen005
            Event.on('#singPic', 'click', function(){
                openBrowse();
            });


        })();

        });
    
    
    
    
    
});

function aa(s){
    //alert(target);
    var pic = "<img src='"+s+"' />";
    //$('#photo3').html(pic);
    $('#singPic_img').attr('src', s);
    $('#photo2').val(s);
    //alert($('#photo2').val());
}
        
function do_it(){
    alert($('#photo').val());
//$('#photo1').html($('#photo').val());
$('#photo1').html('');
$('#photo1').append("<img src='"+$('#photo').val()+"' width='400' />");
}


// add by benen005
function city_request(){
    var chineseName = $('#J_ChineseName').val(),
        englishName = $('#J_EnglishName').val();
    if(chineseName.length != 0 || englishName.length != 0){

        $.ajax({ 
            url: "/city/city_request",
            type: "post",           
            dataType: "jsonp",
            data: {
                "englishName": englishName,
                "chineseName" : chineseName
                
            }, //参数
            success:function(data){ 
                if(data.status == 'success'){
                    alert('提交成功');
                    $('#J_ChineseName').val('');
                    $('#J_EnglishName').val('');
                }
                else{
                    alert('提交出错');
                }
            } 
         });
         
    }
    else{
        alert('请输入内容');
    }
}
