// const path = require('path');
const {SUPPLIERDAO} = require('../Service/dbService');
// const dotenv = require('dotenv');
// const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');
const {VERIFY_NUM_INPUT} = require('../Service/HELPERS/SecurityHelper');
const Supplier = require('../Models/Supplier');


class SupplierController{
    static update_supplier= (req,res)=>{
        let id = req.params.id;
        if(!VERIFY_NUM_INPUT(id)){
            return res.status(400).send({error : "invalid input"});
        }
        let nid = Number(id);
        //converted to a number and checfked
        let update_data = req.body;
        console.log(update_data);
        //fetch body objects
        //send to db to save changes
        SUPPLIERDAO.update_a_supplier(nid , update_data)
        .then(data=>{
            
            if(data){ 
                let msg = "successfully updated recorsd";
                if(data.affectedRows == 0){
                    msg = "no such records exists";
                }
                return res.status(200).send({affectedRows : data.affectedRows , message : msg});
                
            }
            return res.send({error : "invalid parameters"})
        })
        .catch(err=>{
            return res.send({error : err.message})
        })


    }
    static delete_supplier(req,res){
        let id= parseInt(req.params.id);
        console.log(id);
        if(id === 0){
            return res.status(401).json({error : "bad request"});
        }
        SUPPLIERDAO.set_to_null_products(id)
        .then(data=>{
                SUPPLIERDAO.delete_supplier(id)
                .then(data1=>{
                    if(data1.affectedRows){
                        return res.status(200).json({success : true , result:"deleted user"})
                    }
                    
                })
                .catch(err1=>{throw new Error(err1)});
        })
        .catch(err=>{return res.send({error: err.message});});

    }

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