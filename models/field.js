let mongoose = require('mongoose')
var AutoIncrement  = require('mongoose-sequence')(mongoose);

var schema = new mongoose.Schema({
    name : String,
    label : String,
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'field'});


module.exports = mongoose.model("Fields")