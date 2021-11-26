

const path = require('path');
const {DBDAO} = require('../Service/dbService');
const dotenv = require('dotenv');
const {SIGN , HASH,COMPARE_HASH , VERIFY} = require('../Service/HELPERS/SecurityHelper');
const { isNumber } = require('util');
class AdminController{
    static Get_Customers(req,res){
        DBDAO.get_all_users()
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(500).json({error : err.message});
        })
    }
    static Get_Customer_by_id(req,res){
        const id = parseInt(req.params.id);

        if(!Number.isInteger(id) || id === 0){return res.status(503).json({error  : "Bad literals sent"})}

        DBDAO.get_customer_by_id(id)
        .then(data=>{
           
                return res.status(200).json(data);
           
            

            
        })
        .catch(err=>{
            return res.status(500).send({error : err.message});
        })
    }
    static AdminPage(req,res){
        res.sendFile(path.join(__dirname  , '../views/AdminPage.html'));

    }
   
    
    static AdminSignup(req,res){
            const email = req.body.email;
            const password = req.body.password;
            const created_At = new Date();
            const role = "ADMIN";
            res.setHeader('Content-Type', 'application/json');
            
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
                        }).catch(err=>{return res.status(404).send({error : `Internal Server Error :${err.message}`})})
                       
                    }
                    
                }).catch(err=>{res.status(404).send(err.message)});
    
            }).catch(err=>{return res.send({error : err.message})})

           //*************** */
            

            

    }


    static validate_token(req,res) {
        let token =  req.body.token;
        console.log(token);
        VERIFY(token).then((data)=>{
            return res.status(200).json(data);
        }).catch(err=>{
            return res.status(403).json({error : "Unauthorized Access"});
        })
    }

    static AdminSignin(req , res){
        const email = req.body.email;
        const password = req.body.password;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-control', 'max-age=31536000');
      
            DBDAO.fetch_from_email(email ).then(data=>{
                console.log(data);
                if(data.length > 0){
                    const row = data[0];
                    const password_hash = row.PASSWORD;
                    console.log(password , password_hash);
                    COMPARE_HASH(password , password_hash).then(response=>{
                        console.log(response);
                        
                        if(!response){
                            throw new Error("Invalid Username or Password");
                        }
                        res.setHeader('Content-Length',JSON.stringify(data).length );
                        res.setHeader('Content-Location'  , '/');
                        const token = SIGN(data[0]); 
                        res.setHeader('Authorization' , `Bearer ${token}`);
                        res.setHeader('set-Cookie' , `Token= ${token};Max-Age=18000`);
                       
                        
                        return res.status(200).send({data: data , Token : token});
                        
                    
                    }).catch(err1=>{return res.status(404).send({error : err1.message})})
                    
                   
                }else{
                    
                    res.setHeader('Content-Length',256 );
                    throw new Error("invalid email or Password");
                }
                
            }).catch(err=>{res.status(400).send({error : err.message})});
       
         
    }




}



module.exports = AdminController;