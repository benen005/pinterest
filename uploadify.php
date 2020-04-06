<?php 
include_once('action.php');

if (!empty($_FILES)) {
    $photo = $_FILES['Filedata'];
    if($photo['tmp_name']){
        $date = date("Y-m-d H:i:s");
        $name = upload_photo($photo);
        $title = p('title');
        $tags = p('tags');
        
        
        $conn = new db_conn();
        $sql = "INSERT INTO `photo` (`name`, `title`, `tags`, `pubtime`) VALUES ('$name', '$title', '$tags', '$date')";
        $result = $conn->db_query($sql);
        if($result){
            echo ("保存成功");
        }else{
            echo ("保存失败");
        }
        $conn->db_close();
        exit;
    }
}
?>