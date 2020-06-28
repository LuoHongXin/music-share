var comutil = {
    origin:location.origin,//当前页面路径的origin
    audioAction:'http://localhost:10010/upload/audio',//音乐文件上传地址
    playurl:'http://localhost:10010/audio/',
    service:'http://localhost:10010',//服务器地址
    syncGet:function(url) {// 请求模板方法
        var data=null;
        $.ajax({
            url: url,
            async: false,
            success: function (resp) {
                data=resp;
            },
            error: function (error) {
                data=error;
            }
        });
        return data;
    },
    renderTime:function (sec){//秒数转换为分钟
        var minute = Math.floor(sec/60);
        minute = minute<10?'0'+minute:minute;
        var second = Math.ceil(sec%60);
        if(second==60){
            second = '00';
            minute++; 
        }else{
            second = second<10?'0'+second:second
        }
        return minute+':'+second;
    },
    encrypt:function (content,key){//aes加密
            if(!content){return content;}
            key = CryptoJS.enc.Utf8.parse(key);
            var sContent = CryptoJS.enc.Utf8.parse(content);
            var encrypted = CryptoJS.AES.encrypt(sContent,key,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
            var res = encrypted.toString();
            return res;
    },
    getUrlParams:function(name){
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (!results) {
			return '';
		}
		return decodeURIComponent(results[1]) || '';
	}
};
    