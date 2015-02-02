jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	}); 

	// Menu	
	$('#header .nav-button').on('click',function(){
		$('#navigation').fadeIn();
	});

	$('#hidemenu').on('click', function(){
		$('#navigation').fadeOut();
	});

	$('.main-nav ul li a').on('click', function(){
		$('#navigation').fadeOut();
	});

	var slider = $('#page-slider .carousel-inner').find('.item');
	$('#page-slider').on('slid.bs.carousel', function () {
		var curIndex 	= slider.filter('.active').index();
		var menuItems 	= $('.main-nav ul').find('li');
		menuItems.removeClass('active').eq(curIndex).addClass('active');
	});




	//Contact Form
	var form = $('#contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('.form-status');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form_status.find('.form-status-content').html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn();
			}
		}).done(function(data){
			form_status.find('.form-status-content').html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});


	/*单词鼠标移动效果*/
	$('.question-option-list').mouseover(function (){
		$(this).addClass('checkon')
	}).mouseout(function (){
		$(this).removeClass('checkon')
	}).click(function (){
		$(this).addClass('check').siblings().removeClass('check');
	});


	function index(){
		return arguments[0].indexOf(arguments[1]);
	};

	function cutstr(arr){
		var teamA=index(arr,'(A)');
		var teamB=index(arr,'(B)');
		var teamC=index(arr,'(C)');
		var teamD=index(arr,'(D)');
		var que=arr.slice(0,teamA);
		var strA=arr.slice(teamA,teamB);
		var strB=arr.slice(teamB,teamC);
		var strC=arr.slice(teamC,teamD);
		var strD=arr.slice(teamD);
		return arrstr=[que,strA,strB,strC,strD];
	}


	window.onload=fun();


	function fun(){
		$.get("action.php",{action:"getquestion"},function (response,status,xhr){
			var str=response[1];
			var queid=response[0];console.log('queid---------'+queid);
			var row=cutstr(str);
			var option=$('.option-content');
			var question=row[0];
			$('.question-content')[0].innerHTML=question;
			for(i=0;i<option.length;i++){
				var result=row[i+1].slice(4);
				option[i].innerHTML= result;
			}
			$('#goto').data("queid",queid);
			// document.getElementById('goto').setAttribute('data-queid',queid);
			// console.log(text);

		},"json");
	}

	



	$('#goto').on('click',function dati(){
		var seltectHtml=$('.check').data("value");
		var id=$('#goto').data("queid");console.log('getid---------'+id);
		if(seltectHtml=='A'||seltectHtml=='B'||seltectHtml=='C'||seltectHtml=='D'){
			$.get("action.php",{action:"dati",id:id,select:seltectHtml},function (response,status,xhr){
				if(response=='true'){
					alert('恭喜你答对了，再接再厉');
					document.getElementById('goto').setAttribute('data-queid',' ');
					fun();
					$('.question-option-list').removeClass('check');

				}
				else{
					alert('不小心答错了，请继续努力哦');
					// $('.question-option-list').removeClass('check');
					// fun();
				}
				// console.log(response);
			});
		}else{
			alert('你还没有选择答案哦')
		}

		
	})



	/*修改换页的标志在手机端样式*/
	$('.welcome-page-left,.welcome-page-right').mouseover(function (){
		$(this).css('opacity','0.9');
	});

	if($(window).width()>970){
		$('.welcome-page-left,.welcome-page-right').css('font-size','57px');
	}else if($(window).width()>750){
		$('.welcome-page-left,.welcome-page-right').css('font-size','40px');
	}else{
		$('.welcome-page-left').css('left','2px');
		$('.welcome-page-right').css('right','2px');

	}






});