const express = require("express");
const router = express.Router();
router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,x-request-width");
    res.header("Access-Control-Allow-Methods","PUT,PATCH,POST,GET,DELETE,OPTIONS");
    if(req.method=="OPTIONS"){
        res.sendStatus(200);
    }else{
        next();
    }
})
//引入路由
const upload = require('./upload');
const play = require('./play');


router.use(express.urlencoded({extended:true}),express.json());


router.use('/upload',upload);
router.use('/play',play);

module.exports = router;
