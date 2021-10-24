const express = require('express');
const dotenv = require('dotenv');
const {AUTHORIZE_USER} = require('../Service/MiddleWares/Verification');
const Admin = require('../Contoller/AdminContoller.js');
const SupplierController = require('../Contoller/SupplierController.js');
const ShipperController = require('../Contoller/ShipperController.js');
const OrderController = require('../Contoller/OrderController.js');
const TransactionController = require('../Contoller/TransactionController.js')
dotenv.config();

const router = express.Router();
const {DBDAO} = require('../Service/dbService');

router.get('/' , Admin.AdminPage);
router.post('/signup' ,  Admin.AdminSignup);
router.post('/signin' , Admin.AdminSignin);

router.get('/api/shipper' ,AUTHORIZE_USER , ShipperController.get_all_shippers );
router.get('/api/shipper/:id' ,AUTHORIZE_USER, ShipperController.Get_a_SHIPPER );
router.post('/api/shipper/add' , AUTHORIZE_USER, ShipperController.Add_SHIPPER );

router.get('/api/supplier' ,AUTHORIZE_USER, AUTHORIZE_USER ,SupplierController.get_all_Supplier );
router.get('/api/supplier/:id' , AUTHORIZE_USER ,SupplierController.get_a_Supplier );
router.post('/api/supplier/add' ,AUTHORIZE_USER , SupplierController.add_Supplier );

router.post('/order/add' , AUTHORIZE_USER , OrderController.add_order  );
router.get('/orders' ,AUTHORIZE_USER ,OrderController.get_all_orders );
router.get('/orders/:id' ,AUTHORIZE_USER , OrderController.get_a_order );

router.post('/transactions/add' ,AUTHORIZE_USER , TransactionController.add_Transaction );
router.get('/transactions' ,AUTHORIZE_USER , TransactionController.get_all_Transaction);
router.get('/transactions/:id' ,AUTHORIZE_USER , TransactionController.get_a_Transaction);

// router.get('/' ,(req,res)=>{
//     res.send(`<h1> WELCOME PAGE </h1>
            
    
//     `)

// })

router.get('/customers' , (req,res)=>{
    const resp= DBDAO.get_all().then((data)=>{return res.json(data)}).catch((err)=>{return res.send({error : err.message})});
    
})

module.exports = router;