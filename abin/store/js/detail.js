var model = {
	init:function(){
		model.queryData();
	},
	queryData:function(){
		model.id = localStorage.getItem('id');
		$.ajax({
			url:'http://192.168.7.150:3000/productDetail',
			data:{id: model.id},
			type:'post',
			dataType:'json',
			success:function(res){
				if(res.resCode === '000'){
					model.render(res);
				}
			}
		});
	},
	render:function(data){
		var productDetail = data.productDetail;

		var imgListHtml = '';
		for(var i = 0; i < productDetail.imgList.length;i++){
			imgListHtml+='<li><a class="pic" href="#"><img src="'+productDetail.imgList[i]+'" /></a></li>'
		}

		var html = '<h2>'+productDetail.shopName+' '+productDetail.disc+'</h2><div class="shopping_box_bottom"><div class="unit_price">￥<span>'+Number(productDetail.price).toFixed(2)+'</span></div><div class="number">剩余数量：<span>'+productDetail.leftNum+'</span></div></div>';
		$('#imgList').html(imgListHtml);
		$('.shopping_box').html(html);

		model.bindEvents();
		// Touch({
  //       slideCell:"#slideBox",
  //       titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
  //       mainCell:".bd ul", 
  //       effect:"leftLoop", 
  //       autoPage:true,//自动分页
  //       autoPlay:true, //自动播放
  //       });
	},
	bindEvents:function(){
		// 减少
		$('#section2 .js_minus').on('tap',function(){
			var num = $('.js_num').text();
			if(num != '1'){
				num--;
				$('.js_num').text(num);
			}
		});
		// 增加
		$('#section2 .js_add').on('tap',function(){
			var num = $('.js_num').text();
			var max = $('.number span').text();
			if(num != max){
				num++;
				$('.js_num').text(num);
			}
		});
		// 点击后会弹框的数字
		$('.js_num').on('tap',function(){

			$('#number_input').val($(this).text());
			$('#add_minus_Pop').show();
		});
		// 取消
		$('.pop_remove_btn').on('tap',function(){

			$('#add_minus_Pop').hide();
		});
		// 确定
		$('.pop_sure_btn').on('tap',function(){
			$('.js_num').text(parseInt($('#number_input').val()));
			$('#add_minus_Pop').hide();

		});
		// 弹出框的减少
		$('#add_minus_Pop .js_minus').on('tap',function(){
			var num = $('#number_input').val();
			if(num != '1'){
				num--;
				$('#number_input').val(num);
			}
		});
		// 弹出框的增加
		$('#add_minus_Pop .js_add').on('tap',function(){
			var num = $('#number_input').val();
			var max = $('.number span').text();
			if(num != max){
				num++;
				$('#number_input').val(num);
			}
		});
		// 输入框的键盘事件
		$('#number_input').on('keyup',function(){
			var value = Number($(this).val());
			var max = Number($('.number span').text());
			if(value > max){
				$(this).val(max);
			} else if(value < 1){
				$(this).val(1);
			}
		});
		// 加入购物车
		$('#join_car').on('tap',function(){
			$.ajax({
				url:'http://192.168.7.150:3000/addToShopCar',
				data:{sessionId:'13423966988',id:model.id,prdNum:$('.js_num').text()},
				type:'post',
				dataType:'json',
				success:function(){

				}
			});
		});
	}
};

model.init();