const mysql = require('mysql2');
const dotenv = require('dotenv');
const {GEN_QUERY} = require('./HELPERS/DBhelper.js');
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
            connection.query("insert into customers set first_name = ? , last_name =? , email = ?, PASSWORD = ? , ADDRESS =? , PHONE_NUMBER = ? , CREATED_AT = ?;" , [Fname,Lname,userEmail,password,address,phoneNo, dateCreated] , (err,result)=>{
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
  static async Get_Hot_Products(){
    const pr = await new Promise((resolve , reject) => {
      connection.query(`select PRODUCT_ID , SUM(QUANTITY)
      from orders_items
      group by PRODUCT_ID;
      ` , [] , (err,result) => {
        if(err){reject(new Error(err.message))};
        resolve(result);
      })
    })
    return pr;
  }
  static get_instance(){
    return instance;
  }
  static async Get_Products(){
      const pr = await new Promise((resolve , reject) => {
        connection.query("SELECT * FROM PRODUCT P JOIN CATEGORY C ON P.CATEGORYID = C.CATEGORY_ID;" , [] , (err,result) => {
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
          DESCRIPTION=? , TAGS= ? , IMAGEURL = ? ,SUPPLIER_ID = ? , PIECES = ? ` , [
         
            product.PRODUCT_NAME,
            product.CATEGORYID,
            product.DESCRIPTION,
            product.TAGS,
            product.IMAGEURL,
            product.SUPPLIER_ID,
            product.PIECES,
        
          
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
  static async Get_All_Category_products(id){
    const pr = await new Promise((resolve, reject) => {
      
      
      connection.query("SELECT * FROM PRODUCT P  JOIN CATEGORY C ON C.CATEGORY_ID=P.CATEGORYID WHERE CATEGORYID = ?", [id], (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
  }
  static get_instance(){
    return instance;
  }
  static async update_a_category(id , update_data){
    const pr = await new Promise((resolve, reject) => {
      let {query,ans_arr} = GEN_QUERY("CATEGORY" , update_data , "CATEGORY_ID");
      ans_arr.push(id);
      
      connection.query(query, ans_arr, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
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
  static async Delete_Category(id){
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "UPDATE TABLE CATEGORY SET PARENT_ID IS NULL WHERE PARENT_ID = ?; DELETE FROM category WHERE category_id = ?;"
       , [
         id,
         id
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
    static async get_all_users(){
        const pr = await new Promise((resolve, reject) =>{
          connection.query("SELECT * FROM CUSTOMERS" , [  ] , (err,result)=>{
            if(err){reject(new Error(err.message))}

            resolve(result);
          })
        })
        return pr;
    }
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
      //console.log(pr);
      return pr;
         
    }   

    static async get_customer_by_id(id){
      const pr = await new Promise((resolve, reject)=>{
        connection.query(`select CUSTOMER_ID , 
        FIRST_NAME,LAST_NAME , EMAIL , ADDRESS , PHONE_NUMBER , CREATED_AT  
        from customers where CUSTOMER_ID = ?
        `
        ,[id ] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
          
      })

      })
      return pr;
    }

 }


 

 class ShippersDAO{
  constructor(){

  }
  static get_instance(){
    return instance;
  }
  

  static async update_a_shipper(id , update_data){
    
    const pr = await new Promise((resolve, reject) => {
      let {query,ans_arr} = GEN_QUERY("SHIPPERS" , update_data , "SHIPPER_ID");
      ans_arr.push(id);
      
      connection.query(query, ans_arr, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
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
  static async delete_shippers(id){
    const pr =await new Promise((resolve, reject) => {
      connection.query(
        "delete from shippers where shipper_id = ?;"
       , [
         id
        ],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    })
   return pr;
   
  }
  static async set_to_null_orders(id){
    const pr =await new Promise((resolve, reject) => {
      connection.query(
        "UPDATE ORDERDETAILS SET DELIVERY_PARTNER = NULL WHERE DELIVERY_PARTNER= ?;"
       , [
         id
        ],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    })
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
  static async update_a_supplier(id , update_data){
    console.log(update_data);
    const pr = await new Promise((resolve, reject) => {
      let {query,ans_arr} = GEN_QUERY("SUPPLIERS" , update_data , "SUPPLIER_ID");
      ans_arr.push(id);
      console.log(query)
      connection.query(query, ans_arr, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
  }
  static async set_to_null_products(id){
    const pr =await new Promise((resolve, reject) => {
      connection.query(
        "UPDATE PRODUCT SET SUPPLIER_ID = NULL WHERE SUPPLIER_ID= ?;"
       , [
         id
        ],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    })
   return pr;
   
  }
  static async delete_supplier(id){
    const pr =await new Promise((resolve, reject) => {
      console.log("id" , id);
      connection.query(
        "delete from suppliers where SUPPLIER_ID = ?;"
       , [
         id
        ],
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        }
      );
    })
   return pr;
   
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
    static async update_order(id , updated_data){
     
        console.log(updated_data);
        const pr = await new Promise((resolve, reject) => {
          let {query,ans_arr} = GEN_QUERY("orderdetails" , updated_data , "ORDER_ID");
          ans_arr.push(id);
          console.log(query , ans_arr);
          
          connection.query(query, ans_arr, (err, result) => {
            if (err) {
              reject(new Error(err.message));
            }
            resolve(result);
          });
        });
        return pr;
     
    }

    static async set_order_active(id){

    }
    static async cancel_order(id){

    }

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
        connection.query("INSERT INTO ORDERDETAILS (AMOUNT,CUSTOMERID,STATUS,DELIVERY_PARTNER) VALUES (?,?,?,?)" , [  order.AMOUNT , order.CUSTOMER_ID , order.STATUS , null] , (err,result)=>{
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
          for (let i=0; i< items_list.length ; i++){
              let q1 = `(? , ? , ? ),`;
              query += q1;
              res_arr.push(order_id , items_list[i][0], items_list[i][1]);      
          }
          query = query.substring(0, query.length-1)+ ";";
          console.log(query , res_arr);
          connection.query(query , res_arr , (err,result)=>{
            if(err){reject(new Error(err.message))}
            resolve(result);
          });
          
          
      })
      return pr;
    }
    static async get_orders_by_customer(cust_id){
      const pr = new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ORDERDETAILS WHERE CUSTOMERID =?` , [cust_id] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
        })
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
    static async Remove_items(items_id){
      const pr = new Promise((resolve, reject) => {
        connection.query("delete from orders_items where ORDER_ITEMS_ID = ?;" , [items_id] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
        })
    })
    return pr;  
    }
    static async Get_All_Items(order_id){
      const pr = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM ORDERS_ITEMS OI join PRODUCT P ON  OI.PRODUCT_ID = P.PRODUCT_ID WHERE ORDER_ID = ?;" , [order_id] , (err,result)=>{
          if(err){reject(new Error(err.message))}
          resolve(result);
        })
    })
    return pr;  
    }

    static async Get_All_Orders(){
      const pr = new Promise((resolve, reject) => {
        connection.query(`select O.ADDRESS, O.ORDER_ID , O.AMOUNT , O.CUSTOMERID , CONCAT(c.FIRST_NAME ,' ', C.LAST_NAME)  AS NAME1 , O.STATUS 
        from orderdetails o
        join customers c
        on c.CUSTOMER_ID = o.CUSTOMERID ` , [] , (err,result)=>{
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

 

class TransactionsDAO {
  constructor(){
    
  }

  static async Get_all_Transactions() {
    const pr = new Promise((resolve, reject) => {
      connection.query("Select * from TRANSACTIONS", [], (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(result);
      });
    });
    return pr;
  }
  static async Get_a_Transaction(id) {
    const pr = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM TRANSACTIONS WHERE TRANSACTION_ID=?",
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

  // TODO-CHECK: IN THE BELOW FUNCTION USERID AND ORDERID WILL BE RECEIVED SO NO NEED TO INSERT
  
static async Add_Transactions(transaction) {
    
    const pr = await new Promise((resolve, reject) => {
      console.log(transaction)
      connection.query(
        "INSERT INTO TRANSACTIONS (USER_ID, AMOUNT , ORDER_ID, PAYMENT_METHOD,TRANSACTION_AT) VALUES (?,?,?,?,?)",
        [
          1,
          100,
          38,
          'cash',
          '2021-12-01'
        ],
        (err, result) => {
          console.log(result);
          console.log(err);
          if (err) {
             reject(new Error(err.message));
          }
          resolve(result);
        }
      );
      // resolve("hello");
    });
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
 module.exports.TRANSACTIONSDAO = TransactionsDAO;