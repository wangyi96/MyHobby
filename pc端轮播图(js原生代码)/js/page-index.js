/**
 * Created by Supreme on 2017/8/16.
 */
window.onload = function(){
    /*获取imgList*/
    var imfList = document.getElementById("imgList");
    /*获取img*/
    var imgArr = document.getElementsByTagName("img");
    /*设置imgList的整体宽度*/
    imgList.style.width = 520*imgArr.length + "px";

    /*获取导航navDiv*/
    var navDiv = document.getElementById("navDiv");
    /*获取navDiv的父元素outer*/
    var outer = document.getElementById("outer");
    /*计算出导航按钮在outer中的居中位置*/
    navDiv.style.left = ( outer.offsetWidth - navDiv.offsetWidth) / 2 + "px";

    /*设置图片默认的索引*/
    var index = 0;
    /*获取所有的 a */
    var allA = document.getElementsByTagName("a");
    /*给第一个 a 设置默认的样式效果*/
    allA[index].style.backgroundColor = "black";

    /*为所有的 a 绑定点击响应函数*/
    for(var i = 0; i < allA.length; i++){
        /*为每一个超链接添加一个 num 属性*/
        allA[i].num = i;

        allA[i].onclick = function(){

            //关闭自动切换的定时器
            clearInterval(timer);

            index = this.num;        //获取点击超链接的索引.将其复制给 index
            //切换图片
            //imgList.style.left = -520 * index + "px";

            //修改正在选中的 a
            /*allA[index].style.backgroundColor = "black";*/
            setA();    //调一个 serA

            //使用 move 函数来切换图片
            move(imgList , "left" , -520 * index , 20 , function(){
                //动画执行完毕，开启自动切换
                autoChange();
            });
        };
    }

    //自动切换图片(开启自动切换图片)
    autoChange();


    /*创建一个方法，来设置选中的 a */
    function setA(){
        //判断当前的索引是否是最后一张
        if(index >= imgArr.length - 1){  //犯了重点错误
            index = 0;
            //此时显示的最后一张图片，而最后一张图片和第一张是一摸一样
            //通过CSS将最后一张切换成第一张
            imgList.style.left = 0;

        }


        for(var i = 0; i < allA.length; i++){    /*重点错误*/
            allA[i].style.backgroundColor = "";  //对所有的 a 进行遍历，设置成红色
           /* 相当于设置成了 内敛样式 ，优先级高于 (hover), navDiv a{background-color:red;}
           *      应将 “black” 改为 空
           */
        }
        //将选中的 a 设置为黑色
        allA[index].style.backgroundColor = "black";
    };  //

    //定义一个自动切换的定时器的标识
    var timer;
    //创建一个函数，用来开启自动切换图片
    function autoChange(){
        //开启一个定时器，用来定时切换图片
        timer = setInterval(function(){
            //切换图片，是使图片的索引自增
            index ++;
            //判断 index 的值
            index %= imgArr.length;



            //执行动画，切换图片
            move(imgList , "left" , -520 * index , 20 , function(){
                //修改导航按钮
                setA();
            });
        },3000);
    }

};








































