(function () {
    var listView={
        //初始化
        init: function () {
            var b={tap:"01"};
            listView.bindEvent();
            listView.query(b);
        },
        //事件绑定
        bindEvent: function () {
            var self=this;
            //点击头部
            $("#info-tbs").on("click","li", function () {
                var tap=$(this).data("tap");
                var a={tap:tap};
                $(this).addClass('current');
                $(this).siblings().removeClass();
                self.query(a);
            });
            //点击文章列表
            /*$("#info-list").delegate("li","click", function () {
                var id=$(this).data("id");
                location.href='detail.html#'+id;
            });*/
            $("#info-list").on("click","li" ,function () {
                var a=$(this).data("id");
                location.href='detail.html#'+a;
            });
        },
        //页面渲染
        render: function (a) {
            var item;
            var html='';
            var articleList=a.articleList;
            for(var i=0;i<articleList.length;i++){
                item=articleList[i];
                html+='<li data-id="'+item.id+'"><a>'+
                    '<div class="list-pic"><img src="'+item.imgUrl+'"></div>'+
                    '<div class="list-text"><h3>'+item.title+'</h3>'+
                    '<p>'+item.abstract+'</p></div>'+
                    '<div class="clearfix"></div>'+
                    '</a></li>';
            }
            $("#info-list").html(html);
            //$("#disc").text(a.disc);
        },
        //查询列表
        query: function (data) {
            var self=this;
            $.ajax({
                //url:"http://192.168.2.141/qfang/qfangList.php",
                url:"http://192.168.2.68/interface/qfang/qfangList.php",
                type:"get",
                data:data,
                dataType:"json",
                success:function(res){
                    if(res.resCode=="000"){
                        self.render(res);
                    }
                    else{
                        alert("未找到数据");
                    }
                },
                error: function () {
                    alert("网络异常");
                }
            });
        }
    };
    listView.init();
})();