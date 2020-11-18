// 拷贝mongo数据中的数据作为备份的脚本
// mongoexport -d GDOU_SHTP -c users -o D:/GDOU/GDOU-SHTP/mongodbData/users.json
var outputUrl = 'C:/Users/LHX/Desktop/音乐分享平台/music-share/mongodb';//输出路径
var connections = ['audio'];//所有集合名
var dbname = 'MUSIC-SHARE';//需要备份的数据库
// var cmd = new ActiveXObject("WScript.Shell");
var cmd = require('node-cmd')
connections.forEach(item=>{
    cmd.run(`mongoexport -d ${dbname} -c ${item} -o ${outputUrl}/${item}.json`)
})
