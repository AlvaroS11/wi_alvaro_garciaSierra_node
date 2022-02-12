'use strict'

const mongoose = require('mongoose')
const user = require('../models/user')
const User = require('../models/user')
const service = require('../service/tokens')
var bcrypt = require('bcryptjs');

async function signUp(req, res){
    try{
    const user = new User({
        email: req.body.email,
        name: req.body.name,      
        password:  bcrypt.hashSync(req.body.password, 6),
        phone: req.body.phone
    })
   await user.save((err) => {
        if(err) res.status(500).send({message: 'Error at creating user: ' + err})
        else  return res.status(200).send({user ,token: service.createToken(user)})
    })
}catch(err){
    return res.status(500)
}
     //   return res.status(200).send({token: service.createToken(user)})
}

async function signIn(req,res){
User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: "User does not exist." });
      }
      console.log(user)
      console.log(req.body)

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password
      );


      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,  message: "Invalid Password!"
        });
      }
      var token = service.createToken(user)
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token
      });
    });
};
module.exports = {
    signIn,
    signUp
}


