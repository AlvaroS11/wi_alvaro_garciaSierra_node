'use strict'
const Product = require('../models/product')

//const product = require("../models/product");
var express = require('express');
var router = express.Router();



async function getProducts(req, res){
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
}
}

async function getProduct (req, res) {
 
  try {
    let productId = req.params.productId
    var products = await Product.findById(productId)
   // res.send(products);
    res.status(200).send({products})
  } catch (err) {
    res.status(500).send(err);
  }
};

async function saveProduct(req, res){
  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteProduct(req, res){
  let productId = req.params.productId
  
  try {
    var found = await Product.findById(productId)
   // res.send(products);
    found.remove()
    res.status(200).send({message: "Product with id:  " + productId + "   deleted"})
    console.log("product with id: " + productId + " has been deleted")
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateProduct(req, res){
try {
  let productId = req.params.productId
  let update = req.body
  await Product.findByIdAndUpdate(productId, update)
 // res.send(products);
  res.status(200).send({message: "Product with id:  " + productId + "   updated"})
  console.log("product with id: " + productId + " has been updated")
} catch (err) {
  res.status(500).send(err);
}
}

async function getCars (req, res) {
 
  try {
    var products = await Product.find({category: 'cars' })
    res.status(200).send({products})
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports = {
  getProducts,
  getProduct,
  saveProduct,
  deleteProduct,
  updateProduct,
  getCars
}
  //module.exports = router;
// error handler
/*
router.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  */