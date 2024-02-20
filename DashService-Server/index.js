const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');





app.use(express.raw());
app.use(express.static(path.resolve('./public')));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

app.get('/', (req,res)=>{
    res.send("Hello world")
})


const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`Server started http://localhost:${PORT}`)
})