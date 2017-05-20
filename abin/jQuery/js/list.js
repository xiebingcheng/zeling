/*
	初始化请求数据
*/
// 刚进该页面的时候，去查找本地存储里是否有tap的值，如果没有，默认为01
var tap = localStorage.getItem('tap') || '01';
localStorage.removeItem('tap');
render(tap);
$('#info-tbs li[data-tap='+ tap+ ']').addClass('current').siblings().removeClass();

/*
	tap切换
*/
$('#info-tbs li').on('click',function(){
	// 给当前元素添加类current，再选择其他同级的兄弟元素，移除所有的类
	$(this).addClass('current').siblings().removeClass();
	tap = $(this).attr('data-tap');
	// tap = $(this).data('tap');
	render(tap);
});

/*
	发送ajax请求，渲染页面
*/
function render(tap){
	console.log(tap);
	$.ajax({
		// 接口地址
		url:'http://192.168.7.150:3000/qfang_list',
		// 参数
		data:{tap:tap},
		type:'get',
		dataType:'json',
		// res:形参，代表着请求回来的数据
		success:function(res){
			// 如果resCode=000 说明请求成功，可以渲染页面
			if(res.resCode == '000'){
				// 用来存放想要渲染的所有标签
    			var html = '';
    			// document.getElementById('topImg').src = res.topUrl;
    			//  ||
    			$('#topImg').attr('src',res.topUrl);

    			//document.getElementById('disc').innerHTML = res.disc;
    			//  ||
    			$('#disc').text(res.disc);

    			//var html = '';
    			$.each(res.articleList,function(index,obj){
        			html += '<li data-id="' + obj.id + '"><a><div class="list-pic"><img src="' + obj.imgUrl + '"></div><div class="list-text"><h3>' + obj.title + '</h3><p>' + obj.abstract + '</p></div><div class="clearfix"></div></a></li>';
    			});
    			$('#list').html(html);
			}
		}
	});
}


/*
	跳转详情
*/
$('#list').on('click','li',function(){
	var id = $(this).data('id');
	localStorage.setItem('id',id);
	localStorage.setItem('tap',tap);

	location.href = 'detail.html';
});