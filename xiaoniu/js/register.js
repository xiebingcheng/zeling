(function () {
    var register_xiaoniu = {
        init: function () {
            this.vm = avalon.define({
                $id: 'register',
                phone: '',
                codeImg: '',
                //检测手机号码
                next: $.proxy(this.next, this)
            });

            //avalon.scan();
        },

        next: function () {
            //获取本地存储的手机号
            var mob_phone = this.vm.phone,
                verification_code= this.vm.codeImg,
                //正则验证
                phone_reg = /^1[34578]\d{9}$/,
                verification_codeReg = /^[0-9]{6}$/;
            if(mob_phone==""){
                alert('请输入手机号');
                return false;
            }else if(phone_reg.test(mob_phone)==false){
                alert("手机号有误!");
                return false;
            }else if(verification_code==""){
                alert("请打开手机,查看验证码,并且输入验证码!");
                return false;
            }else if(verification_codeReg.test(verification_code)==false){
                alert("请认真看手机的验证码,并且输入真实的验证码!");
                return false;
            }else {
                var data={
                    phone:this.vm.phone        //象征性的传入一个对象,里面是本地手机号码.
                };
                console.log(data);
                common.ajaxCommon('xiaoniu_buy_submit.json',data,function(res){
                    console.log(data);
                    console.log(res);
                    location.href='login.html'
                });

            }

        }
    };
    register_xiaoniu.init();
})();
