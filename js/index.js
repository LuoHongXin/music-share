
var globalmodule = {};
$(function(){
    // initPlayMusic();
    // initSliderBar();
    initUploadMusic();
})
//音乐播放
function initPlayMusic () {
    globalmodule.playMusic = new playMusic({url:'http://localhost:10010/audio/Eris.S - 中二病.mp3'});
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
    globalmodule.uploadMusic.init();
    globalmodule.uploadMusic.event();
}