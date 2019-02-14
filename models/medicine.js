let mongoose = require('mongoose');
let timestampPlugin = require('../plugins/timestamp')
var AutoIncrement  = require('mongoose-sequence')(mongoose);

var schema  = new mongoose.Schema({
    order_id : Number,
    name : String,
    price : Number,
    qty : Number,
    comment : String,
    status : { type: Number , default : 1}
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
schema.virtual('_price').get(function(){ return "Rs."+ this.price })
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'medicine'});
schema.plugin(timestampPlugin)
module.exports = mongoose.model('Medicines' , schema)