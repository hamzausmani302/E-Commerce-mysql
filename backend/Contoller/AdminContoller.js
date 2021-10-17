

const path = require('path');
const {DBDAO} = require('../Service/dbService');
const dotenv = require('dotenv');
const {SIGN , HASH} = require('../Service/HELPERS/SecurityHelper');
class AdminController{

    static AdminPage(req,res){
        res.sendFile(path.join(__dirname  , '../views/AdminPage.html'));

    }
    


    static AdminSignup(req,res){
            const email = req.body.email;
            const password = req.body.password;
            const created_At = new Date();
            const role = "ADMIN";
            res.setHeader('Content-Type', 'application/json')
            
            var day = ("0" + created_At.getDate()).slice(-2);
            var month = ("0" + (created_At.getMonth() + 1)).slice(-2);
            var year = created_At.getFullYear();
            var combined = year + "-" + month + "-" +day; 

            console.log(combined);            
           //implement bcryopt here
            HASH(password).then((hash)=>{
                DBDAO.insert_admin(email,hash, combined, role).then(data=>{
                    if(data.affectedRows > 0){
                        DBDAO.Login(email , hash).then(data1=>{
                                const token  = SIGN(data1);
                                return res.status(200).send({result :"signup successful" , data : data1 , token : token})
                        }).catch(err=>{return res.status(404).send({error : `Internal server error :${err.message}`})})
                       
                    }
                    
                }).catch(err=>{res.status(404).send(err.message)});
    
            }).catch(err=>{return res.send({error : err.message})})

           //*************** */
            

            

    }




    static AdminSignin(req , res){
        const email = req.body.email;
        const password = req.body.password;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-control', 'max-age=31536000');
        
        DBDAO.Login(email , password).then(data=>{
            if(data.length > 0){
                res.setHeader('Content-Length',JSON.stringify(data).length );
                res.setHeader('Content-Location'  , '/');
                const token = SIGN(data[0]); 
                res.setHeader('Authorization' , `Bearer ${token}`)
                res.setHeader('set-Cookie' , `Token= ${token};Max-Age=18000'path='/administrator'`);
                
                return res.status(200).send({data: data , Token : token});
            }else{
                
                res.setHeader('Content-Length',256 );
                throw new Error("invalid email or Password");
            }
            
        }).catch(err=>{res.status(400).send({error : err.message})});
        
    }




}



module.exports = AdminController;