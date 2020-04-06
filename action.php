<?php 
include_once('include/config.php');
include_once('include/conn.class.php');
include_once('include/base.php');



$action = g('action', null);
$id = g('id', null);
if($action == 'want'){
    want($id);
}
elseif($action == 'photo_del'){
    photo_del($id);
}
elseif($action == 'comment_add'){
    comment_add($id);
}
elseif($action == 'comment_del'){
    comment_del($id);
}
elseif($action == 'tag_edit'){
    tag_edit($id);
}
elseif($action == 'tag_add'){
    tag_add();
}
elseif($action == 'tag_del'){
    tag_del($id);
}

function tag_two_array(){
    $r = array();
    $tagss = tag();
    if($tagss){
        for($i = 0;$i < count($tagss);$i++){
            $tag = $tagss[$i]['tag'];
            if($tag){
                $tag = trim($tag);
                $tag = explode(" ", $tag);
                foreach($tag as $t){
                    $r[$i][] = $t;
                 }}             
        }
    }
    return $r;
}

function tag_array(){
    $r = array();
    $tagss = tag();
    if($tagss){foreach($tagss as $tags){
        $tag = $tags['tag'];
        if($tag){
            $tag = trim($tag);
            $tag = explode(" ", $tag);
            foreach($tag as $t){
                $r[] = $t;
             }} 
                            
    }}
    return $r;
}

function tag(){
    $r = array();
    $conn = new db_conn();
    $sql = 'select * from photo_tag';
    $result = $conn->db_query($sql);
	if($result){
		for($i=1;$rows = mysqli_fetch_assoc($result);$i++){
			$r[] = $rows;
		}
	}else{
		
	}
	$conn->db_close();
    
    return $r;
}
function tag_del($id){
    if(is_post){
        
        
        $status = 'success';
        $tag = p('tag');
        
        
        $conn = new db_conn();
        $sql = "delete from photo_tag where id = " . (int)$id;
        $result = $conn->db_query($sql);
        if($result){
            $status = 'success';
        }else{
            $status = 'failure';
        }
        $conn->db_close();
        
        $callback = $_GET["callback"];  
        $array = array(
                'status' => $status,
				"errorMsg" => "loading error,please try it again"
        );        
        $result = json_encode($array);  
        echo "$callback($result)"; exit;
    }
}
function tag_add(){
    if(is_post){
        
        
        $status = 'success';
        $tag = p('tag');
        
        
        $conn = new db_conn();
        $sql = "INSERT INTO `photo_tag` (`tag`) VALUES ('$tag')";
        $result = $conn->db_query($sql);
        if($result){
            $status = 'success';
        }else{
            $status = 'failure';
        }
        $conn->db_close();
        
        $callback = $_GET["callback"];  
        $array = array(
                'status' => $status,
				"errorMsg" => "loading error,please try it again"
        );        
        $result = json_encode($array);  
        echo "$callback($result)"; exit;
    }
}
function tag_edit($id){
    if(is_post()){
        $status = 'success';
        $tag = p('tag');
        $conn = new db_conn();
        $sql = "update `photo_tag` set tag = '$tag' where id = " . (int)$id;
        $result = $conn->db_query($sql);
        if($result){
            
        }else{
            $status = 'failure';
        }
        $conn->db_close();

        $callback = $_GET["callback"];  
        $array = array(
                'status' => $status,
				"errorMsg" => "loading error,please try it again"
        );        
        $result = json_encode($array);  
        echo "$callback($result)"; exit;
    }
}

function want($id){
        $status = 'success';
        $conn = new db_conn();
        $sql = "update `photo` set city_want_num = city_want_num + 1 where id = " . (int)$id;
        $result = $conn->db_query($sql);
        if($result){
            
        }else{
            $status = 'failure';
        }
        $conn->db_close();

        $callback = $_GET["callback"];  
        $array = array(
                'status' => 'success',
				"errorMsg" => "loading error,please try it again"
        );        
        $result = json_encode($array);  
        echo "$callback($result)"; exit;
}

