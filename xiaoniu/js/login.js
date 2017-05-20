(function(){
    var login={
        init:function(){
            this.vm=avalon.define({
                $id:'root',
                phone:'',
                pws:'',
                next:function(){
                    login.next();
                }
               // next: $.proxy(this.next, this)   用上面的调用方法或者下面的调用方法都可以.
            });

        },
        next:function(){
            var phone=this.vm.phone,
                pws=this.vm.pws,
                phone_reg=/^1[34578]\d{9}$/,
                pws_reg=/^[0-9]{6}$/;
            if(phone==""){
                alert('请输入手机号');
                return false;
            }else if(phone_reg.test(phone)==false){
                alert('请输入正确的手机号');
                return false;
            }else if(pws==""){
                alert('密码不能为空!');
                return false;
            }else if(pws_reg.test(pws)==false){
                alert("密码是6位的数字!");
                return false;
            }else{
                var data={
                    phone:this.vm.phone,
                    pws:this.vm.pws
                };
                common.ajaxCommon("xiaoniu_buy_submit.json",data,function(res){
                    console.log(data);
                    console.log(res);
                    //location.href='home.html'
                })
            }
        }
    };
    login.init();
})();