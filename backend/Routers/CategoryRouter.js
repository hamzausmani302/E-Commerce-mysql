const express = require('express');
const dotenv = require('dotenv');

const CategoryController= require('../Contoller/CategoryController.js')
const router = express.Router();
dotenv.config();

router.get('/' , CategoryController.get_all_Category);
router.get('/:id', CategoryController.get_a_Category);
router.get('/products/:id',CategoryController.get_cat_products)


module.exports =router;