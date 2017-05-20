(function(){
	var model = {
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

			this.queryData();
			this.queryCoupon();
			this.bindEvent();
		},
		queryData:function(){
			this.res = common.getData('arr');
			this.render();
		},
		queryCoupon:function(){
			common.ajax('coupon',{},'post',function(res){
				if(res.resCode === '000'){
					model.renderCouponList(res);
				}
			})
		},
		renderCouponList:function(data){
			// var couponsTpl1 = _.template($('#coupons1').html());
			// var couponsHtml1 = couponsTpl1({data:data.list,orderMoney:model.orderMoney,date:model.effectiveDate});
			// $('#coupons_list').html(couponsHtml1);

			var couponsTpl2 = _.template($('#coupons2').html());
			var couponsHtml2 = couponsTpl2({data:data.list});
			$('#coupons_list').html(couponsHtml2);
		},
		render:function(){
			var listTpl = _.template($('#list').html());
			var resultHtml = listTpl({data:this.res});
			$('#good_list').html(resultHtml);

			for(var i = 0; i < this.res.length;i++){
				this.orderMoney+= this.res[i].price * this.res[i].prdNum;
			}
			$('#pay_account').text(Number(this.orderMoney).toFixed(2));
			// 订单金额-折扣金额(初始化默认为0)
			$('#need_pay').text(Number(this.orderMoney - this.amount).toFixed(2));
		},
		bindEvent:function(){
			$('#good_coupons').on('tap',function(){
				console.log(model.index);
				$('#coupons_list li').eq(model.index).addClass('select').siblings().removeClass('select');
				$('#coupons_Pop').show();
			});
			// 取消
			$('.pop_remove_btn').on('tap',function(){
				$('#coupons_Pop').hide();
			});
			// 确定
			$('.pop_sure_btn').on('tap',function(){
				if(model.orderMoney < model.minBuyAmount){
					alert('优惠券无法使用，购买金额不足!');
				} else if(+new Date() > +new Date(model.effectiveDate)){
					alert('优惠券已过期,请重新选择!');
				} else {
					// 如果条件满足，把被选中的元素的data-index存起来
					model.index = $('#coupons_list .select').attr('data-index');

					if(model.effectiveDate == '2222-12-31'){
					$('#good_coupons .container_right').text('不使用优惠券');
					} else {
					$('#good_coupons .container_right').text(model.amount + '元(满'+model.minBuyAmount+'元可用)');
					}
					$('#order_discount').text(Number(model.amount).toFixed(2));
					// 订单金额-折扣金额(初始化默认为0)
					$('#need_pay').text(Number(model.orderMoney - model.amount).toFixed(2));

					$('#coupons_Pop').hide();
				}
			});
			//点击优惠券中的圆点,选择优惠券.
			$('#coupons_list').on('tap','li',function(){
				$(this).addClass('select').siblings().removeClass('select');
				model.minBuyAmount= $(this).attr('data-minBuyAmount');
				model.effectiveDate = $(this).attr('data-effectiveDate');
				model.amount = $(this).attr('data-amount');
			});
		}
	}
	model.init();
})();