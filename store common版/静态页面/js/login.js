(function(){
    var login={
        init:function(){
            //我在上个页面设置了本地存储手机号,在这个页面拿出了,渲染到手机号上.
            var sessionId=sessionStorage.getItem('sessionId')||"";
            login.render(sessionId);
            login.bind();
        },
        render:function(usernameOuter){
            $("#user-name").val(usernameOuter);
            if( $("#user-name").val()){
                //判断有值的时候,打钩.
                $('#checkbox').attr('checked','checked');
            }
        },
        bind:function(){
            $("#submit").on("click",function(){
                //获取val的值
                var user_name=$("#user-name").val(),
                    psw=$('#password').val(),
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
                var data={userName:user_name};
                common.ajaxCommon("login",data,function(res){
                    console.log(res);   //这个res是返回后台的东西,而上面的data是传东西给后台.
                    //成功后的函数执行
                    if(res.resCode=="000"){
                        //判断用户名有没有打钩
                        if($('#checkbox').is(':checked')==true){
                            console.log(data);
                            sessionStorage.setItem('sessionId',user_name);
                        }else{
                            sessionStorage.removeItem('sessionId');
                            alert("最好选择记住用户名")
                        }
                        //把这个跳转页面放在if判断的下面,这样无论打钩没有都会跳转页面.
                        location.href='index.html';
                    }
                })
            })

        }
    };
    login.init();
})();