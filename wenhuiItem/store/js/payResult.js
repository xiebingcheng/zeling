(function () {
    var payResult={
        //初始化
        init: function () {
            this.event();
        },
        event: function () {
            var self=this;
          $("#goto_order_btn").click(function () {
              var orderList=ab.getData("orderList");
              self.render(orderList);
          })
        },
        render: function (data) {
            //var sum=0;
            var tpl=$("#tpl").html();
            var html= _.template(tpl)(data);
            $("#pay_order").html(html);
        }
    };
    payResult.init();
})();