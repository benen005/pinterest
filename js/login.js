/**
** LYZ  登录
*  2012.02.15
*/
KISSY.ready(function(S){
	var DOM = S.DOM, Event = S.Event;

	S.use("gallery/validation/1.0/", function(S, Validation){

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

        //input 失焦&&获得焦点的变化
        Event.on([DOM.get('#email'), DOM.get('#password')], 'focusin focusout', function(ev){
            DOM.toggleClass(DOM.parent(this), 'focus-hover');
            if(ev.type == 'focusout'){
                if(this.value == ''){
                    DOM.show(DOM.next(this));
                }else{
                    DOM.hide(DOM.next(this));
                }
            }

            if(ev.type == 'focusin'){
                DOM.hide(DOM.next(this));
            }
        });

        //tips信息 占位
        Event.on(S.all('.J_Label'), 'click', function(ev){
            S.one(this).hide();
            DOM.prev(S.one(this)).focus();
        });
        
        /**
        *是否记住密码，与隐藏的input 关系对应起来
        * 当a标签上 class='checked' --> input#rememberPassword的value为true;反之,则为false;
        */
        Event.on('#J_Checked', 'click', function(ev){
            DOM.toggleClass(this, 'checked');
            if(DOM.hasClass(this, 'checked')){
                DOM.val(DOM.get('#rememberPassword'), 'true');
            }else{
                DOM.val(DOM.get('#rememberPassword'), 'false');
            }
        });

    });
});