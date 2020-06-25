var sliderBar = function(opts){
   this.$el = opts.$el||$("body");
}
sliderBar.prototype.init = function () {
    var html = comutil.syncGet(comutil.origin+'/html/tmpl/sliderBar.html')
    this.$el.append(tmpl(html));
}
sliderBar.prototype.change = function (duration,currentTime) {
    $('.slider-bar .slider-selection').width((currentTime/duration)*100+'%');
    $('.slider-bar .slider-handle').css('left',(currentTime/duration)*100+'%');
    $('.slider-bar .duration .change-time').html(comutil.renderTime(currentTime));
}
sliderBar.prototype.event = function (){
    $('#ex1').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    }).on('slide',function(slideEvt){
        var Media = globalmodule.playMusic.Media;
        Media.currentTime = (slideEvt.value/1000)*Media.duration;
    })
}
