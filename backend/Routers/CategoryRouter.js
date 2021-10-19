const express = require('express');
const dotenv = require('dotenv');

const CategoryController= require('../Contoller/CategoryController.js')
const router = express.Router();
dotenv.config();

router.get('/category' , CategoryController.Get_all_Category);
router.get('/category/:id', CategoryController.Get_a_Category);
router.post('/category/add' , CategoryController.Add_Category);


module.exports =router;