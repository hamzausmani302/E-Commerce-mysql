const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const ProductController= require('../Contoller/ProductController.js')
const router = express.Router();

router.get('/' , ProductController.Add_Page );
router.get('/products' , ProductController.get_all_Products);
router.get('/products/:id', ProductController.get_a_product);
router.post('/add' , ProductController.add_Product);
<<<<<<< Updated upstream
=======
router.post('/test' , ProductController.update_Product )
>>>>>>> Stashed changes

module.exports =router;