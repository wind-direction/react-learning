<?php
/**
 * File : comments.php
 * Created by PhpStorm.
 * User: wind(wind.direction.work@gmail.com)
 * Date: 17/1/17
 * Time: 下午2:47
 * Todo :
 */
$now = date('His');
$id = (int)$now;
$id1 = $id+1;
$id2 = $id+2;
$id3 = $id+3;
echo json_encode(
    array(
        array("id"=>$id1,"author"=>"author{$id1}", "text"=>"{$id1} comment"),
        /*array("id"=>$id2,"author"=>"author{$id2}", "text"=>"{$id2} comment"),
        array("id"=>$id3,"author"=>"author{$id3}", "text"=>"{$id3} comment **hello markdown**"),*/
    )
);