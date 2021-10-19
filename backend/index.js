const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const Adminrouter=  require('./Routers/AdminRouter');
const UserRouter = require('./Routers/UserRouter');
const ProductRouter  = require('./Routers/ProductRouter');
const CategoryRouter = require('./Routers/CategoryRouter');

const App = express();
App.set('views', path.join(__dirname, 'views'))
App.set('view engine', 'ejs')
dotenv.config()
App.use(express.json());
App.use(express.urlencoded({extended : true}));
App.use(cors());

App.use("/administrator",Adminrouter);
App.use("/api/v1/user" , UserRouter);
App.use("/api/products" , ProductRouter);
App.use("/api/category" , CategoryRouter);

App.listen( process.env.PORT || 3000 , ()=>{
    console.log(`connected on PORT :  ${process.env.PORT || 3000}`
    )
}  );