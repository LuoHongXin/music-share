var playMusic = function (opts){
    this.$el = opts.$ele||$("body");
    this.url = opts.url || '';
    this.filename = opts.filename||'';
    this.fileInfo = '';
    this.Media = '';
}
playMusic.prototype.init = function () {
    var pmthis = this;
    $.ajax({
        type:'post',
        url:comutil.service+'/play/read',
        async:false,
        data:{
            filename:this.filename
        },
        success:function(data){
            if(data.code==1){
                pmthis.fileInfo = data.data[0]||{};
            }
            console.log(data);
        },
        fail:function(){
            console.log(123)
        }
    })
   var html = comutil.syncGet(comutil.origin+'/html/tmpl/playMusictmpl.html');
   this.$el.append(tmpl(html,{url:this.url,filename:this.fileInfo.musicname,username:this.fileInfo.username}));
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
        console.log(Media.duration)
        if(!Media.duration){
            alert("目前暂无你要播放的音乐文件，你想播放请等别人或你来上传");
            return;
        }
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
    //跳转到分享页面
    $(".sharebtn").click(function(){
        $(".music-box").remove();
        globalmodule.uploadMusic.init();
        globalmodule.uploadMusic.event();
    })
    //下载音乐
    $(".download").click(function(){
        if(globalmodule.playMusic.Media.duration){
            var html = `<iframe class="hide" id="downloadmusic" src='${comutil.service}/upload/download?filename=${globalmodule.playMusic.fileInfo.filename}'></iframe>`;
            globalmodule.playMusic.$el.append(html);
        }else{
            alert("目前暂无你要下载的音乐文件，你想下载请等别人或你来上传");
        }
    })
}