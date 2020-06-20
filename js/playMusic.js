var playMusic = function (opts){
    this.$el = opts.$ele||$("body");
    this.url = opts.url || '';
}
playMusic.prototype.init = function () {
   var tmpl = comutil.syncGet(comutil.origin+'/html/tmpl/playMusictmpl.html');
   this.$el.append(tmpl);
}
