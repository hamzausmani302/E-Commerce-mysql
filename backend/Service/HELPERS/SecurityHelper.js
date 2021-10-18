
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();

const BCRYPT_TOHASH = async (password)=>{
    
    let pr = new Promise((resolve, reject)=>{
        bcrypt.hash(password, 2, function(err, hash) {
            if(err){reject(err)}
            resolve(hash);
        });
    })
   return pr;
}

const COMPARE_HASH = (password , hashDB)=>{
    let pr = new Promise((resolve, reject)=>{
        bcrypt.compare(password, hashDB, function(err, result) {
            if(err){reject(err)};
            resolve(result);
            
        });
    })
   return pr;
    

}
const JWTAUTH_SIGN = (payload )=>{
    const token = jwt.sign({
        email : payload.email,
        role : payload.role,
        created_At : payload.created_At
    }, process.env.SECRET_KEY, { expiresIn: '2m' });
    return token;
}
const JWTAUTH_VERIFY = (token )=>{
    jwt.verify(token, process.env.SECRET_KEY , function(err, decoded) {
            if(err){return null}
            return decoded;
    });
       

}


module.exports.SIGN = JWTAUTH_SIGN
module.exports.VERIFY = JWTAUTH_VERIFY;
module.exports.HASH = BCRYPT_TOHASH;
module.exports.COMPARE_HASH =  COMPARE_HASH;


