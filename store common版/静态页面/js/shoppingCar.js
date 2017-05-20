$(function(){
    var shoppingCar={
        init:function(){
            shoppingCar.sessionStorage1=sessionStorage.getItem('sessionId');
            var data={sessionId:shoppingCar.sessionStorage1};
            common.ajaxCommon("shopCarList",data,function(res){
                console.log(res);
                shoppingCar.render(res);
            })
        },
        render:function(res){
            var html='',
                list=res.list;
            if(list[0]==null){
                $('#none_Select').show();
                setTimeout(function(){
                    $('#none_Select').hide();
                },1000);
                $('#empty_cart').show();//购物车为空
                $('#floatbar_bottom').hide();//隐藏全选等选项
            }else{
                for(var i in list){
                    //当数量小于1的时候,不渲染数据.
                    if(list[i].prdNum>=1){
                        html+='<li class="select" data-id="'+list[i].id+'"><div class="no_select select_ok dsn"></div><div class="shopping_img"><a href="javascript:void(0)"><img src="'+list[i].imgUrl+'"></a></div> <div class="shopping_box"><h2>'+list[i].shopName+'</h2><div class="shopping_box_bottom"><div class="unit_price">￥<span>'+list[i].price+'</span></div><div class="number">x<span>'+list[i].prdNum+'</span></div><!--编辑状态加减框--><div class="number_content dsn"><div class="minus_icon js_minus"></div><div  data-leftnum="' + list[i].leftNum + '" class="number_edit">'+list[i].prdNum+'</div><div class="add_icon js_add"></div></div></div></div></li>';
                    }else{
                        html="";
                    }
                }
                //渲染出东西
                $("#shopping_list").html(html);
            }
            shoppingCar.totalPrice();
            shoppingCar.bind(res);
        },
        //计算价格的函数
        totalPrice:function(){
            //声明一个总价
            var sum=0;
            //然后如果没有货物的时候,初始化为0;
            $("#pay_account").text(sum);
            $('#shopping_list').find('.select_ok').each(function(){
                //循环出所有选中的菜的价格.
                var price=$(this).parent().find('div[class=unit_price]').children().text();
                var num=Number($(this).parent().find('div[class=number_edit]').text());
                sum+=price*(num);
                $('#pay_account').text(sum);
            });
        },
        bind:function(){
            var self = this;
            // var select_all= $('#select_all').find("div[class='select_all no_select select_ok']");
            var isEdit=false; //设置这个变量,是为了点击编辑和完成的时候,判断是什么文本,最好不要用中文做判断,因为要解码
            //点击编辑按钮的效果
            $('#car_edit').on("tap",function(){
                $(' .no_select').toggleClass('dsn');
                $(".number_content").toggleClass("dsn");
                $('#delete_btn').toggleClass("dsn");
                $('.number').toggleClass('dsn');
                //select_all.toggleClass('no_select');

                //中文的判断.  这样是需要解码的.所以不推荐使用.
                /* if($("#car_edit").text()=="编辑"){
                 $('#car_edit').text('完成');
                 }else{
                 $('#car_edit').text('编辑');
                 }*/
                //英文判断  这样的好处在于,不需要中文判断,因为中文要解码, 这样的思路会应用在好多地方.
                if(isEdit){
                    isEdit=false;
                    $('#car_edit').text('编辑');
                    $("#account_btn").show();
                }else{
                    isEdit=true;
                    $('#car_edit').text('完成');
                    $("#account_btn").hide();
                }
            });
            //全选框
            $('#select_all .no_select').on("tap",function(){
                if($(this).hasClass('select_ok')){   //hasClass()判断有没有这个类名
                    $('.no_select').removeClass('select_ok');
                }else{
                    $('.no_select').addClass('select_ok');
                }
                shoppingCar.totalPrice();
            });

            //单选,反选
            $('#shopping_list .no_select').on('tap',function(){
                var all=$('#shopping_list li').length;
                if($(this).hasClass('select_ok')){
                    $(this).removeClass('select_ok');
                }else{
                    $(this).addClass('select_ok');
                }
                //当反选的时候,判断渲染出的li和选择的li数量是否一样,如果一样.
                var select = $('#shopping_list .select_ok').length;
                if(select==all){
                    $('#select_all .no_select').addClass('select_ok');
                }else{
                    $('#select_all .no_select').removeClass('select_ok');
                }
                shoppingCar.totalPrice();
            });
            //点击加号增加效果.
            $('.number_content .js_add').on('tap',function(){
                var leftNum = $(this).siblings('.number_edit').attr('data-leftnum');  //获取data-leftnum的值
                var num=$(this).prev().text();  //prev()方法返回被选元素的前一个同级元素。只返回一个.
                num++;
                if(num<=leftNum){  //判断菜的最大值,不能超过后台的菜的最大值.
                    $(this).prev().text(num);
                    //当编辑完成时,完成页面的数字也要统一改变.
                    $(this).parent().prev().find("span").text(num);  //找到js_add的父元素的,同级元素的span元素,更改他的text
                }
                var id=$(this).closest("li").data('id'); //closest() 方法获得匹配选择器的第一个祖先元素
                var data={id:id,prdNum:1};
                //传入公共ajax方法
                //common.ajaxCommon('addToShopCar',data,function(res){

                // });

                shoppingCar.totalPrice();
            });
            //点击减号减少效果
            $(".number_content .js_minus").on("tap",function(){
                var num=$(this).next().text();
                if(num>1){
                    num--;
                    var id=$(this).closest('li').data('id');
                    var data={id:id,prdNum:1};

                    //传入公共ajax方法
                    //common.ajaxCommon('addToShopCar', data, function (res) {
                    //});
                    $(this).next().text(num);
                    $(this).parent().prev().find("span").text(num);
                }else{
                    alert("数量你还想小于一? 走走走!没时间陪你玩!")
                }
                shoppingCar.totalPrice();
            });
            //点击数字有弹框出现
            $('.number_edit').on("tap",function(){
                shoppingCar.leftNum = $(this).attr('data-leftnum');  //在初始化那里设置一个全局变量,这里也是个全局变量,当调用的时候,会覆盖初始化的全局变量,使得其他函数也能调用这个变量.
                shoppingCar.clickedObject = $(this);
                $('#add_minus_Pop').removeClass('dsn');
                var num=$(this).text();
                $('#number_input').val(num);
                shoppingCar.self_number=this;  //设置这个this是为了下一步,在输出text时用的.因为这个this指这个数字
            });
            //弹框的加号按钮
            $(".number_box .js_add").on("tap",function(){
                var num = $(this).prev().val();
                num++;
                if(num<=shoppingCar.leftNum){
                    //$(this).prev().val(num);
                    $('#number_input').val(num);
                }
                $(this).prev().val(num);
                $(shoppingCar.self_number).text(num);

            });
            //弹框的减号按钮
            $('.number_minus').on("tap",function(){
                var num=$(this).next().val();  //next()提供选择器的情况，则取回匹配该选择器的下一个同胞元素。
                if(1<num){
                    num--;
                    $(this).next().val(num);
                    $(shoppingCar.self_number).text(num);
                }else{
                    alert("走走走!,什么都不想买是吧?还想弄成负数!");
                    return false;
                }
            });
            //点击取消
            $('.pop_remove_btn').click(function () {
                $('#add_minus_Pop').addClass('dsn');
            });
            //点击确定按钮
            $("#number_Btn .pop_sure_btn").on('tap',function(){
                shoppingCar.clickedObject.text($('#number_input').val()).parent().prev().children('span').text($('#number_input').val());
                $('#add_minus_Pop').addClass('dsn');
            });
            //弹框的输入,键盘事件.
            $("#number_input").on("keyup",function(){
                var value=Number($(this).val());
                if(value>shoppingCar.leftNum){
                    $(this).val(shoppingCar.leftNum);
                }else if(value<1){
                    $(this).val(1);
                }

            });
            //删除按钮   最后一天敲,发现报错,  数组获取不到,为null..  信心备受打击!
            $("#delete_btn").on("tap",function(){
                var idArr=[];  //设置一个空数组;
                var hook=$('#shopping_list .select_ok').length;  //获取每个复选框.
                for(var i=0;i<hook;i++){
                    idArr.push($('#shopping_list .select_ok').eq(i).attr('data-id'));  //获取数组的data-id添加到空数组的末尾.
                }
                //当购物车什么都没有时,出现"未选择商品"弹框
                if(idArr.length==0){
                    //$('#none_Select').removeClass('dsn');
                    $('#none_Select').show();
                    setTimeout(function(){
                        $('#none_Select').hide();
                    },1500);
                }else{
                    //否则在删除的时候出现,你确定删除此商品吗?
                    $('#sure_Del').show();
                }
            });
            //点击考虑一下按钮时  隐藏弹框.
            $("#sure_Del_btn .pop_remove_btn").on("tap",function(){
                $('#sure_Del').hide();
            });
            //点击确定时  传删除的数据到后台.
            $("#sure_Del_btn .pop_sure_btn").on("tap",function(){
                $('#sure_Del').hide();
                var id=[],
                    select_ok=$('#shopping_list .select_ok').length;
                //直接循环出页面上有的data-id.
                for(var i=0;i<select_ok;i++){
                    id.push($('#shopping_list .select_ok').eq(i).attr("data-id"));
                }
                var data={id:id};
                common.ajaxCommon('deleteShopCar',data,function(){
                    // 将页面上所有选择的元素移除，因为'删除'请求已经成功，不需要在页面上保留这些元素
                    $('#shopping_list .select_ok').parent().remove();

                    // 如果页面上一项商品都没有，显示'空空如也'
                    if($('#shopping_list li').length == 0){
                        $('#floatbar_bottom').hide();
                        $('#empty_cart').show();
                    }
                });

            });

            //用户点击去结算按钮,传数据到后台.
            $("#account_btn").on("tap",function(){
                var balance_obj={},
                    list=$("#shopping_list .select_ok").parent(),
                    list_len=list.length;
                for(var i=0;i<list_len;i++){
                    var id=$(list[i]).attr("data-id");
                    balance_obj[id]={};
                    balance_obj[id]['price']=$(list[i]).find(".unit_price").children("span").text();
                    balance_obj[id]['shopName']=$(list[i]).find('h2').text();
                    balance_obj[id]['imgUrl']=$(list[i]).find('img').attr();
                    balance_obj[id]['id']=id;
                    balance_obj[id]['prdNum']=$(list[i]).find('.prdNum').text();
                }
                common.setData('count',balance_obj);
                location.href="submitOrder.html";

            })

        }
    };
    shoppingCar.init();
});