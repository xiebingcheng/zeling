(function () {
    var index = {
        //初始化页面
        init: function () {
            var the = this;
            //设置一个初始值,在小购物车按钮调用.

            index.shopNum = 0;
            the.isMore = false;
            var data = {sessionId:"13423966988",isMore: the.isMore};
            //公共方法调用ajax函数
            common.ajaxCommon('shopListQuery', data, function (res) {
                //后台传来数据,调用渲染方法.
                index.render(res);
                //已成功加入购物车,并且渲染购物车的小红点的数字.
                if (res.shopNum > 0) {
                    index.shopNum = res.shopNum;
                    Number(the.shopNum);
                    $('.car_trolley').show().text(index.shopNum);

                }
            });
            //原始的调用下面ajax的函数
            //index.ajax(false);


        },
        //渲染页面
        render: function (res) {
            //var html='';
            for (var i = 0; i < res.list.length; i++) {
                //直接在渲染的时候给li添加一个data-id.
                //html+=' <li data-id="'+res.list[i].id+'"><div class="product_box"><a><img src="'+res.list[i].imgUrl+'"></a><h2><a>"'+res.list[i].shopName+'"</a></h2><div class="clearfix"> <div class="product_price fl">￥<span class="product_mpney">"'+res.list[i].price+'"</span></div> <div class="product_car fr"></div> </div> </div> </li>';
                var html = ' <li><div class="product_box"><a><img data-id="' + res.list[i].id + '" src="' + res.list[i].imgUrl + '"></a><h2><a>"' + res.list[i].shopName + '"</a></h2><div class="clearfix"> <div class="product_price fl">￥<span class="product_mpney">"' + res.list[i].price + '"</span></div> <div class="product_car fr"></div> </div> </div> </li>';
                $('#product_list').append(html);   //如果不添加这个append()方法,点击更多的时候会弹不出全部数据
            }
            //$('#product_list').html(html);
            index.bind();
        },
        //绑定事件
        bind: function () {
            var self = this;
            //点击跳转页面  点击img跳详情页
            $("#product_list").on("tap", "li img", function () {
                //h5本地存储新方法.
                localStorage.setItem('id', $(this).data('id'));
                location.href = 'detail.html';
                //老方法,直接把传的东西带到链接上. 个人不推荐使用,但是在ie7及更早版本H5存储不支持使用
                //location.href = 'detail.html?id='+$(this).data('id');
            });

            //加载更多
            $('#btn_more').on('tap', function () {   //tap事件要用浏览器变成手指点击,才触发效果
                //此时isMore等于true,可以加载更多的4个菜
                index.ajax(true);
                //隐藏掉 加载更多
                $(this).hide();
            });
            //点击小购物车,添加1件去大购物车.
            $('#product_list').on('tap', "li .product_car", function () {
                //点击哪个小购物车获取它的 data-id.
                var id = $(this).closest('li').find('img').data('id');
                var data = {id: id, prdNum: 1};
                $("#hasAdd").removeClass("dsn");
                common.ajaxCommon('addToShopCar', data, function (res) {
                    $("#hasAdd").addClass('dsn');
                    $(".car_trolley").text(++self.shopNum);
                    $('#pop_car .car_trolley').removeClass("dsn");
                });
            });
            //点击图标购物车,跳转到购物车页面
            $('#pop_car').on("tap", function () {
                location.href = 'shoppingCar.html';
            })
        }
       /* ajax: function (Boolean) {
            console.log(Boolean);
            $.ajax({
                url: 'http://192.168.7.150:3000/shopListQuery',
                data: {sessionId: "13333333333", isMore: Boolean},
                type: "post",
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                    if (res.resCode == '000') {

                        index.render(res);
                    } else {
                        alert('失败!')
                    }
                },
                error: function () {
                    alert('网络异常!')
                }
            })
        }*/
    };
    index.init();
})();