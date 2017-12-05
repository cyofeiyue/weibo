/**
 * Created by wangshunzi on 17/4/21.
 */

(function () {

    function DataTool() {

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


    }

    window.DataTool = DataTool;

})(window)