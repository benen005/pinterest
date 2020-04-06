<?php 
    include_once('action.php');
    $page = g('page', 1);
    $next = $page + 1;
    $prev = $page - 1;
    $p1 = ($page - 1) * 10;
    $p2 = $page * 10;
    $sql = "select * from photo order by id desc limit $p1,$p2";
    $photos = sqlo($sql);
    
    echo '<?xml version="1.0" encoding="utf-8"?'.'>';
?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-cache"/>

        <title>
             <?php echo $webname; ?> - 首页 - 手机版
        </title>
<style type="text/css">
body{
	background-color: #B2B1B6;
	margin: 0px;
	padding: 0px;
	font-size: 12px;
	line-height: 18px;
}
a{
	color: #333333;
}


.lineColor{
	background-color: #B3C4D4;
}
.bg9a9a9a{
	background-color: #9A9A9A;
}
.bgaaaaaa{
	background-color: #AAAAAA;
}

</style>

        
    </head>
    <body>
<div id="headerLine" align="center" class="lineColor">
    <a href="index2.php"><img src="images/logo2.jpg" /></a>|
    <a href="collection.php">收藏</a>|<a href="propaganda.php">宣传</a>
</div>

    
    <?php if($page>1){ ?>
        <a href="?page=<?php echo $prev; ?>">上一页</a>
    <?php } ?>
        <a href="?page=<?php echo $next; ?>">下一页</a><br />
<?php
    foreach($photos as $photo){
        echo "<a href='detailTravelPic.php?id=$photo->id</a>'><img src='upload_files/small/$photo->name' /></a><br />";
    }
?>
    <?php if($page>1){ ?>
        <a href="?page=<?php echo $prev; ?>">上一页</a>
    <?php } ?>
        <a href="?page=<?php echo $next; ?>">下一页</a>
    </body>
</html>
<?php include_once('foot.php'); ?>