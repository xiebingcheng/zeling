/**
 * Created by Administrator on 2016/4/22.
 */
(function(){
    var detailList={
        //初始化
        init: function () {
            var id=location.hash.slice(1);
            var data={id:id};
            this.query(data);
        },
        //页面渲染
        render: function (a) {
            var artDet= a.articleDetail;
            $("#title").html(artDet.title);
            $("#createDate").html(artDet.createDate);
            $("#abstract").html(artDet.abstract);
            $("#content").html(artDet.content);
        },
        //查询列表
        query: function (data) {
            var self=this;
            $.ajax({
                //url:"http://192.168.2.44/qfang/interface/qfangDetail.php",
                //url:"http://192.168.2.68/interface/qfang/qfangDetail.php",
                url:"http://192.168.2.44/qfang/qfangdata/detail.json",
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
                    alert("网络异常,请稍后重试");
                }

            });
        }
    };
    detailList.init();
})();