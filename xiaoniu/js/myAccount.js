(function(){
    var myAccount={
        init:function(){
            this.vm=avalon.define({
                $id:'root',
                phone:'',
                password:'',
                realName:'',
                tradePassword:''
                //在这里调用的是动态的事件.
               /* ajax:function(){
                  myAccount.ajax();
                }*/
               // ajax: $.proxy(this.ajax,this)

            });
            avalon.scan();
            myAccount.ajax();
        },
        //查询列表
        ajax:function(res){
          /*  var data={};
            common.ajaxCommon('xiaoniu_myAccount.json',data,function(data){
                console.log(data);
                self.vm.phone=data.phone;
                self.vm.password=data.password;
                self.vm.realName=data. realName;
                self.vm.tradePassword=data.tradePassword;
                myAccount.Rendu(data);
            });*/
            var self=this;
            //调用本地json文件,不用ajax的方法.
            $.getJSON('json/xiaoniu_myAccount.json').done(function(data){
             console.log(data);
             self.vm.phone=data.phone;
             self.vm.password=data.password;
             self.vm.realName=data. realName;
             self.vm.tradePassword=data.tradePassword;
             myAccount.Rendu(data);
             })
        },
        //渲染事件
        Rendu:function(res){
            console.log(res);

        }
    };
    myAccount.init();
})();