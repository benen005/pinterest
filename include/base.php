<?php 

function get_image_height($url) {
        $tmp = $url;
        list($width, $height, $type, $attr) = getimagesize($tmp);
        return $height;
}

function new_image() {
    return rand_sha1();
}

function rand_sha1() {
    static $secret_key = '';
    if ($secret_key === '') {
        $secret_key = secret_key();
    }
    $remote_addr  = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
    $remote_port  = isset($_SERVER['REMOTE_PORT']) ? $_SERVER['REMOTE_PORT'] : '';
    $user_agent   = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    $current_time = microtime(true);
    $rand_num     = mt_rand();
    return sha1($secret_key . $remote_addr . $remote_port . $user_agent . $current_time . $rand_num);
}

function secret_key(){
    return '1!#$fAsdf#@$14,41fCaf%%9&!?TT9ackJ/#';
}
    
function is_post() {
    return isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST';
}

/**
 * htmlspecialchars 的封装
 *
 * @param  mixed $var
 * @return mixed
 */
function h($var) {
    if (is_array($var)) {
        $new = array();
        foreach ($var as $key => $value) {
            $new[h($key)] = h($value);
        }
    } else if (is_string($var)) {
        $new = htmlspecialchars($var, ENT_QUOTES, 'UTF-8');
    } else if (is_object($var) && $var instanceof model) {
        $new = clone $var;
        $new->set_props(h($new->get_props()));
    } else {
        $new = $var;
    }
    return $new;
}

//封装GET POST COOKIE FILES
function g($key = '', $default = null) {
    return $key === '' ? $_GET : (isset($_GET[$key]) ? $_GET[$key] : $default);
}
function p($key = '', $default = null) {
    return $key === '' ? $_POST : (isset($_POST[$key]) ? $_POST[$key] : $default);
}
function c($key = '', $default = null) {
    return $key === '' ? $_COOKIE : (isset($_COOKIE[$key]) ? $_COOKIE[$key] : $default);
}
function f($key = '', $default = null) {
    return $key === '' ? $_FILES : (isset($_FILES[$key]) ? $_FILES[$key] : $default);
}



/**
 * 增加一些常用函数
 */
function ip() {
    // @todo: 需要获取http代理后面的真实ip
    if (!isset($_SERVER['REMOTE_ADDR'])) {
        die("Unable to determine remote address");
    }
    return isset($_SERVER["HTTP_X_FORWARDED_FOR"]) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : $_SERVER["REMOTE_ADDR"];
}

function set_header($key, $value) {
    $headers = array();
    $headers[$key] = $value;
    return $headers;
}

function set_cookie($key, $value, $seconds = 0, $path = '/', $domain = '') {
    if ($seconds !== 0) {
        $seconds = get_stamp() + $seconds;
    }
    if ($domain === '') {
        $domain = '';
    }
    return array('name' => $key, 'value' => $value, 'expire' => $seconds, 'path' => $path, 'domain' => $domain);
}

function send() {
    $headers = set_header('aaa', 'bbb');
    foreach ($headers as $key => $value) {
        header($key . ': ' . $value);
    }
    $cookie = set_cookie('aaa', '2', 1800, '/', 'lvyouzhi.net');
    //foreach ($cookies as $cookie) {
        setcookie($cookie['name'], $cookie['value'], $cookie['expire'], $cookie['path'], $cookie['domain']);
    //}
    header('X-UA-Compatible: IE=EmulateIE7');
    
    //$body = '11111';
    //ob_start('ob_gzhandler');
    //echo $body;
    //ob_end_flush();
}

function get_stamp() {
    return (int)microtime(true);
}

function get_datetime() {
    return date('Y-m-d H:i:s', microtime(true));
}


    /*
     * 客户端口 - pc , ipad, mobile
     *
     */
function get_agent() {
        $r = null;
        $user_agent = strtolower($_SERVER['HTTP_USER_AGENT']);
        $mobile_agents = Array("ucweb","iphone","240x320","acer","acoon","acs-","abacho","ahong","airness","alcatel","amoi","android","anywhereyougo.com","applewebkit/525","applewebkit/532","asus","audio","au-mic","avantogo","becker","benq","bilbo","bird","blackberry","blazer","bleu","cdm-","compal","coolpad","danger","dbtel","dopod","elaine","eric","etouch","fly ","fly_","fly-","go.web","goodaccess","gradiente","grundig","haier","hedy","hitachi","htc","huawei","hutchison","inno","ipaq","ipod","jbrowser","kddi","kgt","kwc","lenovo","lg ","lg2","lg3","lg4","lg5","lg7","lg8","lg9","lg-","lge-","lge9","longcos","maemo","mercator","meridian","micromax","midp","mini","mitsu","mmm","mmp","mot-","moto","nec-","netfront","newgen","nexian","nf-browser","nintendo","nitro","nokia","nook","novarra","obigo","palm","panasonic","pantech","philips","phone","pg-","playstation","pocket","pt-","qc-","qtek","rover","sagem","sama","samu","sanyo","samsung","sch-","scooter","sec-","sendo","sgh-","sharp","siemens","sie-","softbank","sony","spice","sprint","spv","symbian","tablet","talkabout","tcl-","teleca","telit","tianyu","tim-","toshiba","tsm","up.browser","utec","utstar","verykool","virgin","vk-","voda","voxtel","vx","wap","wellco","wig browser","wii","windows ce","wireless","xda","xde","zte");
        $is_mobile = false;
        foreach ($mobile_agents as $device) {
            if (strpos($user_agent, $device)) {
                $is_mobile = true;
                break;
            }
        }
        $is_pc = (strpos($user_agent, 'windows nt')) ? true : false;  
        $is_ipad = (strpos($user_agent, 'ipad')) ? true : false;  
      
        if($is_pc){  
            $r = 'pc';
        } 
        if($is_ipad){
            $r = 'ipad';
        } 
        if($is_mobile){
            $r = 'mobile';
        }
        return $r;
    }


?>