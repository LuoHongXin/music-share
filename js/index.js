
var globalmodule = {};
$(function(){
    initPlayMusic();
})
function initPlayMusic () {
    globalmodule.playMusic = new playMusic({url:'http://localhost:6325/static/GAI周延 - 天干物燥 (Live).mp3'});
    globalmodule.playMusic.init();
}