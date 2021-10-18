const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const {DBDAO} = require('../Service/dbService');



router.get('/login' , (req,res)=>{
    res.send("<div>hi one1 </div>")
})
router.get('/customers' , (req,res)=>{
    const resp= DBDAO.get_all().then((data)=>{return res.json(data)});
    
})


module.exports = router;