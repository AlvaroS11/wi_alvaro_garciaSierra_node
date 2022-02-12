'use strict'

var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing. */


 async function getUsers(req, res){
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error); 
    }
}

//Updated by authentication/signup
/*
async function postUsers(req, res){
  try
  {
    const user = new User(req.body);
    await user.save();
    res.status(200).send({user})
  }
  catch(err) {
    res.status(500).send(err);

  }
}
*/


module.exports = {
  getUsers,
  //postUsers
}
