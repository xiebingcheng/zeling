// global abbr definition
var w = window;
var ctd = document, cdl = document.location;

if(typeof(w.yodao) == "undefined" || w.yodao == null) {
	w.yodao = new Object();
}

// do not modify code below

if(typeof(w.yodao.timestamp) != "function") {
	w.yodao.timestamp = function() {
		return new Date().getTime();
	}
}


if(typeof(w.yodao.referer) == "undefined" || w.yodao.referer == null) {
    var referer = ctd.referrer;
    // if referer can't be obtained,set referer to '-'
	if (!referer || referer == "" || referer == null) {
        referer = "-";
    }
	// if referer is ill formed,set referer to '0'
    if (referer.indexOf("[") == 0 && referer.lastIndexOf("]") == (referer.length - 1)) {
        referer = "0";
    }
   	w.yodao.referer = referer;
}


w.yodao.handleTrack = function (){
    if (w.yodao_conversion_id) {
        var proto = w.location.protocol.toLowerCase();
        if ('http:' != proto && 'https:' != proto) {
            proto = 'http:';
        }
        var path = "/conv.s?";

        var url = proto + "//a.youdao.com/conv/" + escape(w.yodao_conversion_id) + path + "random=" + (new Date()).getTime();

        if (w.yodao_conversion_value) {
            url = url + "&value=" + escape(w.yodao_conversion_value);
        }

        if (w.yodao_conversion_label) {
            url = url + "&label=" + escape(w.yodao_conversion_label);
        }
        if (typeof(statId) != "undefined") {
            url = url + "&statId=" + statId;
        }
        if (w.yodao.referer) {
            url = url + "&refer=" + escape(w.yodao.referer);
        }
        document.write('<img style="display:none;" ' + 'src="' + url +'" />');
    }

    w.yodao_conversion_id = null;
    w.yodao_conversion_value = null;
    w.yodao_conversion_label = null;
	w.yodao = null;
}

if(cdl.protocol != "file:") {
		w.yodao.handleTrack();
}
