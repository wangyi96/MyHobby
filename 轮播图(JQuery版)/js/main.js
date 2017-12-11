$(function () {
    var $list = $('#list');
    var IMG_WIDTH = 600;
    var Current = 5;
    var offset = 0;
    var timer = null;
    var autoTime = null;
    var index = 0;
    var $points = $('#pointsDiv>span');
    var isMoving = false;

    //下一张图片
    $('#next').click(function () {
        move(true);
    })

    //上一张
    $('#prev').click(function () {
        move(false);
    })

    //自动
    autoTime = setInterval(function () {
        move(true);
    },3000);

    //移动移出
    $('#container').hover(function () {
        clearInterval(autoTime);
    },function () {
        autoTime = setInterval(function () {
            move(true);
        },3000)
    });

    $points.click(function () {
        var target = $(this).index();
        move(target);
    })


    function move(next) {

        if(isMoving){
            return
        }
        isMoving = true;
        var left = $list.position().left;
        if(typeof next === 'boolean'){
            offset = next ? -IMG_WIDTH : IMG_WIDTH;
        }else {
            offset = -(next - index) * IMG_WIDTH;
        }
        var targetLeft = left + offset;
        var time = 400;
        var itemTime = 20;
        var itemLeft = offset / (time / itemTime);

        timer = setInterval(function () {
            left += itemLeft;
            console.log(left);
            if(left == targetLeft){
                clearInterval(timer);
                if(left == -(Current+1) * IMG_WIDTH){
                    left = -IMG_WIDTH;
                }else if(left == 0){
                    left = -Current * IMG_WIDTH;
                }
                updatePoints(next);
                isMoving = false;
            }
            $list.css('left',left);
        },itemTime);

    }

    function updatePoints(next) {
        var target = 0;
        if(typeof next == 'boolean'){
            target = (next ? 1 : -1) + index;
        }else {
            target = next;
        }

        if(target == Current){
            target = 0;
        }else if(target < 0)
        {
            target = Current - 1;
        }
        $points[index].className = '';
        $points[target].className = 'on';
        index = target;
    }
})

