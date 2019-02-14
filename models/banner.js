let mongoose = require('mongoose')
var AutoIncrement  = require('mongoose-sequence')(mongoose);
var schema = new mongoose.Schema({
    name : String,
    filename : String
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
schema.set('toObject', { getters: true });
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'banner'});
schema.virtual('src').get(function(){
    return global.banner_image_path+this.path
})
module.exports =  mongoose.model('Banners' , schema)