const mysql = require('mysql2');





let instance = null;

  const connection = mysql.createConnection({
    host: 'localhost',
    port : process.env.db_port,
    user: 'user',
    password:'password',
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
    static async insert_admin(email , password , date , role){
        
      
      const pr = await new Promise(
          (resolve , reject) => {
            connection.query("INSERT INTO ADMINISTRATOR VALUES(?,?,?,?)" , [email , password , date , role] , (err,result)=>{
              if(err){reject(new Error(err.message))}
              resolve(result);
            })
          }
        );
        return pr;
    }

    static async  get_all(){
      const pr = await new Promise((resolve, reject)=>{
        connection.query("INSERT INTO CUSTOMER values(?,?,?,?,?,?,?,?)",[115 , "machar bazaar" , "2013-07-29" , "alihamza@gmail.com" , "ali" , "hamza" , "password" , "03002673170" ] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
          
      })

      })
      console.log(pr);
      return pr;
         
    }   
 }

 
   
  

  
  
 
 module.exports= DBDAO;