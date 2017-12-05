/**
 * Created by wangshunzi on 17/4/21.
 */


/*
* 全局数据
* */
var pageSize = 5;
// 默认情况下, 一个网页是没有cookie的, 需要我们手动赋值
// 赋值格式如下: document.cookie = 'currentPage=10';
// 为什么使用cookie
// 因为cookie可以临时存储一些缓存数据, 默认生命周期, 是浏览器打开关闭

// 存在问题?
// 夸浏览器, 则无效
// 解决, 使用hash
// console.log('--------' + window.location.hash);


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
            // var newTag = $('<li>' + textContent + '</li>');
            // $('.dataList>ul').prepend(newTag);
            // newTag.hide();
            // newTag.slideDown(200);

            // 重新刷新当前页
            changeDataWithPageNum(DataTool.currentPage);
            showAllPageNumAndSelect(DataTool.currentPage);

        })


    });

});

/*
* 删除微博
* */
$(function () {
    $('.dataList>ul').on('click', 'li', function () {
        var id = $(this).data('id');

        $(this).animate({
            width: '0px'
        }, 500, function () {
            $(this).remove();
            // 根据id, 删除微博
            DataTool.deleteItemWithID(id, function () {
                // 重新刷新当前页
                changeDataWithPageNum(DataTool.currentPage);
                showAllPageNumAndSelect(DataTool.currentPage);
            });
        });
    })
});



/*
* 等文档加载完毕后, 立即显示所第一页数据, 和所有页码, 以及默认高亮显示第一个页码
* */
$(function () {

    // 显示所有页码
    showAllPageNumAndSelect(DataTool.currentPage);

    // 展示第一页数据
    changeDataWithPageNum(DataTool.currentPage);

});

// 切换页码
$(function () {
    // 1.监听页码点击
    $pageNumPane = $('.pageNum>ul');

    $pageNumPane.on('click', 'li', function () {
        var pageNum = $(this).text();
        changeDataWithPageNum(pageNum);
        showAllPageNumAndSelect(pageNum);

    });

});

// 计算所有页码, 并显示
function showAllPageNumAndSelect(pageNum) {
    // 展示所有页码
    $pageNumPane = $('.pageNum>ul');
    DataTool.getPageCount(pageSize, function (pageCount) {
        if (pageNum > pageCount) {
            pageNum = pageCount;
            changeDataWithPageNum(pageNum);
        }
        // 清空之前
        $pageNumPane.empty();

        for (var i = 1; i <= pageCount; i ++) {
            $liTag = $('<li>'+ i +'</li>');
            $pageNumPane.append($liTag);
            // 第一个页码高亮
            if(i == pageNum) {
                $liTag.addClass('current');
            }else {
                $liTag.removeClass('current');
            }
        }
    });
}


// 根据页码, 来控制数据显示和高亮页码显示
function changeDataWithPageNum(pageNum) {
    // 1. 重新展示数据
    DataTool.getItemsWithPageAndSize(pageNum, pageSize, function (itemArray) {

        // 展示之前, 先清空当前页的内容
        var $listPane = $('.dataList>ul');
        $listPane.empty();

        // 展示到界面上
        for (var i = 0; i < itemArray.length; i++) {
            var item = itemArray[i];
            var $liTag = $('<li data-id='+ item.id +'>'+ item.content +'</li>')
            $listPane.append($liTag);
        }
    });

    // 2. 高亮页码显示
    // $('.pageNum>ul>li').eq(pageNum-1).addClass('current').siblings().removeClass('current');
}
