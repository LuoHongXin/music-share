const express = require('express');
const compression = require('compression');
const app = express();

app.use(express.static('./'));
let{port} = require('./config.json');
let routes = require('./routers');
app.use(routes);
app.use(compression());
app.listen(port,()=>{
    console.log(port+'serve is running');
})