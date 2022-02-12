
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: {type: String, unique: true, required: true },
    picture: String,
    price:{type: Number, default: 0, required: true, min:0},
    category: {type: String, enum: ['cars','shisha', 'others' ], required: true},
    description: {type: String, required: true }
})

module.exports = mongoose.model('Product', ProductSchema)