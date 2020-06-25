
var uploadMusic = function(opts){
   this.$el = opts.$ele||$("body");
}
uploadMusic.prototype.init = function () {
    var html = comutil.syncGet(comutil.origin+'/html/tmpl/uploadMusic.html');
    this.$el.append(tmpl(html))
}
uploadMusic.prototype.event = function () {
    $('.upload-music #uploadMusic').change(function(){
        var file = $(this)[0].files[0];
        if (!/audio\/\w+/.test(file.type)) {/*可以把autio改成其他文件类型 比如 image*/
             $(this).val('')  
            alert("只能选择音频文件");
        }
    })
}

