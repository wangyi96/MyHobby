(function(w){
	w.wy=Object.create(null);
	w.wy.css = function(node,type,val){
		if(typeof node["transforms"] === "undefined"){
			node["transforms"]={};
		}
		
		if(arguments.length>=3){
			var text = "";
			node["transforms"][type] = val;
			
			for(item in node["transforms"]){
				if(node["transforms"].hasOwnProperty(item)){
					switch (item){
						case "translateX":
						case "translateY":
						case "translateZ":
							text+= item+"("+node["transforms"][item]+"px)";
							break;
						case "scale":
							text+= item+"("+node["transforms"][item]+")";
							break;
						case "rotate":
							text+= item+"("+node["transforms"][item]+"deg)";
							break;
					}
				}
			}
			node.style.transform = node.style.webkitTransform = text;
		}else if(arguments.length==2){
			val = node["transforms"][type];
			if(typeof val ==="undefined"){
				if(type ==="translateX"||type==="rotate"||type==="translateY"){
					val = 0;
				}else if(type === "scale"){
					val = 1;
				}
			}
			return val
		}
	}

	w.wy.carouse = function(urls){
		var pointsFlag = urls.length;
		//滑屏区域
		var wrap = document.querySelector(".list_wrap");
		var needCarouse = wrap.getAttribute("needCarouse");//有"" 无null
		needCarouse = needCarouse === null?false:true;
		if(needCarouse){
			urls = urls.concat(urls);
		}
		//滑屏元素
		var list = document.createElement('ul');
		var ulText="";
		wy.css(list,"translateZ",1);
		
		for(var i=0;i<urls.length;i++){
			ulText+="<li><a href='javascript:;'><img src='"+urls[i]+"'/></a></li>"
		}
		list.innerHTML= ulText;
		wrap.appendChild(list);
		
		var styleText="";
		var styleNode = document.createElement('style');
		
		styleText+="#wrap .list_wrap ul{width: "+urls.length+"00%;}";
		styleText+="#wrap .list_wrap>ul>li{width: "+100/urls.length+"%;}";
		
		styleNode.innerHTML = styleText;
		document.head.appendChild(styleNode);

		var pWrap = document.querySelector(".list_wrap .point");
		if(pWrap){
			var spanText = "";
			for(i=0;i<pointsFlag;i++){
				if(i==0){
					spanText+="<span class='active'></span>";
				}else{
					spanText+="<span></span>";
				}
			}
			pWrap.innerHTML=spanText;
			var points = document.querySelectorAll(".list_wrap .point > span");
		}

	/*基本滑屏逻辑*/
		//手指一开始的位置
		var startX = 0;
		var startY = 0;
		//元素一开始的位置
		var elementX = 0;
		var elementY = 0;
		//抽象ul的位置
		var now =0;
		//用来标识用户的滑动方向   true:在x轴上滑动  false:在y轴上滑动
		var isX =true;
		//做首次判断
		var first = true;
		wrap.addEventListener("touchstart",function(ev){
			ev=ev||event;
			var touchC = ev.changedTouches[0];
			
			if(needCarouse){
				var now = wy.css(list,"translateX")/document.documentElement.clientWidth;
				if(now == 0){
					now = -urls.length/2;
				}else if(now == 1-urls.length){
					now =1 -urls.length/2;
				}
				wy.css(list,"translateX",now*document.documentElement.clientWidth);
			}
			
			startX = touchC.clientX;
			startY = touchC.clientY;
			//实时获取元素的translateX的偏移量
			elementX=wy.css(list,"translateX");
			
			//清除过渡
			list.style.transition="none";
			//禁止自动轮播
			clearInterval(clearTime);
			isX = true
			first = true;
		})
		
		
		wrap.addEventListener("touchmove",function(ev){
			if(!isX){
				return;
			}
			ev=ev||event;
			var touchC = ev.changedTouches[0];
			//手指移动时的实时位置
			var nowX = touchC.clientX;
			var nowY = touchC.clientY;
			//每次move时手指移动的距离
			var disX = nowX - startX;
			var disY = nowY - startY;
			
			if(first){
				if(Math.abs(disY)-Math.abs(disX)>0){
					console.log(1)
					isX = false;
					return;
				}else{
					first = false;
				}
			}
//			console.log(list.style.transform)
			wy.css(list,"translateX",elementX+disX);
			
		})
		wrap.addEventListener("touchend",function(ev){
			ev=ev||event;
			var touchC = ev.changedTouches[0];
			//抽象ul的位置
			now = wy.css(list,"translateX")/document.documentElement.clientWidth;
			now = Math.round(now);
			//处理超出的情况
			if(now>0){
				now=0;
			}else if(now<1-urls.length){
				now = 1-urls.length;
			}
			moveAuto();
			//重启自动轮播
			if(needAuto){
				auto();
			}
		})
	
		//自动轮播
		var clearTime =0;
		var needAuto = wrap.getAttribute("needAuto");//有"" 无null
		needAuto = needAuto === null?false:true;
		if(needAuto){
			auto();
		}
		function auto(){
			clearInterval(clearTime);
			clearTime =setInterval(function(){
				//无缝
				if(now == 1-urls.length){
					list.style.transition="none";
					now = 1-urls.length/2;
					wy.css(list,"translateX",now*document.documentElement.clientWidth);
				}
				setTimeout(function(){
					now--;
					moveAuto();
				},50)
			},3000);
		}
		
		function moveAuto(){
			list.style.transition=".5s";
			wy.css(list,"translateX",now*document.documentElement.clientWidth);
			//小圆点的同步
			if(pWrap){
				for(var i=0;i<points.length;i++){
					points[i].className="";
				}
				points[-now%pointsFlag].className="active";
			}
		}
	}

	w.wy.vMove =function(wrap,callBcak){
		var list = wrap.children[0];
		wy.css(list,"translateZ",1);
		//设置点击的初始位置
		var startP={};
		//设置元素的初始位置
		var elementP={};
		//获取translateY可以位移的最大距离
		var minY = wrap.clientHeight - list.offsetHeight;
		
		//设置初始时间
		var startTime = 0;
		//设置初始位置
		var startPoint = 0;
		
		//获取每一次move的时间差
		var timeVal = 1;
		//获取每一次move的距离
		var pointVal = 0;
		
		//防抖动
		var isY= true;
		var isFirst = true;
		
		var Tween={
			 Linear: function(t,b,c,d){ return c*t/d + b; },
			 Back: function(t,b,c,d,s){
	            if (s == undefined) s = 1.70158;
	            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	        }
		};
		wrap.addEventListener('touchstart',function(ev){
			ev=ev||event;
			var touchC=ev.changedTouches[0];
			
			minY = wrap.clientHeight - list.offsetHeight;
			clearInterval(wrap.timer);
			
			if(callBcak && typeof callBcak["start"] ==="function"){
				callBcak["start"].call(wrap);
			}
			
			list.style.transition = "none";
			list.sdMove =false;
			
			startP = {x:touchC.clientX,y:touchC.clientY};
			elementP = {x:wy.css(list,"translateX"),y:wy.css(list,"translateY")};
			
			startTime = new Date().getTime();
			startPoint = touchC.clientY;

			pointVal=0;
			
			isY= true;
			isFirst = true;
		})
		
		wrap.addEventListener('touchmove',function(ev){
			if(!isY){
				return;
			}
			ev=ev||event;
			var touchC=ev.changedTouches[0];
			
			if(callBcak && typeof callBcak["move"] ==="function"){
				callBcak["move"].call(wrap);
			}

			var nowP = {x:touchC.clientX,y:touchC.clientY};
			var disP = {x:nowP.x - startP.x,y:nowP.y - startP.y};
			var translateY = elementP.y + disP.y;
			
			var nowTime = new Date().getTime();
			var nowPoint = touchC.clientY;
			
			timeVal = nowTime - startTime;
			pointVal = nowPoint - startPoint;
			
			startTime = nowTime;
			startPoint = nowPoint;
	
			if(translateY>0){ 
				var scale = document.documentElement.clientHeight / (2*(document.documentElement.clientHeight + translateY))
				translateY = wy.css(list,"translateY") +pointVal*scale;
				list.sdMove = true
			}else if(translateY<minY){
				var over = minY - translateY;
				var scale = document.documentElement.clientHeight / (2*(document.documentElement.clientHeight + over))
				translateY = wy.css(list,"translateY") +pointVal*scale;
				list.sdMove = true
			}
			
			if(isFirst){
				isFirst = false
				if(Math.abs(disP.x)>Math.abs(disP.y)){
					isY = false;
					return;
				}
			}
			
			wy.css(list,"translateY",translateY);
		})
		
		wrap.addEventListener('touchend',function(ev){
			ev=ev||event;
			var touchC=ev.changedTouches[0];
			var translateY = wy.css(list,"translateY");
			//var bsr = "";
			var speed = pointVal / timeVal;
			speed = Math.abs(speed)<1?0:speed;
//			console.log(speed)
			var targetY = translateY +  speed * 200;
			
			var time = Math.abs(speed)*0.15;
			time = time>1?1:time;
			
			var type = "Linear";
			if(targetY>0){
				targetY = 0;
				if(list.sdMove){
					time = .5;
					type = "Linear";
				}else{
					type = "Back";
				}
			}else if(targetY<minY){
				targetY=minY;
				if(list.sdMove){
					time = .5;
					type = "Linear";
				}else{
					type = "Back";
				}
			}
			move(type,time,targetY);
			
			if(callBcak && typeof callBcak["end"] ==="function"){
				callBcak["end"].call(wrap);
			}
		})
		
		function move(type,time,targetY){
			clearInterval(wrap.timer);
			var point = 0;
			//总次数
			var t = 0;
			//初始位置
			var b = wy.css(list,"translateY");
			//预期位置-初始位置
			var c = targetY -b;
			//总次数
			var d = time*1000 / 20
			//回弹距离
			var s = 1;

			wrap.timer = setInterval(function(){
				t++;
				if(t>d){
					clearInterval(wrap.timer);
					if(callBcak && typeof callBcak["over"] ==="function" ){
						callBcak["over"].call(wrap);
					}
					return;
				}
				point = Tween[type](t,b,c,d,s);
				wy.css(list,"translateY",point);
				if(callBcak && typeof callBcak["move"] ==="function"){
					callBcak["move"].call(wrap);
				}
			},20)
		}
	}
})(window)