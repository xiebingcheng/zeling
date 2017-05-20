(function () {
    var register = {
        init: function () {
            register.bind();
        },
        //绑定事件
        bind: function () {
            //防重复点击
            var isClick = false;
            $(".codebtn").on('click', function () {
                if (isClick == true) return;
                isClick = true;
                //倒计时
                var count_down = 60;
                var timer = setInterval(function () {
                    if (count_down <= 0) {
                        $(".codebtn").val('重新获取验证码');
                        clearInterval(timer);
                        isClick = false;
                    } else {
                        $('.codebtn').val(count_down-- + '秒可以重新获取');
                    }
                }, 1000);
            });
            $(".submit").on('click', function () {
                var phone = $("#phone").val(),
                    password = $("#password").val(),
                    verification_code = $('#verification-code').val(),
                //正则表达式
                    mobile_phoneReg = /^1[34578]\d{9}$/,
                    pswReg = /^\w{6,18}$/,
                    verification_codeReg = /^[0-9]{4}$/;

                if (phone == "") {
                    alert("手机号不能不填!");
                    return false;
                }
                if (mobile_phoneReg.test(phone) == false) {
                    alert("手机号码格式有误");
                    return false;
                }
                if (password == "") {
                    alert("密码不能不填!");
                    return false;
                }
                if (pswReg.test(password) == false) {
                    alert("你输入的密码格式不正确!");
                    return false;
                }
                if (verification_code == "") {
                    alert("验证码不能不填!");
                    return false;
                }
                if (verification_codeReg.test(verification_code) == false) {
                    alert("验证码只能是数字!");
                    return false;
                }
                if ($(".checkbox").attr('checked') == false) {
                    alert("请同意服务条款!");
                    return false;
                }

                var data = {phone: phone, password: password, code: verification_code};
                common.ajaxCommon('register', data, function (res) {
                    if (res.resCode == '000') {
                        alert('恭喜你,注册成功!');
                        sessionStorage.setItem("sessionId", phone);
                        location.href = 'login.html';
                    } else {
                        alert("注册失败,请重新输入!")
                    }
                })
            })
        }
    };
    register.init();
})();