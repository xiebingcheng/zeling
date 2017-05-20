(function () {
    var payIndex={
        init:function(){
            /*this.orderList=ab.getData("orderList");
            this.render(this.orderList);*/
            var sum=ab.getData("a");
            $("#order_price").text(sum);
            $("#order_needpay").text(sum);
            this.event();
        },
        event: function () {
            $("#order_pay_btn").on("click",function(){
                location.href="facetoface.html";
            })
        },
        /*render: function (data) {
            var sum=0;
            for(var i in data){
                sum+=data[i].price*data[i].prdNum;
            }
            $("#order_price").text(sum);
            $("#order_needpay").text(sum);
        }*/
        /*query: function () {
            var self=this;
            var data={list:self.list};
            ab.ajax("placeOrder",data, function (res) {
                //self.render(res);
            });
        }*/
    };
    payIndex.init();
})();