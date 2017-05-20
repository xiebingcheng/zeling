(function(){
    var myAccount={
        init: function () {
          this.initVm();
        },
        initVm: function () {
            this.vm=avalon.define({
                $id:"root",
                out: $.proxy(this.out,this)
            })
        },
        out: function () {
            var data={};
            common.ajax("xiaoniu_logout.php",data,function(res){
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
    myAccount.init();
})();
