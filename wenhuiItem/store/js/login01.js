(function () {
    var loginView={
        init: function () {
            var userInfo=ab.getData("userInfo");
            //如果userInfo不为空,则获取输入的用户名和密码
            if(userInfo){
                var userName=$("#user-name").val(userInfo.userName);
                var password=$("#password").val(userInfo.password);
            }
            this.event();
        },
        event: function () {
            var self=this;
            $(document).keydown(function () {
                var userName=$("#user-name").val();
                var regUN=/^[1]\d{10}$/;
                var password=$("#password").val();
                var data={
                    userName:userName,
                    password:password
                };
                if(event.keyCode==13){
                    var check=$("#checkbox").is(":checked");
                    if(check){
                        ab.setData("userInfo",data);
                    }

                    if(regUN.test(userName)==false){
                        alert("用户名错误");
                        return false;
                    }
                    else if(password.length<6||password.length>16){
                        alert("密码长度为6-16位");
                        return false;
                    }
                    //self.query(data);
                    ab.ajax("login",data, function (res) {
                        //alert(res.resMsg);
                        //alert(res.sessionId);
                        ab.setData("abc",res.sessionId);
                        location.href="home.html";
                    })
                }
            }),
            $("#submit").on("click", function () {
                var userName=$("#user-name").val();
                var regUN=/^[1]\d{10}$/;
                var password=$("#password").val();
                var data={
                    userName:userName,
                    password:password
                };
                var check=$("#checkbox").is(":checked");
                if(check){
                    ab.setData("userInfo",data);
                }
                if(regUN.test(userName)==false){
                    alert("用户名错误");
                    return false;
                }
                else if(password.length<6||password.length>16){
                    alert("密码长度为6-16位");
                    return false;
                }
                //self.query(data);
                ab.ajax("login",data, function (res) {
                    alert(res.resMsg);
                    alert(res.sessionId);
                    ab.setData("abc",res.sessionId);
                    location.href="home.html";
                })
            });
        }

       /* query: function (data) {
            $.ajax({
                url:"http://192.168.2.141:3000/login",
                type:"post",
                data:data,
                dataType:"json",
                success: function (res) {
                    if(res.resCode=="000"){
                        alert("登录成功!");
                        location.href="home.html";
                    }
                    else{
                        alert("未找到数据");
                    }
                },error: function () {
                    alert("网络异常");
                }
            });
        }*/
    };
    loginView.init();
})();