function release5(){
    $user_id = p('user_id');
    if(is_post()){
        

        $date = date("Y-m-d H:i:s");
        $name = upload_photo2(p('photo2', null));
        $title = p('title');
        $addr = p('picture');
        $tags = p('tags');
        
        
        $conn = new db_conn();
        $sql = "INSERT INTO `photo` (`name`, `title`, `addr`,`tags`, `pubtime`) VALUES ('$name', '$title', '$addr','$tags', '$date')";
        $result = $conn->db_query($sql);
        if($result){
            echo ("<script>location.href='release5.php';</script>");
        }else{
            echo ("保存失败");
        }
        $conn->db_close();
        exit;
    }
}

function release6(){
    $user_id = p('user_id');
    if(is_post()){
        
        $photos = trim(p('photo2', null));
        $photo_arr = explode(" ", $photos);
        if($photo_arr){
            
            $title = p('title');
            $addr = p('picture');
            $tags = p('tags');  
            
            $conn = new db_conn();
            foreach($photo_arr as $photo){
                $date = date("Y-m-d H:i:s");
                $name = upload_photo2($photo);
                $sql = "INSERT INTO `photo` (`name`, `title`, `addr`,`tags`, `pubtime`) VALUES ('$name', '$title', '$addr','$tags', '$date')";
                $result = $conn->db_query($sql);
            }
            if($result){
                echo ("<script>location.href='release6.php';</script>");
            }else{
                echo ("保存失败");
            } 
            $conn->db_close();
            exit;
        }
        
    }
}

function release7(){
    $user_id = p('user_id');
    if(is_post()){
        

        $date = date("Y-m-d H:i:s");
        $name = upload_photo(f('photo', null));
        $title = p('title');
        $tags = p('tags');
        
        
        $conn = new db_conn();
        $sql = "INSERT INTO `photo` (`name`, `title`, `tags`, `pubtime`) VALUES ('$name', '$title', '$tags', '$date')";
        $result = $conn->db_query($sql);
        if($result){
            echo ("<script>location.href='release7.php';</script>");
        }else{
            echo ("保存失败");
        }
        $conn->db_close();
        exit;
    }
}

function release8(){
    $user_id = p('user_id');
    if(is_post()){
        

        $date = date("Y-m-d H:i:s");
        $name = upload_photo(f('photo', null));
        $title = p('title');
        $tags = p('tags');
        
        
        $conn = new db_conn();
        $sql = "INSERT INTO `photo` (`name`, `title`, `addr`, `pubtime`) VALUES ('$name', '$title', '$addr', '$date')";
        $result = $conn->db_query($sql);
        if($result){
            echo ("<script>location.href='release8.php';</script>");
        }else{
            echo ("保存失败");
        }
        $conn->db_close();
        exit;
    }
}

function get_more_pic(){
    $conn = new db_conn();
    $sql = 'select * from photo order by id desc limit 0,9';
    $result = $conn->db_query($sql);
	$photos = array();
	if($result){
		for($i=1;$rows = mysqli_fetch_assoc($result);$i++){
			$photos[] = $rows;
		}
	}else{
		
	}
	$conn->db_close();
    
    return $photos;
}

function release9(){
    $conn = new db_conn();
    $sql = 'select * from photo order by id desc';
    $result = $conn->db_query($sql);
	$photos = array();
	if($result){
		for($i=1;$rows = mysqli_fetch_assoc($result);$i++){
			$photos[] = $rows;
		}
	}else{
		
	}
	$conn->db_close();
    
    return $photos;
}

function photo_edit(){
    $user_id = p('user_id');
    $id = p('id', null);
    if(is_post() && $id){
        

        $date = date("Y-m-d H:i:s");
        $title = p('title');
        $tags = p('tags');
        
        
        $conn = new db_conn();
        $sql = "update `photo` set `title` = '".$title."', `pubtime` = '".$date."', `tags` = '".$tags."' where id = " . (int)$id;
        //echo $sql;exit;
        $result = $conn->db_query($sql);
        if($result){
            echo ("<script>location.href='photo_edit.php?id='+$id;</script>");
        }else{
            echo ("保存失败");
        }
        $conn->db_close();
        exit;
    }
}
/**
 * 删除照片
 */
