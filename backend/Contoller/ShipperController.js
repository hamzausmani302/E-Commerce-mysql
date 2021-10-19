

const path = require('path');
const {SHIPPERDAO} = require('../Service/dbService');
const dotenv = require('dotenv');
dotenv.config();
const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');
const Shipper = require('../Models/Shipper');
class ShipperController{
  
   

    static Add_SHIPPER(req,res){
       

        let name = req.body.name;
        let contact = req.body.contact;
        let country = req.body.country;
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