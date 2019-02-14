let mongoose = require('mongoose')
let timestampPlugin = require('../plugins/timestamp')

let schema = new mongoose.Schema({
    order_id : { type : Number, ref : "Orders"},
    message : String
})
schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
// schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'address'});
schema.plugin(timestampPlugin);
module.exports = mongoose.model('Chats', schema)