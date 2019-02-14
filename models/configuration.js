let mongoose = require('mongoose')
var AutoIncrement  = require('mongoose-sequence')(mongoose);
let timestampPlugin = require('../plugins/timestamp')

var schema = new mongoose.Schema({
    section_id : String,
    values : String
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'config'});
schema.plugin(timestampPlugin);

module.exports = mongoose.model("Configs" , schema)