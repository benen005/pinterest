<?php 
$s = $_GET['s'];
?>
<object width="400" height="300" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">
    <param value="<?php echo $s; ?>" name="movie">
    <param name="quality" value="high">
    <param value="" name="flashvars">
    <param name="wmode" value="transparent">
    <!--[if !IE]>-->
    <object width="400" height="300" data="<?php echo $s; ?>" type="application/x-shockwave-flash">
        <param name="quality" value="high">
        <param value="" name="flashvars">
        <param name="wmode" value="transparent">
        <!--<![endif]-->
        <a href="http://www.adobe.com/go/getflashplayer">
            <img alt="Get Adobe Flash player" src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif">
        </a>
        <!--[if !IE]>-->
    </object>
    <!--<![endif]-->
</object>