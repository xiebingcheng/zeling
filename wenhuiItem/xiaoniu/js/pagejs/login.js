(function(){
    var loginView={
        init: function () {
            this.initVm();
        },
        initVm: function () {
            this.vm=avalon.define({
                $id:"root",
                phone:$("#username").val(),
                password:$("#password").val(),
                code:$("#code").val(),
                next: $.proxy(this.next,this)
            });
        },
        next: function () {
            var data={
                phone:this.vm.phone,
                password:this.vm.password,
                veryCode:this.vm.code
            };
            common.ajax("xiaoniu_login.php",data,function(res){
                if(res.resCode=="000"){
                    alert(res.resMsg);
                    location.href="index.html";
                }
                else{
                    alert(res.resMsg);
                }
            });
        }
    };
    loginView.init();
})();
