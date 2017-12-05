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

        // 2. 根据内容创建节点, 并插入在ul中
        var newTag = $('<li>' + textContent + '</li>');
        $('.dataList>ul').prepend(newTag);
        newTag.hide();
        newTag.slideDown(200);
        // 添加事件
        // 3. 清空输入框内容
        $('.content').val('');
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