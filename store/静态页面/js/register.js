(function(){
    var register={
        //初始化页面一下
        init:function(){
           register.bind();


        },
        //添加事件
        bind:function(){

            //防止重复点击
            var isClick=false;
            $(".codebtn").on("click",function(){
                //防止重复点击 判断  这个防止重复点击的方法是这样阻止重复点击的,
                //利用浏览器从上往下加载,然后当第一次点击的时候,因为已经定义是false,
                //所以判断可以通过,
                if(isClick==true) return;
                //然后到了这一步,定义一个全局定量定义为true,这时,当再一次点击的时候,到了
                //上面的判断,就return了,然后,就到不了下一步,重新刷新倒计时的函数了,
                //到了,倒计时函数要重新加载时,在设置一个全局变量为false,所以又可以继续点击事件了
                isClick=true;
                //默认倒计时从60秒开始
                var count_down =60;
               var timer= setInterval(function(){
                    if(count_down<=0){
                        $(".codebtn").val('重新获取验证码');
                        clearInterval(timer);
                        isClick = false;   //这一步是为了阻止重复点击,设置的全局变量,为了就是当浏览器从上往下加载,到这一步,可以继续上面的判断通过,继续点击事件
                    }else{
                    $('.codebtn').val(count_down-- + '秒可重新获取');
                    }
                },1000);
            });
            $(".submit").on("click",function(a){
                //获取3个框的val
                var phone=$("#phone").val(),
                     password=$("#password").val(),
                     verification_code=$("#verification-code").val(),

                    //手机号码的正则
                     Mobile_phoneReg=/^1[34578]\d{9}$/,
                    //密码的正则
                     pswReg=/^\w{6,18}$/,
                    //验证码的正则
                     verification_codeReg=/^[0-9]{4}$/;

                if(phone==""){
                    alert("手机号不能不填!");
                    return false;
                }if(Mobile_phoneReg.test(phone)==false){
                    alert("手机号码格式有误");
                    return false;
                }if(password==""){
                    alert("密码不能不填!");
                    return false;
                }if(pswReg.test(password)==false){
                    alert("你输入的密码格式不正确");
                    return false;
                }if(verification_code==""){
                    alert("验证码不能不填!");
                    return false;
                }if(verification_codeReg.test(verification_code)==false){
                    alert("验证码只能是数字");
                    return false;
                }if($(".checkbox").attr('checked')==false){
                    alert("请同意服务条款!");
                    return false;
                }
                register.ajax(phone,password,verification_code);
            });


        },
        ajax:function(num,psw,code){
            console.log(num,psw,code);// 我分别传了手机号码,密码,验证码过来后台,虽然后台只做了用户名.
            $.ajax({
                url:"http://192.168.7.150:3000/register",
                data:{phone:num,password:psw,code:code},
                type:"post",
                dataType:'json',
                success:function(res){
                    console.log(res);
                    if(res.resCode == '000'){
                        alert("恭喜你,注册成功!");

                        location.href = 'login.html';
                    }else{
                        alert("注册失败!")
                    }
                },
                error:function(){
                  alert("网络貌似有异常!")
                }

            })
        }
    };
    register.init();
})();


