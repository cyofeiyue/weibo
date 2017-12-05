/**
 * Created by wangshunzi on 17/4/21.
 */
$(function () {

    // 刚进来之后, 把所有的图片都隐藏, 仅仅只显示第一个
    $('img').eq(0).css('display', 'block').siblings().css('display', 'none');


//                    $('li').eq(9).css('background', 'red');

    // 1. 监听所有li< hover
    $('#left>ul>li').hover(function () {
        // 2. 根据当前li对应的索引,来控制中间图片的展示
        // 当前的控件, 在父控件上的位置索引
        var index = $(this).index();

        // [] == get == dom对象
        // eq
        $('#center>img').eq(index).css('display', 'block').siblings().css('display', 'none');

        console.log(index);
    });

    $('#right>ul>li').hover(function () {
        // 2. 根据当前li对应的索引,来控制中间图片的展示

        var index = $(this).index() + 9;
        $('#center>img').eq(index).css('display', 'block').siblings().css('display', 'none');
        console.log(index);
    })

})
