var playMusic = function (opts){
    this.$el = opts.$ele||$("body");
    this.url = opts.url || '';
    this.Media = '';
}
playMusic.prototype.init = function () {
   var html = comutil.syncGet(comutil.origin+'/html/tmpl/playMusictmpl.html');
   this.$el.append(tmpl(html,{url:this.url}));
}
playMusic.prototype.event = function(){
    var Media = $("#myvideo")[0];
    this.Media = Media;
    Media.addEventListener('timeupdate',function(){
        console.log(Media.duration,Media.currentTime)
        $(".slider-bar .all-time").html(comutil.renderTime(Media.duration))
        globalmodule.sliderBar.change(Media.duration,Media.currentTime);
    },false);
    //播放按钮
    $("#play-pause").click(function(){
        var $this = $(this);
        $this.addClass('hide');
        $(".cd-pic").removeClass('stop');
        Media.play();
    })
    //点击图片暂停音乐
    $(".cd-pic").click(function(){
        $("#play-pause").removeClass('hide');
        $(".cd-pic").addClass('stop');
        Media.pause();
    })
}