(function () {
    var detaliList={
        //初始化
        init: function () {
            var id=location.hash.slice(1);
            var data={id:id};
            this.quetyDetail(data);
        },
        //渲染页面
        renderDetail: function (a) {
            var articleDetail= a.articleDetail;
            $("#title").html(articleDetail.title);
            $("#createDate").html(articleDetail.createDate);
            $("#abstract").html(articleDetail.abstract);
            $("#content").html(articleDetail.content);
        },
        //查询列表
        quetyDetail:function(data){
            var self=this;
            $.ajax({
                url:"http://192.168.2.68/interface/qfang/qfangDetail.php",
                type:"get",
                data:data,
                dataType:"json",
                success: function (res) {
                    if(res.resCode=="000"){
                        self.renderDetail(res);
                    }
                    else{
                        alert("未找到数据");
                    }
                },
                error:function(){
                    alert("网络异常");
                }
            });
        }
    };
    detaliList.init();
})();