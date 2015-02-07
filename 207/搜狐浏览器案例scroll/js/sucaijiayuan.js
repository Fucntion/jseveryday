var crollNow = 0;
var iTime;

var followScroll = 1;
var stop = 0;
var ifbottom = 0;
var rocketTimer;
var pingback;
var ifPlayed = Array(0,0,0,0,0,0,0);

var windowobject;

var windowHeight;

var SmoothScroll = function (win, opt) {
    //操作对象
    this.win = win;
    this.timeStamp = new Date().getTime();
    //每次滚动位移
    this.step = opt ? opt.step || 400 : 400;
    //缓动系数
    this.f = opt ? opt.f || 0.06 : 0.06;
    this.interval = 10;
    this.intervalID = null;
    this.isFF = navigator.userAgent.toLowerCase().indexOf("firefox")>=0;
    this.upOrDown = "";
    this.init();
}
var i=0;
SmoothScroll.prototype = {

    init: function () {
        var _this = this;
                
        if (_this.isFF) {
            _this.win.addEventListener('DOMMouseScroll', function (e) {

	             _this.upOrDown = e.detail < 0 ? "up" : "down";
	             _this.scrollHander();
  
            	if (e.preventDefault) //disable default wheel action of scrolling page
  				    e.preventDefault();
    			else
        			return false;
            }, false);
        } else {
            _this.win.onmousewheel = function (e) {       
                e = e || window.event;
                _this.upOrDown = e.wheelDelta > 0 ? "up" : "down";
                _this.scrollHander();
           
            	if (e.preventDefault) //disable default wheel action of scrolling page
  				    e.preventDefault();
    			else
        			return false;
            }
        }
    }
    , scrollHander: function () {
    	clearTimeDown();
        var _this = this;
        var _step=_this.step * (_this.upOrDown == "up" ? -1 : 1);
        var tar = $(window).scrollTop()+ _step;
    
        if(tar<$("body").height()-10){
        	if(!$(windowobject).is(":animated")){//避免多次滚轮造成的多次滚动

  				$(windowobject).animate({"scrollTop":"+="+ _step+"px"},600,function(){
  					if(_this.upOrDown == "up"){//代表转轮往上，文本内容其实是往下
	        			crash_bottom(1,$(window).scrollTop(),20,150);
  					}
  					else{
  						crash(0,$(window).scrollTop(),20,150);
  					}
  					
  				});
  				//
  				if($(window).scrollTop()<=_this.step && _this.upOrDown=='up'){
	            	///////////////////////////
	         	}
	         	else{

	         		$("#guider").animate({"top":tar+(_this.step-$("#guider").height())/2},800,function(){
	         			//var index=Math.floor($("#guider").offset().top/windowHeight);
	         			var index=Math.round(tar/windowHeight);
		        		if(index!=0){
				        	$(".guider_link").removeClass("select");
							$(".guider_link").eq(index).addClass("select");
		       			}
	         		});
	         	}
	        }

	    }
        	
    }
} 

//搭建js与flash互通的环境
function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
         return window[movieName];
     } else {
        return document[movieName];
     }
}

function callExternal(ele_id) {
	if(ele_id=="swftop"){
		var timer = setInterval(function(){
			if(thisMovie(ele_id).PercentLoaded()==100){
				clearInterval(timer);
				thisMovie(ele_id).startPlay();
			}
		},100);
	}else{
		var index= parseInt(ele_id.replace("swf",""))-1;
		if(ifPlayed[index]==0){
			var timer = setInterval(function(){
				if(thisMovie(ele_id).PercentLoaded()==100){
					clearInterval(timer);
						thisMovie(ele_id).startPlay();
						ifPlayed[index] = 1;
				}
			},100);
		}
	}
	
}


function go(){
	location.href = "http://sucaijiayuan.com/";
}
function backToTop(){
		clearTimeDown();
		$(windowobject).animate({"scrollTop":"0px"},2000,function(){

		});
}
function guider_click(index){
	linkToPage(index);
}
function rocketHide(){
}
function refresh(){
	window.location.reload();
}

