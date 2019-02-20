let mongoose = require('mongoose')
var AutoIncrement  = require('mongoose-sequence')(mongoose);
let src_path =  "/media/banner/"
var schema = new mongoose.Schema({
    name : String,
    url_key : String,
    content : String,
    status : {type : Boolean , default : true}
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
schema.set('toObject', { getters: true });
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'page'});

// schema.virtual('src').get(function(){
//     return  src_path+this.filename
// })

schema.virtual('status_label').get(function(){
    return this.status == true  ?  "Active" : "Inactive" ;    
})
module.exports =  mongoose.model('Pages' , schema)