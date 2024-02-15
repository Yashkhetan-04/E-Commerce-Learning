const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register" , async (req , resp) => {
   
        let user = new User(req.body);
        let result = await user.save(); // details are saved in database
        result = result.toObject();
        delete result.Password;
        Jwt.sign({result} , jwtKey , {expiresIn:"2h"} , (err , token) => {
            if(err){
                resp.send({result : "Something went wrong , try again later"});
            }
            resp.send({result , auth:token});
        })
})

app.post("/login" , async (req, resp) => {
    if(req.body.Password && req.body.email){
        let user = await User.findOne(req.body).select("-Password");
       
        if(user){
            Jwt.sign({user} , jwtKey , {expiresIn:"2h"} , (err , token) => {
                if(err){
                    resp.send({result : "Something went wrong , try again later"});
                }
                resp.send({user , auth:token});
            })
        }
        else{
            resp.send({result:"No user founr"});
        }
    }
    else{
        resp.send({result:"No user found"});
    }
})

app.post('/app-product' , async (req , resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/products" , async (req , resp) => {
    let products =  await Product.find();
    if(products.length>0){
        resp.send(products);
    }
    else{
        resp.send({result:"no data found"});
    }
})

app.delete("/product/:id" , async (req, resp) => {
    let result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.get("/product/:id" , async (req, resp)=> {
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else{
        resp.send({result:"Data not Found"});
    }
})

app.put("/product/:id" , async (req , resp) => {
    let result = await Product.updateOne(
        {_id : req.params.id},
        {$set : req.body}
    )
    resp.send(result);
})

app.get("/search/:key", async (req , resp) => {
    let result = await Product.find({
        "$or" : [
            {name : {$regex : req.params.key}},
            {company : {$regex : req.params.key}}
        ]
    });
    resp.send(result);
})



app.listen(5000);