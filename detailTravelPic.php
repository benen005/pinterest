<?php 
    include 'action.php';
    $photo = detailTravelPic();
    $comments = get_comment_list($photo['id']);
    $comments_num = count($comments);
    
    $prev = get_next_pic($photo['id']);
    $next = get_prev_pic($photo['id']);
    //print_r($prev);exit;
    $photos = get_more_pic();
?>
<!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>
            <?php echo $webname . $photo['title'] . " - " . $photo['tags']; ?>
        </title>
        <link rel="stylesheet" href="css/global.css" />
        <link rel="stylesheet" href="css/login.css" />
        <link rel="stylesheet" href="css/detail.css" />
        <script src="js/jquery.js"></script>
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
    <div id="content">
            <div class="detaill-content">
                 <div class="detail-hd ks-clear">
                        <div class="hd-lf">
                            <a href="" target="_blank"><img src="./images/30.jpg"/></a><span><a href="" target="_blank" class="username">游客1</a>喜欢，由</span>
                          <a href="" target="_blank"><img src="./images/30.jpg"/></a><span><a href="" target="_blank" class="username">版主</a>看过后<?php echo $photo['pubtime']; ?>发布。</span>
                        </div>
                        <div class="hd-rt">
                            <a href="#J_ReplyArea" target="_self" class="ying"></a>
                            <a href="javascript:;" target="_self" class="wanted J_Wanted" data-id="<?php echo $photo['id']; ?>"></a>
                            <input type="hidden" id="J_flag" value="0" />
                        </div>
                 </div>
                 <div class="detail-text">
                       <div class="text-img">
                             <a href="detailTravelPic.php?id=<?php echo $next['id']; ?>" title="下一页"><img src="upload_files/large/<?php echo $photo['name']; ?>" alt=""/></a>
                       </div>
                 </div>
                 <div class="detail-container ks-clear">
                        <div class="main-body">
                                <div class="place"><?php echo $photo['title']; ?></div>
                                <div class="upper">
                                    <span><em><?php echo $comments_num; ?></em>应</span>
                                    <span><em><?php echo $photo['city_want_num']; ?></em>喜欢</span>
                                    <a href="javascript:;" target="_self" class="report J_Report">举报</a>
                                    <a href="photo_edit.php?id=<?php echo $photo['id']; ?>" target="_blank" class="edit"></a>
                                    <a href="javascript:;" target="_self" class="delete J_DeletePage" data-id="<?php echo $photo['id']; ?>"></a>
                        
                                    <button id="J_CopyButton" data-clipboard-text="./images/pic.png" class="copy-button"></button>

                                </div> 
                                <div class="upper-tag usual">
                                    <span class="usual-span">标签：</span> 
                                    <ul class="usual-tag  ks-clear">
                                    <?php 
                                    //处理 tags 
                                    $tags = $photo['tags'];
                                    if($tags){
                                    $tags = trim($tags);
                                    $tags = explode(" ", $tags);
                                    foreach($tags as $tag){
                                    ?>
                                        <li><a href="#" target="_blank"><?php echo $tag; ?></a></li>
                                    <?php }} ?>    
                                                                          
                                    </ul>
                                </div>
                                <div class="reply">
                                    <div class="reply-hd">这些人应(<em><?php echo $comments_num; ?></em>)</div>
                                    
                                    <div class="reply-bd">
                                        <?php if($comments){foreach($comments as $comment){ ?>
                                        <div class="reply-item ks-clear J_ReplyItem" id="J_ReplyItem<?php echo $comment['id']; ?>">
                                            <div class="reply-img">
                                                <a href="" target="_blank">
                                                    <img src="./images/50.jpg"/>
                                                </a>
                                            </div>
                                            <div class="reply-content">
                                                <p><em>游客<?php echo $comment['user_id']; ?></em><span class="time"><?php echo $comment['pubtime']; ?></span></p>
                                                <p class="reply-text"><?php echo $comment['content']; ?></p>
                                            </div>
                                            <div class="operating ks-hidden">
                                                <a href="javascript:;" target="_self" class="J_Delete" data-id="<?php echo $comment['id']; ?>">删除</a>
                                                <a href="javascript:;" target="_self" class="J_Ying" data-name="雨停江南">应</a>
                                                <a href="javascript:;" target="_self" class="report J_Report" data-id="<?php echo $photo['id']; ?>">举报</a>
                                            </div>
                                        </div>
                                        <?php }} ?>
                                    </div>
                                    
                                    <form action="" id="J_Form1" method="post">
                                    <div class="reply-area ks-clear ">
                                        <div class="reply-img">
                                            <a href="" target="_blank">
                                                <img src="./images/50.jpg"/>
                                            </a>
                                        </div>
                                        <div class="reply-textarea">
                                           <input type="hidden" id="photo_id" value="<?php echo $photo['id']; ?>" />
                                           <textarea id="J_ReplyArea" class="J_Placeholder" placeholder="回应或 @好友"></textarea>
                                        </div> 
                                    </div>
                                    <div class="reply-item ks-clear edge">
                                        <div class="reply-operate">
                                            <a href="javascript:;" target="_self" class="cover" id="J_Cover"></a>
                                            <button type="button" class="reply-button" id="add_comment"></button>
                                            <span><em id="J_ReplyAreaNum">10</em>/200</span>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                                <!--
                                <div class="togo" id="J_Togo">
                                    <div class="togo-hd">这些人想去(<em>10</em>)</div>
                                    <div class="togo-bd">
                                        <div class="togo-item ks-clear">
                                            <div class="togo-lf">
                                                <div class="togo-img">
                                                    <a href="" target="_blank">
                                                        <img src="./images/50.jpg"/>
                                                    </a>
                                                </div>
                                                <div class="togo-text">
                                                    <a href="" target="_blank">江南雨停</a> 想去
                                                </div>
                                            </div>
                                            <div class="togo-rt">
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank" class="edge"><img src="./images/57.jpg"/></a>
                                            </div>
                                        </div>
                                        <div class="togo-item ks-clear">
                                            <div class="togo-lf">
                                                <div class="togo-img">
                                                    <a href="" target="_blank">
                                                        <img src="./images/50.jpg"/>
                                                    </a>
                                                </div>
                                                <div class="togo-text">
                                                    <a href="" target="_blank">江南雨停</a> 想去
                                                </div>
                                            </div>
                                            <div class="togo-rt">
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank" class="edge"><img src="./images/57.jpg"/></a>
                                            </div>
                                        </div>
                                        <div class="togo-item ks-clear ks-hidden">
                                            <div class="togo-lf">
                                                <div class="togo-img">
                                                    <a href="" target="_blank">
                                                        <img src="./images/50.jpg"/>
                                                    </a>
                                                </div>
                                                <div class="togo-text">
                                                    <a href="" target="_blank">江南雨停</a> 想去
                                                </div>
                                            </div>
                                            <div class="togo-rt">
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank" class="edge"><img src="./images/57.jpg"/></a>
                                            </div>
                                        </div>
                                        <div class="togo-item ks-clear ks-hidden">
                                            <div class="togo-lf">
                                                <div class="togo-img">
                                                    <a href="" target="_blank">
                                                        <img src="./images/50.jpg"/>
                                                    </a>
                                                </div>
                                                <div class="togo-text">
                                                    <a href="" target="_blank">江南雨停</a> 想去
                                                </div>
                                            </div>
                                            <div class="togo-rt">
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank"><img src="./images/57.jpg"/></a>
                                                <a href="" target="_blank" class="edge"><img src="./images/57.jpg"/></a>
                                            </div>
                                        </div>
                                        <div class="more-better" id="J_MoreBetter">
                                            <img src="./images/detailMore.jpg"/>
                                        </div>
                                    </div>
                                </div>
                                -->
                        </div>
                        
                        <div class="collect-bar">
                            <div class="collect-item">
                                    <div class="hd"><a href="#" class="selected">美女贴图</a> 更多收集</div>
                                    <div class="bd ks-clear">
                                    <?php if($photos){foreach($photos as $c){  ?>
                                        <a href="detailTravelPic.php?id=<?php echo $c['id']; ?>" target="_blank" class="item-img"><img src="upload_files/tiny/<?php echo $c['name']; ?>" width="50" height="50" /></a>
                                    <?php }} ?>
                                       
                                    </div>
                            </div>
                        </div>
                        
                 </div>

            </div> 

            <div class="share-zoom">
                <div class="share-float">
                    <div class="piece-content ks-clear" >
                        <!-- NOTICE：注释的部分是没有上一页或者下一页的样式-->
                        <!-- <a href="javascript:;" target="_self" class="prev prevEdge"></a>
                        <a href="javascript:;" target="_self" class="next nextEdge"></a> -->
                        <?php if($prev){ ?>
                        <a href="detailTravelPic.php?id=<?php echo $prev['id']; ?>" class="prev" title="上一页"></a>
                        <?php }else{ ?>
                        <a href="#" class="prev" title="上一页" onclick="alert('已经到顶');"></a>
                        <?php } ?>
                        <?php if($next){ ?>
                        <a href="detailTravelPic.php?id=<?php echo $next['id']; ?>" class="next" title="下一页"></a>
                        <?php }else{ ?>
                        <a href="#" class="next" title="下一页" onclick="alert('已经到底');"></a>
                        <?php } ?>
                    </div>
                    <div class="share-container">
                        <img src="./images/share.jpg" border="0" usemap="#Map"/>
                        <map name="Map">
                            <area shape="rect" coords="8,26,63,48" href="#tt" target="_blank" id="J_Tencent">
                            <area shape="rect" coords="8,57,64,80" href="#weibo" target="_blank" id="J_Weibo">
                            <area shape="rect" coords="7,94,64,115" href="#douban" target="_blank" id="J_Douban">
                            <area shape="rect" coords="7,123,63,143" href="#renren" target="_blank" id="J_Renren">
                        </map>
                    </div>
                </div>
            </div>

            <div class="report-container ks-hidden" id="J_ReportContainer">
                <form action="" id="J_ReportForm" method="post">
                    <div class="report-close">
                        <div class="hd">举报理由</div>
                        <a href="javascript:;" target="_self" class="ks-ext-close"></a>
                    </div>
                    <ul class="ks-clear">
                        <li>
                            <input type="radio" name="group" data-name="垃圾广告">
                            <label>垃圾广告</label>
                        </li>
                        <li>
                            <input type="radio" name="group" data-name="淫秽色情">
                            <label>淫秽色情</label>
                        </li>
                        <li>
                            <input type="radio" name="group" data-name="虚假中奖">
                            <label>虚假中奖</label>
                        </li>
                        <li>
                            <input type="radio" name="group" data-name="敏感信息">
                            <label>敏感信息</label>
                        </li>
                        <li>
                            <input type="radio" name="group" data-name="人身攻击">
                            <label>人身攻击</label>
                        </li>
                        <li>
                            <input type="radio" name="group" data-name="骚扰他人">
                            <label>骚扰他人</label>
                        </li> 
                    </ul>
                    <div class="bar ks-clear">
                        <input id="J_ReportSubmit" type="submit"/>
                        <input id="J_ReportReset" class="reset" type="reset"/>
                    </div>
                    <input type="hidden" id="J_ReportId" name=""/>
                </form>
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
            <p class="msgzone error">你已经想去过了，真的确定要取消想去吗？</p>
            <button class="cancleButton J_CancleButton" data-param='{"id":"123123123"}'>确定</button>
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
    </div>

      <script type="text/javascript" src="js/ZeroClipboard.js"></script>
      <script type="text/javascript" src="js/global.js"></script>
      <script type="text/javascript" src="js/detail.js"></script>
</body>
</html>
<?php include_once('foot.php'); ?>