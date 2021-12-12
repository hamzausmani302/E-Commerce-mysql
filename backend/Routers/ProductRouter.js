const express = require('express');
const dotenv = require('dotenv');
const {upload} = require('../Service/uploader');
const {AUTHORIZE_USER} = require('../Service/MiddleWares/Verification');
dotenv.config();
const ProductController= require('../Contoller/ProductController.js');
const router = express.Router();

router.get('/' , ProductController.Add_Page );
router.get('/products' , ProductController.get_all_Products);
router.get('/products/:id', ProductController.get_a_product);
router.post('/add',ProductController.add_Product);
router.put('/update/:id' , ProductController.update_a_product);
router.get('/hotproducts' , ProductController.get_hot_product);

router.put('/upload' , (req,res)=>{
    if(req.body.IMAGESOURCE && req.body.IMAGESOURCE.name != null){
        let obj = req.body.IMAGESOURCE;
        upload({name : obj.name , extension :obj.extension , buffer:obj.buffer , size : obj.size})
    }


}  );
module.exports =router;