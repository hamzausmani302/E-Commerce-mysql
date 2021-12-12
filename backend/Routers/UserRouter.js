const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const User= require('../Contoller/UserController.js')
const Order = require('../Contoller/OrderController.js');
const router = express.Router();
// const DB = require('../Service/dbService');


// router.get('/signup' ,DB.add_User );

// router.get('/login' , (req,res)=>{
//     res.send("<div>hi one1 </div>")
// })

// router.get('/customers' , (req,res)=>{
//     const resp= DB.get_all().then((data)=>{return res.json(data)});
    
// })

router.post('/login' , User.UserLogin);
router.post('/signup',User.Signup);
router.post('/order/add', Order.add_order  );
router.get('/orders/:id',Order.get_customer_order)
module.exports = router;