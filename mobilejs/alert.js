var dialogTips = null;
function alert(t) {
    var _this = this;
    if (dialogTips == null) {
        var dialogTip = $('<div class="dialog-tip"><div class="txt"></div></div>');
        $("body").append(dialogTip);
        dialogTips = dialogTip;
    }
    if (t) {
        dialogTips.find(".txt").text(t)
    }
    clearTimeout(this.timer);
    dialogTips.show();
    this.timer = setTimeout(function() {
        hideDialog();
    }, 2000)
}
function hideDialog() {
    dialogTips.hide();
}
