const express = require('express');
const router = express.Router();
const mongo = require('../db');
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
module.exports = router;