//用公共绑定事件的方法(有局限性)
(function () {
    var indexView={
        init: function () {
            var self = this;
            self.shopNum=0;
            this.isMore = false;
            this.shopListQuery();
            ab.bindEvent(this.event,this);
            //this.event();
        },
        //添加到购物车
        addCar: function (data) {
            var self=this;
            $("#hasAdd").removeClass('dsn');
            ab.ajax("addToShopCar", data, function (res) {
                $(".car_trolley").text(++self.shopNum);
                $("#hasAdd").addClass('dsn');
                $("#pop_car .car_trolley").removeClass("dsn");
            })
        },
        //查看更多
        more: function () {
            this.isMore=true;
            this.shopListQuery();
        },
        //跳转到详情页
        detail: function () {
            var id=$(this).closest("li").find("img").data("id");
            var shopname=$(this).data("shopname");
            var obj={
                id:id,
                shopname:shopname
            };
            location.href="detail.html?"+ $.param(obj);
        },
        //加入购物车
        shopCar: function () {
            var id=$(this).closest("li").find("img").data("id");
            var data={
                id:id,
                prdNum:1
            };
            this.addCar(data);
        },
        toShopCar: function () {
            location.href="showShop.html";
        },
        event: {
            //点击"查看更多"
            '#btn_more click':'more',
            //点击跳转到详情页
            '#product_list img click':'detail',
            //点击添加到购物车
            '#product_list .product_car click':'shopCar',
            //点击跳转到购物车
            '#pop_car click':'toShopCar'

            /*var self=this;
            //点击 查看更多商品
            $("#btn_more").on("click", function () {
                self.isMore=true;
                self.shopListQuery();
            });
            //点击图片跳转到详情页
            $("#product_list").on("click", "img", function () {
                var id=$(this).data("id");
                var shopname=$(this).data("shopname");
                var obj={
                    id:id,
                    shopname:shopname
                };
                location.href="detail.html?"+ $.param(obj);
            });
            //点击 添加到购物车事件
            $("#product_list").on("click",".product_car", function (res) {
                //把数据传给后台
                var id=$(this).closest("li").find("img").data("id");
                var data={
                    id:id,
                    prdNum:1
                };
                self.addCar(data);
            });
            //点击跳转到购物车事件
            $("#pop_car").on("click", function () {
                location.href="showShop.html";
            });*/
        },
        //页面渲染
        render: function (a) {
            var list= a;
            //没有点击查看更多的页面渲染
            if(!this.isMore){
                var recomObj=list[0];
                $("#price").text(recomObj.price);
                $("#oldPrice").text(recomObj.oldPrice);
                $("#recommend img").attr('src',recomObj.imgUrl);
                $("#recommend a").text(recomObj.shopName);
                list=list.slice(1);
                var html= _.template($("#tpl").html())(list);
                $("#product_list").html(html);
            }
            //点击查看更多的页面渲染
            else{
                var html= _.template($("#tpl").html())(list);
                $("#product_list").append(html);
            }
        },
        shopListQuery: function () {
            var self=this;
            var data={isMore:self.isMore};
            ab.ajax("shopListQuery",data, function (res) {
                if(self.isMore){
                    $("#btn_more").hide();
                }
                self.render(res.list);
                //购物车数据
                if(res.shopNum>0){
                    self.shopNum=res.shopNum;
                    $(".car_trolley").show().text(res.shopNum);
                }
            });
        }
    };
    indexView.init();
})();

