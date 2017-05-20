(function(){
    var ttnPay={
        init:function(){
            this.vm=avalon.define({
                $id:'root',
                availableBalance:'余额',
                canBuy:'本次购买金额',
                incomeDate:'日期',
                limitAmount:''
            });
        ttnPay.query();
        },
        query:function(){
            var self=this,
             data={};
            common.ajaxCommon('xiaoniu_buy_before.json',data,function(res){
                console.log(res);
                self.vm.availableBalance=res.availableBalance;
                self.vm.canBuy=res.canBuy;
                self.vm.incomeDate=res.incomeDate;
                self.vm.limitAmount=res.limitAmount;
            })
        }
    };
    ttnPay.init();
})();