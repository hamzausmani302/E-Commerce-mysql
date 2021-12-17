
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
    }, process.env.SECRET_KEY, { expiresIn: '5h' });
    return token;
}
const JWTAUTH_VERIFY = (token )=>{
    let pr = new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.SECRET_KEY , function(err, decoded) {
            if(err){reject(err)}
            console.log(decoded);
           resolve(decoded);
    });
    
    })
    return pr;   

}
const VERIFY_INPUT_NUM = (input)=>{
    let result = Number(input);
    if(result != NaN){return true;}
    return false;


}
const JWTAUTH_SIGN_USERS = (payload)=>{
    const token = jwt.sign({
        email : payload.email,
        passowrd : payload.password,
        created_At : payload.created_At
    }, process.env.USER_JWT_KEY, { expiresIn: '3h' });
    return token;
}
const VERIFY_USER = (token)=>{
    let pr = new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.USER_JWT_KEY , function(err, decoded) {
            if(err){reject(err)}
            console.log(decoded);
           resolve(decoded);
    });
    
    })
    return pr;   
}
module.exports.VERIFY_USER = VERIFY_USER;
module.exports.USER_SIGN = JWTAUTH_SIGN_USERS;
module.exports.SIGN = JWTAUTH_SIGN
module.exports.VERIFY = JWTAUTH_VERIFY;
module.exports.HASH = BCRYPT_TOHASH;
module.exports.COMPARE_HASH =  COMPARE_HASH;
module.exports.VERIFY_NUM_INPUT = VERIFY_INPUT_NUM;

