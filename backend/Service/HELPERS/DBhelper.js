
const generate_query = (tablename , inputs , key_attr)=>{
    let query = `UPDATE ${tablename} SET {}  WHERE ${key_attr} = ?;`;
  
    let updations = "";
    let ans_arr = [];
    for(let key in inputs){
      updations += ` ${key} = ? ,`; 
      ans_arr.push(inputs[key]);
    }
    updations = updations.substring(0, updations.length-1);
    
    query = query.replace("{}" , updations);
    return {query , ans_arr};


  }
module.exports.GEN_QUERY = generate_query;