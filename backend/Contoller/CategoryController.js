// const path = require('path');
const {CATEGORYDAO} = require('../Service/dbService');
// const dotenv = require('dotenv');
// const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');
const Category = require('../Models/Category');
const {VERIFY_NUM_INPUT} = require('../Service/HELPERS/SecurityHelper');
class CategoryController{
    static get_cat_products(req,res){
        let id = req.params.id;
        if(!VERIFY_NUM_INPUT(id)){return res.status(400).send({error : "invalid id"} )}
        let pid = parseInt(id);
        CATEGORYDAO.Get_All_Category_products(pid)
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
    static update_category(req,res){
        let id = req.params.id;
        if(!VERIFY_NUM_INPUT(id)){
            return res.status(400).send({error : "invalid input"});
        }
        let nid = Number(id);
        //converted to a number and checfked
        let update_data = req.body.data;
        //fetch body objects
        //send to db to save changes
        CATEGORYDAO.update_a_category(nid , update_data)
        .then(data=>{
            if(data){ 
                let msg = "successfully updated records";
                if(data.affectedRows == 0){
                    msg = "no such records exists";
                }
                return res.status(200).send({affectedRows : data.affectedRows , message : msg});
                
            }
            return res.json({error : "invalid parameters",  message : "invalid parameters"});
        })
        .catch(err=>{
            return res.json({error : "invalid parameters",message : "invalid parameters"});
        })



    }
    
    static add_Category(req,res){
        
        let category = new Category(0,req.body.PARENT_ID , req.body.CATEGORY_DESC ,req.body.CATEGORY_NAME, req.body.IMAGE);
        // console.log(category);    
        CATEGORYDAO.Add_Category(category).then(data=>{
            let success = false;
            let rowsUpdated = 0;
            if(data.affectedRows > 0){
                success = true;
                rowsUpdated = data.affectedRows;
            }
            res.status(200).send({success : success , rowsUpdated : rowsUpdated})
        })
        .catch(err=>{res.status(400).send({error : err.message})})
        }
    
    static get_a_Category(req,res){
        const id = req.params.id;
        console.log(id);
        //decode id then pass into dataabse
        CATEGORYDAO.Get_a_Category(id)
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

    static get_all_Category(req,res){
        CATEGORYDAO.Get_All_Category()
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

module.exports = CategoryController;