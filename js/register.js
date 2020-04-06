/**
*注册相关
* 2013.02.16
*/
KISSY.ready(function(S){
    var DOM = S.DOM, Event = S.Event, Node = S.Node;

    S.use("gallery/validation/1.0/", function(S, Validation){

        //创建表单验证
        var form = new Validation('#J_Form', {
                    anim:0.3,
                    style:'under',
                    oktext: "输入正确"
                });

        //事件监控，每次表单提交前的验证
        Event.on('#J_Form', "submit", function() {
            if(!form.isValid() && !cityTree.check()){   
                return false; 
            }
        });

        /**
        *与隐藏的input 关系对应起来
        *
        */
        Event.on('#J_Checked', 'click', function(ev){
            DOM.toggleClass(this, 'checked');
            if(DOM.hasClass(this, 'checked')){
                DOM.val(DOM.get('#clauseAllow'), 'true');
                S.one('.disabled').hide();
            }else{
                DOM.val(DOM.get('#clauseAllow'), 'false');
                S.one('.disabled').show();
            }
        });

        /**
        * 省与城市的联动
        */
        var cityTree = function(){

            var sourceData, 
                provinceData,
                DATA_NUM = 'data-num', //静态变量 孩纸节点的数量
                provinceEle = DOM.get('#province'), 
                provinceSelect = DOM.get('#J_Province'),
                cityELe = DOM.get('#city'),
                citySelect = DOM.get('#J_City'),
                cityParent= DOM.parent(cityELe),
                errorMsg = DOM.get('#selectMsg'),
                nationEle = DOM.get('#nation'),
                nationSelect = DOM.get('#J_Nation');

            /**
            * 对cityTree所需的数据进行处理
            */
            function handleData(data){
                var nation = [];

                for(var k in data){
                    nation.push(k);
                }

                return nation;
            }

            /**
            * 省名的DOM渲染 @param string 洲名
            */
            function renderProvince(param){

                provinceData= sourceData[param];
                var itemHtml='<ul>';

                var province = handleData(provinceData);
             
                S.each(province, function(item){
                    itemHtml+= '<li class="J_ItemLi" data-num="'+ provinceData[item].length +'">'+item+'</li>';
                });

                itemHtml+='</ul>';

               // var liNode = new Node(itemHtml);
               provinceSelect.innerHTML = itemHtml;
               

            }

            /**
            * 洲名的DOM渲染 
            */
            function renderNation(data){
                var  itemHtml='<ul>';

                S.each(data, function(item){
                    itemHtml+= '<li class="J_ItemNationLi">'+item+'</li>';
                });

                itemHtml+='</ul>';

                var liNode = new Node(itemHtml);

                DOM.append(liNode, nationSelect);

                if(nationEle.value !=''){
                    renderProvince(nationEle.value);
                }
                
            }
            /**
            * 城市框的渲染
            */
            function renderCity(data){
                var  itemHtml='<ul class="ks-clear">', liNode;

                citySelect.innerHTML = '';

                S.each(data, function(item){
                    itemHtml+= '<li class="J_ItemCityLi">'+ item +'</li>';
                });

                itemHtml+='</ul>';

                liNode = new Node(itemHtml);

                DOM.append(liNode, citySelect);

                
            }
        

            /**
            * 事件的绑定
            */
            function eventBind(){

                //控制下拉框的显隐
                Event.on(S.all('.home', DOM.get('.reside')), 'mouseenter mouseleave', function(ev){
                    if(ev.type == 'mouseenter'){
                        S.one('.city', this).show();
                    }

                    if(ev.type == 'mouseleave'){
                        S.one('.city', this).hide();
                    }
                }); 

                //鼠标略过的背景色变化
                Event.delegate(document, 'mouseenter mouseleave', 'li', function(ev){
                    DOM.toggleClass(ev.target, 'selected');
                });
                
                //对城市下拉框的事件绑定
                Event.delegate(document, 'click', '.J_ItemCityLi', function(ev){
                    ev.halt();
                    var value = ev.target.innerHTML;
                
                    cityELe.value = value;
                    S.one(citySelect).hide();
                   
                    checkTree();
                });

                //对国家下拉框的事件绑定
                Event.delegate(document, 'click', '.J_ItemNationLi', function(ev){
                    ev.halt();
                    var value = ev.target.innerHTML;
                
                    nationEle.value = value;
                    S.one(nationSelect).hide();
                    DOM.val(provinceEle, '');
                    DOM.val(cityELe, '');
                    DOM.html(citySelect, '');
                    renderProvince(value);
                    checkTree();
                });

                //对省级下拉框的事件绑定
                Event.delegate(document, 'click', '.J_ItemLi', function(ev){
                    ev.halt();
                    var value = ev.target.innerHTML,
                        cityNum = DOM.attr(ev.target, DATA_NUM);

                    DOM.val(provinceEle, value);
                    DOM.attr(provinceEle, DATA_NUM, cityNum);
                    S.one(provinceSelect).hide();
                    DOM.val(cityELe, '');

                    if(cityNum != 0){
                        S.one(cityParent).show();
                        renderCity(provinceData[value]);
                    }else{
                        S.one(cityParent).hide();
                    }

                    checkTree();
                });

            }

            //校验
            function checkTree(){
             
                var nationValue = nationEle.value, 
                    provinceValue = provinceEle.value,
                    cityNum = DOM.attr(provinceEle, DATA_NUM),
                    cityValue = cityELe.value,
                    estate = S.one('.estate', errorMsg),
                    spanEle = S.one('span.label', errorMsg);

                DOM.show(errorMsg);
                DOM.removeClass(S.one('.estate', errorMsg), 'error ok');

                if((provinceValue != '' && cityNum != 0 && cityValue != '' && nationValue != '') || ( nationValue != '' && provinceValue != '' && cityNum == 0 )){
                    DOM.addClass(estate, 'ok');
                    DOM.get('span.label', errorMsg).innerHTML = '正确';
                    return true;
                }else{
                    DOM.addClass(estate, 'error');
                    DOM.get('span.label', errorMsg).innerHTML = '请选择具体居住地';
                    return false;
                }
                
            }

            return {
                init : function(data){
                    sourceData = data;
                    var nation = handleData(data);

                    renderNation(nation);

                    eventBind();
                },
                check : function(){
                    checkTree();
                }
            }

       }();

        cityTree.init(cityData);


        Event.on(DOM.parent('#J_Sex'), 'mouseenter mouseleave', function(ev){
            
            if(ev.type == 'mouseenter'){
                S.one('#J_Sex').show();
            }

            if(ev.type == 'mouseleave'){
                S.one('#J_Sex').hide();
            }
        });

        Event.on('.J_SexLi', 'click', function(ev){
            var value = ev.target.innerHTML;
                
            DOM.get('#sex').value = value;
            S.one('#J_Sex').hide();
            
        });

    });
});