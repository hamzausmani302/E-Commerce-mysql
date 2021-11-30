

const path = require('path');
const {SHIPPERDAO} = require('../Service/dbService');
const dotenv = require('dotenv');
dotenv.config();
const {VERIFY_NUM_INPUT} = require('../Service/HELPERS/SecurityHelper');
const Shipper = require('../Models/Shipper');
class ShipperController{
    static update_shipper= (req,res)=>{
        
        let id = req.params.id;
        if(!VERIFY_NUM_INPUT(id)){
            return res.status(400).send({error : "invalid input"});
        }
        let nid = Number(id);
        //converted to a number and checfked
        let update_data = req.body;
        
        //fetch body objects
        //send to db to save changes
        SHIPPERDAO.update_a_shipper(nid , update_data)
        .then(data=>{
            console.log(data);
            if(data){ 
                let msg = "successfully updated records";
                if(data.affectedRows == 0){
                    msg = "no such records exists";
                }
                return res.status(200).send({affectedRows : data.affectedRows , message : msg});
                
            }
            console.log(update_data);
            return res.json({error : "invalid parameters",  message : "invalid parameters1"});
        })
        .catch(err=>{
            return res.json({error : "invalid parameters",message : err.message});
        })

    }
    
    static delete_shipper(req,res){
        let id= parseInt(req.params.id);
        if(!Number.isInteger(id) || id === 0){
            return res.status(401).json({error : "bad request"});
        }
        SHIPPERDAO.set_to_null_orders(id)
        .then(data=>{
                SHIPPERDAO.delete_shippers(id)
                .then(data1=>{
                    if(data1.affectedRows){
                        return res.status(200).json({success : true , result:"deleted user"})
                    }
                    
                })
                .catch(err1=>{throw new Error(err1)});
        })
        .catch(err=>{return res.send({error: err.message});});
    }

    static Add_SHIPPER(req,res){
       

        let name = req.body.name;
        let contact = req.body.contact;
        let country = req.body.country;
        console.log(name);
        let shipper = new Shipper(0, name,  contact, country);
        
        SHIPPERDAO.Add_SHIPPER(shipper)
        .then(data=>{
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
    
    static Get_a_SHIPPER(req,res){
        const id = req.params.id;
        console.log(id);
        //decode id then pass into dataabse
       SHIPPERDAO.Get_a_SHIPPER(id)
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

    static get_all_shippers(req,res){
        SHIPPERDAO.Get_All_SHIPPERS()
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

module.exports = ShipperController;