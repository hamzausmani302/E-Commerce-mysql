const path = require('path');
const {PRODUCTDAO} = require('../Service/dbService');
const dotenv = require('dotenv');
const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');
const Product = require('../Models/Product');
class ProductController{

    static add_Product(req,res){
        let product = new Product(0,req.body.PRODUCT_NAME , req.body.CATEGORYID , req.body.description , req.body.tags , 
            req.body.imageSource , req.body.Supplier , req.body.PIECES , req.body.ENCODED_ID);
        console.log(product);    

    }
    
    static get_a_product(req,res){
        const id = req.params.id;
        console.log(id);
        //decode id then pass into dataabse
        PRODUCTDAO.Get_a_Product(id)
        .then(data=>{
            if(data.length > 0){ 
                
                return res.status(200).json(data);
            
            }
            return res.status(202).send("no results found");
        })
        .catch((err)=>{
            res.status(404).json({error : err.message});
        })
    }

    static get_all_Products(req,res){
        PRODUCTDAO.Get_Products()
        .then(data=>{
            if(data.length > 0){ 
                

                return res.status(200).json(data);
            
            }
            return res.status(202).send("no results found");
        })
        .catch((err)=>{
            res.status(404).json({error : err.message});
        })
    }



}

module.exports = ProductController;