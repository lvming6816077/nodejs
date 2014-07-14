$(function(){
	$("#regSubmit").click(function(){
		var username = $(".register-form .username").val();
		var password = $(".register-form .confirm-password").val();
		$.ajax({
	        type : "POST",
	        url : "/register",
	        dataType : "json",
	        data:{username : username, password : password},
	        success : function(result){
	            if (result.message === "OK") {
	                alert(result);
	            } else {
	                alert("error");
	            }
	        },
	        error : function(){
	            alert("error");
	        }
	    });
	});
	var rectNum = 15;
	var count = 5; //每行显示的个数
	var div = "<div class='chil'>append</div>";
	var container = "<div class='container2'></div>";
	$("body").append(container);
	for (var i = 0 ; i < rectNum/count ; i++) {
		var divWrap = "<div class='wrap wrap"+i+"'></div>";
		$(".container2").append(divWrap);
		for (var j = 0 ; j < count ; j++) {
			$(".wrap"+i+"").append(div);
		}
		//console.log()
		
	}
	$(".chil").click(function(){
		if (!$(this).find("input").length) {
			$(this).append("<input/>"); //控制职能添加一个input
		}
		
	});
})