window.onload = function () {
    var imgs = document.querySelectorAll('img');
    var bodyWidth = parseInt(document.body.clientWidth);
    var bodyHeight = parseInt(document.body.clientHeight);
    document.documentElement.onmousemove = null;

    //随机出现图片
    for (var i = 0; i < imgs.length; i++) {
        var temp = imgs[i];
        var imgwidth = parseInt(getCss(temp, 'width'));
        var imgheight = parseInt(getCss(temp, 'height'));

        var width = Math.random() * (bodyWidth - imgwidth);
        var height = Math.random() * (bodyHeight - imgheight);

        temp.style.left = width + 'px';
        temp.style.top = height + 'px';

    }

    tuoZuai(imgs);

    //增加层级
    imgs.forEach(function (value, index) {
        value.onclick = function (ele) {
            ele = ele || window.event;
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].style.zIndex = 0;
            }
            value.style.zIndex = 1;
        }
    });

    //变大变小
    imgs.forEach(function (value, index) {
        value.onmousewheel = function (ele) {
            ele = ele || window.event;
            var width = parseInt(getCss(value, 'width'));
            if (ele.wheelDelta > 0) {
                width += 2;
            } else {
                width -= 2;
            }
            value.style.width = width + 'px';
        }
    });
}

//拖动
function tuoZuai(imgs) {
    imgs.forEach(function (value, index) {
        document.documentElement.onmousemove = null;
        console.log(value);

        value.onmousedown = function (ele) {
            console.log('a');
            ele = ele || window.event;

            var offsetX = ele.offsetX;
            var offsetY = ele.offsetY;

            document.documentElement.onmousemove = function (ele) {
                console.log('b');
                ele = ele || window.event;

                var pageX = ele.pageX;
                var pageY = ele.pageY;

                var x = pageX - offsetX;
                var y = pageY - offsetY;

                value.style.left = x + 'px';
                value.style.top = y + 'px';

                value.onmouseup = function (ele) {
                    document.documentElement.onmousemove = null;
                    console.log('c');
                }

                return false;
            }
        }

        value.onmouseup = function (ele) {
            document.documentElement.onmousemove = null;
            console.log('c');
        }
    })
}


function getCss(ele, attr) {
    if (window.getComputedStyle) {
        attr = getComputedStyle(ele, null)[attr];
        return attr;
    } else {
        attr = ele.currentStyle[attr];
        return attr;
    }
}