function photo_del($id){
        $status = 'success';
        $user_id = 2;
        if($user_id == 1){
            $photo = get_pic($id);  //得到图片
            
            $conn = new db_conn();
            $sql = "delete from `photo` where id = " . (int)$id;
            //$sql = "select * from `photo` where id = ".(int)$id;
            $result = $conn->db_query($sql);
            if($result){
                //删除图片
                global $image_info;
                foreach ($image_info['image_sizes'] as $size_name=>$size_info) {  
                    unlink('upload_files/' . $size_name . '/' . $photo['name']);
                }
                //删除留言
                $sql = "delete from `photo_comment` where photo_id=".$id;
                $conn->db_query($sql);
            }else{
                $status = 'failure';
            }
            $conn->db_close();
        }
        else
            $status = 'failure';

        $callback = $_GET["callback"];  
        $array = array(
                'status' => $status,
				"errorMsg" => "loading error,please try it again"
        );        
        $result = json_encode($array);  
        echo "$callback($result)"; exit;
}

/**
 * 添加留言
 */
function comment_add($photo_id){
    
    if(is_post()){
        $user_id = 1;
        $content = p('comment');
        $date = date("Y-m-d H:i:s");
        
        
        $conn = new db_conn();
        $sql = "INSERT INTO `photo_comment` (`photo_id`, `user_id`, `content`, `pubtime`) VALUES ('$photo_id', '$user_id', '$content', '$date')";
        $result = $conn->db_query($sql);
        
        $sql = "update `photo` set comment_num = comment_num + 1 where id=".(int)$photo_id;
        $conn->db_query($sql);
        
        if($result){
            echo "{type:1, user_face:'images/50.jpg', user_name:'游客', pubtime:'$date'}";
        }else{
            echo "{type:0}";
        }
        $conn->db_close();
        exit;
    }
}
/**
 * 删除留言
 */
function comment_del($id){
        $status = 'success';
        
        $comment = get_comment($id);
         
        $conn = new db_conn();
        $sql = "update `photo` set comment_num = comment_num - 1 where id=".$comment['photo_id'];
        $result = $conn->db_query($sql);
        $sql = "delete from `photo_comment` where id=".$id;
        $result = $conn->db_query($sql);
          
        
        
        if($result){
            
        }else{
            $status = 'failure';
        }
        $conn->db_close();

        $callback = $_GET["callback"];  
        $array = array(
                'status' => 'success',
				"errorMsg" => "loading error,please try it again"
        );        
        $result = json_encode($array);  
        echo "$callback($result)"; exit;

}
function get_comment($id){
	$conn = new db_conn();
	$sql = "select * from photo_comment where id = ".(int)$id;
	$result = $conn->db_query($sql);
	if($result){
		$rows = mysqli_fetch_assoc($result);
		return $rows;
	}else{
		return false;
	}
	$conn->db_close();
}
/**
 * 留言列表
 */
function get_comment_list($id){
    $r = array();
    $conn = new db_conn();
    $sql = 'select * from photo_comment where photo_id = '.(int)$id.' order by id desc';
    $result = $conn->db_query($sql);
	if($result){
		for($i=1;$rows = mysqli_fetch_assoc($result);$i++){
			$r[] = $rows;
		}
	}else{
		
	}
	$conn->db_close();
    
    return $r;
}

function detailTravelPic(){
    $id = g('id', 1);
    $pic = get_pic($id);
    return $pic;
}

//取得信息
function get_pic($id){
	$conn = new db_conn();
	$sql = "select * from photo where id = ".(int)$id;
	$result = $conn->db_query($sql);
	if($result){
		$rows = mysqli_fetch_assoc($result);
		return $rows;
	}else{
		return false;
	}
	$conn->db_close();
}

