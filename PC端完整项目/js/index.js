window.onload = function(){
	var head = document.querySelector('#head');
	var headlist = document.querySelectorAll('#head .nav .list>li');
	var listUp = document.querySelectorAll('#head .box .nav .list>li .up');
	var arrow = document.querySelector('#head .box .arrow');
	var content = document.querySelector('#content');
	var contentlist = document.querySelector('#content .list');
	var liNodes2 = document.querySelectorAll('#content .list2>li');
	var liNodes = document.querySelectorAll('#content .list>li');
	var home = document.querySelector('#content .list .home');
	var home2list = document.querySelectorAll('#content .list .home .home2>li');
	var home1list = document.querySelectorAll('#content .list .home .home1>li');
	var aboutItem = document.querySelectorAll('#content .list .about .about3 .item');
	var aboutUl = document.querySelectorAll('#content .list .about .about3 .item>ul');
	var team3 = document.querySelector('#content .team .team3');
	var team3Ul = document.querySelector('#content .team .team3 > ul');
	var team3Li = document.querySelectorAll('#content .team .team3 > ul >li');
	var mask = document.querySelector('#wrap #mask');
	var maskUp = document.querySelector('#wrap #mask .up');
	var maskDown = document.querySelector('#wrap #mask .down');
	var maskSpan = document.querySelector('#wrap #mask span') ;
	var headMusic = document.querySelector('#head .box .music');
	var audio = document.querySelector('#head .box .music audio')
	var now = 0;
	var time = null;
	var firstUp = listUp[0];
	var oldIndex = 0;
	var autoIndex = 0;
	var autotime = null;
	var oc =null;
	var teamTime2 = null;
	var teamTime1  = null;
	var num = 0;
	
	/*播放音乐*/
	headMusic.onclick = function(){
		if(audio.paused){
			audio.play();
			headMusic.style.background = "url(img/musicon.gif) no-repeat";
		}else{
			console.log(2)
			audio.pause();
			headMusic.style.background = "url(img/musicoff.gif) no-repeat"
		}
	}
	
	/*开机动画*/
	showTime()
	function showTime(){
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];

		for(i=0;i<arr.length;i++){
			var img = new Image();
			img.src = "img/"+arr[i];
			img.onload = function(){
				num++;
				maskSpan.style.width = (num/arr.length)*100+"%";
			}
		}
		
		maskSpan.addEventListener('transitionend',function(){
			maskUp.style.height = 0 +'px';
			maskDown.style.height = 0 +'px';
			maskSpan.style.visibility = "hidden";
			headMusic.click();
		})
		
		maskDown.addEventListener('transitionend',function(){
			maskDown.remove();
			maskSpan.remove();
			maskUp.remove();
			mask.remove();
		})
	}
	
	
	
	/*出入场动画*/
		var animationplay = [
			{
				inAn:function(){
					var home1 = document.querySelector('#content .list .home .home1');
					var home2 = document.querySelector('#content .list .home .home2');
					
					home1.style.opacity ="1";
					home2.style.opacity ="1";
					
					home1.style.transform = "translateY(0px)";
					home2.style.transform = "translateY(0px)";
				},
				outAn:function(){
					var home1 = document.querySelector('#content .list .home .home1');
					var home2 = document.querySelector('#content .list .home .home2');
					
					home1.style.opacity ="0";
					home2.style.opacity ="0";
					
					home1.style.transform = "translateY(-200px)";
					home2.style.transform = "translateY(200px)";
				}
			},
			{
				inAn:function(){
					var plane1 = document.querySelector('#content .list .course .plane1');
					var plane2 = document.querySelector('#content .list .course .plane2');
					var plane3 = document.querySelector('#content .list .course .plane3');
					
					plane1.style.transform = "translate(0px,0px)";
					plane2.style.transform = "translate(0px,0px)";
					plane3.style.transform = "translate(0px,0px)";
				},
				outAn:function(){
					var plane1 = document.querySelector('#content .list .course .plane1');
					var plane2 = document.querySelector('#content .list .course .plane2');
					var plane3 = document.querySelector('#content .list .course .plane3');
					
					plane1.style.transform = "translate(-200px,-200px)";
					plane2.style.transform = "translate(-300px,200px)";
					plane3.style.transform = "translate(100px,-100px)";
				}
			},
			{
				inAn:function(){
					var pencel1 = document.querySelector('#content .list .works .pencel1');
					var pencel2 = document.querySelector('#content .list .works .pencel2');
					var pencel3 = document.querySelector('#content .list .works .pencel3');
					
					pencel1.style.transform = "translateY(0px)";
					pencel2.style.transform = "translateY(0px)";
					pencel3.style.transform = "translateY(0px)";
				},
				outAn:function(){
					var pencel1 = document.querySelector('#content .list .works .pencel1');
					var pencel2 = document.querySelector('#content .list .works .pencel2');
					var pencel3 = document.querySelector('#content .list .works .pencel3');
					
					pencel1.style.transform = "translateY(-200px)";
					pencel2.style.transform = "translateY(200px)";
					pencel3.style.transform = "translateY(200px)";
				}
			},
			{
				inAn:function(){
					var aboutItem1 = document.querySelector('#content .list .about .about3 .item:nth-child(1)');
					var aboutItem2 = document.querySelector('#content .list .about .about3 .item:nth-child(2)');
					aboutItem1.style.transform = "rotate(0deg)"
					aboutItem2.style.transform = "rotate(0deg)"
				},
				outAn:function(){
					var aboutItem1 = document.querySelector('#content .list .about .about3 .item:nth-child(1)');
					var aboutItem2 = document.querySelector('#content .list .about .about3 .item:nth-child(2)');
					aboutItem1.style.transform = "rotate(45deg)"
					aboutItem2.style.transform = "rotate(-45deg)"
				}
			},
			{
				inAn:function(){
					var team1 = document.querySelector('#content .list .team .team1');
					var team2 = document.querySelector('#content .list .team .team2');
					
					team1.style.transform = "translateX(0px)"
					team2.style.transform = "translateX(0px)"
				},
				outAn:function(){
					var team1 = document.querySelector('#content .list .team .team1');
					var team2 = document.querySelector('#content .list .team .team2');
					
					team1.style.transform = "translateX(-200px)"
					team2.style.transform = "translateX(200px)"
				}
			}
										];
										

	outAnimation();
	function outAnimation(){
		for(var i =0;i<animationplay.length;i++){
			animationplay[i].outAn();
		}
	}
	

	setTimeout(function(){
		animationplay[0].inAn()
	},1000);
		
	
	/*屏幕缩放*/
	window.onresize = function(){
		contentBind();
		arrow.style.left = listUp[now].getBoundingClientRect().left + headlist[now].offsetWidth/2 - arrow.offsetWidth/2  +'px';
		contentlist.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight) + 'px';
	}
	
	/*头部部分*/
	headBind();
	function headBind(){
		listUp[0].style.width = "100%";
		arrow.style.left = listUp[0].getBoundingClientRect().left + headlist[0].offsetWidth/2 - arrow.offsetWidth/2  +'px';
		for(var i=0;i<headlist.length;i++){
			headlist[i].index = i;
			headlist[i].onclick = function(){
				move(this.index);
				now = this.index;
			}
		}
	}
	
	
