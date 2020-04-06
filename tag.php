<?php 
    include 'action.php';
    $tags = tag();
?>
<!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>
            <?php echo $webname; ?> - 标签管理
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
            <div class="hd">标签管理</div>
            <div class="ks-clear release-hd">
                <a href="tag.php" target="_self" class="selected">标签管理</a>
            </div>

            
            <div class="wanted-container ks-clear">
                <div class="wanted-box ks-clear J_WantedContent">
                    <div>   
                    <?php if($tags){foreach($tags as $tag){ ?>
                        <input name="tag<?php echo $tag['id']; ?>" id="tag<?php echo $tag['id']; ?>" value="<?php echo $tag['tag']; ?>" size="100" /> <input type="button" value=" 修改 " data-id="<?php echo $tag['id']; ?>" class="edit" /> <?php if($tag['type'] < 1){ ?><input type="button" value=" 删除 " data-id="<?php echo $tag['id']; ?>" class="delete" /><?php } ?><br />
                    <?php }} ?>
                        <input id="tag_new" value="" size="100" /> <input type="button" value=" 新增 " id="tag_new_btn" />
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
<script type="text/javascript">
$(document).ready(function() {

    $("#tag_new_btn").click(function(ev){
        var tag_value = $('#tag_new').val();
        
        $.post(
            'action.php?action=tag_add',
			{tag: tag_value},

			function(text,status){
                if(text.status == 'success'){
                    alert('新增成功');
                }
                else
                    alert('新增失败');

            },
            "json"
        );
    
    });
    
    $(".delete").click(function(ev){
        var that = ev.target;
        var id = $(that).attr('data-id');
        var tag_value = $('#tag' + id).val();
        
        $.post(
            'action.php?action=tag_del&id='+id,
			{tag: tag_value},

			function(text,status){
                if(text.status == 'success'){
                    alert('修改成功');
                }
                else
                    alert('修改失败');

            },
            "json"
        );

        
    });

    $(".edit").click(function(ev){
        var that = ev.target;
        var id = $(that).attr('data-id');
        var tag_value = $('#tag' + id).val();
        
       /*
       $.ajax({
            type:    'post',
            url:     'action.php?action=tag_edit&id='+id,
            dataType:'jsonp',
            jsonp:   "callback",
            data:    {tag: tag_value},
            async:   false,
            success:function(data){
                alert(data.status);
            }
        }); 
        */


        $.post(
            'action.php?action=tag_edit&id='+id,
			{tag: tag_value},

			function(text,status){
                if(text.status == 'success'){
                    alert('修改成功');
                }
                else
                    alert('修改失败');

            },
            "json"
        );

        
    });
});



</script>