'use strict'

const express = require('express')
const productCtrl = require('../controllers/products')
const userCtrl = require('../controllers/users')
const authController = require('../controllers/authentication')
const auth = require('../middleware/authentication')
const api = express.Router()

api.get('/products', productCtrl.getProducts)
api.get("/product/:productId", productCtrl.getProduct)
api.post("/product", productCtrl.saveProduct)
api.delete("/product/:productId",auth.isAuth, productCtrl.deleteProduct)
api.put("/product/:productId", productCtrl.updateProduct)

//api.get("/products/shisha")
api.get("/products/car", productCtrl.getCars)


api.get('/users',auth.isAuth, userCtrl.getUsers)
//api.post("/user", userCtrl.postUsers)


api.post("/signup", authController.signUp)
api.post("/signin", authController.signIn)
api.get('/private',auth.isAuth, function(req,res){
  res.status(200).send({message: 'Access granted'})
})

module.exports = api
