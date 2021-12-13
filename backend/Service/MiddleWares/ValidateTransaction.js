

const validate_transaction = (req,res,next)=>{
    let transactions = req.body.transaction;
    //validate card here
    if(Object.keys(transactions).length >0 && Object.keys(transactions).length < 3){
            return res.status(400).send({error : "all card details required"});
    }
    let expiry = new Date(transactions.expiry).getTime();
    let today = new Date().getTime();
    if(today>=expiry){
        return res.status(400).send({error : "your card has expired"});
    }
    if(transactions.card_number.length <10 ){
        return res.status(400).send({error : "invalid card number"});
    }
    if(transactions.pin < 1000 || transactions.pin >9999 ){
        return res.status(400).send({error : "invalid pin"});
    }
    if(!req.body.address){        return res.status(400).send({error : "address required"});
}
    next();

}

module.exports.VALIDATE_TRANSACTION = validate_transaction;


