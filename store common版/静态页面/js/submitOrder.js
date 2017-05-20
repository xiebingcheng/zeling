$(function(){
    var submitOrder={
        init:function(){

            // 最小购买金额
            this.minBuyAmount = 0;
            // 有效日期
            this.effectiveDate = '2222-12-31';
            // 优惠金额
            this.amount = 0;
            // 订单金额
            this.orderMoney = 0;
            // 选中的优惠券元素下标
            this.index = 0;

            var data={};
            common.ajaxCommon('shopCarList',data,function(res){
                console.log(res);
                submitOrder.render(res);
            })
        },
        //渲染页面 (主界面)
        render:function(res){
            //普通的渲染方法
            var html="",
                list=res.list;
            for(var i=0;i<list.length;i++){
                html+='<li><div class="shopping_img"><a href="javascript:void(0)"><img src="'+list[i].imgUrl+'"></a></div> <div class="shopping_box"<h2>'+list[i].shopName+'</h2><div class="shopping_box_bottom"><div class="unit_price">￥<span>'+list[i].price+'</span></div><div class="number">x<span>'+list[i].prdNum+'</span></div></div></div></li>';
            }
            $("#good_list").html(html);
            submitOrder.bind();
        },
        bind:function(){
            //tab标签切换
            //到店自取
            $("#store_invite").on("tap",function(){
                $("#good_delivery").removeClass('select');
                $("#store_invite").addClass("select");
                $("#write_address").addClass("dsn");
                $("#user_inf").addClass("dsn");
            });
            //送货上门
            $("#good_delivery").on("tap",function(){
                $("#good_delivery").addClass('select');
                $("#store_invite").removeClass("select");
                $("#write_address").removeClass("dsn");
                $("#user_inf").removeClass("dsn");
            });
            //点击优惠券按钮
            $(".container_left").on("tap",function(){
                $("#coupons_Pop").removeClass("dsn");
                //调用优惠券接口,渲染数据.
                common.ajaxCommon("coupon",{},function(res){
                    console.log(res);
                    var html="",
                        list=res.list;
                    for(var i=0;i<list.length;i++){
                        html+='<li  data-amount="'+list[i].amount+'"  data-minBuyAmount="'+list[i].minBuyAmount+'"  data-effectiveDate="'+list[i].effectiveDate+'"><div class="icon_no_ok"></div> <div class="coupons_list_messg"><div class="coupons_messg_txt"><span>'+list[i].amount+'</span>元（满"'+list[i].minBuyAmount+'"元可用）</div><div class="coupons_messg_time">'+list[i].effectiveDate+'</div></div></li> ';
                    }
                    //这个是不使用优惠券的渲染,然后再下面直接追加,要渲染的东西
                    var wuyouhui=' <li class="select no_coupons"><div class="icon_no_ok"></div><div class="coupons_list_messg"><div class="coupons_messg_txt">不使用优惠券</div></div></li>';
                    $(".coupons_list").html(wuyouhui).append(html);


                })
            });
            //弹框的取消按钮
            $(".pop_remove_btn").on("tap",function(){
                $("#coupons_Pop").addClass("dsn");
            });
            //弹框的确定按钮
            $(".pop_sure_btn").on("tap",function(){
                if(submitOrder.orderMoney<submitOrder.minBuyAmount){
                    alert('优惠券无法使用,购买金额不足.');
                    //判断时间和优惠券的时间是否过期..
                }else if(+new Date()>+new Date(submitOrder.effectiveDate)){  //+new是时间戳的简写
                    alert('优惠券时间已经过期!')
                }else {
                    //如果条件满足,把被选择的元素的data-index存起来
                    submitOrder.index=$('#coupons_list .select').attr('data-index');
                    if(submitOrder.effectiveDate =='2222-12-31'){
                        //显示在优惠券那一栏中
                        $('#good_coupons .container_right').text('不使用优惠券');
                    }else{
                        $('#good_coupons .container_right').text(submitOrder.amount + '元(满'+submitOrder.minBuyAmount+'元可用)');
                    }
                    //优惠券折扣 输入text
                    $("#order_discount").text(Number(submitOrder.amount).toFixed(2));
                    //订单金额-折扣金额(初始化默认为0)
                    $('#need_pay').text(Number(submitOrder.orderMoney - submitOrder.amount).toFixed(2));

                    $("#coupons_Pop").addClass("dsn");
                }

            });
            //点击优惠券中的圆点,选中优惠券
            $(".coupons_list").on("tap","li",function(){
                //增加this的样式的同时给其他li移除样式.
                $(this).addClass('select').siblings().removeClass('select');
                submitOrder.minBuyAmount=$(this).attr('data-minBuyAmount');
                submitOrder.effectiveDate=$(this).attr('data-effectiveDate');
                submitOrder.amount=$(this).attr('data-amount');
            })
        },

    };
    submitOrder.init();
});