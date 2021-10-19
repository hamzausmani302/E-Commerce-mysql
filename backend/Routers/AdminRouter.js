const express = require('express');
const dotenv = require('dotenv');
const Admin = require('../Contoller/AdminContoller.js');
const SupplierController = require('../Contoller/SupplierController.js');
const ShipperController = require('../Contoller/ShipperController.js');
dotenv.config();

const router = express.Router();
const {DBDAO} = require('../Service/dbService');

router.get('/' , Admin.AdminPage);
router.post('/signup' , Admin.AdminSignup);
router.post('/signin' , Admin.AdminSignin)

router.get('/api/shipper' , ShipperController.get_all_shippers )
router.get('/api/shipper/:id' , ShipperController.Get_a_SHIPPER )
router.post('/api/shipper/add' , ShipperController.Add_SHIPPER )


router.get('/api/supplier' , SupplierController.get_all_Supplier );
router.get('/api/supplier/:id' , SupplierController.get_a_Supplier );
router.post('/api/supplier/add' , SupplierController.add_Supplier );

router.get('/' ,(req,res)=>{
    res.send(`<h1> WELCOME PAGE </h1>
            
    
    `)

})

router.get('/customers' , (req,res)=>{
    const resp= DBDAO.get_all().then((data)=>{return res.json(data)}).catch((err)=>{return res.send({error : err.message})});
    
})

module.exports = router;