function linkToPage(index){
	if(!$(windowobject).is(":animated")){
		pingback.getPv(index);
		index = parseInt(index);
		clearTimeDown();
		if(index>0){
			$(".guider_link").removeClass("select");
			$(".guider_link").eq(index).addClass("select");
		}
		if($(".stage").eq(index).offset().top>$("body").scrollTop()){
			$(windowobject).animate({"scrollTop":$(".stage").eq(index).offset().top + "px"},1000,function(){
				crash(0,$(".stage").eq(index).offset().top,20,150);
			});
		}else{
			$(windowobject).animate({"scrollTop":$(".stage").eq(index).offset().top +"px"},1000,function(){
				crash_bottom(1,$(".stage").eq(index).offset().top,20,150);
			});
		}
		if(index!==0){
				var height = $(".stage").eq(index).offset().top +windowHeight/2-$("#guider").height()/2;
				$("#guider").animate({"top":height+20+"px"},1000);
		}
	}
}

function crash_bottom(direction,termin,distant,time){
	if(!stop){
		var scrollTop = $(window).scrollTop();
		if(direction==1){	//向上
			direction = 0;
			$(windowobject).animate({"scrollTop":"+="+distant+"px"},time,function(){
				crash_bottom(direction,termin,distant*0.6,time);
				if(distant<=15||time>150){
					stop=1;//代表开始停止碰撞

					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						//为0代表碰撞结束
						crollNow = termin;
						stop=0;
						setTimeout(function(){
							setTimeDown();
						},500);
					});
				}
			});
		}else if(direction == 0){	//向下
			direction = 1;
			$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
				crash_bottom(direction,termin,distant*0.6,time);
				if(distant<=15||time>150){
					stop=1;
					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						crollNow = termin;
						stop=0;
						setTimeout(function(){
							setTimeDown();
						},500);
					});
				}
			});

		}
	}
}
function crash(direction,termin,distant,time){
	if(!stop){
		var scrollTop = $(window).scrollTop();
		if(direction==0){	//向下
			direction = 1;
			$(windowobject).animate({"scrollTop":"-="+distant+"px"},time,function(){
				crash(direction,termin,distant*0.6,time);
				if(distant<=15||time>150){
					stop=1;
					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						crollNow = termin;
						stop=0;
						setTimeout(function(){
							setTimeDown();
						},100);
					});
				}
			});
		}else if(direction ==1){	//向上
			direction = 0;
			$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
				crash(direction,termin,distant*0.6,time);
				if(distant<=15||time>150){
					stop=1;
					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						crollNow = termin;
						stop=0;
						setTimeout(function(){
							if(!ifbottom){
								followScroll = 1;
								setTimeDown();
							}
						},100);
					});
				}
			});
		}
	}
}
var timeDown;
var intervalDown;
var topwin=1;
function setTimeDown(){
	clearTimeDown();
	timeDown = setTimeout(function(){
		if(!$(windowobject).is(":animated")){
			var index=Math.round($(window).scrollTop()/windowHeight)+1;
			if(index!=6){
				$(windowobject).animate({"scrollTop":"+="+windowHeight+"px"},600,function(){
	    			crash(0,$(window).scrollTop(),20,150);
				});
				var tmpheight=index*windowHeight+(windowHeight-$("#guider").height())/2;
		        $("#guider").animate({"top":tmpheight},800,function(){
		        	var index=Math.floor($("#guider").offset().top/windowHeight);
		        	if(index!=0){
			        	$(".guider_link").removeClass("select");
						$(".guider_link").eq(index).addClass("select");
		       		}
		        });
		     }
		}
	},8000);
}

function clearTimeDown(){
	clearTimeout(timeDown);
}

