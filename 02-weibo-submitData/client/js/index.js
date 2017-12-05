/**
 * Created by wangshunzi on 17/4/21.
 */


/*
* 发布微博
* */
$(function () {
    $('.submit').click(function () {
        // 1. 获取输入框内容
        var textContent = $.trim($('.content').val());

        // 容错
        if(textContent.length == 0) {
            alert('请输入内容');
            // 清空之前内容
            $('.content').val('');
            // 获取焦点
            $('.content').focus();
            return;
        }
        // 2. 清空输入框内容
        $('.content').val('');

        // 3. 发送微博
        var id = (new Date()).getTime();
        DataTool.saveItem(id, textContent, function () {
            // 3. 根据内容创建节点, 并插入在ul中
            var newTag = $('<li>' + textContent + '</li>');
            $('.dataList>ul').prepend(newTag);
            newTag.hide();
            newTag.slideDown(200);
        })


    });

});

/*
* 删除微博
* */
$(function () {
    $('.dataList>ul').on('click', 'li', function () {
        $(this).animate({
            width: '0px'
        }, 500, function () {
            $(this).remove();
        })
    })
});