// const path = require('path');
const {SUPPLIERDAO} = require('../Service/dbService');
// const dotenv = require('dotenv');
// const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');
const Supplier = require('../Models/Supplier');

class SupplierController{

    static add_Supplier(req,res){
        let supplier = new Supplier(0 , req.body.NAME , req.body.CONTACT ,req.body.ADDRESS, req.body.CITY, req.body.POSTALCODE, req.body.COUNTRY);
        // console.log(category);    
        SUPPLIERDAO.Add_Supplier(supplier).then(data=>{
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
    
    static get_a_Supplier(req,res){
        const id = req.params.id;
        console.log(id);
        //decode id then pass into dataabse
        SUPPLIERDAO.Get_a_Supplier(id)
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

    static get_all_Supplier(req,res){
        SUPPLIERDAO.Get_All_Supplier()
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

module.exports = SupplierController;