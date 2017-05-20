var common = {
	baseUrl:'http://192.168.7.150:3000/',
	init:function(){
		// 在页面上添加遮罩层
		common.addLoading();
	},
	addLoading:function(){
		$('body').append('<div id="loading" style="width: 100%;height: 100%;display: none;position: fixed;background-color: rgba(0, 0, 0, 0.7);z-index: 1000;top: 0;left: 0;"><p style="width: 100%;font-weight: bold;color: white;font-size: 30px;position: absolute;top: 50%;margin-left: 40%;width: 300px;border: 1px solid;padding: 20px;border-radius: 10px;background-color: #4C4C4C;margin-top: -60px;">加载中。。。</p></div>');
	},
	loadingBegin:function(){
				// var add = function(a,b){
				// 	return function(){
				// 		console.log(a+b);
				// 	}
				// }
				// var timer = setInterval(add(1,2),1000);
				common.timer = setInterval(function(){
					var text = $('#loading p').text();
				
					if(text.length >= 7){
						$('#loading p').text('加载中。');
					} else {
						text+='。';
						$('#loading p').text(text);
					}
				},500);
		$('#loading').show();
	},
	loadingFinish:function(){
		clearInterval(common.timer);
		$('#loading').hide();
	},
	ajax:function(url,data,type,successCallBack){
		
		data.sessionId = localStorage.getItem('sessionId');
		
		$.ajax({
			url: common.baseUrl + url,
			data: data,
			type: type,
			dataType:'json',
			success:function(res){
				// 钩子 回调函数 callback
				successCallBack && successCallBack(res);

				// console.log(res);
			},
			beforeSend:function(){
				common.loadingBegin();
			},
			complete:function(){
				common.loadingFinish();
			}
		});
	},
	/*
	localStorage
	*/
	setData:function(key,value){
		if(typeof value === 'object'){
			value = JSON.stringify(value);
		}
		localStorage.setItem(key,value);
	},
	getData:function(key){
		var result = localStorage.getItem(key);
		try{
			return JSON.parse(result);
		}catch(e){
			return result;
		}
	},
	removeData:function(key){
		localStorage.removeItem(key);
	}
};

common.init();
