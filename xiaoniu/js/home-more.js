(function(){
    var home_more={
        init:function(){
            this.vm=avalon.define({
                $id:'root',
                imgList:[],  //后台轮播图片
                prdList:[],
                prdListMore:[],  //已经售罄的,分类渲染
                projectList:[]   //最下面的数组



            });
            home_more.query();

        },
        query:function(){
            var self=this,
                data={};
            common.ajaxCommon("xiaoniu_productList.json",data,function(res){
                console.log(res);
                self.vm.imgList=res.imgList;  //图片
                self.vm.prdList=res.prdList.slice(0,8);
                self.vm.prdListMore=res.prdList.slice(-3);
                self.vm.projectList=res.projectList;


                //avalon.scan();
                setTimeout(function(){
                    home_more.touch();
                },300);

            });
        },
        //轮播图
        touch:function(){
            //jQuery方法写的轮播插件   因为html的样式是写来为了轮播插件使用的,所以在用jq方法写轮播图时,要在浏览器中的内联样式中取消 transform这个样式.
          /*  var self=this;
            var imgUrl=self.vm.imgList;
            var i=0;
            setInterval(function(){
                if(i<imgUrl.length-1){
                    i++;
                }else{
                    i=0;
                }
                $("#a").find("img").attr("src",imgUrl[i]);
            },1000);*/

            //插件方法
            Touch({
                slideCell:'#banner',
                titCell:'.indicator ul',
                mainCell:'#banner ul',
                effect:'leftLoop',
                autoPage:true,
                autoPlay:true
            })
        }

    };
    home_more.init();
})();