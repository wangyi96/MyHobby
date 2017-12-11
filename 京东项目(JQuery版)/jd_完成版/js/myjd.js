/*showHide()
 subMenu()
 search()
 share()
 address()
 minicart()
 products()
 mediumImg()
 movePic()
 showBig()*/
$(function () {
    showBig();
    function showBig() {
        //大盒子 和 小滑块
        var maskTop = $('#maskTop');
        var mask = $('#mask');

        //取得大图片 和大图片盒子
        var largeImgContainer = $('#largeImgContainer');
        var largeImg = $('#largeImg');

        //小滑块的宽度和高度
        var MASK_WIDTH = mask.width();
        var MASK_HEIGHT = mask.height();

        //给盒子添加移入移出属性
        maskTop.hover(function () {
            mask.show();
            largeImgContainer.show();
            largeImg.show();

            //取得大图片图片地址
            var mediumSrc = $('#mediumImg').attr('src');
            var largeSrc = mediumSrc.replace('m.jpg','l.jpg');
            largeImg.attr('src',largeSrc);

            //取得大图片的寛高
            var largeWidth =  largeImg.width();
            var largeHeight = largeImg.height();

            //给大图片的盒子设置样式
            largeImgContainer.css({
                width:largeWidth / 2,
                height:largeHeight / 2
            })

            //盒子鼠标移动事件，每次移动鼠标都触发
            maskTop.mousemove(function (event) {

                //获取触发事件时的鼠标位置
                var offsetLeft = event.offsetX;
                var offsetTop = event.offsetY;

                //确定小滑块左边的距离 和上边的距离
                var left = offsetLeft - MASK_WIDTH/2;
                var top = offsetTop - MASK_HEIGHT/2;

                //边界值判断
                if(left < 0){
                    left = 0;
                }else if(left > maskTop.width()/2){
                    left = maskTop.width() / 2;
                }

                if(top < 0){
                    top = 0;
                }else if(top > maskTop.height() /2){
                    top = maskTop.height() / 2;
                }

                //设置属性
                mask.css({
                    left: left,
                    top:top
                })

                //取得大图片的左边边距和上边边距
                left = left / maskTop.width() * largeImg.width();
                top = top / maskTop.height() * largeImg.height();

                largeImg.css({
                    left: -left,
                    top: -top
                });
            })
        },function () {
            mask.hide();
            largeImgContainer.hide();
            largeImg.hide();
        })
    }

    //图片左右变化
    movePic();
    function movePic() {
        var forward = $('#preview h1 a:last');
        var backward = $('#preview h1 a:first');

        var list = $('#icon_list');
        var imgs = list.children();
        var IMG_WIDTH = 62;
        var current = 0;
        var listLength = list.children().length;
        var show = 5;
        forward.attr('class', 'forward');

        forward.click(function () {
            //如果current小于3
            if (current < listLength - show) {
                current++;
                backward.attr('class', 'backward');
            }
            if (current === listLength - show) {
                forward.attr('class', 'forward_disabled');
            }
            list.css('left', -current * IMG_WIDTH);
        });

        backward.click(function () {
            if (current > 0) {
                current--;
                forward.attr('class', 'forward');
            }
            if (current === 0) {
                backward.attr('class', 'backward_disabled');
            }
            list.css('left', -current * IMG_WIDTH);
        })
    }

    //改变中间的图片
    mediumImg();
    function mediumImg() {
        $('#icon_list').find('li').hover(function () {
            $(this).children().addClass('hoveredThumb');

            var str = $(this).children().attr('src');
            var mediumStr = str.replace('.jpg', '-m.jpg');
            $('#mediumImg').attr('src', mediumStr);
        }, function () {
            $(this).children().removeClass('hoveredThumb');
        })
    }

    //显示产品
    products();
    function products() {
        $('.main_tabs>li').click(function () {
            var index = $(this).index();
            $(this).addClass('current');
            $(this).siblings().removeClass('current');
            var div = $('#product_detail>div:not(:first)');
            div.hide();
            div.eq(index).show();
        })
    }


    //添加购物车
    miniCart();
    function miniCart() {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $(this).children('div').show();
        }, function () {
            $(this).removeClass('minicart');
            $(this).children('div').hide();
        })
    }

    //地址的选择
    address();
    function address() {
        $('#store_select').hover(function () {
            $('#store_content').show();
            $('#store_close').show();
            $('#store_tabs>li').click(function () {
                $(this).siblings().removeClass('hover');
                $(this).addClass('hover')
            });
            $('#store_close').click(function () {
                $('#store_content').hide();
                $('#store_close').hide();
            })
        }, function () {
            $('#store_content').hide();
            $('#store_close').hide();
        })
    }


    //分享模块
    share();
    function share() {
        var flag = false;
        $('#shareMore').click(function () {
            if (flag) {
                $('#dd').css('width', 155);
                $(this).prevAll(':lt(2)').hide();
                $(this).children().removeClass('backword');
            } else {
                $('#dd').css('width', 200);
                $(this).prevAll(':lt(2)').show();
                $(this).children().addClass('backword');
            }
            flag = !flag;
        })
    }


    //搜索输入框
    search();
    function search() {
        $('#txtSearch').on('focus keyup', function () {
            var str = this.value.trim();
            if (str) {
                $('#search_helper').show();
            }
        }).blur(function () {
            $('#search_helper').hide();
        })
    }


    //显示全部商品分类的右列表
    subMenu();
    function subMenu() {
        $('.cate_item').hover(function () {
            $(this).children('div').show();
        }, function () {
            $(this).children('div').hide();
        })
    }

    //显示手机京东，客户服务，网站导航的下拉列表
    showHide();
    function showHide() {
        $('[name = show_hide]').hover(function () {
            var str = $(this).attr('id');
            $('#' + str + '_items').show();
        }, function () {
            var str = $(this).attr('id');
            $('#' + str + '_items').hide();
        })
    }
});
