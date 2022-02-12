

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')


const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  name: {type: String, required: true, minlength:4 },
  avatar: {type: String },
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now() },
  phone: {type: String, required:true, validate: { validator: function(v){
    return /\+32-\d{3}-\d{3}-\d{3}/.test(v);
  },
  message: '{VALUE}  should be of type "+32-XXX-XXX-XXX'
  }},
  lastLogin: Date,

  /*phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }

, validate: { validator: function(v){
    return /\+32-\d{3}-\d{3}-\d{4}/.test(v);
  },
  message: '{VALUE} is not a valid 10 digit number!'
  }},



  minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
  */
})
module.exports = mongoose.model('User', UserSchema)


UserSchema.pre('save', (next) => {
  let user = this
  //if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})
