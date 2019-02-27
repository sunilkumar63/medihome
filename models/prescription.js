let mongoose = require('mongoose');
let timestampPlugin = require('../plugins/timestamp')
var AutoIncrement  = require('mongoose-sequence')(mongoose);
let moment = require('moment');
var schema  = new mongoose.Schema({
    customer_id : Number,//{ type : mongoose.Schema.Types.ObjectId, ref : "Customers"},
    file : String,
    name :String,
    message :String,
    order_id : Number
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })

schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'prescription'});
schema.plugin(timestampPlugin)
schema.virtual('creation_date')
.get(function () {
   return moment(this.createdAt).format('MMMM Do YYYY, h:mm a')
});
schema.virtual('image_src').get(function(){
   return global.presc_image_url+this.file
})
module.exports = mongoose.model('Prescriptions' , schema)