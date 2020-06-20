const express = require('express');
const router = express.Router();
const mongo = require('../db');
const multer = require('multer');
const fs = require('fs');
let {formatData} = require('../utils');
//接收音乐文件
router.post('/audio',multer({
    dest:'audio'
}).single('file'),function(req,res,next){
    let file = req.file;
    if(file.length === 0||!file){
        res.render("error",{ message:"上传文件不能为空哦！" });
        return;
    }else{
        if(file.mimetype.indexOf('audio')!=-1){//音频
          let fileInfo = {};
          fs.renameSync('./audio/'+file.filename,'./audio/'+file.originalname);
          fileInfo.mimetype = file.mimetype;
          fileInfo.originalname = file.originalname;
          fileInfo.size = file.size;
          fileInfo.path = file.path;
          res.set({
              'content-type':'application/json;charset=utf-8'
          });
          res.send({
              url:'http://123.123.123:123/audio/'+fileInfo.originalname,
              fileInfo:fileInfo
          });
        }
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