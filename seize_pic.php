<?php 
        $f = $_GET['pic'];
        $f = trim($f);
        $flag = preg_match('/http:\/\/[^\s]*\.((jpg)|(JPG)|(gif)|(GIF)|(png)|(PNG))/', $f);
        if(!$flag){  //如果不存在
            $v = file_get_contents($f);
            preg_match_all('/http:\/\/[^\s]*\.((jpg)|(JPG)|(gif)|(GIF)|(png)|(PNG))/', $v, $r);
        }
        else{
            preg_match_all('/http:\/\/[^\s]*\.((jpg)|(JPG)|(gif)|(GIF)|(png)|(PNG))/', $f, $r);
        }
        $r = $r[0];

        
        
        $callback = $_GET["callback"]; 
        
        if($r){
            $array = array(
                "status"=>"success",
                "picture" => $r
            );
        }
        else{
            $array = array(
                "status"=>"failure"
            ); 
        }
        $result = json_encode($array);  
        echo "$callback($result)";
?>