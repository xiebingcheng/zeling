//最初版,自己写的

window.onload = function () {
    var list_page = {

        init: function () {
            var data = {tap: '01'};
            this.bind();
            this.Query();
        },



        bind: function (ev) {
            function tab_li(ev) {
                var info_tbs = document.getElementById('info-tbs').childNodes;
                for (var i = 0; i < info_tbs.length; i++) {
                    info_tbs[i].onclick = function () {
                        this.className = "current";
                    };
                    info_tbs[i].onmouseout = function () {
                        this.className = "";
                    }

                }
            }
            tab_li(ev);

            function skip(){

            }
        },


        //ajax
        Query: function (data) {

            var ajax_obj = function (url) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {  // ||xhr.status == 0 本地的路径要等于0.
                            console.log(JSON.parse(xhr.response));
                            var obj=JSON.parse(xhr.response);
                            console.log(typeof xhr.response);
                           // JSON.stringify();  //转换成字符串
                           // JSON.parse();   //转换为对象
                        } else {
                            alert("error");
                        }
                    }
                }
                xhr.send(null);
            }
            var url = "http://192.168.7.150:3000/qfang_list?tap=01";
            get(url);
        }
    }
    list_page.init();
};