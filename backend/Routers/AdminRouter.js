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
router.get('/users' ,AUTHORIZE_USER, Admin.Get_Customers);
router.get('/users/:id' , AUTHORIZE_USER, Admin.Get_Customer_by_id);
router.get('/' , Admin.AdminPage);
router.post('/signup' ,  Admin.AdminSignup);
router.post('/signin' , Admin.AdminSignin);



router.get('/api/shipper' ,AUTHORIZE_USER , ShipperController.get_all_shippers );
router.get('/api/shipper/:id' ,AUTHORIZE_USER, ShipperController.Get_a_SHIPPER );
router.post('/api/shipper/add' , AUTHORIZE_USER , ShipperController.Add_SHIPPER );
router.delete('/api/shipper/delete/:id' , ShipperController.delete_shipper)
router.put('/api/shipper/:id' , ShipperController.update_shipper);


router.get('/api/supplier' ,AUTHORIZE_USER, AUTHORIZE_USER ,SupplierController.get_all_Supplier );
router.get('/api/supplier/:id' , AUTHORIZE_USER ,SupplierController.get_a_Supplier );
router.post('/api/supplier/add' ,AUTHORIZE_USER , SupplierController.add_Supplier );
router.delete('/api/supplier/delete/:id' , SupplierController.delete_supplier)
router.put('/api/supplier/:id' , SupplierController.update_supplier);

router.post('/order/add' , AUTHORIZE_USER , OrderController.add_order  );
router.get('/orders' ,AUTHORIZE_USER ,OrderController.get_all_orders );
router.get('/orders/:id' ,AUTHORIZE_USER , OrderController.get_a_order );


router.post('/transactions/add' ,AUTHORIZE_USER , TransactionController.add_Transaction );
router.get('/transactions' ,AUTHORIZE_USER , TransactionController.get_all_Transaction);
router.get('/transactions/:id' ,AUTHORIZE_USER , TransactionController.get_a_Transaction);
router.post('/validate' , Admin.validate_token);
// router.get('/' ,(req,res)=>{
//     res.send(`<h1> WELCOME PAGE </h1>
            
    
//     `)

// })

router.get('/customers' , (req,res)=>{
    const resp= DBDAO.get_all().then((data)=>{return res.json(data)}).catch((err)=>{return res.send({error : err.message})});
    
})

module.exports = router;