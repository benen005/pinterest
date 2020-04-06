<?php 
    include_once('action.php');
    if(get_agent() == 'mobile'){   //如果是手机端
       //i header('Location: http://'.$web_url.'/myweb/index2.php');
    }
    $tags = tag_two_array();
    $all_tags = tag_array();

    $cat = g('cat', null);
    $q = g('q', null);
?>
<!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>
             <?php echo $webname; ?> - 首页
        </title>
        <link rel="stylesheet" href="css/global.css" />
        <link rel="stylesheet" href="css/login.css" />
        <link rel="stylesheet" href="css/index.css" />
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="kissy/build/kissy.js"></script>
        <script type="text/javascript">
            window['global'] = {
                "isLoaded" : true,
                "userId":"12312312312"
            };
        </script>
    </head>
    <body>
        <?php include 'header1.php'; ?>
        <input type="hidden" value="<?php if($q) echo 'q,'.$q; ?>" id="J_SearchWaterFallParam"/>
        <input type="hidden" value="1" id="J_page" /> <!-- by benen005 -->
        
        
        <div id="content">
            <div class="top-banner" id="J_TopBanner" style="display:none">
                <img src="images/topBanner.jpg" alt="" border="0" usemap="#Map" />
                <map name="Map">
                    <area shape="rect" coords="307,46,394,75" href="#weibo" target="_blank">
                    <area shape="rect" coords="407,47,492,76" href="#tecent" target="_blank">
                    <area shape="rect" coords="506,47,569,76" href="#douban" target="_blank">
                    <area shape="rect" coords="580,48,640,75" href="#renren" target="_blank">
                    <area shape="rect" coords="650,47,701,76" href="#qq" target="_blank">
                    <area shape="rect" coords="677,6,696,24" href="#" target="_self" class="J_Close">
                </map>
            </div>
            <div id="wrapper">
                <div id="article">
                    <div id="ColumnContainer">
                        <div class="pin ks-waterfall ks-waterfall-fixed-left">
                            <div class="unit">
                                
                                
                           
                                <div class="hd">热门标签</div>
                                <p>
                                    <a class="J_Mark" target="_self" href="javascript:;">全部</a>
                                    <?php if($tags[0]){foreach($tags[0] as $tag){ ?>
                                    <a class="J_Mark" target="_self" href="javascript:;"><?php echo $tag; ?></a>
                                    <?php }} ?>
                                    <!--<a class="selected J_Mark" target="_self" href="javascript:;">黑丝</a>-->
                                </p>
                                <div class="bot"></div>
                            </div>
                            <div class="unit">
                                <div class="hd">美女分类</div>
                                <p>
                                    
                                    <?php if($tags[1]){foreach($tags[1] as $tag){ ?>
                                    <a class="J_Mark" target="_self" href="javascript:;"><?php echo $tag; ?></a>
                                    <?php }} ?>
                                    <!--<a class="J_Mark" target="_self" href="javascript:;">小清新</a>-->
                                </p>
                                <div class="bot"></div>
                            </div>
                            <div class="unit">
                                <div class="hd">全部标签</div>
                                <p>
                                    <?php if($all_tags){foreach($all_tags as $tag){ ?>
                                    <a class="J_Mark" target="_self" href="javascript:;"><?php echo $tag; ?></a>
                                    <?php }} ?>
                                    
                                </p>
                                <div class="bot"></div>
                            </div>
                            <!--
                            <div class="unit hot-destination" id="J_SameCity">
                                <div class="hd">热门美女<span class="allcity selected" data-index="0">全部</span><span class="destination" data-index="1">同城</span></div>
                                <p class="allcity-panel J_CityPanel">
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                    <a class="" target="_blank" href="#">美女1</a>
                                </p>
                                <p class="destination-panel ks-hidden J_CityPanel">
                                    <a class="" target="_blank" href="#">山川</a>
                                    <a class="" target="_blank" href="#">森林</a>
                                    <a class="" target="_blank" href="#">琥珀</a>
                                    <a class="" target="_blank" href="#">山川</a>
                                    <a class="" target="_blank" href="#">森林</a>
                                    <a class="" target="_blank" href="#">琥珀</a>
                                    <a class="" target="_blank" href="#">山川</a>
                                    <a class="" target="_blank" href="#">森林</a>
                                    <a class="" target="_blank" href="#">琥珀</a>
                                </p>
                                
                            </div>
                            -->
                        </div>
                        
                    </div>
                    <div class="back-banner" id="J_BackBanner">
                        <div class="back-theme">
                            <a class="back-link" href="javascript:;" target="_self">标签</a>
                            <div class="back-container">
                                <div class="back-list">
                                    <ul class="ks-clear">
                                    <!--<li><a href="#" target="_blank">11111</a></li>-->
                                    <?php if($all_tags){foreach($all_tags as $tag){ ?>
                                        
                                        <li><a class="J_Mark" target="_self" href="javascript:;"><?php echo $tag; ?></a></li>
                                    <?php }} ?>
                                       
                                    </ul>
                                </div>
                                <s></s>
                            </div>
                        </div>
                        <a class="back-update J_BackUpdate" href="#" target="_blank">更新99+</a>  
                        <a class="back-back" id="J_BackToTop" href="javascript:;" target="_self">回顶部</a>  
                    </div>
                    <div id="loadingPins">
                        <img src="./images/loading.jpg" alt="Loader Image"/>
                    </div>
                </div>
            </div>
        </div>

        <div id="J_LoadContainer" class="ks-hidden load-container">
            <div class="load-close">
                <a href="javascript:;" target="_self" class="ks-ext-close"></a>
            </div>
			<div class="min-content ks-clear">
                <div class="cooperator">
                    <div class="connections ks-clear">
                        <a href="#" target="_blank" class="weibo"></a>
                        <a href="#" target="_blank" class="renren"></a>
                        <a href="#" target="_blank" class="tqq"></a>
                        <a href="#" target="_blank" class="douban"></a>
                        <a href="#" target="_blank" class="qqzone"></a>
                    </div>  
                    <p>为注册过旅游志网站也可以直接登录</p>
                </div>
                <div class="account">
                    <form method="post" action="http://www.baidu.com/" id="J_Form">
                        <div class="input">
                            <input type="text" id="email" class="email J_Placeholder" data-valid="{email:['您输入的邮箱格式有误']}" placeholder="请输入注册邮箱"/>
                        </div>
                        <div class="input">
                            <input type="password" id="password" class="password J_Placeholder" data-valid="{}" placeholder="请输入密码"/>
                            <div class="forget"><a href="forgetPassword.html" target="_self">忘记密码</a></div>
                        </div>
                        <div class="bar ks-clear">
                            <input type="checkbox" class="login-input" id="loginInput"/>
                            <label for="loginInput">记住密码</label>
                            <button  type="submit" id="J_LoadingSure">确定</button>
                            <input type="hidden" name="rememberPassword" id="rememberPassword" value="false"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div id="J_CancleContainer" class="ks-hidden">
            <p class="msgzone error">
                您已经想去过了，真的确定要取消想去么？
            </p>
            <button class="cancleButton J_CancleButton">确定</button>
            <div class="valid-under">
                <p class="estate error"><span class="label">提交出错了，请刷新重试！</span></p>
            </div>
        </div>

        <div id="J_WantedContainer" class="ks-hidden">
            <div class="wanted-container ks-clear">
                <div class="wanted-box ks-clear J_WantedContent">
                    <div class="pic">
                        <span><img src="./images/80.jpg" alt=""/></span>
                    </div>
                    <div class="multicontainer">
                        <div class="multi-item ks-clear">
                            <div class="travel-item">旅行 <span class="travel J_TravelPlace">杭州</span></div> 
                            <div class="travel-right"><input type="checkbox" disabled="disabled" /> 同城</div> 
                        </div>
                        <div class="multi-item shoot-time ks-clear">
                            <div class="travel-item">拍摄时间：  <input type="checkbox" disabled="disabled"/>原创发布 <span class="travel J_ShootTime">11</span> 月</div>
                            <div class="travel-right">
                                <input type="checkbox" disabled="disabled" checked="checked"/> 外部收集  <span class="travel J_ShootTime">12</span> 月
                            </div>
                        </div>
                        <div class="multi-item ks-clear">
                            <p>添加标签：<em>(多个标签请用空格分隔)</em></p>
                            <textarea class="J_TagArea J_Placeholder" cols="100" rows="3" placeholder="可以添加0~8个标签，方便自己查找。"></textarea>
                            
                        </div>
                        <div class="multi-item usual ks-clear">
                            <span class="usual-span">常用标签：</span>
                            <ul class="usual-tag">
                            </ul>
                        </div>
                        <div class="multi-item ks-clear">
                            <textarea class="J_WantedDecription" data-check="1"></textarea>
                            <div class="valid-under" style="height: 24px; display:none;">
                                <p class="estate error"><span class="label">文字不能超过200</span></p>
                            </div>
                        </div>
                        <div class="multi-item ks-clear">
                            <button class="wanted-button J_WantedButton" type="button"></button>
                            <button type="button" class="wanted-clear J_WantedClear"></button>
                            <span class="msg"><em>0</em>/200</span>
                        </div>
                        <div class="multi-item ks-clear J_MultiMsg multiMsg">
                            <div class="valid-under">
                                <p class="estate error"><span class="label">提交出错了，请刷新重试！</span></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <script type="tpl" id="tpl1">
            <div class="pin ks-waterfall">
                <div class="upper">
                    <div class="J_Image image"><a href="{{itemUrl}}" style="height:{{itemPicHeight}}px;" >
                        <img alt ="{{itemTitle}}" src ="{{itemPic}}" height="{{itemPicHeight}}"/>
        </script>
        <script type="tpl" id="tpl2">
             </a>
                <div class="cover ks-clear J_Cover">
                        <div class="sign">
                            <a href="{{itemUrl}}#J_ReplyArea" class="ying"></a>                           
        </script>
        <script type="tpl" id="tpl3">
             </div>
                        <a href="javascript:;" target="_self" class="want J_Wanted"  data-id="{{itemId}}"></a>
                    </div>

             </div>
                    <p class="title">{{itemTitle}}</p>
                    <p class="description">{{description}}</p>
                    <div class="tips">
                        <span class="lf"><em>{{itemYingCount}}</em>应</span>
                        <span><em class="xh">{{itemWantCount}}</em>喜欢</span> <!-- benen005 -->
                        <input type="hidden" id="J_flag{{itemId}}" value="0" />
                    </div>
                    
                </div>
                <!--
                <div class="botter">
                   <a href="{{userUrl}}" target="_blank"><img src="{{userPic}}" alt="" class="avatar"/></a>
                    {{useText}}
                </div>
                -->
            </div>        
        </script>
        <script type="text/javascript" src="js/global.js"></script> 
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
<?php include_once('foot.php'); ?>
