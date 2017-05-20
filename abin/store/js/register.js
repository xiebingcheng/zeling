

$('.submit').on('click',function(){
	// 获取页面上input的手机号
	var username = $('#username').val();
	// 获取页面上input的密码
	var password = $('#password').val();
	// 获取页面上input的验证码
	var code = $('#code').val();


	// 手机号的正则
	var usernameReg = /^1[34578]\d{9}$/;
	// 密码的正则
	var passwordReg = /^\w{6,18}$/;
	if($('.checkbox').is(':checked') == false){
		alert('请阅读并同意<<接受用户协议>>');
	} else if(username == ''){
		alert('请输入手机号码！');
	} else if(usernameReg.test(username) == false){
		alert('请输入正确的手机号码！');
	} else if (password == ''){
		alert('请输入密码！');
	} else if(passwordReg.test(password) == false){
		alert('请输入正确的密码！');
	} else if(code == ''){
		alert('请输入验证码！');
	} else if(code.length != 6){
		alert('请输入正确的验证码！');
	} else {
		$.ajax({
			url:'http://192.168.7.150:3000/register',
			data:{phone: username,password:password,code:code},
			type:'post',
			dataType:'json',
			success:function(res){
				if(res.resCode == '000'){
					alert('注册成功！');
				}
			}
		});
	}
});

// 防重复点击
var isClick = false;
$('.codebtn').on('click',function(){

if(isClick == false) {
		isClick = true;
		// 默认倒计时60s
		var second = 10;
		var timer = setInterval(function(){
			if(second <=0){
				$('.codebtn').val('重新获取验证码');
				clearInterval(timer);
				isClick = false;
			} else {
				$('.codebtn').val(second-- + '秒可重新获取');
			}
		},1000);
}
});