<?php 
include_once('action.php');


$tag = '公务';
$sql="select * from photo where tags = '$tag'";
$o = sqlo($sql);
foreach($o as $v)
    echo $v->id." ";

?>