//	move(4);
	/*移动部分*/
	function move(index){
		for(var i=0;i<listUp.length;i++){
			listUp[i].style.width = "";
		}
		listUp[index].style.width = "100%";
		arrow.style.left = listUp[index].getBoundingClientRect().left + headlist[index].offsetWidth/2 - arrow.offsetWidth/2  +'px';
		contentlist.style.top = -index *(document.documentElement.clientHeight - head.offsetHeight) + 'px';
		
		for(var i=0;i<liNodes2.length;i++){
			liNodes2[i].className = "";
		}
		liNodes2[index].className = "active";
		
		outAnimation();
		animationplay[index].inAn();
		
	}
	
	/*主体部分*/
	contentBind();
	function contentBind(){
		content.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px';
		for(var i =0;i<liNodes.length;i++){
			liNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + 'px';
		}
	}
	
	/*侧边栏绑定*/
	conentListBind();
	function conentListBind(){
		for(var i=0;i<liNodes2.length;i++){
			liNodes2[i].index = i;
			liNodes2[i].onclick = function(){
				move(this.index);
			}
		}
	}
	
	/*鼠标滑动翻页*/
	hd();
	function hd(){
		if(content.addEventListener){
			content.addEventListener('DOMMouseScroll',function(ev){
				clearTimeout(time);
				time = setTimeout(function(){
					fn(ev);
				},200);
			});
		}
		
		content.onmousewheel = function(ev){
			clearTimeout(time);
				time = setTimeout(function(){
					fn(ev);
				},200);
		};
	}
	
	/*滑动逻辑*/
	function fn(ev){
		ev = ev||event;
		var flag ="";
		if(ev.detail){
			flag = ev.detail > 0 ? "down":"up";
		}else if(ev.wheelDelta){
			flag = ev.wheelDelta > 0 ? "up" : "down";
		}
		
		switch (flag){
			case 'up':
				if(now>0){
					now--;
				}
				move(now);
				break;
			case 'down':
				if(now<liNodes.length-1){
					now++;
				}
				move(now);
				break;
		}
	}
	
	
	/*第一屏*/
	homeBind();
	function homeBind(){
		for(var i=0;i<home2list.length;i++){
			home2list[i].index = i;
			home2list[i].onclick = function(){
				clearInterval(autotime);
				for(var i =0;i<home2list.length;i++){
					home2list[i].className = "";
				}
				this.className = "active";
				if(this.index > oldIndex){
					home1list[this.index].className = "rightshow";
					home1list[oldIndex].className = "leftHide";
				}else if(this.index < oldIndex){
					home1list[this.index].className = "leftshow";
					home1list[oldIndex].className = "rightHide";
				}
				oldIndex = this.index;
				autoIndex = this.index;
				
//				autoMove();
			}
		}
		
		home.onmouseenter = function(){
			clearInterval(autotime);
		}
		
//		home.onmouseleave = function(){
//			autoMove();
//		}
	}
	
	/*轮播*/
	autoMove();
	function autoMove(){
		clearInterval(autotime);
		autotime = setInterval(function(){
			autoIndex++;
			if(autoIndex == home2list.length){
				autoIndex=0;
			}
			
			for(var i =0;i<home2list.length;i++){
					home2list[i].className = "";
			}
			home2list[autoIndex].className = "active";
			home1list[autoIndex].className = 'rightshow';
			home1list[oldIndex].className = 'leftHide';
			
			oldIndex = autoIndex;
		},2500);

	}

	/*第四屏*/
	picBind();
	function picBind(){
		for(var i=0;i<aboutUl.length;i++){
				addLi(aboutUl[i]);
		}
	}
	
	function addLi(ul){
			var src = ul.dataset.src;
			var w = ul.offsetWidth/2;
			var h = ul.offsetHeight/2;
			
			for(var i=0;i<4;i++){
				var li = document.createElement('li');
				var img = document.createElement('img');

				li.style.width = w +'px';
				li.style.height = h + 'px';
				img.src = src;
				//	left:0     top:0
				//	left:-w   top:0
				//	left:0		 top:-h
				//	left:-w	 top:-h
				img.style.left = -(i%2)*w +'px';
				img.style.top = -Math.floor((i/2))*h +'px';

				ul.appendChild(li);
				li.appendChild(img);
			}
			
			var img = ul.querySelectorAll('img');
			ul.onmouseenter = function(){
				//	left:0     top:h
				//	left:-2w   top:0
				//	left:w		 top:0
				//	left:0	 top:-2h
				
				img[0].style.top = h +'px';
				img[1].style.left = -2*w +'px';
				img[2].style.left = w +'px';
				img[3].style.top = -2*h +'px';
			}
			
			ul.onmouseleave = function(){
				//	left:0     top:0
				//	left:-w   top:0
				//	left:0		 top:-h
				//	left:-w	 top:-h
				
				img[0].style.top = 0 +'px';
				img[1].style.left = -w +'px';
				img[2].style.left = 0 +'px';
				img[3].style.top = -h +'px';
			}

	}

	/*第5屏*/
	teamBind();
	function teamBind(){
		for(var i=0;i<team3Li.length;i++){
			team3Li[i].index = i;
			team3Li[i].onmouseenter = function(){
				for(var i=0;i<team3Li.length;i++){
					team3Li[i].style.opacity = '.5';
				}
				this.style.opacity = '1';
				
				addCanves();
				oc.style.left = this.offsetLeft + 'px';
			}
			
			team3.onmouseleave = function(){
				for(var i=0;i<team3Li.length;i++){
					team3Li[i].style.opacity = '1';
				}
				removeCanves();
			}
		}
	}
	
	function removeCanves(){
			clearInterval(teamTime1);
			clearInterval(teamTime2);
			oc.remove();
			oc = null;
	}
	
	function addCanves(){
		if(!oc){
			oc = document.createElement('canvas');
			team3Ul.appendChild(oc);
			oc.height = 338;
			oc.width = team3Li[0].offsetWidth;
			oc.style.position = 'absolute';
			
			oc.style.top = 0;
			canvesShow();
		}	
	}
	
	function canvesShow(){

		if(oc.getContext){
		var ctx = oc.getContext('2d');
			
			var arr=[];
			
			teamTime1 = setInterval(function(){
				console.log(arr)
				ctx.clearRect(0,0,oc.width,oc.height);
				
				for(var i=0;i<arr.length;i++){
					arr[i].deg+=3;
					arr[i].x= arr[i].startX + (Math.sin(arr[i].deg*Math.PI/180))*arr[i].num;
					arr[i].y= arr[i].startY - 0.5*(arr[i].deg*Math.PI/180)*arr[i].num*1.5;
					if(arr[i].y<50){
							arr.splice(i,1);
					}
				}
				
				

				for(var i=0;i<arr.length;i++){
					ctx.fillStyle = "rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].a+")";
					ctx.beginPath();
					ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI)
					ctx.fill();
				}
			},1000/60)
			
			teamTime2 = setInterval(function(){
				var x = Math.round(Math.random()*oc.width);
				var r = Math.round(Math.random()*8+2);
				var y = oc.height - r -2;
				var green =  Math.round(Math.random()*255);
				var red =  Math.round(Math.random()*255);
				var blue =  Math.round(Math.random()*255);
				var a =1;
				
				var startX = x;
				var startY = y;
				var deg = 0;
				var num = Math.round(Math.random()*30)+30;
				
				arr.push({
					x:x,
					y:y,
					r:r,
					red:red,
					green:green,
					blue:blue,
					a:a,
					startX:startX,
					startY:startY,
					deg:deg,
					num:num
				})
				
			},50)
	}
}
}
