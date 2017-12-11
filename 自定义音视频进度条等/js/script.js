window.onload = function(){
	var video = document.querySelector('#box video');
	var controller = document.querySelector('#controller');
	var start = document.querySelector('#controller .btn .start');
	var stop = document.querySelector('#controller .btn .stop');
	var full_screen = document.querySelector('.others .full_screen');
	var span = document.querySelector('.others .full_screen span');
	var wrap =document.querySelectorAll('.progress .wrap');
	var inner = document.querySelectorAll('.progress .wrap .inner');
	var wrap2 = document.querySelectorAll('.progress .wrap2');
	var progress = document.querySelectorAll('.progress');
	var time= document.querySelectorAll('.time span'); 
	var switchM = document.querySelector('.sound .switch');
	var timer =null;
	var flag = true;
	var flag2 = true;
	var value = 0;
	
	video.width = document.documentElement.clientWidth;
	video.height = document.documentElement.clientHeight - controller.offsetHeight;
	
	window.onresize = function(){
		video.width = document.documentElement.clientWidth;
		video.height = document.documentElement.clientHeight - controller.offsetHeight;
	}
	
	//滑动时进度条
	function move(){
		var scale = video.currentTime / video.duration;
		wrap[0].style.width = wrap2[0].style.width = scale*(wrap[0].clientWidth - inner[0].offsetWidth) +"px";
	}

	/*主进度条事件*/
	var callback ={
		move:function(){
			wrap2[0].style.width = this.offsetLeft + "px";
			var scale =  this.offsetLeft / (wrap[0].clientWidth - inner[0].offsetWidth);
			
			video.currentTime = scale * video.duration;
			
		}
	}
	$.drag(inner[0],callback);
	
	/*音量进度条事件*/
	var callback1 ={
		move:function(){
			wrap2[1].style.width = this.offsetLeft + "px";
			value = this.offsetLeft / (wrap[1].clientWidth - inner[1].offsetWidth);
			video.volume = value;
			if(value == 0){
				switchM.style.backgroundPositionY = "-46px";
				flag2 = false
				video.muted = true;
			}else{
				switchM.style.backgroundPositionY = "-34px";
				flag2 = true;
				video.muted = false;
			}
		}
	}
	$.drag(inner[1],callback1)
		
	/*开始 暂停按钮*/
	start.onclick = function(){
		if(flag){
			video.play();
			this.style.backgroundPositionY = '-11px';
			timer = setInterval(ks,100);
			flag = false;
		}else{
			video.pause();
			clearInterval(timer);
			this.style.backgroundPositionY = '-23px';
			flag = true;
		}
	}
	
	/*停止按钮*/
	stop.onclick = function(){
		video.pause();
		clearInterval(timer);
		start.style.backgroundPositionY = '-23px';

		wrap2[0].style.width = 0 + "px";
		inner[0].style.left = 0 +'px';
		video.currentTime = 0;
		time[0].innerHTML = getTime(video.currentTime);
		flag = true;
	}
	
	
	/*点击进度条*/
	progress[0].onclick = function(ev){
		ev = ev||event;
		inner[0].style.left = ev.clientX - this.offsetLeft +'px';
		video.play();
		timer = setInterval(ks,100);
		video.currentTime = ((ev.clientX - progress[0].offsetLeft) / (wrap[0].clientWidth - inner[0].offsetWidth)) * video.duration;
		wrap2[0].style.width = inner[0].offsetLeft + "px";
		start.style.backgroundPositionY = '-11px';
		
		flag = false;
	}
	
	/*定时器函数*/
	function ks(){
		var scale = video.currentTime / video.duration;
		inner[0].style.left = scale*(wrap[0].clientWidth - inner[0].offsetWidth) +"px";
		wrap2[0].style.width = inner[0].offsetLeft + "px";
				
		if(video.currentTime === video.duration){
			clearInterval(timer);
			video.pause();
			start.style.backgroundPositionY = '-23px';
			flag = true;
		}
		
		time[0].innerHTML = getTime(video.currentTime);
	}
	
	/*查看播放总时间*/
	setTimeout(function(){
		time[1].innerHTML = getTime(video.duration);
	},1000);
	
	
	/*音量控制*/
	switchM.onclick =function(){
		if(flag2){
			this.style.backgroundPositionY = "-46px";
			flag2 = false
			video.muted = true;
		}else{
			this.style.backgroundPositionY = "-34px";
			flag2 = true;
			video.muted = false;
		}
	}
	/*让音量一开始为最大值*/
	wrap2[1].style.width= inner[1].style.left = wrap[1].clientWidth - inner[1].offsetWidth +'px';
	
 	/*全屏*/
	var isFullScreen = false;
	full_screen.onclick=function() {
		if(isFullScreen) {
			span.style.backgroundPositionY = '-58px'
			isFullScreen = false
			if (document.exitFullscreen) {  
			    document.exitFullscreen();  
			}  
			else if (document.mozCancelFullScreen) {  
			    document.mozCancelFullScreen();  
			}  
			else if (document.webkitCancelFullScreen) {  
			    document.webkitCancelFullScreen();  
			}
			else if (document.msExitFullscreen) {
			      document.msExitFullscreen();
			}
		} else {
			span.style.backgroundPositionY = '-70px'
			isFullScreen = true
			var docElm = document.documentElement;
			//W3C  
			if (docElm.requestFullscreen) {  
			    docElm.requestFullscreen();  
			}
			//FireFox  
			else if (docElm.mozRequestFullScreen) {  
			    docElm.mozRequestFullScreen();  
			}
			//Chrome等  
			else if (docElm.webkitRequestFullScreen) {  
			    docElm.webkitRequestFullScreen();  
			}
			//IE11
			else if (docElm.msRequestFullscreen) {
			  docElm.msRequestFullscreen();
			}
		}
	}
	
	/*调整时间函数*/
	function getTime(time){
		var h = Math.floor(time/3600);
		var m =Math.floor(time%3600/60);
		var s = Math.floor(time%60);
		
		h = h >10? h : "0"+h;
		m = m > 10? m : "0"+m;
		s = s > 10? s : "0"+s;
		
		var num = h + ":" + m + ":" +s;
		return num;
	}
}

