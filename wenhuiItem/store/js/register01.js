(function () {
    var registerView={
        init: function () {
            this.event();
        },
        event: function () {
            $(document).keydown(function () {
                var phone=$("#phone").val();
                var regPho=/^[1]\d{10}$/;
                var password=$("#password").val();
                var verifyCode=$("#verifyCode").val();
                var data={
                    phone:phone,
                    password:password,
                    verifyCode:verifyCode
                };
                if(event.keyCode==13){
                    if(regPho.test(phone)==false){
                        alert("手机号码格式错误");
                        return false;
                    }
                    else if(password.length<6||password.length>16){
                        alert("密码长度为6-16位");
                        return false;
                    }
                    ab.ajax("register",data, function (res) {
                        alert(res.resMsg);
                        location.href="login.html";
                    });

                }
            });
            //点击"注册"
            $("#submit").on("click", function () {
                var phone=$("#phone").val();
                var regPho=/^[1]\d{10}$/;
                var password=$("#password").val();
                var verifyCode=$("#verifyCode").val();
                var data={
                    phone:phone,
                    password:password,
                    verifyCode:verifyCode
                };
                if(regPho.test(phone)==false){
                    alert("手机号码格式错误");
                    return false;
                }
                else if(password.length<6||password.length>16){
                    alert("密码长度为6-16位");
                    return false;
                }
                ab.ajax("register",data, function (res) {
                    alert(res.resMsg);
                    location.href="login.html";
                })
            });
            //60s倒计时
            $(".codebtn").click(function (){
                var T=59;
                var a=setInterval(function () {
                    $(".codebtn").attr("disabled",true).val(T+"秒后重新发送");
                    if(T>=0){
                        T--;
                    }
                    else{
                        $(".codebtn").val("重新获取验证码").removeAttr("disabled");
                        clearInterval(a);
                    }
                },1000);
            });
        }
/*        query: function (data) {
/!*            var phone=$("#phone").val();
            var password=$("#password").val();
            var verifyCode=$("#verifyCode").val();
            var data={
                phone:phone,
                password:password,
                verifyCode:verifyCode
            };*!/
            $.ajax({
                url:"http://192.168.2.141:3000/register",
                data:data,
                type:"post",
                dataType:"json",
                success: function (res) {
                    if(res.resCode=="000"){
                        alert("注册成功!");
                        location.href="login.html";
                    }
                    else{
                        alert(res.resMsg);
                    }
                },error: function () {
                    alert("网络异常");
                }
            });
        }*/
    };
    registerView.init();

})();

/*$(function(){
    $(".codebtn").click(function () {
        var a=setInterval(count,1000);
        var T=59;
        function count(){
            $(".codebtn").attr("disabled",true).val(T+"秒后重新发送");
            //$(".codebtn").val(T+"秒后重新发送");
            if(T>=0){
                T--;
            }
            else{
                $(".codebtn").val("重新获取验证码").removeAttr("disabled");
                clearInterval(a);
            }
        }
    });
});*/
