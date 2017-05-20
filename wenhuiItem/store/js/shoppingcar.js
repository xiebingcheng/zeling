(function(){
    var shoppingcar={
        //初始化
        init:function(){
            //是否是编辑状态
            this.editStaus=false;
            this.query();
            this.event();
        },
        //绑定事件
        event: function () {
            var self=this;
            //点击"编辑"
            $("#car_edit").click(function () {
                if(self.editStaus==true){
                    $(this).text("编辑");
                    //显示数量
                    $(".number").removeClass("dsn");
                    //隐藏"删除"
                    $("#delete_btn").addClass("dsn");
                    //隐藏加减框
                    $(".number_content").addClass("dsn");
                    self.editStaus=false;
                }
                //点击"编辑"显示加减框
                else{
                    $(this).text("完成");
                    //隐藏数量
                    $(".number").addClass("dsn");
                    //显示"删除"
                    $("#delete_btn").removeClass("dsn");
                    //显示加减框
                    $(".number_content").removeClass("dsn");
                    self.editStaus=true;
                }
            });
            //点击实现全选
            $(".select_all").click(function(){
                //编辑状态下才可以点击
                if(self.editStaus==true){
                    $(this).toggleClass("select_ok");
                    if($(this).hasClass("select_ok")){
                        $(".no_select").addClass("select_ok");
                    }
                    else{
                        $(".no_select").removeClass("select_ok");
                    }
                }
                else{
                    alert("请点击编辑");
                }
                self.count();
            });
            //点击实现反选
            $("#shopping_list").on("click",".no_select",function () {
                if(self.editStaus==true){
                    //方法一
/*                    var a=$("#shopping_list").find(".no_select");
                    $(this).toggleClass("select_ok");
                    //判断每一个单选框的样式是否为select_ok,是的话全选框增加样式,否的话全选框移除样式
                    a.each(function () {
                        if(!$(this).is(".select_ok")){
                            $(".select_all").removeClass("select_ok");
                            return false;
                        }
                        $(".select_all").addClass("select_ok");
                    });*/
                    //方法二
                    $(this).toggleClass("select_ok");
                    var len=$("#shopping_list .select_ok").length;
                    var size=$("li.select").length;
                    //判断样式为select_ok的数量与列表总数是否相等,如不等,则全选框移除样式,如相等,则全选框增加样式
                    if(size!=len){
                        $(".select_all").removeClass("select_ok");
                    }
                    else{
                        $(".select_all").addClass("select_ok");
                    }
                }
                else{
                    alert("请点击编辑");
                }
                self.count();
            });
            //点击增加
            $("#shopping_list").on("click", ".js_add",function () {
                var num=Number($(this).siblings(".number_edit").text());
                var id=$(this).closest("li").attr("data-id");
                num++;
                var data={id:id,prdNum:1,icon:"add"};
                ab.ajax("addToShopCar",data, function (res) {});
                $("#productId_"+id).text(num);
                $(this).siblings(".number_edit").text(num);
                $(this).parent().prev().find("span").text(num);
                self.count();
            });
            //点击减少
            $("#shopping_list").on("click", ".js_minus",function () {
                var num=Number($(this).siblings(".number_edit").text());
                var id=$(this).closest("li").attr("data-id");
                var data={id:id,prdNum:-1,icon:"min"};
                ab.ajax("addToShopCar",data, function (res) {});
                num--;
                //当商品数量减少到0时,删除该商品
                if(num<=0){
                    $(this).closest("li").remove();
                }
                $("#productId_"+id).text(num);
                $(this).siblings(".number_edit").text(num);
                $(this).parent().prev().find("span").text(num);
                self.count();
                //当购物车减少为空时显示样式
                if($("#shopping_list li").length===0){
                    $("#empty_cart").removeClass("dsn");
                    $("#floatbar_bottom").hide();
                }
            });
            //点击删除所选
            $("#delete_btn").on("click", function () {
                var a=$("#shopping_list").find("li");
                var number=0;
                //点击删除所选
                    a.each(function () {
                        if($(this).find(".no_select").hasClass("select_ok")){
                            number+=1;
                            var id=$(this).attr("data-id");
                            var num=($(this).find(".number_edit").text());
                            var data={id:id,prdNum:-num,icon:"min"};
                            ab.ajax("addToShopCar",data, function (res) {
                            });
                        }
                    });
                $("#shopping_list").find(".select_ok").parent().remove();
                //当购物车没有商品时显示的样式
                if(a.find(".no_select").length==number){
                    $("#empty_cart").removeClass("dsn");
                    $("#floatbar_bottom").hide();
                }
                self.count();
            });
            //点击"去结算"
            $("#account_btn").on("click",function () {
                var selectObj={};
                var list=$("#shopping_list .select_ok");
                var len=list.length;
                for(var i= 0;i<len;i++){
                    var id=$(list[i]).closest("li").attr("data-id");
                    selectObj[id]={};
                    selectObj[id]["imgUrl"]=$(list[i]).siblings(".shopping_img").find("img").attr("src");
                    selectObj[id]["shopName"]=$(list[i]).siblings(".shopping_box").find("h2").text();
                    selectObj[id]["id"]=id;
                    selectObj[id]["prdNum"]=$(list[i]).siblings(".shopping_box").find(".number span").text();
                    selectObj[id]["price"]=$(list[i]).siblings(".shopping_box").find(".unit_price span").text();
                }
                //存储购物车的所有数据,以便在sureOrder页面获取
                ab.setData("orderList",selectObj);
                location.href="sureOrder.html";
            });
            //点击"去逛逛"
            $("#goto_shop").click(function () {
                location.href="home.html";
            })
        },
        //计算函数
        count: function () {
            var a=$("#shopping_list").find("li");
            var sum=0;
            a.each(function () {
                if($(this).find(".no_select").hasClass("select_ok")){
                    //商品数量
                    var num=$(this).find(".number span").text();
                    //单笔商品价格
                    var price=($(this).find(".unit_price span").text())*num;
                    //商品总价
                    sum+=price;
                }
            });
            $("#pay_account").text(sum);
        },
        //页面渲染
        render: function (res) {
            //渲染购物车的页面
            var list=res.list;
            var html= _.template($("#tpl").html())(list);
            $("#shopping_list").html(html);
            //刷新页面时显示总价
            var sum=0;
            for(var i in list){
                var price=list[i].price*list[i].prdNum;
                sum+=price;
            }
            $("#pay_account").html(sum);
            //遍历购物车的商品,如果数量为0,则删除该商品
            $("#shopping_list li").each(function () {
                if($(this).find(".prdNum").text()==0){
                    $(this).closest("li").remove();
                }
            });
            //当购物车没有商品时,显示的样式
            if($("#shopping_list li").length==0){
                $("#empty_cart").removeClass("dsn");
                $("#floatbar_bottom").hide();
            }
        },
        query: function () {
            var self=this;
            var data={};
            ab.ajax("shopCarList",data, function (res) {
                self.render(res);
            });
        }
    };
    shoppingcar.init();
})();
