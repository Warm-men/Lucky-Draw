// 判断是不是移动设备
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true: false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true: false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true: false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

//亮点闪烁
$(function(){
    //图片数组
    var sArr =['img/da1.png','img/da2.png'];
    var i = -1;
    //定时更换背景
    setInterval(function(){    
        i++;
        i %= sArr.length;
        $(".da").css("backgroundImage","url("+sArr[i]+")");
    },500); 
});

$(document).ready(function(){
    // $('.myrule').click(function(){
    //     layer.open({
    //         type: 1,
    //         title: false,
    //         closeBtn: 0,
    //         shadeClose: true,
    //         srckin: 'yourclass',
    //         content: '<div class="rule"><h4>幸运大转盘抽奖活动</h4><p>活动介绍：参与活动即有机会获得幸运奖。此活动为固定奖品，奖品数量有限，祝君好运！</p><br><span>活动时间：2017-7-1至2017-7-7</span><p>奖品设置：<br>奖品一：iPad mini4 1台<br>奖品二：华为智能手表<br>奖品三：小米移动电源 10个<br>奖品四：10元话费 100个<br>奖品五：幸运福袋 1000个<br></p><div class="dash"></div><p>重要声明：<br>1.实物类奖品将在活动结束后7日内安排发货，请耐心等待<br> 2.优惠券类奖品的使用规则详见每个优惠券的介绍页<br>3.请勿通过非法途径参与活动，卡农App有权取消其参与资格<br>4.本活动由卡农策划提供，与苹果公司无关<br>5.卡农App对本次活动保留最终解释权</p></div>'
    // });

    $.ajax({
        type: "get",
        async: true,
        url: "",
        dataType: "jsonp",
        jsonpCallback:"callbackfunction",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(json){
            if (json.code == 40001) {
                location.href = "";
            }

        },
        error: function(){}
    });
});

var turnWheel = {
    rewardNames:[],             //转盘奖品名称数组
    colors:[],                  //转盘奖品区块对应背景颜色
    outsideRadius:192,          //转盘外圆的半径
    textRadius:155,             //转盘奖品位置距离圆心的距离
    insideRadius:68,            //转盘内圆的半径
    startAngle:0,               //开始角度

    bRotate:false               //false:停止;ture:旋转
};

//图片信息
var imgShBhl = new Image();
    imgShBhl.src = "~/../img/shoububuli.png";
var imgSh = new Image();
    imgSh.src = "~/../img/shouhuan.png";
var imgJb = new Image();
    imgJb.src = "~/../img/jiaobanji.png";
var imgBxh = new Image();
    imgBxh.src = "~/../img/baoxianhe.png";
var imgYb = new Image();
    imgYb.src = "~/../img/yuanbao.png";
var imgThank = new Image();
    imgThank.src = "~/../img/thank.png";
var imgXiche = new Image();
    imgXiche.src = "~/../img/xiche.png";



    var num1 = $('.num').html();

    turnWheel.rewardNames = [
        "有机手部护理",
        "小米手环",
        "乐扣保鲜盒",
        "谢谢参与",
        "飞利浦迷你搅拌机",
        "宽途洗车券一张",
        "元宝积分",
        "谢谢参与"
    ];
    turnWheel.colors = [
        "#f69f38",
        "#ff8836",
        "#f69f38",
        "#ff8836",
        "#f69f38",
        "#ff8836",
        "#f69f38",
        "#ff8836"
    ];


    //旋转转盘item:奖品序号，从0开始;tip:提示语;count:奖品的总数量
    var rotateFunc = function(item,tip,count){

        // 应该旋转的角度，旋转插件角度参数是角度制。
        var baseAngle = 360 / count;
        // 旋转角度 == 270°（当前第一个角度和指针位置的偏移量） - 奖品的位置 * 每块所占的角度 - 每块所占的角度的一半(指针指向区域的中间)
        angles = 360 * 3 / 4 - ( item * baseAngle) - baseAngle / 2; // 因为第一个奖品是从0°开始的，即水平向右方向
        $('#wheelCanvas').stopRotate();
        $('#wheelCanvas').rotate({
            angle:0,
            animateTo:angles + 360 * 5, // 这里多旋转了5圈，圈数越多，转的越快
            duration:8000,
            callback:function (){ // 回调方法
                if(tip=='谢谢参与'){
                    $('.modal-body img').replaceWith("<img src='img/sorry.png' />");
                    $('#apply1').modal('show');
                }else{
                    $('#apply1').modal('show');
                    $('#tip').html(tip);
                }
                turnWheel.bRotate = !turnWheel.bRotate;
                if(isMobile.any()) // 判断是否移动设备
                {
                    // 调OC代码
                    window.location.href = "turntable://test.com?"+ "index=" + item +"&tip=" + tip ;
                }
            }
        });
    };

    $('.pointer').click(function (){
        
        // 正在转动，直接返回
        if(turnWheel.bRotate) return;
        num1--;
        $('.num').html(num1);
        if(parseInt(num1)<0){
            return $('.num').html(0);
        }

        turnWheel.bRotate = !turnWheel.bRotate;
        var count = turnWheel.rewardNames.length;
        var item = 1;//0 ipad;1 手表;2 移动电源;3 话费;4 福袋;5 谢谢参与
        // var item = randomNum(0,count - 1);
        // 开始抽奖
        rotateFunc(item, turnWheel.rewardNames[item],count);
    });
});


