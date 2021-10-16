const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const DB = require('./Service/dbService');



router.get('/' , (req,res)=>{
    res.send("<div>hi one1 </div>")
})

router.get('/customers' , (req,res)=>{
    const resp= DB.get_all().then((data)=>{return res.json(data)}).catch((err)=>{return res.send({error : err.message})});
    
})

module.exports = router;