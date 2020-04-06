<?php 
    include 'action.php';
    release5();
    $tags = tag_array();
?>
<!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>
           <?php echo $webname; ?> - 发布相片
        </title>
        <link rel="stylesheet" href="css/global.css" />
        <link rel="stylesheet" href="css/release.css" />
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
    <div id="content" class="content">
        <div class="nav ks-clear">
            <ul class="ks-clear">
                <li><a href="release5.php" target="_self" class="selected">粘贴网址抓取</a></li>
                <li><a href="release7.php" target="_self">本地上传</a></li>
                <!--<li><a href="#bind" target="_self" >添加视频</a></li>-->
            </ul>
        </div>
        <div class="release-container ks-clear">
            <form id="J_Form" action="" method="post" enctype="multipart/form-data">
            <input type="hidden" name="user_id" id="user_id" value="1" />
                <div class="hd">粘贴网址抓取</div>
                <div class="ks-clear release-hd">
                    <a href="release5.php" target="_self" class="selected">单个网址</a>
                    <a href="release6.php" target="_self" >多个网址</a>
                </div>
                
                <div class="title ks-clear">
                    <p>粘贴完整网址，我们为您保存该网页的相片和地址</p>
                    <div class="title-box ks-clear">
                        <input name="picture" id="picture" type="text" class="J_Placeholder" placeholder="请以 http:// 开头"/>
                        <a href="javascript:;" target="_self" id="J_FindTPhoto" class="findphoto" ></a>
                        <a href="javascript:;" target="_self" id="J_ClearUrl" class="clearurl"></a>
                        <input size="50" name="photo2" id="photo2" type="hidden" />
                    </div>
                </div>
            <div class="wanted-container ks-clear">
                <div class="wanted-box ks-clear J_WantedContent">
                    <div class="image-box">
                        <div class="image-item">
                            <img id="singPic_img" src="images/no.png" alt="" height="234" />
                        </div>
                        
                       
                    </div>
                    <div class="multicontainer">
                        <div class="multi-item ks-clear">
                            <p>添加标签：<em>(多个标签请用空格分隔)</em></p>
                            <textarea id="J_TagArea" name="tags" class="J_Placeholder" cols="100" rows="3" placeholder="可以添加0~8个标签，方便自己查找。"></textarea>
                            
                        </div>
                        <div class="multi-item usual ks-clear">
                            <span class="usual-span">常用标签：</span>
                            <ul class="usual-tag">
                            <?php if($tags){foreach($tags as $tag){ ?>
                                    <li><a href="javascript:;" target="_self" class="J_ItemTag"><?php echo $tag; ?></a></li>
                            <?php }} ?>
                            

                            
                            </ul>
                        </div>
                        <div class="multi-item ks-clear">
                            <textarea id="J_Decription" name="title" class="J_Placeholder" data-check="1" placeholder="介绍一下这个美女，最多输入200个汉字"></textarea>
                        </div>
                        <div class="multi-item ks-clear">
                            <button class="wanted-button" type="submit" id="submit"></button>
                            <button type="reset" class="wanted-clear J_WantedClear"></button>
                            <span class="msg"><em id="J_DecriptionNum">0</em>/200</span>
                        </div>
                        <div class="multi-item ks-clear" style="display:none">
                            <div class="valid-under" style="height: 24px;">
                                <p class="estate error">
                                    <span class="label">请选择“地方”及“拍摄时间”！</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
            <div id="photo1"></div>
            <div id="photo3"></div>

        </div>  
    </div>
    <script type="text/javascript" src="js/global.js"></script>
    <script src="js/release5.js"></script>
</body>
</html>
<?php include_once('foot.php'); ?>