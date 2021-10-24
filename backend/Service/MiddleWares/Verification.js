const {VERIFY} = require('../HELPERS/SecurityHelper.js'); 

const validate_user = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).json({error : "Unauthorized Access"});
    }
    // console.log(req.headers.authorization)
    const token = req.headers.authorization;
    const parts = token.split(' ');
    if(parts <= 1){
        return res.status(403).send({error : "Unauthorized Access"});
    }
    VERIFY(parts[1]).then(data=>{
        if(data == "invalid token"){
            return res.status(403).send({error : "Unauthorized Access"});
        }
        next();


    }).catch(err=>{res.status(403).send({error : err.message})});
    
    


}


module.exports.AUTHORIZE_USER = validate_user;


