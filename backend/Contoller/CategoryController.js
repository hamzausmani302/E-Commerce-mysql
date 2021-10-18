const path = require('path');
const {CATEGORYDAO} = require('../Service/dbService');
const dotenv = require('dotenv');
const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');
const Category = require('../Models/Category');

class CategoryController{

    static Add_Category(req,res){
        let category = new Category(req.body.CATEGORY_ID , req.body.PARENT_ID , req.body.CATEGORY_DESC , req.body.IMAGE);
        console.log(category);    
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