const express = require('express');
const router = express.Router();



router.get('/' , (req,res)=>{
    res.send("<div>hi one1 </div>")
})

module.exports = router;