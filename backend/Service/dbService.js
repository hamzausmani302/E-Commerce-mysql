const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

console.log("Loading database");


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
    
// console.log(connection)
});
  instance = connection;

class USERDAO{
  constructor(){

  }
  static get_instance(){
    return instance;
  }
  static async fetch_from_email(email ){
    const pr = await new Promise(
      (resolve , reject) => {
        
        connection.query("SELECT * FROM CUSTOMERS WHERE EMAIL = ? " , [email  ] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          
          resolve(result);
        })
      }
    );
    return pr;
  }

  static async Login(email , password){
    const pr = await new Promise(
      (resolve , reject) => {
        
        connection.query("SELECT * FROM CUSTOMERS WHERE EMAIL = ? AND PASSWORD = ?" , [email , password ] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          
          resolve(result);
        })
      }
    );
    return pr;
  }
    
  static async insert_User(userID,Fname,Lname,userEmail,password,address,phoneNo, dateCreated){
        
      
      const pr = await new Promise(
          (resolve , reject) => {
            connection.query("INSERT INTO CUSTOMERS VALUES(?,?,?,?,?,?,?,?)" , [userID,Fname,Lname,userEmail,password,address,phoneNo, dateCreated] , (err,result)=>{
              if(err){reject(new Error(err.message))}
              resolve(result);
            })
          }
        );
        return pr;
    
  }

  static async update_User(){

  }
  

}



class ProductDAO{
  constructor(){

  }
  static get_instance(){
    return instance;
  }
  static async Get_Products(){
      const pr = await new Promise((resolve , reject) => {
        connection.query("SELECT * FROM PRODUCT" , [] , (err,result) => {
          if(err){reject(new Error(err.message))};
          resolve(result);
        })
      })
      return pr;
  }
  static async Get_a_Product(id){
    const pr = await new Promise((resolve , reject) => {
      connection.query("SELECT * FROM PRODUCT WHERE PRODUCT_ID=?" , [id] , (err,result) => {
        if(err){reject(new Error(err.message))};
        resolve(result);
      })
    })
    return pr;
  }
  
  static async Add_a_Product(product){
      const pr = await new Promise((resolve , reject) => {
          connection.query(`INSERT INTO PRODUCT SET PRODUCT_NAME=? , CATEGORYID=? , 
          DESCRIPTION=? , TAGS= ? , IMAGESOURCE = ? ,SUPPLIER_ID = ? , PIECES = ? , ENCODED_ID= ?` , [
            product.PRODUCT_NAME,
            product.CATEGORYID,
            product.DESCRIPTION,
            product.TAGS,
            product.IMAGESOURCE,
            product.SUPPLIER_ID,
            product.PIECES,
            product.ENCODED_ID
          
          ] , (err,result)=>{
            if(err){reject(err.message)}
            resolve(result);
          })
      })
      return pr;
  }
  static Remove_a_Product(product){

  }

  static update_a_product(id , product){

  }

}




class CategoryDAO{
  constructor(){

  }
  static get_instance(){
    return instance;
  }

}

class DBDAO{

    constructor(){

    }
    static get_instance(){
      return instance;
    }

  
    static async delete_User(){

    }
    static async get_All_Users(){

    }
    static async fetch_from_email(email ){
      const pr = await new Promise(
        (resolve , reject) => {
          
          connection.query("SELECT * FROM ADMINISTRATOR WHERE EMAIL = ? " , [email  ] , (err,result)=>{
            if(err){reject(new Error(err.message))}
            
            resolve(result);
          })
        }
      );
      return pr;
    }
  
    static async Login(email , password){
      const pr = await new Promise(
        (resolve , reject) => {
          
          connection.query("SELECT * FROM ADMINISTRATOR WHERE EMAIL = ? AND PASSWORD = ?" , [email , password ] , (err,result)=>{
            if(err){reject(new Error(err.message))}
            
            resolve(result);
          })
        }
      );
      return pr;
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

 
   
  

  

 module.exports.DBDAO = DBDAO;
 module.exports.USERDAO = USERDAO;
 module.exports.PRODUCTDAO = ProductDAO;

