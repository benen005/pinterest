<?php 
    include 'action.php';
    $photos = release9();
?>
<!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>
            <?php echo $webname; ?> - 照片修改
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
                <li><a href="release5.php" target="_self" >粘贴网址抓取</a></li>
                <li><a href="release7.php" target="_self" class="selected">本地上传</a></li>
                <!--<li><a href="#bind" target="_self" >添加视频</a></li>-->
            </ul>
        </div>
        <div class="release-container ks-clear">
            <form id="J_Form" action="" method="post" enctype="multipart/form-data">
            <input type="hidden" name="user_id" id="user_id" value="1" />
            <div class="hd">照片修改</div>
            <div class="ks-clear release-hd">
                <a href="release7.php" target="_self" >单张上传</a>
                <a href="release8.php" target="_self" >多张上传</a>
                <a href="release9.php" target="_self" class="selected">照片修改</a>
            </div>

            
            <div class="wanted-container ks-clear">
                <div class="wanted-box ks-clear J_WantedContent">
                    <div>点击图片修改</div>
                    <div>
                    <?php if($photos){foreach($photos as $c){  ?>
                    <a href="photo_edit.php?id=<?php echo $c['id']; ?>" target="_blank"><img src="upload_files/tiny/<?php echo $c['name']; ?>" width="50" height="50" /></a>
                    <?php }} ?>
                    </div>    

                    
                </div>
            </div>
            </form>
        </div>  
    </div>

    <script type="text/javascript" src="js/global.js"></script>
    
</body>
</html>
<?php include_once('foot.php'); ?>