(function(){
    var login={
        //初始化页面
        init:function(){
            var usernameOuter=localStorage.getItem('sessionId')||"";
           login.render(usernameOuter);
        },
        //渲染事件
        render:function(usernameOuter){
            $("#user-name").val(usernameOuter);
            if($("#user-name").val()){
                $('#checkbox').attr('checked','checked');
            }
            login.bind();
        },
        //添加事件
        bind:function(){
            $("#submit").on("click",function(){
                //获取val值
                var user_name=$("#user-name").val(),
                    psw=$("#password").val(),

                //正则表达式
                    user_nameReg=/^1[0-9]{10}$/,
                    pswReg=/^\w{6,18}$/;
                if(user_name==""){
                    alert("用户名不能为空,实在不懂就瞎编一个用户名");
                    return false;
                }if(user_nameReg.test(user_name)==false){
                    alert("用户名格式不正确");
                    return false;
                }if(psw==""){
                    alert("忘记密码,请拨打客服找回!");
                    return false;
                }if(pswReg.test(psw)==false){
                    alert("密码格式不正确");
                    return false;
                }
                login.ajax(user_name);
            })
        },
        ajax:function(data){
            console.log(data);   //想知道传了什么在里面.
            $.ajax({
                url:'http://192.168.7.150:3000/login',
                data:{userName:data},
                type:'post',
                dataType:'json',
                success:function(res){
                    console.log(res);   //这个res是返回后台的东西,而上面的data是传东西给后台.
                        //成功后的函数执行
                    if(res.resCode=="000"){
                        //判断用户名有没有打钩
                        if($('#checkbox').is(':checked')==true){
                            console.log(data);
                            localStorage.setItem('username',data);
                        }else{
                            localStorage.removeItem('username');
                            alert("最好选择记住用户名")
                        }
                        //把这个跳转页面放在if判断的下面,这样无论打钩没有都会跳转页面.
                        location.href='index.html';
                    }

                },
                error:function(){
                    alert("网络貌似出问题了!");
                }
            })
        }
    };
login.init();
})();