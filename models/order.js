let mongoose = require('mongoose');
let moment = require('moment');
let timestampPlugin = require('../plugins/timestamp')
var AutoIncrement  = require('mongoose-sequence')(mongoose);

let statuses = { 1 : 'pending' , 2 : 'preparation' , 3: 'shipped' , 4 : 'hold',5 : 'unhold', 6 : 'complete' , 0 : 'cancel' }
var schema  = new mongoose.Schema({
    customer_id : Number,//{ type : mongoose.Schema.Types.ObjectId, ref : "Customers"},
    items :  {type : String , default : null},
    grand_total :  {type : Number , default : 0},
    payment_mode : {type : String , default : 'cod'},
    // shipping_address : {type : mongoose.Schema.Types.ObjectId , default : null , ref : "Addresses"} ,
    shipping_address : {type : Number , default : null , ref : "Addresses" , required : true} ,
    prescription_id : Number,
    medicines : [{ type : mongoose.Schema.Types.ObjectId, ref : "Medicines"}],
    tracking_no : String,
    shipping_charge : Number,
    extra_charge : Number,
    status : { type: Number , default : 1}
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
schema.set('toObject', { getters: true });

schema.virtual('grand_total_currency')
.get(function () {
   return "Rs."+this.grand_total
});

schema.virtual('status_label')
.get(function () {
   return statuses[this.status]
});

schema.virtual('purchased_date')
.get(function () {
   return moment(this.createdAt).format('MMMM Do YYYY, h:mm a')
});

schema.virtual('ship_address', {
    ref: 'Addresses',
    localField: 'shipping_address',
    foreignField: 'id',
    justOne: false 
  });
schema.virtual('prescription', {
    ref: 'Prescriptions',
    localField: 'prescription_id',
    foreignField: 'id',
    justOne: true 
  });
  schema.virtual('customer', {
    ref: 'Customers',
    localField: 'customer_id',
    foreignField: 'id',
    // select: 'name',
    justOne: false 
  });
  schema.virtual('chat_history', {
    ref: 'Chats',
    localField: 'id',
    foreignField: 'order_id',
    justOne: false 
  });
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'order'});
schema.plugin(timestampPlugin)
module.exports = mongoose.model('Orders' , schema)