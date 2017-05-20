(function () {  //公共的ajax
    var ajaxView = {
        init: function () {
            this.addLoading();
            this.ajaxSetting();
        },

        ajaxCommon: function (url, data, callback) {

           // data.sessionId = common.getData("sessionId");

            var common_url= 'json/';
            $.ajax({
                url: common_url+url,
                type: "get",
                data: data,
                dataType: 'json',
                success: function (res) {
                    if (res.resCode == "000") {
                        callback(res);

                    } else {
                        alert(res.resMsg);
                    }
                }, error: function () {
                    alert("网络异常")
                }
            });
        },
        //设置数据
        setData: function (name, obj) {
            if (typeof  obj === "object") {
                obj = JSON.stringify(obj);   //JSON对象转为字符串
            }
            localStorage.setItem(name, obj);  //保存到后台
        },

        //获取数据
        getData: function (name) {  //从后台调出东西
            try {
                var data;
                var obj = localStorage.getItem(name);
                data = JSON.parse(obj);
            } catch (e) {
                data = obj;
            }
            return data;
        },


        addLoading: function () {  //渲染 "加载中" 的这个页面
            var html = '<div id="loading" class="loadingBox">' +
                '<p>加载中<span id="font-str"></span></p></div>';
            $('body').append(html);
        },
        loadingBegin: function () {
            //设置网页加载的页面

            $('#loading').show();
            var $str = $('#font-str');
            common.int = setInterval(function () {
                $str.append('.');
                if ($str.text().length > 20) {
                    $str.text('');

                }
            }, 0.01);   //设置秒数
        },
        loadingFinsh: function () {
            $('#loading').hide();
            clearInterval(common.int);
        },
        ajaxSetting: function () {  //ajax加载中时调用的
            $.ajaxSettings.beforeSend = function () {  //之前的条件
                ajaxView.loadingBegin();
            };
            $.ajaxSettings.error = function () {  //失败时的条件
                ajaxView.loadingFinsh();
            };
            $.ajaxSettings.complete = function () {  //完成后的条件
                ajaxView.loadingFinsh();
            }
        }

    };
    ajaxView.init();
    window.common = ajaxView;
})();