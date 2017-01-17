<?php
/**
 * File : submit.php
 * Created by PhpStorm.
 * User: wind(wind.direction.work@gmail.com)
 * Date: 17/1/17
 * Time: 下午3:21
 * Todo :
 */
echo json_encode(array(
    'id'=>rand(10,50),
    'author'=>$_POST['author'],
    'text'=>$_POST['text']
));