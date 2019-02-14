var mongoose = require('mongoose');
var AutoIncrement  = require('mongoose-sequence')(mongoose);
let timestampPlugin = require('../plugins/timestamp')

var schema = new mongoose.Schema({
    // customer_id : { type : mongoose.Schema.Types.ObjectId, ref : "Customers"}, 
    customer_id : Number,
    name : String,
    mobile_no : {type :Number , required: false , unique: false , index : { unique : false}},
    pincode : {type: Number , default: ''},
    locality : String,
    city : String,
    address : String
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'address'});
schema.plugin(timestampPlugin);

module.exports = mongoose.model('Addresses' , schema);