const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const userDB = process.env.REACT_APP_USERDB;
const passwordDB = process.env.REACT_APP_PASSWORDDB;
const db = process.env.REACT_APP_DB;
const uri = `mongodb+srv://${userDB}:${passwordDB}@cluster0.qy7pbul.mongodb.net/${db}?retryWrites=true&w=majority`;
const stripe = require('stripe')(process.env.REACT_APP_STRIPEPRIVATEKEY)

app.listen(3001,()=>{
    console.log("Running on port "+3001)
})

mongoose.connect(uri)
    .then(()=>{console.log("Database "+db+" connected.")})
    .catch((e)=>{console.log(e)});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.post('/uploadProduct', async(req,res)=>{
    const {productName, productDescription, productCategory, urlImage} = req.body;
    try{
        const productDB = new Product({
            productName: productName,
            productDescription: productDescription,
            productCategory: productCategory,
            urlImage: urlImage 
        })
        await productDB.save()
            .then(console.log("Success"));
    }catch(error){
        console.log(error);
    }
})

app.get('/getProducts', async(req,res)=>{
    const products = await Product.find()

    if(products.length > 0){
        res.send(products);
    }
})

app.post('/getProduct', async(req, res)=>{
    const productId = req.body.productId;
    const product = await Product.find({_id: productId})
    if(product.length > 0){
        res.send(product[0]);
    }
})

app.get('/getPK',async(req,res)=>{
    res.send(process.env.REACT_APP_STRIPEPUBLICKEY);
})

app.post('/payment', async(req,res)=>{
    const{token, amount} = req.body;
    try{
        await stripe.charges.create({
            source: token.id,
            amount, 
            currency:'crc'
        })
        .then(res.send('success'));
    }catch(e){
        console.log(e);
        res.send('error');
    }
})