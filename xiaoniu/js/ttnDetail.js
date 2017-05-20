(function(){
    var ttnDetail={
        init:function(){
            this.vm=avalon.define({
                $id:'root',
                yieldList:[],
                test:'',
                prdName1:'',
                prdName:'',
                yield:'',
                investRange:'',
                term:'',
                startAmount:'',
                annualYield:'',
                assetSize:'',
                buyLimit:'',
                extractCost:'',
                buyCost:'',
                remainAmount:'',
                extremeIncome:''

            });
            //avalon.scan();
            ttnDetail.ajax();
        },
        ajax:function(res){
            var self=this;
            $.getJSON('json/xiaoniu_ttndetail.json').done(function(res){
                console.log(res);
                self.vm.prdName1=res.prdName;
                self.vm.test=res.prdName;

                self.vm.yieldList=res.yieldList;    //这是一个数组,所以要在这里获取一下数组,然后在上面的vm里面定义数组.
                self.vm.investRange=res.investRange;
                self.vm.term=res.term;
                self.vm.startAmount=res.startAmount;
                self.vm.annualYield=res.annualYield;
                self.vm.assetSize=res.assetSize;
                self.vm.buyLimit=res.buyLimit;
                self.vm.extractCost=res.extractCost;
                self.vm.buyCost=res.buyCost;
                self.vm.remainAmount=res.remainAmount;
                self.vm.extremeIncome=res.extremeIncome;
            })
        }
    };
    ttnDetail.init();
})();