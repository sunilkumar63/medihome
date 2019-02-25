var mongoose = require('mongoose');
var AutoIncrement  = require('mongoose-sequence')(mongoose); 
let timestampPlugin = require('../plugins/timestamp')

var schema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    mobile_no : {type :Number , required: true , unique: true , index : { unique : true}},
    password : {type: String , default: ''},
    email_address : String,
    status : {type : Boolean, default : true}, 
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })    
schema.set('toObject', { getters: true });
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'admin' });
schema.plugin(timestampPlugin);

schema
    .virtual('hashed_password')
    .set(function (password) {
        this.hashed_password = password;
    });
    
    schema
    .virtual('full_name')
    .get(function () {
       return this.first_name+" "+this.last_name;
    });
    schema.pre('save', function (next) { 
    const user = this;
    if (user.password === undefined) {
        return next();
    }
    next()
});

module.exports = mongoose.model('Admins' , schema);