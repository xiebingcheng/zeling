(function(){
    var listView={
        //初始化
        init:function(){
            var data={tap:"01"};
            this.bindEvent();
            this.queryList(data);
        },
        //绑定事件
        bindEvent:function(){
            var self=this;
            //点击头部
            $("#info-tbs li").on("click",function(){
                var tap=$(this).data("tap");
                var data={tap:tap};
                self.queryList(data);

            });
        },
        //渲染页面
        render:function(res){
            var item;
            var html="";
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
        queryList:function(data){
            var self=this;
            $.ajax({
                url:"http://192.168.2.44/D:/source/qfang/json/qfangList.php",
                type:"get",
                data:data,
                dataType:"json",
                success: function (res) {
                    if(res.resCode=="000"){
                        //
                        self.render(res);         //调用渲染发放
                    }else{
                        //alert(res.resMsg);
                        alert("未找到数据");
                    }
                },error:function(){
                    alert("网络异常，请稍后登录");
                }

            });
        }
    };
    listView.init();
})();
