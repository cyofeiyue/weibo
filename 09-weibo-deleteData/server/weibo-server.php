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
    echo $wbJson;

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

// 根据页码, 和页面大小, 来获取列表数据
if ($action == 'getPageItems') {
    $pageNum = $_GET['pageNum'];
    $pageSize = $_GET['pageSize'];

    // 1. 取出本地所有微博数据
    $wbJson = file_get_contents($file);
    $wbArray = json_decode($wbJson);

    if (count($wbArray) == 0) {
        echo '[]';
    }else {
        // 2. 计算起始位置
        $begin = ($pageNum - 1) * $pageSize;
        $begin = $begin > count($wbArray) - 1 ? count($wbArray) - 1 : $begin;
        $end = $pageNum * $pageSize - 1;
        $end = $end > count($wbArray) - 1 ? count($wbArray) - 1 : $end;

        // 3. 根据起始位置, 取出结果
        $tmpArray = array();
        for ($i = $begin; $i <= $end; $i ++) {
            array_push($tmpArray, $wbArray[$i]);
        }

        // 4. 返回给外界
        echo json_encode($tmpArray);
    }

}

if ($action == 'deleteItem') {

    $deleteID = $_GET['id'];
    // 1. 取出本地所有微博数据
    $wbJson = file_get_contents($file);
    // 强制解码成关联数组
    $wbArray = json_decode($wbJson, true);

    $deleteIndex = -1;
    for ($i = 0; $i < count($wbArray); $i++) {
        $wb = $wbArray[$i];
        if ($wb["id"] == $deleteID) {
            $deleteIndex = $i;
            break;
        }
    }
    if ($deleteIndex != -1) {
      array_splice($wbArray,$deleteIndex,1);
    }
    file_put_contents($file, json_encode($wbArray));

    // 告诉浏览器当前页码

}