function signAnimate(){
	var cicleFun=function(name1,name2,name3,shift,interval){
		$(name1).animate({"bottom":"-="+shift+"px"},interval,function(){
			$(name1).hide();
			$(name2).animate({"bottom":"-="+shift+"px"},interval,function(){
				$(name2).hide();
				$(name3).animate({"bottom":"-="+shift+"px"},interval,function(){
					$(name3).hide();
					$(name1).css("bottom","+="+ shift*2+"px").show().animate({"bottom":"-="+shift+"px"},interval,function(){
						$(name2).css("bottom","+="+shift*2+"px").show().animate({"bottom":"-="+shift+"px"},interval,function(){
							$(name3).css("bottom","+="+shift*2+"px").show().animate({"bottom":"-="+shift+"px"},interval,function(){
								setTimeout(function(){cicleFun(name1,name2,name3,shift,interval)},1500);
								
							});
						});
					});
				});
			});
		});
	}
	cicleFun("#sign1_1","#sign2_1","#sign3_1",30,200);
	cicleFun("#sign1_2","#sign2_2","#sign3_2",30,200);
	cicleFun("#sign1_plus","#sign2_plus","#sign3_plus",30,200);
	cicleFun("#sign1_3","#sign2_3","#sign3_3",30,200);
	cicleFun("#sign1_4","#sign2_4","#sign3_4",30,200);

}


$(document).ready(function(){

	pingback = new PingbackApp();
	pingback.getPv(0);
	setTimeDown();
	callExternal("swf1");    
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if(is_chrome){
		//判断是chrome、搜狗chrome内核, 供scrollTop兼容性使用
		windowobject ="body";
	}else{
		//支持ie和ff
		windowobject ="html";
	}
	$(".index_link").click(function(){
		$(".guider_link").removeClass("select");
		var index = parseInt($(this).attr("index"));
		$(".index_link").eq(index).addClass("select");
		linkToPage(index);
	});
	$(".guider_link").click(function(){
		var index= $(this).index();
		linkToPage(index);
	});

	//当前窗口大小
	windowHeight = document.documentElement.clientHeight;

	$(".stage").css("height",windowHeight);
	$(".stage_box").css("top",(windowHeight-580)/2+"px");
	$("#guider").css("top",$("body").height()-windowHeight/2-$("#guider").height()/2);

	var opt = {step:windowHeight,f:1};
	var div = document.body;
	new SmoothScroll(div,opt); 

	//窗口大小变化时，触发每个屏幕大小变化
	var resizeHandler=function(){
		$("body").stop(true,true);
		//阻止碰撞
		stop=1;
		clearTimeDown();
		windowHeight = document.documentElement.clientHeight;

		$(".stage").css("height",windowHeight);
		$(".stage_box").css("top",(windowHeight-580)/2+"px");
		$("#guider").css("top",$("body").height()-windowHeight/2-$("#guider").height()/2);
		var opt = {step:windowHeight,f:1};
		var div = document.body;
		new SmoothScroll(div,opt);
		var index=Math.floor($(window).scrollTop()/windowHeight);
		$(windowobject).animate({"scrollTop":index*windowHeight+"px"});
		if(index!=0){
			var tmpheight=index*windowHeight+(windowHeight-$("#guider").height())/2;
			$("#guider").animate({"top":tmpheight},0,function(){
	        	$(".guider_link").removeClass("select");
				$(".guider_link").eq(index).addClass("select");
			});
		}
		//300毫秒后执行stop=0,目的是保证ie下crash函数（也是timer）执行完。
		setTimeout(function(){
			stop=0;
		},300);
	}
	$(window).resize(function(){
		//bugfix ie内核只有在定时器触发这个函数才能正确执行
		setTimeout(resizeHandler,10);
	});

	//往下翻页的函数
	signAnimate();

	//浏览器图标的旋转动画
	var rotateTimer;
	$("#guider_link1").hover(
		function(){
			var angle = 0;
			clearInterval(rotateTimer);
			rotateTimer=setInterval(function(){
		    	angle+=20;
		    	$("#logo").rotate(angle);
			},50);
		},
		function(){
			$("#logo").rotate(0);
			clearInterval(rotateTimer);
		}
	);

	$(windowobject).animate({"scrollTop":"0px"});

	//去掉鼠标中键的点击事件,否则由此产生的向上滚动和向下滚动将不受控制
	function stopDefaultAndBubble(e) {
		e = e || window.event;
		// Stops the Default Browser Action
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
		
		//Stops the event bubbling up to the body element
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.cancelBubble = true;
	}

	$(document).bind('mousedown', function(e) { 
		//mouse middle button
	   if( (e.which == 2) ) {
		   stopDefaultAndBubble(e);
		   //bugfix 搜狗浏览器的ie内核只有在定时器触发这个函数才生效。。
		   setTimeout(function(){
		   		stopDefaultAndBubble(e);
		   },10);
		}
	 	
	   
	})

});


