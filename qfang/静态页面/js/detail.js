//这个是对应上一个页面H5的存储方法
var id = localStorage.getItem('id');
var tap = localStorage.getItem('tap');

//这个是老的存储方法解析所需要的函数
/*function getvl(name) {
 var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
 if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
 return "";
 };
 var id = getvl('id'); //调用老方法这个函数*/

//原生ajax
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

get('http://192.168.7.150:3000/qfang_detail?id=' + id);

function render(res) {
    console.log(res);  //还是老套路,为了看res传了什么来
    var html = "",
        articleDetail = res.articleDetail.length;

    var title = res.articleDetail.title,
        abstract = res.articleDetail.abstract,
        imgUrl = res.articleDetail.imgUrl,
        createDate = res.articleDetail.createDate,
        content = res.articleDetail.content;
    html += ' <div class="page_news_inner" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);"> <div class="news_details_title">"' + title + '"</div> <div class="news_details_author clearfix"><p class="fl">"' + createDate + '"<ins class="aword"></ins></p><p class="fr">来自Q房网</p></div> <div class="news_details_text"> <p style="margin: 0px; text-indent: 0px;"><span style="font-size: 16px;">"' + abstract + '"</span></p><p style="margin: 0px; text-indent: 0px;"><br></p><p style="text-align: center; margin: 0px; text-indent: 0px;"><img src="' + imgUrl + '" title="@Q房网" alt="@Q房网" style="width: 100%;"></p> "' + content + '"</div> </div>';


    document.getElementById('detail').innerHTML = html;

}

//这个是点击返回时触发的onclick事件.然后跳转到list.html页面.
document.getElementById('close_side_info').onclick = function() {
    location.href = 'list.html';
};