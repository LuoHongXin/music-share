const express = require('express');
const app = express();

app.use(express.static('./'));
let{port} = require('./config.json');
app.listen(port,()=>{
    console.log(port+'serve is running');
})