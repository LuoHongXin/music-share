var bubleBackground = function (opts) {
    this.$el = opts.$ele || $("body");
    this.timer = '';
    this.btn = document.createElement('a');
    this.styleBtn = document.createElement('a');
    const _this = this;
    this.$el.addClass('bubleBackground');
    $(this.btn).css({left: '5vw'}).text('关闭气泡').addClass('buble-btn').attr({'btnClass':'cancel','href':'javascript:;'}).click(function(){
        if($(this).attr('btnClass')=='init') {
            $(this).text('关闭气泡').attr('btnClass','cancel');
            _this.init();
        } else {
            $(this).text('开启气泡').attr('btnClass','init')
            _this.cancel();
        }
    });
    $(this.btn).append(`<span></span><span></span><span></span><span></span>`);
    $(this.styleBtn).css({right:'5vw'}).text('赛博风格').addClass('buble-btn').attr({'btnClass':'dark','href':'javascript:;'}).click(function(){
         const pic = $('.play .cd-pic');
        if($(this).attr('btnClass')=='white') {
            $(this).text('赛博风格').attr('btnClass','dark');
            if(pic){
                pic.attr('src','../../static/1.jpeg')
            }
            _this.$el.removeClass('dark');
        } else {
            $(this).text('原始风格').attr('btnClass','white');
            if(pic){
                pic.attr('src','../../static/2.jpg')
            }
            _this.$el.addClass('dark');
        }
    });
    $(this.styleBtn).append(`<span></span><span></span><span></span><span></span>`);
    this.$el.append(this.btn);
    this.$el.append(this.styleBtn);
}
bubleBackground.prototype.init = function () {
    this.timer = setInterval(createBuble,50,{ele:this.$el});
}
bubleBackground.prototype.cancel = function () {
    clearInterval(this.timer);
    $('.buble').remove();
}
function createBuble ({ele}) {
    const buble = document.createElement('span');
    $(buble).addClass('buble');
    let size = Math.random() * 60 + 20;
    buble.style.width = size + 'px';
    buble.style.height = size + 'px';
    buble.style.left = Math.random() * innerWidth + 'px';
    ele.append(buble);
    setTimeout(()=>{
        buble.remove()
    },4000)
}