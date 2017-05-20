//普通方法
(function () {
    var indexView={
        init: function () {
            var self=this;
            //var data={isMore:true};
            this.isMore=false;
            this.shopListQuery();

           /* var data={id:1114};
            ab.ajax("shopListQuery",data, function (res) {
                alert(res.resMsg);
                self.render(res);
                //location.href="login.html";
            });*/
            //this.event();
        },
        event: function () {
            var self=this;
            //点击 查看更多商品
            $("#btn-more").on("click", function () {
                self.isMore=true;
                self.shopListQuery();


            })
        },
        //页面渲染
        render: function (a) {
            var item;
            var html='';
            var list= a;
            if(!this.isMore){
                var recomObj=list[0];
                $("#price").text(recomObj.price);
                $("#oldPrice").text(recomObj.oldPrice);
                $("#recommend img").attr('src',recomObj.imgUrl);
                $("#recommend a").text(recomObj.shopName);
                list=list.slice(1);
                for (var i=0;i<list.length;i++){
                    item=list[i];
                    html+='<li>'+
                        '<div class="product_box">' +
                        '<a><img data-id="'+item.id+'" data-shopName="'+item.shopName+'" src="'+item.imgUrl+'"></a>'+
                        '<h2><a>'+item.shopName+'</a></h2>'+
                        '<div class="clearfix">'+
                        '<div class="product_price fl">￥<span class="product_mpney">'+item.price+'</span></div>'+
                        '<div class="product_car fr"></div></div> </div> '+
                        '</li>'
                }
                this.event();
                $("#product_list").html(html);
            }
            else{
                //list=list.slice(5);
                for (var i=0;i<list.length;i++){
                    item=list[i];
                    html+='<li>'+
                        '<div class="product_box">' +
                        '<a><img data-id="'+item.id+'" data-shopName="'+item.shopName+'" src="'+item.imgUrl+'"></a>'+
                        '<h2><a>'+item.shopName+'</a></h2>'+
                        '<div class="clearfix">'+
                        '<div class="product_price fl">￥<span class="product_mpney">'+item.price+'</span></div>'+
                        '<div class="product_car fr"></div></div> </div> '+
                        '</li>'
                }
                $("#product_list").append(html);
            }
        },
        shopListQuery: function () {
            var self=this;
            var data={isMore:this.isMore};
            ab.ajax("shopListQuery",data, function (res) {
                if(self.isMore){
                    $("#btn-more").hide();
                    //self.render(res);
                }
                self.render(res.list);
            });
        }
    };
    indexView.init();
})();