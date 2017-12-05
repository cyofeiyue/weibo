<?php
/**
 * Created by PhpStorm.
 * User: wangshunzi
 * Date: 17/4/21
 * Time: 下午4:17
 */

// 0. 初始化存储文件
$file = 'weiboData.db';
if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

// 1. 获取客户端的操作类型,是保存, 还是查询
$action = $_GET['act'];
// 需要保存微博
if ($action == 'save') {

    // 1. 取出本地所有微博数据
    $wbJson = file_get_contents($file);
    $wbArray = json_decode($wbJson);

    // 2. 追加一条新的数据在最前面
    $id = $_GET['id'];
    $content = $_GET['content'];
    $newWB = array('id' => $id, 'content' => $content);
    array_unshift($wbArray, $newWB);

    // 3. 再次保存数组到文件中
    file_put_contents($file, json_encode($wbArray));

}