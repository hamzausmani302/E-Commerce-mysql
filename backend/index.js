const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql2');
const router=  require('./router');

const App = express();
dotenv.config()
App.use(express.json());
App.use(express.urlencoded({extended : true}));
App.use(cors());

App.use(router);

const DB = require('./config/dbconfig');

App.listen( process.env.PORT || 3000 , ()=>{
    console.log(`connected on PORT :  ${process.env.PORT || 3000}`
    )
}  );