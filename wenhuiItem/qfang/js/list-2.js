/**
 * Created by Administrator on 2016/4/20.
 */
(function () {
    var listView={
        //初始化
        init:function(){
            var data={tap:"01"};
            this.event();
            this.querylist(data);
        },
        //事件绑定
        event: function () {
            var self=this;
            //点击头部
            $("#info-tbs li").on("click", function () {
                var tap=this.data("tap");
                var data={tap:"tap"};
                self.querylist(data);
            });
        },
        //渲染页面
        render: function () {
            var item;
            var html='';
            var articleList=res.articleList;
            for(var i=0;i<articleList.length;i++){
                item=articleList[i];
                html+='<li data-id="1000"><a>'+
                    '<div class="list-pic"><img src="images/CvtcKVcMTHGAY457AABB58765hk787.jpg"></div>'+
                    '<div class="list-text"><h3>风暴来袭！住建部拟大规模整顿房地产中介</h3>'+
                    '<p>上海、深圳相继出台的地方性房地产市场调控政策并不是房地产政策工具发挥作用的阶段性完结。在与四个特大型城市积极沟通要求必须确'+
                    '保房地产市场稳定的同时，作为房地产的主管部门，住房和城乡建设部又将目光盯准了房地产中介机构.</p></div>'+
                    '</a></li>';

            }
            $("#info-list").html(html);
        },
        //查询列表
        querylist: function (data) {
            $.ajax({
                url:"192.168.2.44",
                type:"get",
                data:data,
                dataType:"json",
                success: function (res) {
                    if(res.resCord=="000"){
                        self.rander(res);

                    }
                    else{
                        alert("未找到数据");
                    }
                },error:function(){
                    alert("网络异常,请稍后登录")
                }

            })
        }
    };
    listView.init();
})();