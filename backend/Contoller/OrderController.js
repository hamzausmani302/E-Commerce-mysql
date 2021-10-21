

const path = require('path');
const Order = require('../Models/Order');
const Item = require('../Models/OrderItem');
const {ORDERSDAO} = require('../Service/dbService');

class OrderController{
    
    static update_a_order(req,res){

    }

    static add_order(req,res){
        let order = new Order(0 ,  req.body.customer_id , req.body.shipper_id  , 100   );
        

        ORDERSDAO.Add_Order_Status(order)
        .then(data=>
            {
                if(data && data.affectedRows > 0){
                    const id = data.insertId;
                    order.ORDER_ID = id;
                    ORDERSDAO.Add_Order_details(order)
                    .then(data1=>{
                        if(data1.affectedRows > 0){
                            ORDERSDAO.Get_Orders_By_Customer(order.CUSTOMER_ID).then(data2=>{
                                let len = data2.length;
                                if(len > 0){
                                    res.status(200).send(data2[len-1]);
                                }
                                

                            }).catch(err3=>{throw new Error(err3.message)})                                
                        }
                        
                    })
                    .catch(err1=>{res.status(400).send({error : err1.message})})
                }
                
            })
        .catch(err=>{res.status(400).send({error : err.message})});

    }
    

    static get_a_order(req,res){
       
    }

    static get_all_orders(req,res){
       
    }



}

module.exports = OrderController;