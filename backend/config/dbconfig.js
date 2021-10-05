const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    port : process.env.db_port ,
    user: process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database : "test"
  });
 
connection.connect((err)=>{
     if(err) {return console.log(`error : ${err.message}`)}
     console.log("connected to the dataabse");
   
 }); 
 connection.query("Select * from administrator" , (err , res)=>{
    if(err){return console.error(`error : ${err.message}`)}
    console.log(res[0]);
 })

 module.exports=  connection;