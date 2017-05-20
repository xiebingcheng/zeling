<?php
$json = file_get_contents('list.json');
$arr = json_decode($json);
$tap = $_REQUEST['tap'];
$item;
$res = array(
	"resCode"=>"000",
	"resMsg"=>"success",
	"articleList"=>array()
);
for ($i=0;$i<count($arr);$i++) {
	$item = $arr[$i];
	if ($item->tap == $tap) {
		array_push($res['articleList'],$item);
	}
}
 echo json_encode(($res));
?>