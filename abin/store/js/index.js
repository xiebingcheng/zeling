var model = {
	//初始化
	init:function(){
		this.queryData(false);
		this.queryShoppingCar();
		this.bindEvent();
	},
	//获取数据
	queryData:function(flag){
		common.ajax('shopListQuery',
			{sessionId:"13423966988",isMore: flag},
			'post',
			function(res){
				if(res.resCode === '000'){
					model.render(res);
				}
			});
		


		// $.ajax({
		// 	url:'http://192.168.7.150:3000/shopListQuery',
		// 	data:{sessionId:"13423966988",isMore: flag},
		// 	type:'post',
		// 	dataType:'json',
		// 	success:function(res){
		// 		if(res.resCode === '000'){
		// 			model.render(res);
		// 		}
		// 	}
		// });
	},
	queryShoppingCar:function(){
		// 声明一个相对于model的全局变量
		model.sum = 0;
		common.ajax('shopCarList',{},'post',function(res){
			for(var i = 0; i<res.list.length;i++){
				model.sum += Number(res.list[i].prdNum);
			}
			if(model.sum != 0){
				$('.car_trolley').text(model.sum).show();
			}
		});
	},
	//渲染页面
	render:function(data){

		var tpl = _.template($('#tpl').html());
		$('#product_list').append(tpl({name:data.list}));

		// var html = '';
		// for(var i = 0; i < data.list.length;i++){
		// 	$('#product_list').append('<li><div class="product_box"><a><img data-id='+data.list[i].id+' src="'+data.list[i].imgUrl+'"></a><h2><a>'+data.list[i].shopName+'</a></h2><div class="clearfix"><div class="product_price fl">￥<span class="product_mpney">'+Number(data.list[i].price).toFixed(2)+'</span></div><div data-id="'+data.list[i].id+'" class="product_car fr"></div></div></div></li>');
		// }
		// $('#product_list').html(html);
	},
	//事件绑定
	bindEvent:function(){
		$('#product_list').on('tap','li img',function(){
			localStorage.setItem('id',$(this).data('id'));
			location.href = 'detail.html';
		});

		// 加载更多
		$('#btn_more').on('tap',function(){
			model.queryData(true);
			// 隐藏掉 加载更多
			$(this).hide();
		});
		$('#product_list').on('tap','li .product_car',function(){
			var id = $(this).attr('data-id');
			console.log(id);
			common.ajax('addToShopCar',{"prdNum":"1","id": id},'post',function(res){
				if(res.resCode ==='000'){
					$('#hasAdd').show();
					setTimeout(function(){
						$('#hasAdd').hide();
					},1000);
				}
			});

			var prdNum = Number($('.car_trolley').text());
				prdNum++;
			$('.car_trolley').text(prdNum).show();

		});
		$('#pop_car').on('tap',function(){
			location.href = 'shoppingCar.html';
		})
	}
};

 model.init();