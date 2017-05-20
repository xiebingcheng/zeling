

var model = {
	init:function(){
		this.queryData();
	},
	queryData:function(){
		var usernameOuter = localStorage.getItem('username') || '';
		this.render(usernameOuter);
	},
	render:function(usernameOuter){
		$('#user-name').val(usernameOuter);
		if($('#user-name').val()){
			$('#checkbox').attr('checked','checked');
		}
		this.bindEvent();
	},
	bindEvent:function(){
		$('#submit').on('click',function(){
	// 获取页面上input的手机号
	var username = $('#user-name').val();
	// 获取页面上input的密码
	var password = $('#password').val();
	// 手机号的正则
	var usernameReg = /^1[34578]\d{9}$/;
	// 密码的正则
	var passwordReg = /^\w{6,18}$/;
	if(username == ''){
		alert('请输入手机号码！');
	} else if(usernameReg.test(username) == false){
		alert('请输入正确的手机号码！');
	} else if (password == ''){
		alert('请输入密码！');
	} else if(passwordReg.test(password) == false){
		alert('请输入正确的密码！');
	} else {
		$.ajax({
			url:'http://192.168.7.150:3000/login',
			data:{userName: username,password:password},
			type:'post',
			dataType:'json',
			success:function(res){
				if(res.resCode === "000"){
					if($('#checkbox').is(':checked')==true){
					localStorage.setItem('username',username);
					} else {
					localStorage.removeItem('username');
					}
					alert('登录成功!');
					localStorage.setItem('sessionId',username);
					location.href = 'index.html';
				} else {
					alert(res.resMsg);
				}
				
			}
		});
	}
});
	}
};

model.init();

