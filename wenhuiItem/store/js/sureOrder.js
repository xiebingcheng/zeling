(function () {
    var sureOrder={
        //初始化
        init: function () {
            this.orderList=ab.getData("orderList");
            this.render(this.orderList);
            this.event();
        },
        //绑定事件
        event: function () {
            //点击提交订单
            $("#submit_order").click(function () {
                location.href="payindex.html";
            });
            //点击"到店自取"
            $("#store_invite").click(function () {
                $(this).addClass("select");
                $("#good_delivery").removeClass("select");
                $("#user_inf").addClass("dsn");
            });
            //点击"送货上门"
            $("#good_delivery").click(function () {
                $(this).addClass("select");
                $("#store_invite").removeClass("select");
                $("#user_inf").removeClass("dsn");
            });
        },
        //页面渲染
        render: function (data) {
            var sum=0;
            var tpl=$("#tpl").html();
            var html= _.template(tpl)(data);
            $("#good_list").html(html);
            for(var i in data){
                sum+=data[i].price*data[i].prdNum;
            }
            ab.setData("a",sum);
            //订单金额
            $("#pay_account").text(sum);
            //还需支付金额
            $("#need_pay").text(sum);
        }
    };
    sureOrder.init();
})();