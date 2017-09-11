
function initWeiXinAPI() {
    $.ajax({
        type:'GET',
        url:'/wx/wxGetShare.do?a='+Math.random()+'&url='+encodeURIComponent(window.location.href),
        async: false,
        success:function(data){
            var wxInfo = $.parseJSON(data);
            //alert(data);
            wxConfig(wxInfo.timestamp,wxInfo.nonceStr,wxInfo.signature,wxInfo.appid);
        }
    });
}
var wxShareData = {
    title: "一个diao炸天的商城！", // 分享标题
    desc:"上猫迹，别墨迹！",
    link: 'http://shop.xkygame.com/mall/index.do',
    imgUrl: "http://shop.xkygame.com/static/img/product/logo.png"
};
var wxConfig = function (timestamp,nonceStr,signature,appid) {
    wx.config({
        debug: false,
        appId: appid,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideOptionMenu',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice'
        ]
    });


    wx.ready(function(){
        // alert('test');
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.onMenuShareTimeline({
            title: wxShareData.title, // 分享标题
            link: wxShareData.link,
            imgUrl: wxShareData.imgUrl,
            trigger: function(res) {
            },
            success: function(res) {
                //pop('感谢您分享。');
                _hmt.push(['_trackEvent', "wxShare", "timeline", "", ""]);

                shareSuccess();
            },
            cancel: function(res) {
            },
            fail: function(res) {
                pop(JSON.stringify(res));
            }
        });

        wx.onMenuShareAppMessage({
            title: wxShareData.title, // 分享标题
            desc: wxShareData.desc, // 分享描述
            link: wxShareData.link,
            imgUrl: wxShareData.imgUrl,
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
               // pop('感谢您分享。');
                _hmt.push(['_trackEvent', "wxShare", "app", "", ""]);
                shareSuccess();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });



    });

    wx.error(function(res){
//        pop("aaa"+res)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

    });
}

function shareSuccess() {
//    $.ajax({
//        type: 'GET',
//        url: 'getgame.aspx?action=write2',
//        async: false,
//        success: function (data) {
////            console.log(data);
//        }
//    });

}
