
var globalmodule = {};
$(function(){
    initPlayMusic();
    initSliderBar();
    initUploadMusic();
})
//音乐播放
function initPlayMusic () {
    var filename = comutil.getUrlParams("filekey")||'';
    if(!filename){
        alert("没有音乐文件");
        return;
    }
    globalmodule.playMusic = new playMusic({url:comutil.playurl+comutil.getUrlParams("filekey"),filename:filename});
    globalmodule.playMusic.init();
    globalmodule.playMusic.event();
}
//音乐播放的滑动条
function initSliderBar (){
    globalmodule.sliderBar = new sliderBar({$el:$('.music-box')});
    globalmodule.sliderBar.init();
    globalmodule.sliderBar.event();
}
//文件上传页面
function initUploadMusic () {
    globalmodule.uploadMusic = new uploadMusic({});
    // globalmodule.uploadMusic.init();
    // globalmodule.uploadMusic.event();
}