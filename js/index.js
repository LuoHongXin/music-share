
var globalmodule = {};
$(function(){
    initPlayMusic();
})
function initPlayMusic () {
    globalmodule.playMusic = new playMusic({url:'http://localhost:10010/audio/Eris.S - 中二病.mp3'});
    globalmodule.playMusic.init();
    globalmodule.playMusic.event();
}