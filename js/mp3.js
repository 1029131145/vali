var currentIndex = -1;

var audio = document.getElementById("audio");

var mlist = [
    "最长的电影-钢琴曲",
    "梦中的婚礼-钢琴曲",
    "稻香-钢琴曲",
    "说好的幸福呢-钢琴曲",
    "给我一首歌的时间-钢琴曲",
    "爱很简单-钢琴曲",
    "飞机场的10：30-钢琴曲",
    "青花瓷-钢琴曲",
    "富士山下-钢琴曲",
    "夜曲-钢琴曲"
];

var msrc = [
    "http://cc.stream.qqmusic.qq.com/C100004TEIGS04HJrh.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C100003BiYM71E0j7X.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C1000044MHjN2xQasu.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C100000BkANw0tbkBi.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C100001qiOdm3HFFF3.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C1000040SaWb028Jtg.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C1000012rdK63PQDeg.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C100000qGdR32AIgUk.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C1000017Tuzb2lk2Oe.m4a?fromtag=52",
    "http://cc.stream.qqmusic.qq.com/C100001NUXro3y9CEG.m4a?fromtag=52"
];

var btn = $("#audio_btn");

if (currentIndex == -1) {
    audio.src = msrc[0];
    btn.attr("title", mlist[0]);
    currentIndex = 0;
}
function Song() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
Song();
var num = 0;
audio.addEventListener('ended', function () {

    with (currentIndex == num) {
        num = GetRandomNum(msrc.length);
    }
    currentIndex = num;
    num = currentIndex;
    audio.src = msrc[currentIndex];
    btn.attr("title", mlist[currentIndex]);
    Song();
}, false);

btn.click(function () {
    $(this).find("i").hasClass("fa-spin") ? $(this).find("i").removeClass("fa-spin") : $(this).find("i").addClass("fa-spin");
    Song();
});

function GetRandomNum(num) {
    return parseInt(Math.random() * num);
}

