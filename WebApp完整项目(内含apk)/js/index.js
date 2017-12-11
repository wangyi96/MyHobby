//rem适配方案
	(function(){
		var styleNode = document.createElement('style');
		var width = document.documentElement.clientWidth/16;
		styleNode.innerHTML = "html{font-size:"+width+"px!important}"
		document.head.appendChild(styleNode);
	})()
	
//禁止事件默认行为
	document.addEventListener('touchstart',function(ev){
		ev = ev||event;
		ev.preventDefault();
	})

window.onload = function(){
	var headDown = document.querySelector('#wrap #head .down');
	var scrollBar = document.querySelector('#wrap .scrollBar');
	var head = document.querySelector('#wrap #head');
	var isShow = true;
	//无缝轮播
	var urls=["img/01.jpg","img/02.jpg","img/03.jpg","img/04.jpg","img/05.jpg"];
	wy.carouse(urls);
	
	//搜索点击事件判断
	findBind();
	function findBind(){
		var find = document.querySelector('#head .up .right .find');
		find.addEventListener('touchstart',function(ev){
			if(wy.css(scrollBar,'translateY') > head.offsetHeight/2){
				if(isShow){
					headDown.style.display = 'none';
				}else{
					headDown.style.display = 'block';
				}
				isShow = !isShow;
			}
		})
	}
	
	//滚动条事件
	vMoveBind()
	function vMoveBind(){
		var content = document.querySelector('#wrap #content');
		var inner = document.querySelector('#wrap #content .inner');
		var scale = content.clientHeight / inner.offsetHeight ;
		scrollBar.style.height =  content.clientHeight *scale +'px';
		var callBcak = {
			start:function(){
				scrollBar.style.opacity = 1;
			},
			move:function(){
				var scale = (document.documentElement.clientHeight - scrollBar.offsetHeight) / (inner.offsetHeight - document.documentElement.clientHeight);
				var target = wy.css(scrollBar,"translateY");
				console.log(target)
				if(target > head.offsetHeight/2){
					headDown.style.display = "none";
					isShow = false;
				}else if(target < head.offsetHeight/2){
					headDown.style.display = "block";
					isShow = true;
				}
				wy.css(scrollBar,"translateY", -wy.css(inner,"translateY")*scale);
			},
			end:function(){
				scrollBar.style.opacity = 0;
			}
		}
		
		wy.vMove(content,callBcak);
	}
	//点击变色
	//使用事件委托 给ul绑定事件
	changeColor()
	function changeColor(){
		var listNode = document.querySelector('#content .list-wrap .list');
//		var aNodes = document.querySelectorAll('#content .list_wrap .list>li a');
		var liNodes = document.querySelectorAll('#content .list-wrap .list>li');
		
		listNode.addEventListener('touchstart',function(){
			this.isMoving  = false;
		})
		
		listNode.addEventListener('touchmove',function(){
			if(!this.isMoving){
				this.isMoving = true
			}
		})
		
		listNode.addEventListener('touchend',function(ev){
			ev = ev||event;
			var touchC =  ev.changedTouches[0];
			
			if(this.isMoving){
				return;
			}
			
			for(var i =0;i<liNodes.length;i++){
				liNodes[i].className ="";
			}
			touchC.target.parentNode.className = "active"
		})
	}
	
	//content中tab滑动逻辑
	loadingBind();
	function loadingBind(){
		var wraps = document.querySelectorAll('#content .tab .tab-wrap');
		var tab = document.querySelectorAll('#content .tab');
		var nav = document.querySelectorAll('#content .tab .tab-nav');
		var translateX = tab[0].offsetWidth;
		for(var i=0;i<wraps.length;i++){
			move(wraps[i],nav[i]);
		}
		
		function move(wrap,nav){
			var loading = wrap.querySelectorAll('.tab-loading');
			var line = nav.querySelector('.line');
			var aNodes = nav.querySelectorAll('a');
			var lineLength = aNodes[0].offsetWidth/2 - line.offsetWidth/2;
			wy.css(line,"translateX",aNodes[0].offsetLeft+lineLength);
			//抽象line的坐标
			var now = 0;
			//修正位置
			wy.css(wrap,"translateX",-translateX);
			//给有文字的元素设置3d硬件加速
			wy.css(wrap,"translateZ",1);

			var startP = {x:0,y:0};
			var elementP = {x:0,y:0};
			
			//判断是否在x轴上滑动
			var isX = true;
			
			//控制只执行一次
			var isFirst = true;
			
			//判断是否在loading中
			var isLoad = false;
			function jump(disX){
				//判断往左划还是往右划
				var targetX = disX>0? 0:-2*translateX;
				wrap.style.transition = ".5s"
				//targetX不是左边就是右边
				wy.css(wrap,"translateX",targetX);

				//判断向左右划时，now值的变换
				disX>0?now--:now++;
				if(now<0){
					now = aNodes.length -1;
				}else if(now > aNodes.length - 1){
					now = 0;
				}
				
				//当左右动画执行完成后，再执行endfn
				wrap.addEventListener('transitionend',endFn);
				wrap.addEventListener('webkitTransitionEnd',endFn);
				
				isLoad = true;
			}
			
			function endFn(){
				//移除transform事件
				wrap.removeEventListener('transitionend',endFn);
				wrap.removeEventListener('webkitTransitionEnd',endFn);
				
				//隐藏loading
				for(var i=0;i<loading.length;i++){
					loading[i].style.opacity =  "1";
				}
				
				//修改绿色line下标
				wy.css(line,"translateX",aNodes[now].offsetLeft+lineLength);
				
				//两秒后吧wrap拉回来
				setTimeout(function(){
					wrap.style.transition = "none";
					wy.css(wrap,"translateX",-translateX);
					
					for(var i=0;i<loading.length;i++){
						loading[i].style.opacity =  "0";
					}
					
					isLoad = false;
				},2000)
			}
			
			wrap.addEventListener('touchstart',function(ev){
				//如果在loading界面时，不能执行touchstart
				if(isLoad){
					return;
				}
				ev = ev ||event;
				var touchC = ev.changedTouches[0];
				wrap.style.transition ="none"

				startP.x = touchC.clientX;
				startP.y = touchC.clientY;
				
				elementP.x = wy.css(wrap,"translateX");
				elementP.y = wy.css(wrap,"translateY");
				
				//每次touchstart时，重置isx和isfrist
				isX = true;
				isFirst =true;
			})
			
			
			wrap.addEventListener('touchmove',function(ev){
				//如果第一次判断是y，就不进行二次判断
				if(!isX){
					return
				}
				//如果在loading界面时，不能执行touchmove
				if(isLoad){
					return;
				}
				ev = ev ||event;
				var touchC = ev.changedTouches[0];
				
				var nowP = {x:touchC.clientX,y:touchC.clientY};
				var disP= {x:nowP.x -startP.x,y:nowP.y -startP.y};
				
				
				if(isFirst){
					isFirst = false;
					if(Math.abs(disP.y) > Math.abs(disP.x)){
						isX = false;
						return;
					}
				}
				
				wy.css(wrap,"translateX",elementP.x+disP.x);
				
				if(Math.abs(disP.x)>translateX/2){
					jump(disP.x);
				}
			})
			
			wrap.addEventListener('touchend',function(ev){
				if(isLoad){
					return;
				}
				ev = ev ||event;
				var touchC = ev.changedTouches[0];
				
				var nowP = {x:touchC.clientX,y:touchC.clientY};
				var disP= {x:nowP.x -startP.x,y:nowP.y -startP.y};
				
				wy.css(wrap,"translateX",elementP.x+disP.x);
				
				if(Math.abs(disP.x)<translateX/2){
					this.style.transition = ".5s"
					wy.css(this,"translateX",-translateX)
				}
			})
		}
	}
	
	
	//橡皮筋效果
	//快速滑屏
	drag()
	function drag(){
		var wrap = document.querySelector('#wrap #content .list-wrap');
		var list = document.querySelector('#wrap #content .list-wrap .list');
		wy.css(list,"translateZ",1);
		//设置点击的初始位置
		var startX=0;
		//设置元素的初始位置
		var elementX=0;
		//获取translateX可以位移的最大距离
		var minX = wrap.clientWidth - list.offsetWidth;
		
		//设置初始时间
		var startTime = 0;
		//设置初始位置
		var startP = 0;
		
		//获取每一次move的时间差
		var timeVal = 1;
		//获取每一次move的距离
		var pointVal = 0;
		wrap.addEventListener('touchstart',function(ev){
			ev=ev||event;
			var touchC=ev.changedTouches[0];
			
			list.style.transition = "none";
			list.sdMove =false;
			
			startX = touchC.clientX;
			elementX = wy.css(list,"translateX");
			
			//获取点击时的时间
			startTime = new Date().getTime();
			startP = touchC.clientX;

			pointVal=0;
		})
		
		wrap.addEventListener('touchmove',function(ev){
			ev=ev||event;
			var touchC=ev.changedTouches[0];
			var nowX = touchC.clientX;
			var disX = nowX - startX;
			var translateX = elementX + disX;
			//获取每次移动的时间
			var nowTime = new Date().getTime();
			var nowP = touchC.clientX;
			
			//获取每一小段位移的时间
			timeVal = nowTime - startTime;
			//获取每一段位移的距离
			pointVal = nowP - startP;
			
			//每执行一次，就把当前初始位置重新赋值
			startTime = nowTime;
			startP = nowP;
			//手动橡皮筋效果
			if(translateX>0){ 
				var scale = document.documentElement.clientWidth / (2*(document.documentElement.clientWidth + translateX))
				translateX = wy.css(list,"translateX") +pointVal*scale;
				list.sdMove = true
			}else if(translateX<minX){
				var over = minX - translateX;
				var scale = document.documentElement.clientWidth / (2*(document.documentElement.clientWidth + over))
				translateX = wy.css(list,"translateX") +pointVal*scale;
				list.sdMove = true
			}
			
			wy.css(list,"translateX",translateX);
		})
		
		wrap.addEventListener('touchend',function(ev){
			ev=ev||event;
			var touchC=ev.changedTouches[0];
			var translateX = wy.css(list,"translateX");
			var bsr = "";
			//获取touchend时的手指滑动速度
			var speed = pointVal / timeVal;
			
			var targetX = translateX +  speed * 250;
			var time = Math.abs(speed)*0.15;
			time = time>0?1:time;

			if(targetX>0){
				targetX = 0;
				if(list.sdMove){
					bsr=""
					time = ".5";
				}else{
					bsr="cubic-bezier(.29,1.37,.75,1.51)"
				}
			}else if(targetX<minX){
				targetX=minX;
				if(list.sdMove){
					bsr=""
					time = ".5";
				}else{
					bsr="cubic-bezier(.29,1.37,.75,1.51)"
				}
			}

			list.style.transition = time+"s "+bsr;
			wy.css(list,"translateX",targetX);
			
		})
	}
	
	//面包机点击事件
	dH()
	function dH(){
		var menuBtn = document.querySelector('#wrap #head .up .menuBtn');
		var mask = document.querySelector('#wrap #head .mask');

		var flag = false;
		menuBtn.addEventListener('touchstart',function(ev){
			ev = ev||event;
			if(flag){
				menuBtn.classList.remove("showMenuBtn");
				menuBtn.classList.add("closeMenuBtn");
				mask.style.display = "none";
			}else{
				menuBtn.classList.add("showMenuBtn");
				menuBtn.classList.remove("closeMenuBtn");
				mask.style.display = "block";
			}
			flag = !flag;
			ev.stopPropagation();
			ev.preventDefault();
		})
		
		document.addEventListener('touchstart',function(ev){
			if(flag){
				menuBtn.classList.remove("showMenuBtn");
				menuBtn.classList.add("closeMenuBtn");
				mask.style.display = "none";
				flag = !flag;
			}
		})
		
		mask.addEventListener('touchstart',function(ev){
			ev = ev||event;
			ev.stopPropagation();
			ev.preventDefault();
		})
	}
	
	
	//获取焦点事件定义
	focusBind()
	function focusBind(){
		var inputText = document.querySelector("#wrap #head .down input[type='text']");
		
		inputText.addEventListener('touchstart',function(ev){
			ev = ev||event;
			this.focus();
			if(!this.hasFocus){
				this.hasFocus = true
			}
			ev.stopPropagation();
			ev.preventDefault();
		})
		
		document.addEventListener('touchstart',function(ev){
			ev = ev||event;
			if(inputText.hasFocus){
				inputText.blur();
				inputText.hasFocus = false;
			}
		})
	}
}
