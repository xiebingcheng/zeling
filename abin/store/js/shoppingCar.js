// 自执行
(function () {
    var model = {
        init: function () {
            // 初始化一个变量，方便弹框里判断最大值
            this.leftNum = -99999;
            // 初始化一个变量，用于保留弹框前的上下文对象
            this.clickedObject = null;
            this.queryShoppingCarList();
        },
        queryShoppingCarList: function () {
            common.ajax('shopCarList', {}, 'post', function (res) {
                if (res.resCode === '000') {
                    model.render(res);
                }
            });
        },
        render: function (data) {
            var html = '';
            for (var i = 0; i < data.list.length; i++) {
                var obj = data.list[i];
                html += '<li class="select"><div data-id="' + obj.id + '" class="no_select select_ok"></div><div class="shopping_img"><a href="javascript:void(0);"><img src="' + obj.imgUrl + '"></a></div><div class="shopping_box"><h2>' + obj.shopName + '</h2><div class="shopping_box_bottom"><div class="unit_price">￥<span>' + Number(obj.price).toFixed(2) + '</span></div><div class="number">x<span>' + obj.prdNum + '</span></div><!--编辑状态加减框--><div class="number_content dsn"><div class="minus_icon js_minus"></div><div data-leftnum="' + obj.leftNum + '" class="number_edit">' + obj.prdNum + '</div><div class="add_icon js_add"></div></div></div></div></li>';
            }
            $('#shopping_list').html(html);

            if($('#shopping_list li').length == 0){
            	$('#floatbar_bottom').hide();
                $('#empty_cart').show();
            } else {
            	this.bindEvent();
            	model.totalPrice();
            }
        },
        /*
        计算价格
        */
        totalPrice: function () {
            var arr = $('#shopping_list .select_ok');
            var priceArr = [];
            var numArr = [];
            // 遍历页面上所有选中的元素，push这些元素的单价和数量
            for (var i = 0; i < $('#shopping_list .select_ok').length; i++) {
                priceArr.push($('#shopping_list .select_ok').eq(i).siblings('.shopping_box').find('.unit_price').children().text());
                numArr.push($('#shopping_list .select_ok').eq(i).siblings('.shopping_box').find('.number').children().text());
            }
            // 声明一个总价格
            var totalPrice = 0;
            for (var i = 0; i < priceArr.length; i++) {
                totalPrice += priceArr[i] * numArr[i];
            }
            $('#pay_account').text(totalPrice.toFixed(2));
        },
        bindEvent: function () {
            // 编辑按钮
            // 正在编辑状态?
            var isEdit = false;
            $('#car_edit').on('tap', function () {
                $('.number').toggle();
                $('.number_content').toggle();
                $('#account_btn').toggle();
                $('#delete_btn').toggle();
                if (isEdit) {
                    // 非编辑状态
                    isEdit = false;
                    $(this).text('编辑');
                } else {
                    // 编辑状态
                    isEdit = true;
                    $(this).text('完成');
                }
            });
            // 单选
            $('#shopping_list .no_select').on('tap', function () {
                var all = $('#shopping_list li').length;
                if ($(this).hasClass('select_ok')) {
                    $(this).removeClass('select_ok');
                } else {
                    $(this).addClass('select_ok');
                }

                var select = $('#shopping_list .select_ok').length;
                if (select == all) {
                    $('#select_all .no_select').addClass('select_ok');
                } else {
                    $('#select_all .no_select').removeClass('select_ok');
                }

                model.totalPrice();

            });
            // 全选
            $('#select_all .no_select').on('tap', function () {
                if ($(this).hasClass('select_ok')) {
                    $('.no_select').removeClass('select_ok');
                } else {
                    $('.no_select').addClass('select_ok');
                }
                model.totalPrice();

            });
            /*
				每项产品上的'-'按钮
            */
            $('.js_minus').on('tap', function () {
                var num = $(this).siblings('.number_edit').text();
                num--;
                if (num >= 1) {
                    $(this).siblings('.number_edit').text(num);
                    $(this).parent().prev().children('span').text(num);
                }
                model.totalPrice();

            });
            /*
				每项产品上的'+'按钮
            */
            $('.js_add').on('tap', function () {
                var leftNum = $(this).siblings('.number_edit').attr('data-leftnum');
                var num = $(this).siblings('.number_edit').text();
                num++;
                if (num <= leftNum) {
                    $(this).siblings('.number_edit').text(num);
                    $(this).parent().prev().children('span').text(num);
                }
                model.totalPrice();

            });
            $('.number_edit').on('tap', function () {
                // 弹窗
                model.leftNum = $(this).attr('data-leftnum');
                model.clickedObject = $(this);
                $('#number_input').val($(this).text());
                $('#add_minus_Pop').show();
            });
            // 取消
            $('#add_minus_Pop .pop_remove_btn').on('tap', function () {
                $('#add_minus_Pop').hide();
            });
            // 确定
            $('#add_minus_Pop .pop_sure_btn').on('tap', function () {
                model.clickedObject.text($('#number_input').val()).parent().prev().children('span').text($('#number_input').val());
                model.totalPrice();
                $('#add_minus_Pop').hide();
            });
            // 弹框上的'-'按钮
            $('#add_minus_Pop .js_minus').on('tap', function () {
                var num = $('#number_input').val();
                num--;
                if (num >= 1) {
                    $('#number_input').val(num);
                }
            });
            // 弹框上的'+'按钮
            $('#add_minus_Pop .js_add').on('tap', function () {
                var num = $('#number_input').val();
                num++;
                if (num <= model.leftNum) {
                    $('#number_input').val(num);
                }
            });
            // 给输入框绑定键盘事件
            $('#number_input').on('keyup', function () {
                var value = Number($(this).val());
                if (value > model.leftNum) {
                    $(this).val(model.leftNum);
                } else if (value < 1) {
                    $(this).val(1);
                }
            });
            // 删除
            $('#delete_btn').on('tap', function () {
				var idArr = [];
				// 获取页面上选择的产品项数
                for (var i = 0; i < $('#shopping_list .select_ok').length; i++) {
                    idArr.push($('#shopping_list .select_ok').eq(i).attr('data-id'));
                }
                // 如果一项都没有，提示"未选择商品"
                if (idArr.length == 0) {
                    $('#none_Select').show();
                    setTimeout(function () {
                        $('#none_Select').hide();
                    }, 1000);
                } else {
	                $('#sure_Del').show();
                }

            });
            $('#sure_Del_btn .pop_remove_btn').on('tap', function () {
                $('#sure_Del').hide();
            });
            $('#sure_Del_btn .pop_sure_btn').on('tap', function () {
                var idArr = [];
                // 接口需要一个格式为['2220','2221'...]的参数，遍历并且push到idArr里
                for (var i = 0; i < $('#shopping_list .select_ok').length; i++) {
                    idArr.push($('#shopping_list .select_ok').eq(i).attr('data-id'));
                }
                    common.ajax('deleteShopCar', {id: idArr}, 'post', function (res) {
                        if (res.resCode === '000') {
                        	// 将页面上所有选择的元素移除，因为'删除'请求已经成功，不需要在页面上保留这些元素
                            $('#shopping_list .select_ok').parent().remove();
                            model.totalPrice();
                            // 如果页面上一项商品都没有，显示'空空如也'
                            if($('#shopping_list li').length == 0){
                            	$('#floatbar_bottom').hide();
                            	$('#empty_cart').show();
                            }
                        }
                    });

                $('#sure_Del').hide();
            });
            // 去结算
            $('#account_btn').on('tap',function(){
            	// 存放结果
            	var arr= [];
            	// 声明一个变量,来存放页面上被选中的元素
            	var selectArr = $('#shopping_list .select_ok');
            	for(var i = 0; i < selectArr.length;i++){
            		var obj = {};
            		obj.id = selectArr.eq(i).attr('data-id');
            		obj.imgUrl = selectArr.eq(i).next().find('img').attr('src');
            		obj.prdNum = selectArr.eq(i).siblings('.shopping_box').find('.number span').text();
            		obj.price = selectArr.eq(i).siblings('.shopping_box').find('.unit_price span').text();
            		obj.shopName = selectArr.eq(i).siblings('.shopping_box').find('h2').text();
            		arr.push(obj);
            	}
            	common.setData('arr',arr);
            	location.href = 'submitOrder.html';
            });

        }
    }
    model.init();
})();

