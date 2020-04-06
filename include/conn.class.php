<?php
class db_conn
{	
	/*private $host = 'localhost';
	private $user = 'renzf';
	private $pass = 'renzf';
	private $data = 'renzf';*/
	
	private $host = '';
	private $user = '';
	private $pass = '';
	private $data = '';
	
	private $connect;
	private $result;
	
	function __construst()		//PHP5
	{
		$this->db_conn();
	}
	function db_conn()		//PHP4
	{
		global $conn_array;
		list($this->host,$this->user,$this->pass,$this->data) = $conn_array;
		@$this->connect = mysqli_connect($this->host,$this->user,$this->pass,$this->data);
		if ($this->connect){
			//return true;
			//mysqli_query("set names 'utf8'");  //这句为什么是utf8 不是utf-8
			mysqli_set_charset($this->connect, 'utf8');
		}else{
			echo mysqli_connect_error();
		}
	}
	
	function db_query($query){
		@$result = mysqli_query($this->connect, $query);
		if($result){
			$this->result = $result;
			return $this->result;
		}else{
			return false;
		}
	}
	function db_num($result){
		if($result == "")
		{
			$result = $this->result;
		}
		@$number = mysqli_num_rows($result);
		return $number;
	}
 	function db_close(){
		@mysqli_close($this->connect);
	}
}

$flag = 0;
if($flag){
	$conn_array = array('localhost', 'root', '123456', 'ben');
	$sql = 'select * from user';
	$r = ssql($sql);
	print_r($r);
}
/**
 * sql 返回一个对象数组 array(stdClass());
 */
function sqlo($sql){
    $r = array();
    $conn = new db_conn();
    $result = $conn->db_query($sql);
	if($result){
		for($i=1;$rows = mysqli_fetch_assoc($result);$i++){
			$r[] = $rows;
		}
	}else{
		
	}
	$conn->db_close();
    if($r)
		$r = json_decode(json_encode($r));
    return $r;
}
function sql($sql){
    $r = array();
    $conn = new db_conn();
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
/**
 * sql 返回一个对象
 */
function ssqlo($sql){
	$conn = new db_conn();
	$result = $conn->db_query($sql);
	if($result){
		$row = mysqli_fetch_assoc($result);
	}else{
		$row = null;
	}
	$conn->db_close();
	if($row)
		$row = (object)($row);  //这里等价于 json_decode(json_encode($r));
	return $row;
}
function ssql($sql){
	$conn = new db_conn();
	$result = $conn->db_query($sql);
	if($result){
		$row = mysqli_fetch_assoc($result);
	}else{
		$row = null;
	}
	$conn->db_close();
	return $row;
}

/**
 * 仅执行sql
 */
function sqli($sql){
	$conn = new db_conn();
	$result = $conn->db_query($sql);
	if($result){
		$r = true;
	}else{
		$r = false;
	}
	$conn->db_close();	
	return $r;
}

?>