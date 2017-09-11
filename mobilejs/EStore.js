/**
 * Created by Pengxx on 2016/8/24 0024.
 */
/*微信判断*/
function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
window.onload=function () {
    if(is_weixin()){
       $("body header").hide();
       $(".mui-content").css("padding-top","0px")
    }
}

/* 协议页不同意按钮 */
$(".disagreed").unbind().click(function () {
    window.history.go(-1);
})
/*颜色选择*/
var color_btn=$(".choose-color-btn button");
color_btn.unbind().click(function () {
    $(this).addClass("active")
    $(this).siblings().removeClass("active");
})

/*协议*/
$(".agree_bar .agree").unbind().click(function () {
    var data = {
        code : 1 ,
        randomNum : Math.random()*10
    }
    postData("ceshi03.json",data,function (data) {
        if(data.errorCode == "0000"){
            // window.location.href="goods_deatails.html";
            mui.openWindow({
                url:'goods_deatails.html'
            });
        }
    })
})


