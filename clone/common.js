var bWeixinBrowser = false;
var common = {
    mw_appkey: "",
    mw_mode: "2",
    api_uri: "http://liuhefront.hyyy3.com",
    icon: "http://"+location.host+"/icon.jpg",
    redirect_uri: "http://apifront.hyyy3.com/service/H5/LiuHe/wx_redirect.aspx",
    redirect_uri_xl: "http://",
    redirect_uri_mw: "http://",
    redirect_uri_mw2: "http://",
    share_uri: "http://liuheclient.hyyy3.com",
    JsSDKEnable: true,
    api_uri2: "http://apifront.hyyy3.com",
    redirect_uri2: "http://apifront.hyyy3.com/Service/H5/LiuHe/phone_wx_redirect.aspx",
    amap_coordinate_url: "http://apifront.hyyy3.com/Service/H5/LiuHe/get_amap_coordinate_convert.aspx",
    tencent_geocoder_url: "http://apifront.hyyy3.com/Service/H5/LiuHe/get_tencent_geocoder.aspx",
    //获取参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return "";
    },
    //设置cookie
    setCookie: function (cname, cvalue, expTime) {
        var d = new Date();
        d.setSeconds(d.getSeconds() + (expTime));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //获取cookie
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
        }
        return "";
    },
    //获得位置
    funGetLocation: function () {
        var BrowserPretty = this.funCheckBrowser();
        if (BrowserPretty == "wx") {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var gpslocationjson = {};
                    gpslocationjson.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    gpslocationjson.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    //gpslocationjson.speed = res.speed; // 速度，以米/每秒计
                    //gpslocationjson.accuracy = res.accuracy; // 位置精度
                    var geturl = common.amap_coordinate_url + "?longitude=" + res.longitude + "&latitude=" + res.latitude;
                    $.getJSON("Hanlder.aspx", { url: encodeURI(geturl) }, function (results) {
                        if (results.code > 0) {
                            console.log(results.msg);
                            alert(results.msg);
                            return;
                        }
                        gpslocationjson.address = results.formatted_address;
                        localStorage.YCUserGPSLocationJson = JSON.stringify(gpslocationjson);
                        console.log(localStorage.YCUserGPSLocationJson);
                    });
                },
                cancel: function (res) {
                    alert("您已拒绝授权获取地理位置");
                }
            });
        } else if (BrowserPretty == "mw") {
            MostOneJSApis.getLocation();
        }
    },
    //检查浏览器
    funCheckBrowser: function () {
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return "wx";
        } else if (ua.match(/XLMessenger/i) == "xlmessenger") {
            return "xl";
        } else if (ua.match(/MostOne/i) == "mostone") {
            return "mw";
        } else {
            return "other";
        }
    },
    //默往配置
    funLoadMWConfig: function (state) {
        var loginInfo = JSON.stringify({ "appkey": common.mw_appkey, "state": state });
        //调用原生的getMostOneAuthData方法
        setTimeout(function () {
            MostOneJSApis.getMostOneAuthData(loginInfo);
        }, 0);
    }
};
//微信配置
function funLoadWeiXinConfig() {
    var BrowserPretty = common.funCheckBrowser();
    if (BrowserPretty == "wx") {
        $.getJSON("Hanlder.aspx", { url: encodeURI(common.api_uri + "/service/get_wx_ticket.aspx?pageurl=" + location.href) }, function (results) {
            if (results.errcode != 0) {
                alert(results.errmsg);
                return;
            }
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: results.appId, // 必填，公众号的唯一标识
                timestamp: results.timestamp, // 必填，生成签名的时间戳
                nonceStr: results.nonceStr, // 必填，生成签名的随机串
                signature: results.signature, // 必填，签名
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocation', 'hideMenuItems',
                    'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'] // 必填，需要使用的JS接口列表
            });
        });
    } else if (BrowserPretty == "mw") {
        if (common.mw_mode == "1") {
            var loginInfo = JSON.stringify({ "appkey": common.mw_appkey, "state": "123" });
            //调用原生的getMostOneAuthData方法
            setTimeout(function () {
                MostOneJSApis.getMostOneAuthData(loginInfo);
            }, 0);
        } else {
            localStorage.YCUserGPSLocationJson = undefined;
            //定位配置初始化
            var Info = JSON.stringify({ "appkey": common.mw_appkey });
            MostOneJSApis.config(Info);
        }
    }
}
//分享
function funSetShareMessage(sTitle_,sDesc_,sLink_){
    var BrowserPretty = common.funCheckBrowser();
    if (BrowserPretty == "wx") {
        wx.updateAppMessageShareData({
            title: sTitle_, // 分享标题
            desc: sDesc_, // 分享描述
            link: sLink_, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: common.icon, // 分享图标
            success: function () {
                // 设置成功
                console.log("updateAppMessageShareData:ok");
            }
        });
        wx.updateTimelineShareData({
            title: sTitle_, // 分享标题
            link: sLink_, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: common.icon, // 分享图标
            success: function () {
                // 设置成功
                console.log("updateTimelineShareData:ok");
            }
        });
    } else if (BrowserPretty == "xl") {

    } else if (BrowserPretty == "mw") {
        var shareInfo = JSON.stringify({"title":sTitle_,"content":sDesc_,"imagePath":common.icon,"webPath":sLink_,"shareType":100,"appkey": common.mw_appkey});
        setTimeout(function () {
            MostOneJSApis.shareWithShareData(shareInfo);
        }, 0);
    } else {

    }
}
/******************************************************************************************/
/* 默往回调 */
/******************************************************************************************/
//登录成功
var callBackCode = function (result) {
    setTimeout(function () {
        var resultObj = JSON.parse(result);
        if (resultObj.code == 200) {
            //result.authCode,result.state
            if (common.mw_mode == "1") {
                //定位配置初始化
                var Info = JSON.stringify({ "appkey": common.mw_appkey });
                setTimeout(function () {
                    MostOneJSApis.config(Info);
                }, 0);
            } else {
                window.location.replace(common.redirect_uri_mw2 + "?code=" + resultObj.authCode + "&state=" + resultObj.state);
            }
        } else {
            alert(resultObj.message);
        }
    }, 0);
}
//登录失败
var callBackError = function (result) {
    setTimeout(function () {
        alert(result);
    }, 0);
}
//分享成功
var callBackShareSuccess =  function (result) {
    setTimeout(function () {
        // alert(result);
        // var resultObj = JSON.parse(result);
    }, 0);
}
//分享失败
var callBackShareError =  function (result) {
    //setTimeout(function () {
    //    alert(result);
    //    var resultObj = JSON.parse(result);
    //}, 0);
}
//定位配置
var callBackConfig = function (result) {
    var resultObj = JSON.parse(result);
    if (resultObj.code == 200) {
        MostOneJSApis.getLocation();
    } else {
        alert(resultObj.message);
    }
}
//定位
var callBackLocation = function (result) {
    // 成功：code : 200，data { “latitude” : 纬度，“longitude” : 经度 }
    // 失败：code : 4100，message : “定位失败，平台（iOS或Android），高德错误码：0，错误说明：xxxx”
    // code : 4101，message : “获取定位权限失败”
    var resultObj = JSON.parse(result);
    if (resultObj.code == 200) {
        var gpslocationjson = {};
        gpslocationjson.latitude = resultObj.data.latitude;
        gpslocationjson.longitude = resultObj.data.longitude;
        var geturl = common.api_uri + "/service/get_amap_geocode_regeo.aspx?longitude=" + gpslocationjson.longitude + "&latitude=" + gpslocationjson.latitude;
        $.getJSON("Hanlder.aspx", { url: encodeURI(geturl) }, function (results) {
            if (results.code > 0) {
                console.log(results.msg);
                alert(results.msg);
                return;
            }
            gpslocationjson.address = results.formatted_address;
            localStorage.YCUserGPSLocationJson = JSON.stringify(gpslocationjson);
            console.log(localStorage.YCUserGPSLocationJson);
        });
    } else {
        alert(result);
    }
}