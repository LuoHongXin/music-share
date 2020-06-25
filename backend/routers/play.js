const express = require('express');
const router = express.Router();
const mongo = require('../db');
const adcolName = 'audio';
let {formatData} = require('../utils');
//解密filekey，并返回音频路径
router.post('/read',async(req,res,next)=>{
    let {
        filekey
    } = req.body;
    try{
        let result = await mongo.find(adcolName,{filekey:filekey});
        res.send(formatData({
            data:result
        }))
    }catch(err){
        res.send(formatData({code:0,data:err}))
    }
})
module.exports = router;