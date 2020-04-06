/**
*发布页面
*/
KISSY.ready(function(S){
    var DOM =S.DOM, Event = S.Event;
    S.use("switchable", function(S, Switchable){
        var Carousel = Switchable.Carousel;

        //通过DOM元素新建旋转木马
        if(DOM.get('#J_ImageThuml')){
        	var carousel = new Carousel('#J_ImageThuml', {
	            effect: 'scrollx',
	            easing: 'easeOutStrong',
	            steps: 4,
	            viewSize: [240],
	            circular: false,
	            prevBtnCls: 'prev',
	            nextBtnCls: 'next',
	            //autoplay:true,//是否自动切换
	            disableBtnCls: 'disable',
	            lazyDataType: 'img-src'
	        });

	        window.carousel = carousel;
        }
        
        //标签
        var preferTag = '',
            preferTagArr = [];

        //初始化标签展示
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

    });
});