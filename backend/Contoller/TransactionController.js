const {TRANSACTIONSDAO } = require('../Service/dbService');
const Transaction = require('../Models/Transaction.js');

// const dotenv = require('dotenv');
// const {SIGN , HASH,COMPARE_HASH} = require('../Service/HELPERS/SecurityHelper');

class TransactionController{

    static add_Transaction(req,res){
        
        let transactionAt=new Date();
        var day = ("0" + transactionAt.getDate()).slice(-2);
        var month = ("0" + (transactionAt.getMonth() + 1)).slice(-2);
        var year = transactionAt.getFullYear();
        var dateCreated = year + "-" + month + "-" +day; 

        
        let transaction = new Transaction(0 ,  req.body.USERID ,req.body.AMOUNT, req.body.ORDER_ID, req.body.PAYMENT_METHOD, dateCreated);
        
        TRANSACTIONSDAO.Add_Transactions(transaction).then(data=>{
            console.log(data);
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
    
    static get_a_Transaction(req,res){
        const id = req.params.id;
        console.log(id);
        //decode id then pass into dataabse
        TRANSACTIONSDAO.Get_a_Transaction(id)
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

    static get_all_Transaction(req,res){
        TRANSACTIONSDAO.Get_all_Transactions()
        .then(data=>{
            console.log(data);
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

module.exports = TransactionController;