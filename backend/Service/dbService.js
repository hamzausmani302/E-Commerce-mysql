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
    database : "store"
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
            if(err){reject(new Error(err.message))}
            console.log(result);
            resolve(result);
          })
      })
      return pr;
  }
  static Remove_a_Product(product){

  }

  static update_a_product(id , product){
    console.log(product);
      let params = [];
      let query = "UPDATE PRODUCT SET ";
      var midquery = "";
      let query2 = " WHERE PRODUCT_ID = ?;";
      for (const key in product) {
          if(product[key] != undefined && product[key] != null && product[key] != "" ){
              params.push(product[key]);
              midquery += (key + "= ?,");
          }
      }
      params.push(id);
      midquery = midquery.substr(0,midquery.length-1);
      const finallquery = query + midquery + query2;
      console.log(query + midquery + query2);
      console.log(params);
      const pr = new Promise((resolve , reject)=>{
        connection.query(finallquery , params , (err,result)=>{
          if(err){reject(new Error(err))}
          resolve(result);
        })    
      })
      return pr;
      
  }

}





class CategoryDAO{
  constructor(){

  }
  static get_instance(){
    return instance;
  }
  static async Get_All_Category() {
    const pr = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM CATEGORY", [], (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
  }

  static async Get_a_Category(id) {
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM CATEGORY WHERE CATEGORY_ID=?",
        [id],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    });
    return pr;
  }

  static async Add_Category(category) {
    console.log(category)
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO CATEGORY SET CATEGORY_DESC=? , PARENT_ID= ? , CATEGORY_NAME=?,IMAGE = ?"
       , [
          category.CATEGORY_DESC,
          category.PARENT_ID,
          category.CATEGORY_NAME,
          category.IMAGE
        ],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    });
    return pr;
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


 

 class ShippersDAO{
  constructor(){

  }
  static get_instance(){
    return instance;
  }
  static async Get_All_SHIPPERS() {
    const pr = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM SHIPPERS", [], (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
  }

  static async Get_a_SHIPPER(id) {
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM SHIPPERS WHERE SHIPPER_ID=?",
        [id],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    });
    return pr;
  }

  static async Add_SHIPPER(shipper) {
    
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO SHIPPERS SET NAME=? , CONTACT=? , COUNTRY=?;"
       , [
          shipper.NAME,
          shipper.CONTACT,
          shipper.COUNTRY
        ],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    });
    return pr;
  }

 }
 class SupplierDAO{
  constructor(){

  }
  static get_instance(){
    return instance;
  }
  static async Get_All_Supplier() {
    const pr = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM SUPPLIERS", [], (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
  }

  static async Get_a_Supplier(id) {
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM SUPPLIERS WHERE SUPPLIER_ID=?",
        [id],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    });
    return pr;
  }

  static async Add_Supplier(supplier) {
    // console.log(category)
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO SUPPLIERS SET NAME=? , CONTACT= ? , ADDRESS=?,CITY = ?,POSTALCODE=?,COUNTRY=?"
       , [
          supplier.NAME,
          supplier.CONTACT,
          supplier.ADDRESS,
          supplier.CITY,
          supplier.POSTALCODE,
          supplier.COUNTRY,
        ],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    });
    return pr;
  }


 }
   
 
 

 class OrdersDAO{

    constructor(){}
    static async Get_all_orders(){
      const pr = new Promise((resolve, reject) => {
        connection.query("" , [order.DELIVERY_PARTNER] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);

        })
    })
   

    return pr;

    }
    static async Get_Order_By_Id(id){

    }
    static async Add_Order_Status(order){
      //INSERT DELIVERY_PARTNER INTO ORDERSDAtabase
      const pr = new Promise((resolve, reject) => {
          connection.query("INSERT INTO ORDERSTATUS (DELIVERY_PARTNER) VALUES (?)" , [order.DELIVERY_PARTNER] , (err,result)=>{
            if(err){reject(new Error(err.message))}
            resolve(result);

          })
      })
     

      return pr;

    }


    static async Add_Order_details(order){
      const pr = new Promise((resolve, reject) => {
        connection.query("INSERT INTO ORDERDETAILS (AMOUNT,CUSTOMERID,STATUS,DELIVERY_PARTNER) VALUES (?,?,?,?)" , [  order.AMOUNT , order.CUSTOMER_ID , order.STATUS , order.DELIVERY_PARTNER] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);

        })
    })
    return pr;  
  }
    static async Add_Item_For_Order(order_id , items_list){
       
      //isnert items for the orders into the databse
        const pr = new Promise((resolve, reject) => {
          
          let res_arr = [];
          let query = `INSERT INTO ORDERS_ITEMS (ORDER_ID , PRODUCT_ID , QUANTITY) VALUES `;
          for (let key in items_list){
              let q1 = `(? , ? , ? ),`;
              query += q1;
              res_arr.push(order_id , parseInt(key) , items_list[key]);      
          }
          query = query.substring(0, query.length-1)+ ";";
          
          connection.query(query , res_arr , (err,result)=>{
            if(err){reject(new Error(err.message))}
            resolve(result);
          });
          
          
      })
      return pr;
    }

    static async get_orders_by_id(order_id){
      const pr = new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ORDERDETAILS WHERE ORDER_ID =?` , [order_id] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
        })
    })
    return pr;  

    }

    static async Update_Order(){
        

    }
    static async Get_All_Items(order_id){
      const pr = new Promise((resolve, reject) => {
        connection.query("SELECT ORDER_ID , PRODUCT_ID , QUANTITY FROM ORDERS_ITEMS WHERE ORDER_ID = ?" , [order_id] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
        })
    })
    return pr;  
    }

    static async Get_All_Orders(){
      const pr = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM ORDERDETAILS WHERE STATUS='PENDING'" , [] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);

        })
    })
    return pr;  
    }

    static async Get_Orders_By_Customer( customer_id ,  order='Desc'  ){
      const pr = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM ORDERDETAILS WHERE CUSTOMERID=?" , [customer_id] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);

        })
    })
    return pr;  

    }

 }

 

  

 module.exports.DBDAO = DBDAO;
 module.exports.USERDAO = USERDAO;
 module.exports.PRODUCTDAO = ProductDAO;
 module.exports.CATEGORYDAO = CategoryDAO;
 module.exports.SHIPPERDAO= ShippersDAO;
 module.exports.SUPPLIERDAO = SupplierDAO;
 module.exports.ORDERSDAO = OrdersDAO;