function get_prev_pic($id){
	$conn = new db_conn();
	$sql = "select * from photo where id < ".(int)$id." order by id desc limit 0,1";
	$result = $conn->db_query($sql);
	if($result){
		$rows = mysqli_fetch_assoc($result);
		return $rows;
	}else{
		return false;
	}
	$conn->db_close();    
}

function get_next_pic($id){
	$conn = new db_conn();
	$sql = "select * from photo where id > ".(int)$id." order by id asc limit 0,1";
	$result = $conn->db_query($sql);
	if($result){
		$rows = mysqli_fetch_assoc($result);
		return $rows;
	}else{
		return false;
	}
	$conn->db_close();
}

function upload_photo($image){
            include_once('include/filer.php');
            include_once('include/image.php');
            global $image_info;    

            $date = date("Y_m_d_H_i_s")."_".new_image();
            $photo_name = $date.'.jpg';
            upload_to('upload_files/original/'.$photo_name, $image, 1); 
    
            // 准备参数
            $state = 'failure';
            // 过滤开始

            if ($image === null) {
                $message = '您必须指定一个图像文件';
                goto finish;
            }                    

            if ($image['error'] !== UPLOAD_ERR_OK) {
                $message = '文件上传失败';
                goto finish;
            }
                                                                                    
            $file_info = pathinfo($image['name']);
            # 保证小写
            $file_ext = strtolower($file_info['extension']);

            if (!in_array($file_ext, $image_info['image_exts'])) {
                $message = '扩展名不正确';
                goto finish;
            }

            // 过滤结束
            // 处理
            $file_name  = $date;
            $file = $file_name . '.' . $file_ext;
            
            $tmp_file = 'upload_files/original/'.$photo_name;
            
            foreach ($image_info['image_sizes'] as $size_name=>$size_info) {
                $tmp_file2 = 'upload_files/' . $size_name . '/' . $file;
                $t = new ThumbHandler();
                $t->setSrcImg($tmp_file);
                $t->setDstImg($tmp_file2);
                $t->createImg($size_info['width'], $size_info['height']);
            }
            //repo::set_by_id('user', array('face' => $file), visitor::get_id_of('user'));
            // 重定向
            $state = 'success';
            return $file;
            
    finish:
        if($state == 'failure'){
            return null;
        }
}


function upload_photo2($image) {   //通过网址传照片
        //先传过来
        include_once('include/filer.php');
        $date = date("Y_m_d_H_i_s")."_".new_image();
        $photo_name = $date.'.jpg';
        upload_to('original/'.$photo_name, $image, 2);  //已经指定了 upload_files/
        //传过来了
        
        // 准备参数
        $state = 'failure';
        // 过滤开始

        if ($image === null) {
            $message = '您必须指定一个图像文件';
            goto finish;
        }                    
                                                                  
        $file_info = pathinfo($image);
        # 保证小写
        $file_ext = strtolower($file_info['extension']);

        // 过滤结束
        // 处理
        //$file_name  = new_image();
        $file_name = $date;
        $file = $file_name . '.' . $file_ext;
        
        $tmp_file = 'upload_files/original/'.$photo_name;
        
        include_once('include/image.php');
        global $image_info;
        
        foreach ($image_info['image_sizes'] as $size_name=>$size_info) {
            $tmp_file2 = 'upload_files/' . $size_name . '/' . $file;
            //$tmp_file2 = handle_upload_image($size_info['width'], $size_info['height'], $tmp_file);
            
            
            
            
            
            
            
            $t = new ThumbHandler();
            $t->setSrcImg($tmp_file);
            $t->setDstImg($tmp_file2);
            $t->createImg($size_info['width'], $size_info['height']);
            
            //upload_to($size_name . '/' . $file, $tmp_file2);  已经切好图, 无需再传
        }
        
        // 重定向
        $state = 'success';
        return $file;
        
finish:
    if($state == 'failure'){
        return null;
    }
}




?>