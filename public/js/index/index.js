$(function(){
	$("#regSubmit").click(function(){
		var username = $(".register-form .username").val();
		var password = $(".register-form .password").val();
		var comfirm_password = $(".register-form .confirm-password").val();
		if (password != comfirm_password) {
			alert('Password and confirm-password are not same!');
			return;
		}
		$.ajax({
	        type : "POST",
	        url : "/register",
	        data:{username : username, password : password},
	        success : function(result){
	            if (result.message === "OK") {
	                alert("register success");
	            } else {
	                alert(result.data.message);
	            }
	        },
	        error : function(){
	            alert("error");
	        }
	    });
	});
	$("#login").click(function(){
		var username = $(".login-form .username").val();
		var password = $(".login-form .password").val();
		
		$.ajax({
	        type : "POST",
	        url : "/login",
	        data:{username : username, password : password},
	        success : function(result){
	            if (result.message === "OK") {
	                alert("login success");
	            } else {
	                alert(result.data.message);
	            }
	        },
	        error : function(){
	            alert("error");
	        }
	    });
	});
})