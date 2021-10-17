




const express = require('express');
const dotenv = require('dotenv');
const Admin = require('../Contoller/AdminContoller.js');
dotenv.config();

const router = express.Router();
const {DBDAO} = require('../Service/dbService');

router.get('/administrator' , Admin.AdminPage);
router.post('/administrator/signup' , Admin.AdminSignup);
router.post('/administrator/signin' , Admin.AdminSignin)


router.get('/' ,Admin.AdminPage)

router.get('/customers' , (req,res)=>{
    const resp= DBDAO.get_all().then((data)=>{return res.json(data)}).catch((err)=>{return res.send({error : err.message})});
    
})

module.exports = router;