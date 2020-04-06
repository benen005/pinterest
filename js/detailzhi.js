/**
* 具体城市页面 
* @log: 
*/
KISSY.ready(function(S){
    var DOM =S.DOM, Event = S.Event;

    var CLASS_SIGN = 'sign-open';

    S.use("gallery/suggest/1.0/,util/placeholder,gallery/validation/1.0/", function(S,Suggest,placeholder, Validation) {

        // 新增条目搜索词
        var dataUrl = 'suggest.php?cb=window.bdsug.sug';
        var sugItem = new Suggest('#J_ItemInput', dataUrl, {
            resultFormat: '',
            containerCls: 'bd-sug',
            charset: 'utf-8',
            queryName: 'wd',
            callbackFn: 'bdsug.sug'
        });

        
        sugItem.on('dataReturn', function() {
            this.returnedData = this.returnedData.s || [];
        });
    

        //操作的下拉
        Event.on('.J_Operator', 'mouseenter', function(ev){
            var ulELe = DOM.get('ul', this);
            DOM.show(ulELe);
        });

        Event.on('.J_Operator', 'mouseleave', function(ev){
            var ulELe = DOM.get('ul', this);
            DOM.hide(ulELe);
        });

        /**
        @param  ele{ HTMLElement } 元素
        @param  isOpen{boolean} 是否展开
        */
        function itemDisplay(ele, isOpen){

            if(true == isOpen){
                DOM.addClass(ele, CLASS_SIGN);
                return;
            }

            if(false == isOpen){
                DOM.removeClass(ele, CLASS_SIGN);
                return;
            }

            if(!DOM.hasClass(ele, CLASS_SIGN)){
                DOM.addClass(ele, CLASS_SIGN);
            }else{
                DOM.removeClass(ele, CLASS_SIGN);
            }
        }

        //单个item的显隐
        Event.on('.J_ItemOpen' , 'click', function(ev){
            var parent = DOM.parent(this, 4);

            itemDisplay(parent);
        });

        //所有的item收起
        Event.on('#J_PackUp', 'click', function(ev){
            var versionItems = S.all('.J_VersionItem');

            S.each(versionItems, function(item, index, obj){
                itemDisplay(item, false);
            });

            DOM.hide(this);
            DOM.show('#J_Expansion');

        });

        //所有的item展开
        Event.on('#J_Expansion', 'click', function(ev){
            var versionItems = S.all('.J_VersionItem');

            S.each(versionItems, function(item, index, obj){
                itemDisplay(item, true);
            });

            DOM.hide(this);
            DOM.show('#J_PackUp');
        });

        //J_DeleteItem 操作-》删除
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


    /**删除初始化*/
    var DeleteDialog = function(){
          var DeleteMask = DOM.create('<div id="J_DeleteMask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed; z-index: 999998; visibility: visible;" class="ks-ext-mask ks-dialog-mask ks-overlay-mask ks-dialog-mask-shown ks-overlay-mask-shown"></div>');
          var DeleteContainer = DOM.get('#J_DeleteContainer');
          
          Event.on(S.one('.ks-ext-close', DeleteContainer), 'click', function(ev){
              DeleteDialog.hide();
          });

          Event.on(S.one('.rewrite', DeleteContainer), 'click', function(ev){
              DeleteDialog.hide();
          });

          return {
            show : function(param){

              DOM.append(DeleteMask, 'body');
              var w = (DOM.viewportWidth() - 370)/2,
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

        Event.on('.J_DeleteItem', 'click', function(ev){
            var id=DOM.attr(this, 'data-itemId');
            DeleteDialog.show(id);
        });

        //
        Event.on('#J_DeleteTextarea', 'keyup', function(){
            var parent = DOM.parent(this),
                msgNum = DOM.get('em', parent),
                length = this.value.length;

            if(length > 30){
                DOM.html(msgNum, length);
                DOM.addClass(msgNum, 'error');
                DOM.attr(this, 'data-checked', false);
            }else{
                DOM.removeClass(msgNum, 'error');
                DOM.html(msgNum, length);
                DOM.removeAttr(this, 'data-checked');
            }

        });

        Event.on('#J_DeleteForm', 'submit', function(ev){
           // ev.halt();

            if(DOM.hasAttr('#J_DeleteTextarea', 'data-checked')){
                return false;
            }else{
                DOM.get('#J_DeleteForm').submit();
                return true;
            }
        });


        /**
        * 点评 J_ReviewRegion
        */

        var reviewRegion = DOM.query('.J_ReviewRegion', '#J_ReviewContainer'),
            reviewArr = [];

        S.each(reviewRegion, function(item, index){
            var arr = DOM.query('a', item);
           
           S.each(arr, function(child){
                reviewArr.push(child);
           });
        });

        var commentary = ["很差","较差","一般","推荐","力荐"];

        //显示分数
        function showFraction(num, target){
            var ulEle = DOM.parent(target, 2),
                aArr = DOM.query('a' , ulEle),
                inputEle = DOM.get('.J_ReviewInput', ulEle),
                nameEle = DOM.next(ulEle);

            S.each(aArr, function(item, index){
                DOM.removeClass(item, 'selected');

                if(index < num){
                    DOM.addClass(item, 'selected');
                }
            });

            DOM.val(inputEle, num);

            var number = num-1;
            DOM.html(nameEle, commentary[number]);
            return;
        }

        Event.on(reviewArr, 'mouseenter', function(ev){
            var that = this,
                num = DOM.get(that).innerHTML;

            showFraction(num, that);

        });

        Event.on(reviewArr, 'click', function(ev){
            var that = this,
                ulEle = DOM.parent(that, 2),
                num = DOM.get(that).innerHTML;

            showFraction(num, that);

            DOM.attr(ulEle, 'data-selected-num', num);
        });

        Event.on(reviewArr, 'mouseleave', function(ev){
            var that = this,
                ulEle = DOM.parent(that, 2);

            if(DOM.hasAttr(ulEle, 'data-selected-num')){
                var num = DOM.attr(ulEle, 'data-selected-num');
                showFraction(num, that);
            }else{
                showFraction(0, that);
            }
        });


        var ReviewDialog = function(){
          var ReviewMask = DOM.create('<div id="J_ReviewMask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed; z-index: 9999998; visibility: visible;" class="ks-ext-mask ks-dialog-mask ks-overlay-mask ks-dialog-mask-shown ks-overlay-mask-shown"></div>');
          var ReviewContainer = DOM.get('#J_ReviewContainer');
          
          Event.on(S.one('.ks-ext-close', ReviewContainer), 'click', function(ev){
              ReviewDialog.hide();
          });

          Event.on(S.one('.rewrite', ReviewContainer), 'click', function(ev){
              ReviewDialog.hide();
          });

          return {
            show : function(){

              DOM.append(ReviewMask, 'body');
              var w = (DOM.viewportWidth() - 370)/2,
                  h = (DOM.viewportHeight() - 160)/2 + DOM.scrollTop();
                             
              DOM.css('#J_ReviewContainer',{ left: w+'px', top: h+'px'}); 
             // DOM.val('#J_ReviewId', param);

              DOM.show(ReviewContainer);
            },
            hide : function(){
              DOM.remove(ReviewMask);
              DOM.hide(ReviewContainer);
            }
          }
        }();


        Event.on('#J_ReviewElement', 'click', function(ev){
            //var id=DOM.attr(this, 'data-itemId');
            ReviewDialog.show();
        });
    

    });
});