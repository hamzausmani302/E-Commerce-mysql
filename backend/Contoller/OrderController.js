

const path = require('path');
const Order = require('../Models/Order');
const Item = require('../Models/OrderItem');
const {ORDERSDAO , PRODUCTDAO} = require('../Service/dbService');

class OrderController{
    
    static update_a_order(req,res){
        
    }

    static add_order(req,res){
        let id = req.body.customer_id;
        let shipperid = req.body.shipper_id;
        let amount = req.body.amount;
        let cart_items = req.body.cart;
        let order = new Order(0 ,  id , shipperid , amount || 100   );
        ORDERSDAO.Add_Order_details(order)
        .then(data=>{
            if(data.affectedRows > 0){
                let insertId = data.insertId;
                order.ORDER_ID = insertId;
                let success = false;
                let affected = 0;
                ORDERSDAO.Add_Item_For_Order(insertId , cart_items)
                .then(data1=>{
                    console.log(data1);
                    if(data1.affectedRows > 0){
                        success = true;
                        affected = data1.affectedRows;
                        return res.status(200).send({success : success, rowsUpdated : affected})
                    }else{
                        throw new Error("Error adding record");
                    }
                    
                })
                .catch(err1=>{
                    res.status(500).send({error : err1.message})
                })
                
            }
           
            
        })
        .catch(err=>{
            res.status(500).send({error : err.message})
        })        
    }
    

    static get_a_order(req,res){
       let id = req.params.orderId;

    }
    
    static get_all_orders(req,res){
        
        let products;
        let count = 0;
        ORDERSDAO.Get_All_Orders()
       .then(data=>{
           if(data.length > 0){
                for(let i = 0 ; i < data.length ; i++){
                    ORDERSDAO.Get_All_Items(data[i].ORDER_ID)
                    .then(data1=>{
                        data['items'] = data1 ;
                        count++;
                    
                    })
                    .catch(err1=>{console.log("error");throw new Error(err1.message)})
                }      
                if(count >= data.length-1){
                    res.send(data);
                }
           }else{
               res.send("no orders to display");
           }
         })
       .catch(err=>{res.send({error : err.message})})
    }



}

module.exports = OrderController;