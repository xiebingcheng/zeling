(function(){
    var registerSubmit={
        init: function () {
            this.initVm();
        },
        initVm: function () {
            var phone=common.getData("phone");
            this.vm=avalon.define({
                $id:"root",
                phone:phone,
                password:$("#password").val(),
                realName:$("#realName").val(),
                next: $.proxy(this.next,this)
            });
        },
        next: function () {
            var data={
                phone:this.vm.phone,
                password:this.vm.password,
                realName:this.vm.realName,
                recomender:"",
                userName:""
            };
            common.setData("password",this.vm.password);
            common.ajax("xiaoniu_register_submit.php",data,function(res){
                if(res.resCode=="000"){
                    alert(res.resMsg);
                    location.href="register-result.html";
                }
                else{
                    alert(res.resMsg);
                }
            });
        }
    };
    registerSubmit.init();
})();
