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

const connection = mysql.createConnection({
    host: "localhost",
    port : 3306,
    user: process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database : "test"
  });
 
connection.connect((err)=>{
     if(err) {return console.log(`error : ${err.message}`)}
     console.log("connected to the dataabse");
     connection.query("Select * from administrator" , (err , res)=>{
        if(err){return console.error(`error : ${err.message}`)}
        console.log(res);
     })
 }); 


App.listen( process.env.PORT || 3000 , ()=>{
    console.log(`connected on PORT :  ${process.env.PORT || 3000}`
    )
}  );