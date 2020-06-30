
var globalmodule = {};
$(function(){
    if(comutil.getUrlParams("filekey")){//根据filekey和filename判断播放的是音频还是视频
        initPlayMusic();
        initSliderBar();
        initUploadMusic();
    }else{
        initPlayVideo();
        initUploadVideo();
    }
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
//音乐文件上传页面
function initUploadMusic () {
    globalmodule.uploadMusic = new uploadMusic({});
    // globalmodule.uploadMusic.init();
    // globalmodule.uploadMusic.event();
}
//视频播放
function initPlayVideo () {
    var filename = comutil.getUrlParams("filename")||'';
    if(!filename){
        alert("没有视频文件");
        return;
    }
    globalmodule.playVideo = new playVideo({url:comutil.playvideourl+filename});
    globalmodule.playVideo.init();
    globalmodule.playVideo.event();
}
//视频上传页面
function initUploadVideo (){
    globalmodule.uploadVideo = new uploadVideo({});
}