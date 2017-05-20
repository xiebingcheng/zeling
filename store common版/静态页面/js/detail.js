(function () {
    var detail = {
        //初始化页面
        init: function () {
            detail.ajax();
        },
        //添加绑定事件
        bind: function () {
            //点击减少
            $('#section2 .js_minus').on("tap", function () {
                var num = $('.js_num').text();
                if (num != '1') {    //不能小于或者等于1,
                    num--;
                    $('.js_num').text(num);
                }
            });
            //点击增加
            $("#section2 .js_add").on("tap", function () {
                var num = $('.js_num').text();
                var max = $('.number span').text();  //根据后台返回的最大数目,不能等于或超过最大值.
                if (num != max) {   //在这里判断,不能等于或者超过最大值
                    num++;
                    $('.js_num').text(num);
                }
            });
            //点击数字,然后会有弹框交互效果
            $(".js_num").on("tap", function () {
                $('#number_input').val($(this).text());   //这个是那个弹窗的ID,让他的val值等于点击的那个数字的值
                $('#add_minus_Pop').show();
            });
            //弹出的框的取消按钮
            $('.pop_remove_btn').on("tap", function () {
                $('#add_minus_Pop').hide();  //点击取消按钮,隐藏弹框.
            });
            //弹出的框的确定按钮
            $('.pop_sure_btn').on('tap', function () {
                $('.js_num').text(parseInt($('#number_input').val()));  //parseInt()取整.
                $('#add_minus_Pop').hide();
            });
            //弹出框的减少按钮
            $('#add_minus_Pop .js_minus').on('tap', function () {
                var num = $('#number_input').val();
                if (num != '1') {
                    num--;
                    $('#number_input').val(num);
                }
            });
            //弹出框的增加按钮
            $('#add_minus_Pop .js_add').on('tap', function () {
                var num = $('#number_input').val();
                var max = $('.number span').text();
                if (num != max) {
                    num++;
                    $('#number_input').val(num);
                }
            });
            //输入框的键盘事件
            $('#number_input').on('keyup', function () {
                var value = Number($(this).val());                //Number() 函数把对象的值转换为数字。
                var max = Number($('.number span').text());  //获取到后台的返回的剩余数量.
                if (value > max) {   //让用户输入的值不能大于后台传来的值.
                    $(this).val(max);
                } else if (value < 1) {  //让用户不能出现小于1的值.就算输入了也等于1.
                    $(this).val(1);
                }
            });
            //点击左上角按钮,跳转到主页.
            $("#home").on("tap", function () {
                location.href = 'index.html';
            });
            //加入购物车
            $('#join_car').on('tap', function () {
                $.ajax({
                    url: 'http://192.168.7.150:3000/addToShopCar',
                    data: {sessionId: '13333333333', id: detail.id, prdNum: $('.js_num').text()},
                    type: 'post',
                    dataType: 'json',
                    success: function (res) {
                        location.href = 'shoppingCar.html';
                    }
                });
            });

        },
        //添加购物车
        append_car: function () {
            var $hasAdd = $("#hasAdd");
            $hasAdd.removeClass('dsn');

        },
        //渲染页面
        render: function (res) {
            var productDetail = res.productDetail,
                imgListHtml = '';  //为了循环里面的轮播图
            for (var i = 0; i < productDetail.imgList.length; i++) {   //循环对象里面的数组的长度.
                imgListHtml += '<li><a class="pic" href="javascript:void(0);"><img src="' + productDetail.imgList[i] + '" /></a></li>'
            }
            //因为这个没有循环,所以可以直接渲染.
            var html = '<h2>' + productDetail.shopName + ' ' + productDetail.disc + '/欢迎选购</h2><div class="shopping_box_bottom"><div class="unit_price">￥<span>' + Number(productDetail.price).toFixed(2) + '</span></div><div class="number">剩余数量：<span>' + productDetail.leftNum + '</span></div></div>';
            $('#imgList').html(imgListHtml);
            $('.shopping_box').html(html);
            //调用绑定事件.
            detail.bind();

            //图片轮播插件
            Touch({
                slideCell: "#slideBox",
                titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层   轮播图小条的地址.
                mainCell: ".bd ul",  //图片的轮播标签地址
                effect: "leftLoop",  //这个是参数,往什么方向轮播.
                autoPage: true,//自动分页
                autoPlay: true //自动播放
            });
        },
        ajax: function (data) {

            // var id = localStorage.getItem('id');   //获取h5本地存储的值.
            detail.id = localStorage.getItem('id');  //这个是在这种对象写法里面的全局变量声明写法.
            $.ajax({
                url: 'http://192.168.7.150:3000/productDetail',
                data: {id: detail.id},
                type: "post",
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                    if (res.resCode == '000') {
                        //alert('成功');
                        detail.render(res);
                    } else {
                        alert('res.resCode');
                    }
                }
            })
        }
    };
    detail.init();
})();