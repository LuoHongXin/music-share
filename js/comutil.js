var comutil = {
    origin:location.origin,
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
};