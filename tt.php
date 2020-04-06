<?php 
    include_once('action.php');
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

       <a href="javascript:;" onclick="open_window('http://www.baidu.com/1.swf');"> yep!</a>
        <script type="text/javascript" src="js/global.js"></script> 
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
<?php include_once('foot.php'); ?>
<script type="text/javascript">
function open_window(swf){
    if(swf.length == 0)
        swf = 'http://www.baidu.com/2.swf';
    var url = 'swf.php?s=' + swf;
    window.open(url, 'newwindow', 'height=400, width=500, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
}
</script>