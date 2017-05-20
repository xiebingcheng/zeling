(function () {
    var facetoface={
        //初始化
        init: function () {
            this.event();
        },
        //绑定事件
        event: function () {
            $("#face_pay").on("click",function(){
                this.orderList=ab.getData("orderList");
                var sum=0;
                var data=this.orderList;
                for(var i in data){
                    sum+=data[i].price*data[i].prdNum;
                }
                if($("#pay_value").val()==sum){
                    location.href="payResult.html";
                }
                else{
                    alert("请输入正确的金额");
                }
            });
        },
        //页面渲染
        render: function (data) {
            var sum=0;
            for(var i in data){
                sum+=data[i].price*data[i].prdNum;
            }
        }
    };
    facetoface.init();
})();