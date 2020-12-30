
var globalmodule = {};
$(function(){
    if(comutil.getUrlParams("filekey")){//根据filekey和filename判断播放的是音频还是视频
        $('head').append(`<link rel="preload" as="audio" href="${comutil.playurl+comutil.getUrlParams("filekey")}"></link>`)
        initPlayMusic();
        initSliderBar();
        initUploadMusic();
        initBuble();
    }else{
        var filename = comutil.getUrlParams("filename")||'';
        $('head').append(`<link rel="preload" as="video" href="${comutil.playvideourl+filename}"></link>`)
        /*
        预拉取用于标识从当前网站跳转到下一个网站可能需要的资源，以及本网站应该获取的资源。这样可以在将来浏览器请求资源时提供更快的响应。
        link 标签的 as 属性有如下：
        audio: 音频文件
        video: 视频文件  
        Track: 网络视频文本轨道 
        script: javascript文件
        style: css样式文件
        font: 字体文件   
        image: 图片   
        fetch: XHR、Fetch请求
        worker: Web workers
        embed: 多媒体请求 
        object:  多媒体请求
        document: 网页
        */ 
        initPlayVideo();
        initUploadVideo();
    }
})
//音乐播放
function initPlayMusic () {
    var filename = comutil.getUrlParams("filekey")||'';
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
    globalmodule.playVideo = new playVideo({url:comutil.playvideourl+filename});
    globalmodule.playVideo.init();
    globalmodule.playVideo.event();
}
//视频上传页面
function initUploadVideo (){
    globalmodule.uploadVideo = new uploadVideo({});
}
//气泡
function initBuble () {
    globalmodule.buble = new bubleBackground({$ele:$('.music-box')})
    globalmodule.buble.init()
}