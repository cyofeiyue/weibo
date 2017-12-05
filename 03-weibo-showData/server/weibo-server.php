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

// 获取微博
if ($action == 'get') {

    // 1. 取出本地所有微博数据
    $wbJson = file_get_contents($file);

    // 2. 通过输出, 返回给客户端
    print_r($wbJson);
}

// 获取微博页码总数
if ($action == 'getPageCount') {

    // 1. 取出本地所有微博数据
    $wbJson = file_get_contents($file);
    $wbArray = json_decode($wbJson);

    // 2. 获取总个数, 和一页大小
    $totalCount = count($wbArray);
    $pageSize = $_GET['pageSize'];

    // 进一取整
    // 1.1 -> 2
    echo ceil($totalCount / $pageSize);
}
