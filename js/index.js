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


    turnWheel.rewardNames = [
        "价值480元有机手部护理一次",
        "小米手环",
        "乐扣保鲜盒",
        "谢谢参与",
        "价值429元飞利浦迷你搅拌机",
        "宽途洗车券一张",
        "元宝积分",
        "继续努力"
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
                    $('.img1').html("");
                    $('.img1').html("<img src='img/sorry.png' />");
                    $('#apply1').modal('show');
                    $('#tip').html("");
                    $(".gitImg").html("");
                }else if(tip=='继续努力'){
                    $('.img1').html("");
                    $('.img1').html("<img src='img/sorry.png' />");
                    $('#apply1').modal('show');
                    $('#tip').html("");
                    $(".gitImg").html("");
                }else{
                    $('.img1').html("");
                    $('.img1').html("<img src='img/end.png' />");
                    $('#apply1').modal('show');
                    $('#tip').html(tip);
                    if (tip == '价值480元有机手部护理一次'){
                        $(".gitImg").html("");
                        $(".gitImg").html("<img src='img/shoububuli.png' />");
                    }else if(tip == '小米手环'){
                        $(".gitImg").html("");
                        $(".gitImg").html("<img src='img/shouhuan.png' />");
                    }else if(tip == '价值429元飞利浦迷你搅拌机'){
                        $(".gitImg").html("");
                        $(".gitImg").html("<img src='img/jiaobanji.png' />");
                    }else if(tip == '乐扣保鲜盒'){
                        $(".gitImg").html("");
                        $(".gitImg").html("<img src='img/baoxianhe.png' />");
                    }else if(tip == '宽途洗车券一张'){
                        $(".gitImg").html("");
                        $(".gitImg").html("<img src='img/xiche.png' />");
                    }else if(tip == '元宝积分'){
                        $(".gitImg").html("");
                        $(".gitImg").html("<img src='img/yuanbao.png' />");
                    }
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


/*
返回在n和m之间的随机整数
n<= random <=m
*/

function randomNum(n, m){
    /* Math.floor(Math.random()*10);时，可均衡获取0到9的随机整数。 */
    var random = Math.floor(Math.random()*(m-n)) + n;
    return random;
}

var usrLeftTime = 0; //用户剩余抽奖次数，默认为零
//获取抽奖次数
function lefttimeFn() {
    console.log("lefttimeFn()20002");
    $.ajax({
        type: "GET",
        async: true,
        url: "http://activity.cnmobi.com.cn/activity/year/my.html",
        dataType: "jsonp",
        jsonpCallback: "callbackfunction",
        success: function (json) {
            if ( json.leftTimes == 0 ){
                tipBox("亲，你本小时内的抽奖次数已经用完了，欢迎下个小时继续来抽奖~");
                $('.num').html(json.leftTimes);
                usrLeftTime = json.leftTimes;
            }else{
                $('.num').html(json.leftTimes);
                usrLeftTime = json.leftTimes;
            }
        },
        error: function (json) {
            tipBox("哎哟喂~转盘君还没醒来，请稍等一下");
        }
    });
}
setTimeout(function () {
    lefttimeFn();
},50);

//本小时内倒计时
function Countdown() {
    var mydate = new Date(),
        thisMinutes = 59 - mydate.getMinutes(); //获取当前分钟数(0-59)
        thisSeconds = 59 - mydate.getSeconds(); //获取当前秒数(0-59)
        //thisMinutes = 0;
        //thisSeconds = 0;
    if(thisMinutes == 0 && thisSeconds == 0){
        setTimeout("lefttimeFn()",100)
    }
    if ( thisMinutes < 10 ){
        thisMinutes = "0" + thisMinutes;//补零
    }
    if ( thisSeconds < 10 ){
        thisSeconds = "0" + thisSeconds;//补零
    }
    $('.minutes').html(thisMinutes);
    $('.seconds').html(thisSeconds);
}
setInterval("Countdown()",1000);//每秒运行一次

//页面所有元素加载完毕后执行drawWheelCanvas()方法对转盘进行渲染
window.onload=function(){
    drawWheelCanvas();
    $(".loading").hide();


    //提示弹窗
    function tipBox(tip) {
        $("#tipBox").html(tip);
        $(".tipBox").fadeIn();
        setTimeout(function () {
            $(".tipBox").fadeOut()
        },3500)
    }
    //后台返回抽奖结果

    $('.pointer').click(function (){
        var newUsrLeftTimes = usrLeftTime;
        if ( newUsrLeftTimes == 0 ){
            tipBox("亲，你本小时内的抽奖次数已经用完了，欢迎下个小时继续来抽奖~");
            $('.num').html(newUsrLeftTimes);
            return false;
        }else {
            $.ajax({
                type: "GET",
                async: true,
                url: "http://activity.cnmobi.com.cn/activity/year/lottery.html",
                dataType: "jsonp",
                jsonpCallback: "callbackfunction",
                success: function (json) {
                    var item;
                    if(turnWheel.bRotate) return;
                    turnWheel.bRotate = !turnWheel.bRotate;
                    var count = turnWheel.rewardNames.length;
                    usrLeftTime = json.leftTimes;
                    $('.num').html(json.leftTimes);
                    if ( json.isHit === false ){ //没中奖
                        var setNum = randomNum(1,3);
                        if(setNum === 1){
                            item = 3;
                        }else if (setNum === 2){
                            item =7;
                        }
                    }else if ( json.isHit ){
                        console.log(json.showId);
                        if (json.showId === "youjihuli"){
                            item = 0;
                        }else if (json.showId === "bracelet") {
                            item = 1;
                        }else if (json.showId === "crisper") {
                            item = 2;
                        }else if (json.showId === "philips") {
                            item = 4;
                        }else if (json.showId === "xichequan") {
                            item = 5;
                        }else if (json.showId === "yuanbao") {
                            item = 6;
                        }
                    }
                    rotateFunc(item, turnWheel.rewardNames[item],count);
                },
                error: function (json) {
                    tipBox("亲，您的操作太快了，系统跟不上~");
                    return false;
                }
            });
        }
    });

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
        else if(rewardName.indexOf("继续努力")>=0){
            imgThank.onload=function(){
                ctx.drawImage(imgThank,-20,-15,55,55);
            };
            ctx.drawImage(imgThank,-20,-15,55,55);
        }
        ctx.restore();
    }
}