function getCookie1(offset) { var endstr = document.cookie.indexOf (";", offset);if (endstr == -1) endstr = document.cookie.length; return unescape(document.cookie.substring(offset, endstr)); }
function getCookie2(name) { var arg = name + "="; var alen = arg.length; var clen = document.cookie.length; var i = 0; while (i < clen) { var j = i + alen; if (document.cookie.substring(i, j) == arg) return getCookie1(j); i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break; } return null; }
function setCookie(name, value, exptime, domain){ var domain = domain ? domain : "ie.sogou.com"; var exp  = new Date(); exp.setTime(exp.getTime() + exptime); document.cookie = name + "=" + value + ";path=/;expires=" + exp.toGMTString() + ";domain=" + domain + ";"; }
var PingbackApp = function(){
	var pingServerUrl = "http://sucaijiayuan.com/";
	var n = new Date().getTime();
	var c = escape(n*1000+Math.round(Math.random()*1000));
	this.getUid = function(){
		var uid = "";
		if(getCookie2("SMYUV") != null) {
			uid = getCookie2("SMYUV");
		} else {
			uid = c;
			setCookie("SMYUV", uid, 2592000000, "sogou.com");
		}
		return uid;
	}	
	this.getYYID = function(){
		var yyid = "";
		if(getCookie2("YYID") != null) {
			yyid = getCookie2("YYID");
		} else {
			yyid = "";	
		}
		return yyid;
	}	

	this.refurl = document.referrer == ""? "" : encodeURIComponent(document.referrer);

	//pl(page location)
	this.pl = encodeURIComponent(window.location.href);

	var u = this.getUid();

	this.getPv = function(index){
		var pvImg =document.createElement('img');
		pvImg.src = pingServerUrl + "pv.GIF?t="+c+"&u="+ u +"&r="+this.refurl+"&pl="+this.pl+"&page="+index;
	}
	this.refresh = function(){
		var pvImg =document.createElement('img');
		pvImg.src = pingServerUrl + "pv.GIF?t="+c+"&u="+ u +"&r="+this.refurl+"&pl="+this.pl+"&type=refresh";
	}


}

//png透明处理
if (!window.XMLHttpRequest) {
	window.attachEvent("onload", enableAlphaImages);
}

function enableAlphaImages(){
	for (var i=0; i<document.all.length; i++){
			var obj = document.all[i];
			var bg = obj.currentStyle.backgroundImage;
			var img = document.images[i];
			if (bg && bg.match(/\.png/i) != null) {
				var img = bg.substring(5,bg.length-2);
				var offset = obj.style["background-position"];
				obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+img+"', sizingMethod='crop')";
				obj.style.background = "none";
		} else if (img && img.src.match(/\.png$/i) != null) {
			var src = img.src;
			img.style.width = img.width + "px";
			img.style.height = img.height + "px";
			img.style.filter ="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='crop')"
			img.src = "../images/features4.2preview/pixel.gif";
		}
	}
}
/*www.jq22.com*/
