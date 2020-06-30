
var uploadVideo = function(opts){
    this.$el = opts.$ele||$("body");
 }
 uploadVideo.prototype.init = function () {
     var html = comutil.syncGet(comutil.origin+'/html/tmpl/uploadVideo.html');
     this.$el.append(tmpl(html))
 }
 uploadVideo.prototype.event = function () {
     $('.upload-music #uploadMusic').change(function(){
         var file = $(this)[0].files[0];
         console.log(file);
         if (!/video\/\w+/.test(file.type)) {/*可以把autio改成其他文件类型 比如 image*/
              $(this).val('')  
             alert("只能选择视频文件");
         }
         $(".upload-music .uploadfile").removeClass("active");
         $(".upload-music .msg").removeClass("hide red").html(file.name);
     })
     $(".upload-music .uploadfile").click(function(){
         $("#uploadMusic").click();
     })
     $(".submit").click(function(){
         if(!$("#uploadMusic").val()){
             $(".upload-music .msg").removeClass("hide").addClass("red").html("请先点上面那个文件夹上传文件");
             $(".upload-music .uploadfile").addClass("active");
             return false;
         }else{
             $(".upload-music .uploadfile").removeClass("active");
             $(".upload-music .msg").removeClass("red").addClass("hide").html("")
         }
     })
     $(".upload-music form").ajaxForm({
         success:function(data){
             if(data.code==1){
                 $("#shareurl").removeClass("hide").val(data.data.filekey);
             }
             console.log(data);
         }
     })
 }
 
 