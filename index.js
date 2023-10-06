const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const routes = require('./server/routes/routers');
app.use('/',routes);

app.listen(8000,(req)=>{
    console.log('Port 8000 listening..');
})