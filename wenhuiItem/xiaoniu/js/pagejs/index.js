(function () {
    var indexView={
        init: function () {
            this.initVm();
            this.query();
            this.touch();
        },
        initVm: function () {
            this.vm=avalon.define({
                $id:"root",
                prdList:[],
                prdListMore:[],
                isLogin:"",
                clickText:"登录/注册",
                click: $.proxy(this.click,this),
                more:$.proxy(this.more,this)
            });
            this.vm.$watch("isLogin", function (a) {
                this.clickText=a=="Y"?"我的账户":"登录/注册";
            })
        },
        //点击"我的账户"
        click: function () {
                if(this.vm.isLogin=="Y"){
                    location.href="myAccount.html";
                }
                //未登录的页面渲染
                else{
                    location.href="login.html";
                }
        },
        //点击"加载更多"
        more: function () {
            $("#productListMore").css("display","block");
            $("#getMoreProduct").css("display","none");
        },
        //图片的轮换显示
        touch: function () {
            //JQ方法
            /*var imgUrl=["images/1457522844658.jpg",
                "images/134a3575-bec9-473a-8ba6-022425c83417.jpg",
                "images/1458826856931.jpg",
                "images/1456711912042.png",
                "images/1456225453427.png" ,
                "images/1452605767979.png"],
                i=0;
            function tu(){
                if(i<imgUrl.length-1){
                    i++;
                }
                else{
                    i=0;
                }
                $("#banner").find("img").attr("src",imgUrl[i]);
            }
            setInterval(tu,1000);*/
            //插件方法
            Touch({
                slideCell:"#banner",
                titCell:".indicator ul",
                mainCell:"#banner ul",
                effect:"leftLoop",
                autoPage:true,
                autoPlay:true
            })
        },
        //查询列表
        query: function () {
            var self=this;
            var data={};
            common.ajax("xiaoniu_productList.php",data,function(res){
                self.vm.prdList=res.prdList.slice(0,5);
                self.vm.prdListMore=res.prdList.slice(5);
                self.vm.isLogin=res.isLogin;
            });
        }
    };
    indexView.init();
})();