(function(){
    var list={
        init:function(){
            //进去页面的时候看看本地存储有没有tap的值,如果有,就删除,没有就默认'01,就是默认第一个导航标签
            list.tap = localStorage.getItem('tap')||'01';  //刚刚开始进入页面默认为01标签页.
            localStorage.removeItem('tap');  //删除本地存储tap
            //当从detail页面返回到这个页面时,头部标签的样式也要变化到,返回的页的标签..
            $('#info-tbs li[data-tap='+ list.tap+ ']').addClass('current').siblings().removeClass();
            list.ajax(list.tap);
            list.bind();

        },
        ajax:function(tap){
            console.log(tap);
            $.ajax({
                url:'http://192.168.7.150:3000/qfang_list',
                //data 是要传给后台的参数.
                data:{tap:tap},
                type:'get',
                dataType:'json',
                success:function(res){
                    console.log(res);
                    if(res.resCode=='000'){
                        list.render(res);
                    }else{
                        alert(res.resMsg);
                    }
                },
                error:function(){
                    alert("网络似乎有问题")
                }
            })
        },
        render:function(res){
            var html='';
            //给页面渲染第一张大图
            $('#topImg').attr('src',res.topUrl);
            $('#disc').text(res.disc);  //坑啊! 我把res.disc中间的点写错成逗号,搞得渲染出两个obj,我一下都无奈死了.
            $.each(res.articleList,function(index,obj){
                html+='<li data-id="'+obj.id+'"><a><div class="list-pic"><img src="'+obj.imgUrl+'"></div><div class="list-text"><h3>'+obj.title+'</h3><p>'+obj.abstract+'</p></div><div class="clearfix"></div> </a></li>';
            });
            $('#list').html(html);

        },
        bind:function(id){
            var self = this;
            //头部样式
            $('#info-tbs li').on('click',function(){
                $(this).addClass('current').siblings().removeClass();
                list.tap=$(this).attr('data-tap');

                list.ajax(list.tap);
            });
            $('#list').on('click','li',function(){  //这里要用事件委托的,因为li是未来元素.
                //获取列表的data-id存起来,下一个页面使用.
                var id=$(this).data('id');
                localStorage.setItem('id',id);
                localStorage.setItem('tap',list.tap);  // 这个是为了实现一个效果,就是按返回时,回到原来的标签页.
                location.href='detail.html';
            })
        }
    };
    list.init();
})();