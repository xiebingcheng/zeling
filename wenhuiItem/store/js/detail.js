(function () {
    var detail={
        //初始化
        init:function(){
            var self=this;
            //百度的传参方法
           /* function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return decodeURI (r[2]); return null; //返回参数值
            }
            var id= getUrlParam("id");
            var shopname= getUrlParam("shopname");
            var data={
                id:id,
                shopname:shopname
            };
            ab.ajax("productDetail",data, function (res) {
                self.render(res);
            });*/
            var id=ab.getParam("id");
            var data={id:id};
            ab.ajax("productDetail",data, function (res) {
                self.render(res);
            });
            this.event();
        },
        //添加到购物车的方法
        addCar: function () {
            var id=ab.getParam("id");
            var num=$("#prd-num").text();
            var data={id:id,prdNum:num};
             ab.ajax("addToShopCar",data, function (res) {
                 location.href="showShop.html";
             });
        },
        event: function () {
            var self=this;
            //点击增加
            $("#section2").on("click", "#add",function () {
                var num=Number($(this).prev(".number_edit").text());
                num++;
                $(this).prev(".number_edit").text(num);
            });
            //点击减少
            $("#section2").on("click", "#minus",function () {
                var num=Number($(this).next(".number_edit").text());
                num--;
                if(num<1){
                    num=1;
                }
                $(this).next(".number_edit").text(num);
            });
            //点击"加入购物车"
            $("#join_car").click(function(){
                self.addCar();
            });
            //点击"立即购买"
            $("#buy_now").click(function () {
                //trigger:委托事件
                $("#join_car").trigger("click");
            });
        },
        //页面渲染
        render: function (a) {
            var produceDetail= a.productDetail;
            var html= _.template($("#tpl").html())(produceDetail);
            $("#content").html(html);
        }
    };
    detail.init();
})();