/*
返回在n和m之间的随机整数
n<= random <=m
*/
function randomNum(n, m){
    /* Math.floor(Math.random()*10);时，可均衡获取0到9的随机整数。 */
    var random = Math.floor(Math.random()*(m-n)) + n;
    return random;
}

//页面所有元素加载完毕后执行drawWheelCanvas()方法对转盘进行渲染
window.onload=function(){
    drawWheelCanvas();
};

/*
 * 渲染转盘
 * */
function drawWheelCanvas(){

    // 获取canvas画板，相当于layer
    var canvas = document.getElementById("wheelCanvas");

    // 计算每块占的角度，弧度制
    var baseAngle = Math.PI * 2 / (turnWheel.rewardNames.length);
    var ctx=canvas.getContext("2d");

    var canvasW = canvas.width; 
    var canvasH = canvas.height; 
    //在给定矩形内清空一个矩形
    ctx.clearRect(0,0,canvasW,canvasH);

    //strokeStyle 绘制颜色
    ctx.strokeStyle = "#FFBE04"; 
    //font 画布上文本内容的当前字体属性
    ctx.font = '16px Microsoft YaHei';

    for(var index = 0 ; index < turnWheel.rewardNames.length ; index++)
    {
        // 当前的角度
        var angle = turnWheel.startAngle + index * baseAngle;
        // 填充颜色
        ctx.fillStyle = turnWheel.colors[index];

        ctx.beginPath();
        ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.outsideRadius, angle, angle + baseAngle, false);
        ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.insideRadius, angle + baseAngle, angle, true);
        ctx.stroke();
        ctx.fill();
        ctx.save();

        /*----绘制奖品内容----*/
        var rewardName = turnWheel.rewardNames[index];
        var translateX =  canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * turnWheel.textRadius;
        var translateY =  canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * turnWheel.textRadius;
        ctx.translate(translateX,translateY);

        // angle，当前扇形自身旋转的角度 +  baseAngle / 2 中心线多旋转的角度  + 垂直的角度90°
        ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);

        //添加对应图标
        if(rewardName.indexOf("有机手部护理")>=0){
            imgShBhl.onload=function(){
                ctx.drawImage(imgShBhl,-20,-15,55,55);
            };
            ctx.drawImage(imgShBhl,-20,-15,55,55);

        }else if(rewardName.indexOf("小米手环")>=0){
            imgSh.onload=function(){
                ctx.drawImage(imgSh,-20,-15,55,55);
            };
            ctx.drawImage(imgSh,-20,-15,55,55);
        }else if(rewardName.indexOf("乐扣保鲜盒")>=0){
            imgBxh.onload=function(){
                ctx.drawImage(imgBxh,-20,-15,55,55);
            };
            ctx.drawImage(imgBxh,-20,-15,55,55);
        }
        else if(rewardName.indexOf("谢谢参与")>=0){
            imgThank.onload=function(){
                ctx.drawImage(imgThank,-20,-15,55,55);
            };
            ctx.drawImage(imgThank,-20,-15,55,55);
        }
        else if(rewardName.indexOf("飞利浦迷你搅拌机")>=0){
            imgJb.onload=function(){
                ctx.drawImage(imgJb,-20,-15,55,55);
            };
            ctx.drawImage(imgJb,-20,-15,55,55);
        }
        else if(rewardName.indexOf("宽途洗车券一张")>=0){
            imgXiche.onload=function(){
                ctx.drawImage(imgXiche,-20,-15,55,55);
            };
            ctx.drawImage(imgXiche,-20,-15,55,55);
        }
        else if(rewardName.indexOf("元宝积分")>=0){
            imgYb.onload=function(){
                ctx.drawImage(imgYb,-20,-15,55,55);
            };
            ctx.drawImage(imgYb,-20,-15,55,55);
        }
        else if(rewardName.indexOf("谢谢参与")>=0){
            imgThank.onload=function(){
                ctx.drawImage(imgThank,-20,-15,55,55);
            };
            ctx.drawImage(imgThank,-20,-15,55,55);
        }
        ctx.restore();
    }
}

