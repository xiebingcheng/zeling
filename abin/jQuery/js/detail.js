var id = localStorage.getItem('id');

$.ajax({
	url:'http://192.168.7.150:3000/qfang_detail',
	data:{id:id},
	type:'get',
	dataType:'json',
	success:function(res){
		if(res.resCode == '000'){
			var html = '';
	var title = '<div class="news_details_title">'+res.articleDetail.title+'</div>',
	date = '<div class="news_details_author clearfix"><p class="fl">'+res.articleDetail.createDate+'<ins class="aword"></ins></p><p class="fr">来自Q房网</p></div>',
	abstract = '<p style="margin: 0px; text-indent: 0px;"><span style="font-size: 16px;">'+res.articleDetail.abstract+'</span></p><p style="margin: 0px; text-indent: 0px;"><br></p>',
	img = '<p style="text-align: center; margin: 0px; text-indent: 0px;"><img src="'+ res.articleDetail.imgUrl+'" title="@Q房网" alt="@Q房网" style="width: 100%;"></p><p style="margin: 0px; text-indent: 0px;"><br></p>',
	content = res.articleDetail.content;

	html = title + date + '<div class="news_details_text">' + abstract + img+ content+ '</div>';
	document.getElementsByClassName('page_news_inner')[0].innerHTML = html;

		}
	}
});

$('#close_side_info').on('click',function(){
	location.href = 'list.html';
});