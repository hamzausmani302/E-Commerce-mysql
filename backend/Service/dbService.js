const mysql = require('mysql2');





let instance = null;

  const connection = mysql.createConnection({
    host: 'localhost',
    port : process.env.db_port,
    user: process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database : "test"
  });
  connection.connect((err)=>{
    if(err) {return console.log(`error : ${err.message}`)}
   console.log("connected to the dataabse");

});
  instance = connection;

class DBDAO{

    constructor(){

    }
    static get_instance(){
      return instance;
    }
    static async  get_all(){
      const pr = await new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM customers" , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
          
      })

      })
      console.log(pr);
      return pr;
         
    }   
 }

 
   
  

  
  
 
 module.exports= DBDAO;