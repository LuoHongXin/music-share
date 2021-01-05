const express = require('express');
const router = express.Router();
const mongo = require('../db');
const fs = require('fs');
const path = require('path');
const adcolName = 'audio';
let {formatData} = require('../utils');
//根据歌名查找数据返回歌曲信息
router.post('/read',async(req,res,next)=>{
    let {
        filename
    } = req.body;
    try{
        let result = await mongo.find(adcolName,{filename:filename});
        res.send(formatData({
            data:result
        }))
    }catch(err){
        res.send(formatData({code:0,data:err}))
    }
})

router.get('/readVideo',async(req,res,next)=>{
    let {
        fileUrl
    } = req.query;
    console.log(req.query);
    try{
        if (fileUrl) {
            readBigFileEntry(fileUrl,res);
        } else {
            res.send(formatData({code:0,data:'视频无地址数据'}))
        }
    }catch(err){
        res.send(formatData({code:0,data:err}))
    }
})

// 读取大型文件，分开读取方法
function readBigFileEntry(filename, response) { // filename 为服务器上文件的路径
	fs.access(filename, function(err) {
        // 若不存在
        if (!filename || err) { 
            response.writeHead(404); 
            response.end(); 
            return; 
        }      
        var readStream = fs.createReadStream(filename); 
        var contentType = 'none'; 
        var ext = path.extname(filename); 
        switch (ext) { 
            case ".flv": 
                contentType = "video/flv";
            case ".mp4":
                contentType = "video/mpeg4";  
            break; 
        } 
        response.writeHead(200, { 
            'Content-Type' : contentType, 
            'Accept-Ranges' : 'bytes', 
            'Server' : 'Microsoft-IIS/7.5', 
            'X-Powered-By' : 'ASP.NET'
        }); 
        readStream.on('close', function() { 
            response.end(); 
            console.log("Stream finished."); 
        }); 
        readStream.pipe(response); 
	}); 
}
module.exports = router;