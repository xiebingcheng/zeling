(function () {

    var common = {

        /**
         * 常用正则
         */
        reg: {
            phone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            userName: /^[a-zA-Z]\w{2,19}$/,
            password: /^\w{8,}$/
        },

        init: function() {
            this.judgeEnv();
            this.addLoading();
            this.ajaxSetting();
        },

        judgeEnv: function () {
            // 判断环境
            var isDev = !!location.href.match(/127.0.0.1|localhost/);
            // isDev = false;
            if (isDev) {
                this.env = 'dev';
            } else {
                this.env = 'stg';
            }
        },

        /**
         * 事件绑定函数
         * @param container 选择器,非必须
         * @param events 要进行绑定的事件对象
         */
        bindEvent: function (events, obj, container) {
            var $contain = $(container || 'body');
            for (var ev in events) {
                var index = ev.lastIndexOf(' '),
                    ele = ev.substr(0, index),
                    evType = ev.substr(index + 1, ev.length);
                try {
                    $contain.delegate(ele, evType, $.proxy(obj[events[ev]], obj));
                } catch (e) {
                    continue;
                    // throw new Error('function ' + events[ev] + ' undefined');
                }
            }
        },

        /**
         * 让localStorage方便存取
         * setData设置缓存
         * getData获取缓存
         */
        setData: function (name, obj) {
            if (typeof obj === 'object') {
                obj = JSON.stringify(obj);
            }
            localStorage.setItem(name, obj);
        },

        getData: function (name) {
            var data;
            var obj = localStorage.getItem(name);
            try {
                data = JSON.parse(obj);
            } catch (e) {
                data = obj;
            }
            return data;
        },
        /**
         * @param name需要截取的参数名称
         */
        getParam: function (name) {
            var url = location.search,
                reg = new RegExp(name + '=[^&]*'),
                arr = url.match(reg),
                result = arr && arr.toString().split('=');
            return result && result[1] || '';
        },

        /**
         * 根据接口名称拼接接口
         * @param insName
         * @returns {string}
         */
        getWebUrl: function (insName) {
            if (this.env === 'dev') {
                // return 'http://127.0.0.1:9999/xiaoniu/mock/' + insName + '.json';
                return 'http://127.0.0.1/xiaoniu/' + insName;
            } else {
                // return 'http://ew-2ji0o2xrh.aliapp.com/xiaoniu/' + insName;
                return 'http://192.168.2.51/xiaoniu/' + insName;
            }
        },

        /**
         * 添加loading
         */
        addLoading: function () {
            var html = '<div id="page-loading" class="page-loading" style="display:none;position: relative; min-width: 60px; min-height: 60px; margin-top: 50px; top: 0; position: fixed; min-width: 60px; min-height: 60px; margin-top: 50px; left: 50%; margin-left: -30px;"><b></b></div>';
            $('body').append(html);
        },
        /**
         * loading开始
         */
        loadingBegin: function () {
            $('#page-loading').show();
        },

        /**
         * loading结束
         */
        loadingFinish: function () {
            $('#page-loading').hide();
        },

        /**
         * ajax公共设置
         */
        ajaxSetting: function () {
            $.extend($.ajaxSettings, {
                cache: false,
                timeout: 20000,
                dataType: 'json',
                type: common.type
            });
            $.ajaxSettings.beforeSend = function () {
                common.loadingBegin();
            }
            $.ajaxSettings.error = function () {
                common.loadingFinish();
            }
            $.ajaxSettings.complete = function () {
                common.loadingFinish();
                // setTimeout(function() { common.loadingFinish();},1000)
            }
        },

        /**
         * ajax请求
         */
        ajax: function (url, data, callback) {
            url = common.getWebUrl(url);
            $.ajax({
                url: url,
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (res) {
                    callback(res);
                },
                error: function () {
                    alert('网络异常,请稍后再试');
                }
            });
        }
    };
    common.init();
    window.common = common;
})();
