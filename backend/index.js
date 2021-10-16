const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql2');
const router=  require('./Routers/AdminRouter');



const App = express();
dotenv.config()
App.use(express.json());
App.use(express.urlencoded({extended : true}));
App.use(cors());

App.use(router);


App.listen( process.env.PORT || 3000 , ()=>{
    console.log(`connected on PORT :  ${process.env.PORT || 3000}`
    )
}  );