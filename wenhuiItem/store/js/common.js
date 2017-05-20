(function () {
    var ajaxView={
        init: function () {
        },
        webUrl: function (insName) {
            if(this.env=="dev"){
                //测试环境
            }
            else{
                //开发环境
                return "http://192.168.2.141:3000/"+insName;
            }
        },
        ajax: function (url,data,callback) {
            url=common.webUrl(url);
            $.ajax({
                url:url,
                type:"post",
                data:data,
                dataType:"json",
                success: function (a) {
                    if(a.resCode=="000"){
                        callback(a);
                    }
                    else{
                        alert(a.resMsg);
                    }
                },error: function () {
                    alert("网络异常");
                }
            });
        }
    };
    window.common=ajaxView;
})();
