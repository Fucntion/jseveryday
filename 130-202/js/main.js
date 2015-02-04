jQuery(function($) {




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

	



	// $('#goto').on('click',function dati(){
	// 	var seltectHtml=$('.check').data("value");
	// 	var id=$('#goto').data("queid");console.log('getid---------'+id);
	// 	if(seltectHtml=='A'||seltectHtml=='B'||seltectHtml=='C'||seltectHtml=='D'){
	// 		$.get("action.php",{action:"dati",id:id,select:seltectHtml},function (response,status,xhr){
	// 			if(response=='true'){
	// 				alert('恭喜你答对了，再接再厉');
	// 				document.getElementById('goto').setAttribute('data-queid',' ');
	// 				fun();
	// 				$('.question-option-list').removeClass('check');

	// 			}
	// 			else{
	// 				alert('不小心答错了，请继续努力哦');
	// 				// $('.question-option-list').removeClass('check');
	// 				// fun();
	// 			}
	// 			// console.log(response);
	// 		});
	// 	}else{
	// 		alert('你还没有选择答案哦')
	// 	}

		
	// })






});