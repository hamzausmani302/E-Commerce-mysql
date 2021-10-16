

const path = require('path');
const dbService = require('../Service/dbService');
const dotenv = require('dotenv');

class AdminController{

    static AdminPage(req,res){
        res.sendFile(path.join(__dirname  , '../views/AdminPage.html'));

    }

    static AdminLogin(req,res){
            const email = req.body.email;
            const password = req.body.password;
            const created_At = Date.now()
            const role = "ADMIN";
            res.setHeader('Content-Type', 'application/json')
            
            console.log(created_At);            

            dbService.insert_admin(email,password, created_At, role).then(data=>res.status(200).send(data)).catch(err=>{res.status(404).send(err.message)});


            

    }

    static AdminSignup(req , res){

    }




}



module.exports = AdminController;