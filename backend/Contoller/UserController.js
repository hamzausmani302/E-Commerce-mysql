const path = require('path');
const {HASH , SIGN,USER_SIGN,VERIFY_USER , COMPARE_HASH,VERIFY_NUM_INPUT}=require('../Service/HELPERS/SecurityHelper.js');
const {USERDAO} = require('../Service/dbService');
class UserController{
    static ChangePassword(req ,res){
        let password =req.body.newpassword;
        let info = req.body.info;
        if(!password || password === "" || password.length < 8){
            res.status(400).send({error : "password length is too small"} );
        }
        HASH(password).then((hash)=>{
                USERDAO.set_password(hash ,info.id, info.email )
                .then((data)=>{
                    if(data.affectedRows > 0){
                        return res.status(200).send({success : true , affectedRows : data.affectedRows});
                    }
                }).catch(err=>{
                    return res.status(400).send({error :err.message});
                })

        });
    }
    static UserLogin(req,res){

        const email = req.body.email;
        const password = req.body.password;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-control', 'max-age=31536000');
       
            

            USERDAO.fetch_from_email(email ).then(data=>{
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
                        const token = USER_SIGN(data[0]); 
                        res.setHeader('Authorization' , `Bearer ${token}`);
                        res.setHeader('set-Cookie' , `userToken= ${token};Max-Age=18000;path='\'`);
                        res.setHeader('set-Cookie' , `userToken= ${token};Max-Age=18000`);
                        
                        
                        return res.status(200).send({data: data , Token : token});
                        
                    
                    }).catch(err1=>{return res.status(404).send({error : err1.message})})
                    
                   
                }else{
                    
                    res.setHeader('Content-Length',256 );
                    throw new Error("invalid email or Password");
                }
                
            }).catch(err=>{res.status(400).send({error : err.message})});
               
      
        

    }

    static Signup(req , res){
        
        const userID=req.body.CUSTOMER_ID
        const Fname=req.body.FIRST_NAME
        const Lname=req.body.LAST_NAME
        const userEmail = req.body.email;
        const password = req.body.password;
        const address= req.body.address
        const phoneNo= req.body.PHONE_NUMBER
        const created_At = new Date();    
        console.log(Fname , Lname , userEmail , password);
        res.setHeader('Content-Type', 'application/json');
        var day = ("0" + created_At.getDate()).slice(-2);
        var month = ("0" + (created_At.getMonth() + 1)).slice(-2);
        var year = created_At.getFullYear();
        var dateCreated = year + "-" + month + "-" +day; 
        if(password == null){
            res.status(401).send("password required");
        }

       //implement bcryopt here
        HASH(password).then((hash)=>{

            USERDAO.insert_User(userID,Fname,Lname,userEmail,hash,address,phoneNo, dateCreated).then(data=>{
                console.log(data);
                if(data.affectedRows > 0){
                    USERDAO.Login(userEmail , hash).then(data1=>{
                            const token  = USER_SIGN(data1);
                            res.setHeader('Set-Cookie' ,  `token=${token};Max-Age=18000;path='/'`)
                            return res.status(200).send({result :"signup successful" , data : data1 , Token : token})
                    }).catch(err=>{return res.status(404).send({error : `Internal server error : ${err.message}`})})
                   
                }
                
            }).catch(err=>{res.status(404).send(err.message)});

        }).catch(err=>{return res.send({error : err.message})})

    }
    static SignupPage(req,res){
        res.sendFile(path.join(__dirname , '../views/UserPage.html'));
    }
    
    static SignInPage(req,res){
        res.sendFile(path.join(__dirname , '../views/UserLogin.html'));
    }
}



module.exports = UserController;