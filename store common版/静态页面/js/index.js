(function(){
    var index={
        //初始化页面
        init:function(){
            index.isMore=true;
            index.shopNum=0;
            index. sessionStorage1=sessionStorage.getItem('sessionId');

            if(index.sessionStorage1){
               index.ajax();
            }else{
                alert('请登录,在选择商品!');
                location.href='login.html';
            }
        },
        ajax:function(){
            common.ajaxCommon("shopListQuery",{sessionId:index.sessionStorage1,isMore:index.isMore},function(res){
                index.render(res);
                index.bind();
                //已成功加入购物车,并且渲染购物车的小红点的数字.
                if(res.shopNum>0){  //判断一下后台的数据是否大于0
                    index.shopNum == res.shopNum;
                    Number(index.shopNum);
                    $('.car_trolley').show().text(index.shopNum);
                }
                /*for(var i=0;i<res.list.length;i++){
                    index.shopNum+=Number(res.list[i].prdNum)
                }if(index.shopNum!=0){
                    $('.car_trolley').show().text(index.shopNum);
                }*/
            })
        },
        render:function(res){
            for (var i = 0; i < res.list.length; i++) {
                //直接在渲染的时候给li添加一个data-id.
                var html = ' <li><div class="product_box"><a><img data-id="' + res.list[i].id + '" src="' + res.list[i].imgUrl + '"></a><h2><a>"' + res.list[i].shopName + '"</a></h2><div class="clearfix"> <div class="product_price fl">￥<span class="product_mpney">"' + res.list[i].price + '"</span></div> <div class="product_car fr"></div> </div> </div> </li>';
                $('#product_list').append(html);   //如果不添加这个append()方法,点击更多的时候会弹不出全部数据
            }

        },
        bind:function(){
            var self=this;
            //点击跳转页面 点击img跳转详情页
            $("#product_list").on("click","li img",function(){
                //直接用sessionStorage,存储看看效果   结果是可以的
                sessionStorage.setItem("id",$(this).data("id"));
                location.href='detail.html';
            });
            //加载更多
            $("#btn_more").on("click",function(){
                index.isMore=false;
                index.ajax();
                //隐藏加载更多 按钮
                $(this).hide();
            });
            //点击小购物车,添加1件商品去大的购物车图标.
            $('#product_list').on('click',"li .product_car",function(){
                var id=$(this).closest('li').find('img').data('id');
                var data={sessionId:index.sessionStorage1,prdNum:1,id:id};
                $('#hasAdd').removeClass("dsn");
                common.ajaxCommon('addToShopCar',data,function(res){
                    console.log(res);
                    $('#hasAdd').addClass('dsn');
                    $(".car_trolley").text(++index.shopNum);
                    $('#pop_car .car_trolley').removeClass('dsn');

                });

            });
            //点击购物车图标,跳转到购物车页面
            $('#pop_car').on("click",function(){
                location.href='shoppingCar.html';
            })
        }
    };
    index.init();
})();