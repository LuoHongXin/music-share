var playMusic = function (opts){
    this.$el = opts.$ele||$("body");
    this.url = opts.url || '';
}
playMusic.prototype.init = function () {
   var html = comutil.syncGet(comutil.origin+'/html/tmpl/playMusictmpl.html');
   this.$el.append(tmpl(html,{url:this.url}));
}
playMusic.prototype.event = function(){
    var Media = $("#myvideo")[0];
    var eventTester = function(e){//播放器的事件监听
        Media.addEventListener(e,function(){
            console.log((new Date()).getTime(),e)
        },false);
    }
    console.log(eventTester);
    eventTester("play");
}