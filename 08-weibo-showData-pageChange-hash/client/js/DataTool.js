/**
 * Created by wangshunzi on 17/4/21.
 */

(function () {

    function DataTool() {

    }
    DataTool.currentPage = 1;
    var hash = window.location.hash;
    if (hash.length > 0)
    {
        var pageNum = hash.replace('#','');
        DataTool.currentPage = pageNum;
    }


    // 发送一条微博
    // 并成功后返回结果
    DataTool.saveItem = function (id, content, successFunc) {
        AjaxTool.get('../server/weibo-server.php', {
            'act': 'save',
            'id': id,
            'content': content
        }, function (xhr) {
            successFunc();
        }, function () {
            console.log('发布失败');
        })

    };


    // 获取所有微博列表
    DataTool.getItems = function (successFunc) {
        AjaxTool.get('../server/weibo-server.php', {
            'act': 'get'
        }, function (xhr) {
            // 处理好结果, 返回给外界
            var itemArray = JSON.parse(xhr.responseText);
            successFunc(itemArray);
        }, function () {
            console.log('发布失败');
        })

    }

    // 获取总页码
    DataTool.getPageCount = function (pageSize, successFunc) {
        AjaxTool.get('../server/weibo-server.php', {
            'act': 'getPageCount',
            'pageSize': pageSize
        }, function (xhr) {
            // 处理好结果, 返回给外界
            successFunc(xhr.responseText);
        }, function () {
            console.log('发布失败');
        })

    }

    // 根据页面大小, 和页面, 获取对应的数据
    DataTool.getItemsWithPageAndSize = function (page, size, successFunc) {
        AjaxTool.get('../server/weibo-server.php', {
            'act': 'getPageItems',
            'pageNum': page,
            'pageSize': size
        }, function (xhr) {
            // 记录当前页码
            DataTool.currentPage = page;
            // document.cookie = 'currentPage='+page;
            window.location.hash = page;
            // 处理好结果, 返回给外界
            var itemArray = JSON.parse(xhr.responseText);
            successFunc(itemArray);
        }, function () {
            console.log('发布失败');
        })

    }



    window.DataTool = DataTool;

})(window)