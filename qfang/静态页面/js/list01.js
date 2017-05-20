function get(url) {
    var xhr = new XMLHttpRequest();  //创建这个对象是原生ajax的精华
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 0) {  //==0 是为了有时候本地调用json数据
                // JSON.stringify(); // 转化为字符串
                // JSON.parse();     // 转化为对象
                var res = JSON.parse(xhr.response);
                // 把后台返回的数据，以参数的方式传给render方法
                render(res);
            } else {
                alert("error");
            }
        }
    };
    xhr.send(null);
}
var baseUrl="http://192.168.7.150:3000/";  //设置一个全局变量,放域名,如果域名变了,方便更改.

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

//get(baseUrl+'qfang_list?tap=01');


//   渲染页面
function render(res) {
    console.log(res);  //打印在控制台是为了看里面的数据,好写渲染
    var html = "";  //用来存放渲染的所有标签
    document.getElementById("topImg").src = res.topUrl; //渲染第一张大图
    document.getElementById("disc").innerHTML = res.disc;  //渲染描述
    for (var i = 0; i < res.articleList.length; i++) {
        var title = res.articleList[i].title;
        var abstract = res.articleList[i].abstract;
        var imgUrl = res.articleList[i].imgUrl;
        var id = res.articleList[i].id;   //这个id是把后台渲染出多条数据的保证.
        //可以在渲染的时候,加入onclick事件
        html += ' <li onclick="gotoDetail(this)" data-id="' + id + '"><a><div class="list-pic"><img src="' + imgUrl + '"></div> <div class="list-text"><h3>' + title + '</h3> <p>' + abstract + ' </p> </div> <div class="clearfix"></div> </a></li>';
    }

    document.getElementById('list').innerHTML = html;  //渲染到id是list的ul标签上.

}

//老师的写法   切换效果 (这个会产生闭包)
 /*   var liArr = document.getElementById('info-tbs').childNodes;*/
/*for (var i = 0; i < liArr.length; i++) {      //第一次循环数组
    liArr[i].onclick = function () {
        for (var m = 0; m < liArr.length; m++) {   //第二次循环,目的是为了下一步,清空class.
            liArr[m].className = '';  //先清空所有li中的class
        }
        this.className = 'current';  //然后点击哪个,添加哪个class
    }
}*/

//老师的第二种方法,直接在页面上添加一个点击事件.  切换效果
function changTab(a){  //在页面上调用
//点击后添加样式在li添加class
    var liArr = document.getElementById('info-tbs').childNodes;
    for (var m = 0; m < liArr.length; m++) {
        liArr[m].className = '';  //先清空所有li中的class
    }
    a.className = 'current';  //然后点击哪个,添加哪个class
    //设置一个全局变量,当运行到这个函数的时候,才用这个变量覆盖全部相同变量
     lastTap=a['attributes']['data-tap']['value'];  //第一个值是找到这个数组,第二个是找到这个ID,第三个是找到他的ID名字
    get(baseUrl + 'qfang_list?tap='+lastTap);
}

//点击文章列表,跳转页面
function gotoDetail(obj){
    console.dir(obj);  //dir这是关于那个在控制台看那个data-tap="01"的属性的. 要不要无所谓,只是想看一下里面的数值

    //要这个自己定义的data-tap="01"的这三个东西,用数组的形式装在一个变量里
    var id=obj['attributes']['data-id']['value'];  //第一个值是找到这个数组,第二个是找到这个ID,第三个是找到他的ID名字

    //这个是H5的本地存储方法.
    localStorage.setItem('id',id);

    localStorage.setItem('tap',lastTap);  //这个是为了跳转页面回来时用的.还是会到原来的标签上.
    //如果用h5方法存在本地,就不需要问号后面的东西.
    location.href = "detail.html";

    //这个是老方法,放数据在URL上--指的是问号后那个+id,
    //location.href = "detail.html?id="+id;  //点击跳转的方法


}
