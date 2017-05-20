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

//这个是老方法的获取url的函数,网上有现成的.
/*function getvl(name) {
var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
return "";
};*/

/*
 渲染页面
 */
function render(res) {
    console.log(res);
    // 用来存放想要渲染的所有标签
    var html = '';
    document.getElementById('topImg').src = res.topUrl;  //渲染第一张大图
    document.getElementById('disc').innerHTML = res.disc;   //渲染描述
    for (var i = 0; i < res.articleList.length; i++) {
        var title = res.articleList[i].title;
        var abstract = res.articleList[i].abstract;
        var imgUrl = res.articleList[i].imgUrl;
        var id = res.articleList[i].id;
        // 在渲染过程中，添加onclick事件
        html += '<li onclick="gotoDetail(this)" data-id="' + id + '"><a><div class="list-pic"><img src="' + imgUrl + '"></div><div class="list-text"><h3>' + title + '</h3><p>' + abstract + '</p></div><div class="clearfix"></div></a></li>';
    }

    document.getElementById('list').innerHTML = html;

}


// 设置一个全局变量，存放域名，方便修改
var baseUrl = 'http://192.168.7.150:3000/';
// var lastTap = getvl('tap')?getvl('tap'):'01';
var lastTap = localStorage.getItem('tap') || '01';
localStorage.removeItem('tap');
var liArr = document.getElementById('info-tbs').getElementsByTagName('li');


for (var m = 0; m < liArr.length; m++) {
        liArr[m].className = '';
        if(liArr[m].attributes['data-tap'].value == lastTap){
                liArr[m].className = 'current';
        }
    }

get(baseUrl + 'qfang_list?tap=' + lastTap);

// 切换tab效果
// 声明一个全局变量，默认值为百科(tap:01)
// var tap = '01';

function changeTab(obj) {  //在页面上调用
    for (var m = 0; m < liArr.length; m++) {
        liArr[m].className = '';   //先清空所有li中的class
    }
    obj.className = 'current';  //然后点击哪个,添加哪个class
    // 点击tap的时候，获取tap的值
    // tap = obj['attributes']['data-tap']['value'];
    lastTap = obj['attributes']['data-tap']['value'];  //设一个全局变量,当运行到这个函数的时候,才用这个变量覆盖全部相同变量
    get(baseUrl + 'qfang_list?tap='+lastTap);
}

function gotoDetail(obj){
    var id = obj['attributes']['data-id']['value'];
    localStorage.setItem('id',id);
    // localStorage.setItem('tap',tap);
    localStorage.setItem('tap',lastTap);

    // location.href = "detail.html?id="+id +'&tap='+tap;
    location.href = "detail.html";

}