<?php 
include_once('include/config.php');
include_once('include/conn.class.php');
include_once('include/base.php');

$page = g('page', 1);
$param = g('param', null);
$id = $page;
$page = $id;
$pages = 3;
$perpage = 10;
$total = 0;

		$id1 = ($id - 1) * 10 + 1;
		$id2 = $id * 10;
		$args = array($id1 ,$id2);

		
	$conn = new db_conn();
	if($param){
		if(substr($param, 0, 2) == 'q,'){
			list($type, $type_value) = explode(",", $param);
			$sql = 'select * from photo where `title` regexp "'.$type_value.'" order by id desc limit ?,|';
			$sql2 = 'select * from photo where `title` regexp "'.$type_value.'"';
		}
		else{
		$sql = 'select * from photo where `tags` regexp "'.$param.'" order by id desc limit ?,|';
		$sql2 = 'select * from photo where `tags` regexp "'.$param.'"';
		}
	}
	else{
		$sql = "select * from photo order by id desc limit ?,|";
		$sql2 = "select * from photo";
	}
	
	
	
		
		$t = $conn->db_query($sql2);
		$max = (int)$conn->db_num($t);
		$total = $max;
		$pages = ceil($total / $perpage) + 1;  //不知为啥要加1
		
		if($max < $id1){
			$r = '';
		}
		elseif($max >= $id1 && $max <=$id2){
			$sx = $max - $id1 + 1;
			$args = array($id1 - 1, $sx);
			$r = get_result($sql, $args);
		}
		elseif($max > $id2){
			//$sx = $max - $id2 + 1;
			$args = array($id1 - 1 , 10);
			$r = get_result($sql, $args);
		}
		$conn->db_close();
		
		
$render = array();

function get_result($sql, $args){
	$conn = new db_conn();
	$sql = str_replace("?", $args[0], $sql);
	$sql = str_replace("|", $args[1], $sql);
	
	$result = $conn->db_query($sql);
	$r = array();
	if($result){
		for($i=1;$rows = mysqli_fetch_assoc($result);$i++){
			$r[] = $rows;
		}
		return $r;
	}else{
		return false;
	}
	$conn->db_close();
}
if($r){foreach($r as $k => $v){
	
	
	$itemId = $v['id'];
	$description = '[标签]:' . $v['tags'];
	$itemTitle = $v['title'];
	$itemPic = 'upload_files/small/' . $v['name'];
	$itemPicHeight = get_image_height($itemPic);
	$itemUrl = 'detailTravelPic.php?id='.$v['id'];
	$itemTitleUrl = '';
	$itemYingCount = $v['comment_num'];
	$itemWantCount = $v['city_want_num'];
	$userPic = '';
	$userUrl = '';
	$useText = '';
	

	$render[] = array(
				"itemId" => $itemId,  
				"itemPic"=>"$itemPic",
				"itemTitle"=>"$itemTitle", 
				"itemPicHeight"=> $itemPicHeight,
				"itemUrl" => "$itemUrl", 
				"itemTitleUrl" => "$itemTitleUrl", 
				"itemYingCount"=> $itemYingCount,  
				"itemWantCount"=> $itemWantCount,  
				"userPic" =>  "$userPic",
				"userUrl" => "$userUrl", 
				"useText"=> "$useText", 
				"isYou" => false,
				"itemCategory" => "photo", 
				"description" => "$description"
		);

}}

/* 打乱 */
//srand((float)microtime()*1000000);
//shuffle($render);
					
					
					
        $callback = $_GET["callback"];  
        $array = array(
                'status' => 'success',
				"errorMsg" => "loading error,please try it again",
				"photos" => array(
					"page" => (int)$page,
					"pages" => (int)$pages,
					"perpage" => (int)$perpage,
					"total"=> (int)$total,  
					"photo" => $render
				)
        );        
        $result = json_encode($array);  
        echo "$callback($result)"; exit;
?>