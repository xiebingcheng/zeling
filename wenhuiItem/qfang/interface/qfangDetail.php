<?php
$json = file_get_contents('list.json');
$arr = json_decode($json);
$id = $_REQUEST['id'];
$item;
$res = array(
	"resCode"=>"000",
	"resMsg"=>"success"
);
for ($i=0;$i<count($arr);$i++) {
	$item = $arr[$i];
	if ($item->id == $id) {
		$res['articleDetail'] = $item;
		break;
	}
}
 echo json_encode(($res));
?>