(function () {
    var ajaxView={
        init: function () {
          this.addloading();
          this.ajaxSetting();
        },
        webUrl: function (ins) {
            //访问老师的服务器地址
            return "http://192.168.2.141/xiaoniu"+ins;
            //return "http://192.168.2.102:3000/"+ins;
            //访问公司电脑的服务器地址
            /*if(ins=="shopListQuery"||ins=="register"||ins=="login"||ins=="addToShopCar"||ins=="shopCarList"){
                 return "http://192.168.2.44/store/storedata/prdList.json";
             }
             else if(ins=="productDetail"){
                 return "http://192.168.2.44/store/storedata/detail.json";
             }*/
            //访问家里电脑的服务器地址
            /*if(ins=="shopListQuery"||ins=="register"||ins=="login"||ins=="addToShopCar"||ins=="shopCarList"){
                return "http://localhost/store/storedata/prdList.json";
            }
            else if(ins=="productDetail"){
                return "http://localhost/store/storedata/detail.json";
            }*/
        },
        ajax: function (url,data,callback) {
            data.sessionId=common.getData("abc");
            url= common.webUrl(url);
            $.ajax({
                url:url,
                data:data,
                dataType:"json",
                type:"post",
                success: function (res) {
                    if(res.resCode=="000"){
                        callback(res);
                    }
                    else{
                        alert(res.resMsg);
                    }
                },error: function () {
                    alert("网络异常,请稍后重试");
                }
            });
        },
        /*
            让localStorage存储数据
            name 自定义命名
            obj 传递数据
         */
        //设置数据
        setData: function (name,obj) {
                if(typeof obj==="object"){
                    obj=JSON.stringify(obj);//把原来是对象的类型转换成字符串类型(或者说是JSON类型)
                }
            localStorage.setItem(name,obj);
        },
        /**
         * 获取相对应的值
         * @param name
         * @returns {*}
         */
        //获取数据
        getData: function (name) {
            try{
                var data;
                var obj=localStorage.getItem(name);
                data=JSON.parse(obj);//转换成JSON格式
            }catch(e){
                data=obj;
            }
            return data;
        },
        //页面加载
        addloading: function () {
            var html='<div id="loading" class="loadingBox"><p>加载中<span id="font-str"></span></p></div>';
            $("body").append(html);
        },
        //加载
        loadingBegin: function () {
            $("#loading").show();
            var str=$("#font-str");
            common.int=setInterval(function () {// common.int:声明变量,方便后面clearInterval的调用.
                str.append('.');
                if(str.text().length>20){
                    str.text('.');
                }
            },100);
        },
        loadingFinish: function () {
            $("#loading").hide();
            clearInterval(common.int);
        },
        ajaxSetting: function () {
            $.ajaxSettings.beforeSend = function () {
                common.loadingBegin();
            };
            $.ajaxSettings.error = function () {
                common.loadingFinish();
            };
            $.ajaxSettings.complete = function () {
                common.loadingFinish();
            }
        },
        //获取URL地址里面的id和shopname
        getParam: function (name) {
            var url=location.search,
                reg=new RegExp(name+'=[^&]*'),
                arr=url.match(reg);
            result=arr && arr.toString().split('=');
            return result && result[1]||'';
        }
    };
    ajaxView.init();
    window.common=ajaxView;//定义一个全局变量

})();
