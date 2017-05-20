(function () {
    var listView={
        //初始化
        init: function () {
            var begin={tap:"01"};
            this.query(begin);
            this.event();
        },
        //绑定事件
        event: function () {
            var self=this;
            //点击头部
            $("#info-tbs li").click( function () {
                var data=$(this).data("tap");
                var a={tap:"data"};
                self.query(a);
            });
            //点击文章内容
            $("#info-list").on("click","li", function () {
                var loca=$(this).data("id");
                location.href="detail.html#"+loca;
            });
        },
        //页面渲染
        render: function (a) {
            var item;
            var html='';
            var articleList= a.articleList;
            for (var i=0;i<articleList.length;i++){
                item=articleList[i];
                html+='<li data-id="'+item.id+'"><a>'+
                    '<div class="list-pic"><img src="'+item.imgUrl+'"></div>'+
                    '<div class="list-text"><h3>'+item.title+'</h3>'+
                    '<p>'+item.abstract+'</p></div>'+
                    '<div class="clearfix"></div>'+
                    '</a></li>';
            }
            $("#info-list").html(html);
        },
        query: function (data) {
            var self=this;
            $.ajax({
                //url:"http://192.168.2.44/qfang/interface/qfangList.php",
                //url:"http://192.168.2.68/interface/qfang/qfangList.php",
                //url:"http://192.168.2.141/qfang/qfangList.php",
                url:"http://192.168.2.44/qfang/qfangdata/list.json",
                type:"get",
                dataType:"json",
                data:data,
                success: function (res) {
                    if(res.resCode=="000"){
                        self.render(res);
                    }
                    else{
                        alert("未找到数据");
                    }
                },
                error: function () {
                    alert("网络异常,请稍后再试");
                }
            });
        }
    };
    listView.init();
})();