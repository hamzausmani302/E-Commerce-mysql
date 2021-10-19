const express = require('express');
const dotenv = require('dotenv');

const CategoryController= require('../Contoller/CategoryController.js')
const router = express.Router();
dotenv.config();

router.get('/category' , CategoryController.get_all_Category);
router.get('/category/:id', CategoryController.get_a_Category);
router.post('/add' , CategoryController.add_Category);


module.exports =router;