<?php 
    include 'action.php';
    release8();
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
        <link rel="stylesheet" href="css/uploadify.css" />
        
        <script src="js/jquery.js"></script>
        <script src="js/jquery.uploadify.js"></script>
        <script src="js/swfobject.js"></script>
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
                <li><a href="release5.php" target="_self" >粘贴网址抓取</a></li>
                <li><a href="release7.php" target="_self" class="selected">本地上传</a></li>
                <!--<li><a href="#bind" target="_self" >添加视频</a></li>-->
            </ul>
        </div>
        <div class="release-container ks-clear">
            <form id="J_Form" action="" method="post" enctype="multipart/form-data">
            <input type="hidden" name="user_id" id="user_id" value="1" />
            <div class="hd">本地上传</div>
            <div class="ks-clear release-hd">
                <a href="release7.php" target="_self" >单张上传</a>
                <a href="javascript:;" target="_self" class="selected">多张上传</a>
                <a href="release9.php" target="_self" >照片修改</a>
            </div>
            <div class="title ks-clear">
                <p>仅支持JPG，GIF，PNG等“相片”格式；相片分辨率需大于80*80；文件大小应小于5M。若为外部收集，请务必在相片介
绍文字中，标注来源和作者，以示尊重。旅游志只收集关于旅游的相片，游记和视频，请勿发布其他非旅游类内容，谢谢。</p>
            </div>
            
            <div class="wanted-container ks-clear">
                <div class="wanted-box ks-clear J_WantedContent">
                    <div class="image-box">
                        <div class="image-item">
							<p>浏览: 
								<input type="file" id="uploadify" name="uploadify" />
								<div id="fileQueue"></div>
							</p>
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
                            <textarea id="J_Decription" name="title" class="J_Placeholder" data-check="1" placeholder="介绍一下这个相片或，最多输入200个汉字"></textarea>
                        </div>
                        <div class="multi-item ks-clear">
                            <button class="wanted-button" type="button" onclick="upload();"></button>
                            <button type="reset" class="wanted-clear J_WantedClear" onclick="$('#uploadify').uploadifyClearQueue();"></button>
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
        </div>  
    </div>

    <script type="text/javascript" src="js/global.js"></script>
    <script type="text/javascript" src="js/release8.js"></script>
</body>
</html>
<?php include_once('foot.php'); ?>