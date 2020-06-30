var playVideo = function (opts){
    this.$el = opts.$ele||$("body");
    this.url = opts.url || '';
    this.Media = '';
}
playVideo.prototype.init = function(){
    var html = comutil.syncGet(comutil.origin+'/html/tmpl/playVideo.html');
    this.$el.append(tmpl(html,{url:this.url}));
}
playVideo.prototype.event = function(){
    var Media = $("#videoPlay")[0];
    this.Media = Media;
    var timer;
    Media.addEventListener("touchstart", function (e) {
        timer = setTimeout(function () {
            e.preventDefault();
            $(".playVideo .mask").removeClass("hide");
            $(".uploadVideo").addClass("active");
        }, 1000);
    });
    Media.addEventListener("touchmove", function (e) {
        clearTimeout(timer);
        timer = 0;
    });
    Media.addEventListener("touchend", function (e) {
        clearTimeout(timer);
        return false;
    });
    $(".playVideo .mask").click(function(){
        $(this).addClass("hide");
        $(".uploadVideo").removeClass("active");
    });
    //跳转到分享页面
    $(".uploadVideo").click(function(){
        $(".playVideo").remove();
        globalmodule.uploadVideo.init();
        globalmodule.uploadVideo.event();
    })
}