/**
 * Created by Pengxx on 2016/8/25 0025.
 */
/*ajax封装*/
function postData(path, data, callback, errorCallback) {
    this.data = data;
    $.ajax({
        url: path,
        data: data,
        traditional: true,
        dataType: 'json',
        type: 'POST',
        success: callback,
        error: errorCallback
    })
}
/*地址解析*/
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/*设置按钮不可点击状态*/
function trueDisabled(obj) {
    obj.attr("disabled", true);
}
function falseDisabled(obj) {
    obj.attr("disabled", false);
}
/*关闭微信回弹效果*/
/** * 禁止浏览器下拉回弹 */
function stopDrop() {
    var lastY;//最后一次y坐标点
    $(document.body).on('touchstart', function (event) {
        lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function (event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop();
        //滚动条高度
        if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;
    });
}
//stopDrop();
//校验手机号是否合法
function ismobilephone(mobile) {
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
        mui.alert("手机号码格式不正确")
        return false;
    } else {
        return true;
    }
}
/*校验详细地址*/
function isDeatailAddress(obj){
    var l = obj.val();
    if(l<=1){
        mui.alert("详细地址太短啦！")
     return false
    }else if (obj.val().length>1&&obj.val().length <=30){
        console.log("符合")
        return true;
    }else {
        mui.alert("详细地址太长啦！")
        return false
    }
}
/*校验姓名*/
function isName(obj){
    var l = obj.val();
    if(l.length<=1){
        mui.alert("名字太短啦！")
        return false
    }else if (l.length>1&&l.length <=15){
        return true;
    }else {
        mui.alert("名字太长啦！")
        return false
    }
}
if (/android/i.test(navigator.userAgent)){
    // todo : android
}

if (/ipad|iphone|mac/i.test(navigator.userAgent)){
    // todo : ios
}