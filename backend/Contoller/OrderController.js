

const path = require('path');
const Order = require('../Models/Order');
const Item = require('../Models/OrderItem');
const moment = require('moment');
const {ORDERSDAO , TRANSACTIONSDAO} = require('../Service/dbService');
const {VERIFY_NUM_INPUT} = require('../Service/HELPERS/SecurityHelper');
class OrderController{
    static delete_order_items = (req,res)=>{
        let promises = []; 
        let to_delete_values = req.body.ids;
        for(let i = 0 ; i < to_delete_values.length ; i++){
            promises.push(ORDERSDAO.Remove_items(to_delete_values[i]));
        }
        Promise.all(promises).then((values) => {
            res.send(values);
          });
    }
    static update_a_order(req,res){
        let id = req.params.id;
        if(!VERIFY_NUM_INPUT(id)){
            return res.status(400).send({error : "invalid input"});
        }
        let nid = Number(id);
        //converted to a number and checfked
        let update_data = req.body.data;
        
        //fetch body objects
        //send to db to save changes
        ORDERSDAO.update_order(nid , update_data)
        .then(data=>{
            if(data){ 
                let msg = "successfully updated records";
                if(data.affectedRows == 0){
                    msg = "no such records exists";
                }
                return res.status(200).send({affectedRows : data.affectedRows , message : msg});
                
            }
            return res.json({error : "invalid parameters",  message : "invalid parameters"});
        })
        .catch(err=>{
            return res.json({error : "invalid parameters",message : err.message});
        })

    }   
    
    

    static add_order(req,res){
        
        let id = req.body.customer_id;
        let shipperid = req.body.shipper_id;
        let amount = req.body.amount;
        let cart_items = req.body.cart;
       let address = req.body.address;
        const date = new Date();
        let day = String(date.getDate());
        let month = String(date.getMonth());
        if (day.length < 2) {
          day = "0" + day;
        }
        if (month.length < 2) {
          month = "0" + month;
        }

        let year = date.getFullYear();
        const final = year + "-" + month + "-" + day;

        let transaction = req.body.transaction;
        let order = new Order(0 ,  id , shipperid , amount  );
        console.log(order,transaction);
        ORDERSDAO.Add_Order_details(order,address)
        .then(data=>{
            if(data.affectedRows > 0){
                let insertId = data.insertId;
                order.ORDER_ID = insertId;
               
                if(!req.body.valid){
              

                let pr =ORDERSDAO.Add_Item_For_Order(insertId , cart_items)
                
                let pr1 = TRANSACTIONSDAO.Add_Transactions(insertId ,id,amount, transaction,date)
                Promise.all([pr,pr1]).then((data1)=>{
                    res.status(200).json(data1);
                }
            
                ).catch(err=>{
                    return res.send({error : err.message})
                })
            }else{
                ORDERSDAO.Add_Item_For_Order(insertId , cart_items).then(data2=>{
                    res.status(200).json(data2);
                })
            }
            }
           
            
        })
        .catch(err=>{
            res.status(500).send({error : err.message})
        })   
        
        

    }
    

    static get_a_order(req,res){
       let id = parseInt(req.params.id);
       if(id == null || id == undefined){
            return res.status(400).send({error : "id not provided"});
       }
       let promises = [];
       ORDERSDAO.get_orders_by_id(id)
       .then(data=>{
           if(data.length > 0){
                let order = data[0];
                ORDERSDAO.Get_All_Items(id).then(data1=>{
                    order.items = data1;
                    res.status(200).send(order);  
                }).catch(err1=>{throw new Error("error fetching data")})
               
                 
                
            
             
           }else{
               res.send("no such Orders exist");
           }
         })
       .catch(err=>{res.send({error : err.message})})

    }
    static get_customer_order = (req,res)=>{
        let id = parseInt(req.params.id);
        let promises  = [];
        
        ORDERSDAO.get_orders_by_customer(id)
       .then(data=>{
        console.log(data);   
        if(data.length > 0){
               
                data.forEach(element => {

                      promises.push(ORDERSDAO.Get_All_Items(element.ORDER_ID));
                  
                 
              });      
              
              Promise.all(promises).then((values) => {
                for(let i =0 ; i < values.length ;i++){
                     data[i].items=  values[i];
                }
                res.send(data);
              });

           }else{
               res.send("no orders to display");
           }
         })
       .catch(err=>{res.send({error : err.message})})
    }
    static get_all_orders =  (req,res)=>{
        
       
        let promises  = [];
        ORDERSDAO.Get_All_Orders()
       .then(data=>{
           if(data.length > 0){
              
                data.forEach(element => {

                      promises.push(ORDERSDAO.Get_All_Items(element.ORDER_ID));
                  
                 
              });      
              
              Promise.all(promises).then((values) => {
                for(let i =0 ; i < values.length ;i++){
                     data[i].items=  values[i];
                }
                res.send(data);
              });

           }else{
               res.send("no orders to display");
           }
         })
       .catch(err=>{res.send({error : err.message})})
    }



}

module.exports = OrderController;