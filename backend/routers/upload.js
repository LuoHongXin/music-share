const express = require('express');
const router = express.Router();
const mongo = require('../db');
const multer = require('multer');
const fs = require('fs');
const adcolName = 'audio';
let {formatData,audiourl} = require('../utils');
//接收音乐文件
router.post('/audio',multer({
    dest:'audio'
}).single('file'),async (req,res,next)=>{
    let file = req.file;
    // let {username} = req.body;
    if(file.length === 0||!file){
        res.render("error",{ message:"上传文件不能为空哦！" });
        return;
    }else{
        if(file.mimetype.indexOf('audio')!=-1){//音频
          let fileInfo = {};
          console.log(file);
        //   let key = Date.parse(new Date());
        //   let filekey = Encrypt(file.originalname,key);
        let filekey =audiourl(file.originalname);
        var nameArr = file.originalname.replace('.'+file.mimetype.split('/')[1],"").split(' - ')||['',''];
          try{
              let result = await mongo.create(adcolName,[{
                //   username:username,
                  filename:file.originalname,
                  username:nameArr[0],
                  musicname:nameArr[1],
                //   filekey:filekey,//加密后的字符
                  size:file.size,
                  type:file.mimetype
              }])
              fs.renameSync('./audio/'+file.filename,'./audio/'+file.originalname);
              fileInfo.mimetype = file.mimetype;
              fileInfo.originalname = file.originalname;
              fileInfo.size = file.size;
              fileInfo.path = file.path;
              res.set({
                  'content-type':'application/json;charset=utf-8'
              });
              res.send(formatData({data:{
                fileInfo:fileInfo,
                result:result,
                filekey:filekey//文件名作为key值
            }}));
          }catch(err){
            res.send(formatData({code:0,data:err}))
          }
        }
    }
})
//下载音乐文件
router.get('/download',function(req,res,next){
    var filename = '';
    console.log(req.query.filename);
    if(req.query.filename){
        filename=req.query.filename;
        var result = '';
        try{
            res.download('./audio/'+filename,function(err){
                if(err){
                    console.log(err);
                    result = false;
                }else{
                    console.log('ok')
                    result = true;
                }
            })
        }catch(err){
            res.send(formatData({code:0,data:err}))
        }
    }else{
        console.log('没传文件名')
        res.send(formatData({code:0,data:'没传文件名'}))
    }
})
//接收视频文件
router.post('/video',multer({
    dest:'video'
}).single('file'),function(req,res,next){
    let file = req.file;
    if(file.length === 0||!file){
        res.render("error",{message:"上传文件不能为空哦哦！"});
        return;
    }else{
        if(file.mimetype.indexOf('video')!=-1){//视频
            let fileInfo = {};
            fs.renameSync('./video/'+file.filename,'./video/'+file.originalname);
            fileInfo.mimetype = file.mimetype;
            fileInfo.originalname = file.originalname;
            fileInfo.size = file.size;
            fileInfo.path = file.path;
            ress.set({
                'content-type':'application/json;charset=utf-8'
            });
            res.send({
                url:'http://123.123.123:123/video/'+fileInfo.originalname,
                fileInfo:fileInfo
            })
        }
    }
})
module.exports = router;