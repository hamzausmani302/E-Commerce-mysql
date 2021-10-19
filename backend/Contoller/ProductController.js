const path = require('path');
const {PRODUCTDAO} = require('../Service/dbService');
const dotenv = require('dotenv');
const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');
const Product = require('../Models/Product');
class ProductController{
<<<<<<< Updated upstream
    static Add_Page(req,res){
        res.sendFile(path.join(__dirname , '../views/ProductPage.html'));
    }
    static add_Product(req,res){
        let product = new Product(0,req.body.PRODUCT_NAME , parseInt(req.body.CATEGORYID) , req.body.description , req.body.tags , 
            req.body.imageSource , parseInt(req.body.Supplier) , parseInt(req.body.PIECES) , 'testing');
        console.log(product);
        PRODUCTDAO.Add_a_Product(product)
        .then(data=>{
            success = false;
            rowsUpdated = 0;
            if(data.affectedRows > 0){
                success = true;
                rowsUpdated = data.affectedRows;
            }
            res.status(200).send({success : false , rowsUpdated : 0})
        })
        .catch(err=>{res.status(400).send({error : err.message})})
=======
    static update_Product(req,res){
        const id = parseInt(req.body.PRODUCT_ID);
        const categoryid = parseInt(req.body.CATEGORY_ID);
        const supplier = parseInt(req.body.Supplier);
        const PIECES = parseInt(req.body.PIECES);
        //genereate encoded_ID

        let product = new Product(id,req.body.PRODUCT_NAME , categoryid , req.body.description , req.body.tags , 
            req.body.imageSource , suppplier , PIECES , req.body.ENCODED_ID);
            PRODUCTDAO.update_a_product(product);
    }

    static add_Product(req,res){
        let product = new Product(0,req.body.PRODUCT_NAME , req.body.CATEGORYID , req.body.description , req.body.tags , 
            req.body.imageSource , req.body.Supplier , req.body.PIECES , req.body.ENCODED_ID);
        PRODUCTDAO.Add_a_Product(product)
        .then(data=>{res.status(200).send(data)})
        .catch(err=>{res.status(400).send(err.message)})    

>>>>>>> Stashed changes
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