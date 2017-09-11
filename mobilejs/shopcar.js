$(function () {
    var alllist = $("#sc .alllist ul li");
    var list_one = $("#sc .alllist ul li .list_l .list_one");
    var btn_change_all = $("#sc .alllist .list_footer .lf_l");
    var sr = $("#sc .alllist .list_footer .lf_m .sr");
    var all_money = 0;
    checkNull();
    //单选商品-----选中与取消
    list_one.unbind("click").click(function () {
        var btn_change_swi = $(this).children(".btn_change").attr("data-swi");
        if (btn_change_swi == 0) {
            btn_change_swi = 1;
            $(this).children(".btn_change").addClass("active");
            $(this).children(".btn_change").attr("data-swi", btn_change_swi);
            allcost();
        } else {
            btn_change_swi = 0;
            $(this).children(".btn_change").removeClass("active");
            btn_change_all.attr("data-all", btn_change_swi);
            btn_change_all.children(".btn_change").removeClass("active");
            $(this).children(".btn_change").attr("data-swi", btn_change_swi);
            allcost();
        }
        sr.html(all_money);
    });

    //全选商品-----选中与取消
    btn_change_all.unbind("click").click(function () {
        var btn_change_all_swi = $(this).attr("data-all");
        if (btn_change_all_swi == 0) {
            btn_change_all_swi = 1;
            list_one.children(".btn_change").addClass("active");
            list_one.children(".btn_change").attr("data-swi", btn_change_all_swi);
            $(this).children(".btn_change").addClass("active");
            allcost();
        } else {
            btn_change_all_swi = 0;
            list_one.children(".btn_change").removeClass("active");
            list_one.children(".btn_change").attr("data-swi", btn_change_all_swi);
            $(this).children(".btn_change").removeClass("active");
            all_money = 0;
        }
        $(this).attr("data-all", btn_change_all_swi);
        sr.html(all_money);
    });

    //单件商品加减
    var add_l = $("#sc .add_l");
    var add_r = $("#sc .add_r");
    add_l.unbind("click").click(function () {
        var obj = $(this);
        var num = obj.siblings(".add_m").html();
        if (num == 1) {
            num = 0;
            obj.siblings(".add_m").html(num);
            var btnArray = ['取消', '确定'];
            mui.confirm('确认删除这个商品吗？', '猫迹商城', btnArray, function (e) {
                if (e.index == 1) {
                    var id = obj.parent().parent().parent().siblings().children().data("id");
                    var data = {
                        ids: id
                    }
                    postData("delCart.do", data, function (e) {
                        if (e.errCode == "0000") {
                            var i =obj.parent().parent().parent().siblings(".list_one").children(".btn_change");
                            var btn_change_swi2 = i.attr("data-swi");
                            btn_change_swi2 = 0;
                            i.removeClass("active");
                            i.attr("data-swi", btn_change_swi2);
                            allcost();
                            sr.html(all_money);
                            obj.parent().parent().parent().parent().parent().remove();
                            checkNull();
                        }
                    })
                } else {
                    num = 1;
                    obj.siblings(".add_m").html(num);
                }
            })
        } else {
            var id = obj.parent().parent().parent().siblings().children().data("id");
            var data = {
                itemid: id
            }
            postData("reduceOneItem.do", data, function (e) {
                if (e.errCode == "0000") {
                    num--;
                    obj.siblings(".add_m").html(num);
                    allcost();
                    console.log(all_money);
                    sr.html(all_money);
                }
            })
        }
    })
    add_r.unbind("click").click(function () {
        var obj = $(this);
        var num = $(this).siblings(".add_m").html();
        var id = obj.parent().parent().parent().siblings().children().data("id");
        var data = {
            itemid: id
        }
        postData("addOneItem.do", data, function (e) {
            if (e.errCode == "0000") {
                num++;
                obj.siblings(".add_m").html(num);
                allcost();
                sr.html(all_money);
            }
        })
    });

    //计算总价
    function allcost() {
        var alllist = $("#sc .alllist ul li");
        all_money = 0;
        alllist.each(function () {
            console.log(all_money)
            var sj_swi = $(this).find(".btn_change").attr("data-swi");
            if (sj_swi != 0) {
                all_money += parseFloat($(this).find(".add_m").html()) * parseFloat($(this).find(".p_bot_l>span").text() * 100);
            }
        });
        all_money = all_money / 100;
    }

    //左滑删除
    $('#OA_task_2').on('click', '.mui-btn', function (event) {
        var btnArray = ['取消', '确认'];
        var elem = $(this);
        var li = elem.parent().parent();
        var i = li.children().children().children(".btn_change");
        var btn_change_swi = i.attr("data-swi");
        mui.confirm('确认删除这个商品吗？', '猫迹商城', btnArray, function (e) {
            if (e.index == 1) {
                var id = li.children().children().children(".btn_change").attr("data-id");
                var data = {
                    ids: id
                }
                postData("delCart.do", data, function (e) {
                    if (e.errCode == "0000") {
                        li.remove();
                        checkNull();
                            btn_change_swi = 0;
                            i.removeClass("active");
                            i.attr("data-swi", btn_change_swi);
                            allcost();
                            sr.html(all_money);
                    }
                })
            }
        });
    });
    /*检查购物车状态*/
    function checkNull() {
        var listIfNone = $(".alllist ul li").length;
        if (listIfNone == 0) {
            $(".nolist").show();
            $(".btn_ljxg").show();
        } else {
            $(".nolist").hide();
            $(".btn_ljxg").hide();
        }
    }

    $(".btn_ljxg").unbind("click").click(function () {
        window.location.href = "index.do"
    })
    //全选删除
    var btn_del = $(".btn_del");
    btn_del.unbind("click").click(function () {
        var deleteArray = new Array();
        alllist.each(function () {
            var obj = $(this);
            var sj_swi = obj.find(".btn_change").attr("data-swi")
            if (sj_swi != 0) {
                var id = obj.find(".btn_change").attr("data-id");
                deleteArray.push(id)
            }
        })
        if (deleteArray != "") {
            var btnArray = ['取消', '确定'];
            mui.confirm('确认删除这些商品吗？', '猫迹商城', btnArray, function (e) {
                if (e.index == 1) {
                    var data = {
                        ids: deleteArray
                    }
                    postData("delCart.do", data, function (e) {
                        if (e.errCode == "0000") {
                            alllist.each(function () {
                                var obj1 = $(this);
                                var sj_id = obj1.find(".btn_change").attr("data-id")
                                $.each(deleteArray, function (e, v) {
                                    if (sj_id == v) {
                                        var i =obj1.children().children().children(".btn_change");
                                        var btn_change_swi = i.attr("data-swi");
                                        btn_change_swi = 0;
                                        i.removeClass("active");
                                        i.attr("data-swi", btn_change_swi);
                                        allcost();
                                        sr.html(all_money);
                                        obj1.remove();
                                        checkNull();
                                    }
                                })
                            })
                        } else {
                            alert("删除失败噢！")
                        }
                    })
                }
            })
        }

    })
    /*结算*/
    $(".btn_js").unbind("click").click(function () {
        trueDisabled($(this))
        var buyArray = new Array();
        alllist.each(function () {
            var obj = $(this);
            var sj_swi = obj.find(".btn_change").attr("data-swi")
            if (sj_swi != 0) {
                var id = obj.find(".btn_change").attr("data-id");
                buyArray.push(id)
            }
        })
        if (buyArray != "") {
            window.location.href = "confirmOrderPage.do?ids=" + buyArray
        } else {
            falseDisabled($(".btn_js"))
            mui.alert("请选择商品去结算！")
        }
    })
});