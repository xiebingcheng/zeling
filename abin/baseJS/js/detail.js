// var id = localStorage.getItem('id');

function getvl(name) {
var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
return "";
};


var id = localStorage.getItem('id');
var tap = localStorage.getItem('tap');


function get(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 0) {
                // JSON.stringify(); // 转化为字符串
                // JSON.parse();     // 转化为对象
                var res = JSON.parse(xhr.response);
                // 把后台返回的数据，以参数的方式传给render方法
                render(res);
            } else {
                alert("error");
            }
        }
    }
    xhr.send(null);
}

get('http://192.168.7.150:3000/qfang_detail?id='+id);




function render(res){
	var html = '';
	var title = '<div class="news_details_title">'+res.articleDetail.title+'</div>',
	date = '<div class="news_details_author clearfix"><p class="fl">'+res.articleDetail.createDate+'<ins class="aword"></ins></p><p class="fr">来自Q房网</p></div>',
	abstract = '<p style="margin: 0px; text-indent: 0px;"><span style="font-size: 16px;">'+res.articleDetail.abstract+'</span></p><p style="margin: 0px; text-indent: 0px;"><br></p>',
	img = '<p style="text-align: center; margin: 0px; text-indent: 0px;"><img src="'+ res.articleDetail.imgUrl+'" title="@Q房网" alt="@Q房网" style="width: 100%;"></p><p style="margin: 0px; text-indent: 0px;"><br></p>',
	content = res.articleDetail.content;

	html = title + date + '<div class="news_details_text">' + abstract + img+ content+ '</div>';
	document.getElementsByClassName('page_news_inner')[0].innerHTML = html;
}

document.getElementById('close_side_info').onclick = function(){
	location.href = 'list.html';
}