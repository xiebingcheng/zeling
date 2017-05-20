(function () {
    var registerIndex={
        init: function () {
            this.initVm();
        },
        initVm: function () {
            this.vm=avalon.define({//viewmodle:视图模块
                $id:"root",
                //phone:"15013795539",
                phone:$("#mobile").val(),//获取输入的手机号码
                //检查手机号
                next: $.proxy(this.next,this)
            });
        },

        next: function () {
            var ph=this.vm.phone;
            var data={
                phone:ph
            };
            var reg=/^1[3|5]{1}[0-9]{1}[0-9]{8}$/;
            if(reg.test(ph)){
                common.setData("phone",this.vm.phone);
                common.ajax("xiaoniu_checkPhone.php",data,function(res){
                    if(res.resCode=="001"){
                        alert(res.resMsg);
                    }
                    else{
                        location.href="register-submit.html";
                    }
                })
            }
            else{
                alert("请输入正确的手机号码");
            }

        }
    };
    registerIndex.init();
})();
