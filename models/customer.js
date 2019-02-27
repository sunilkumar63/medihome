var mongoose = require('mongoose');
var AutoIncrement  = require('mongoose-sequence')(mongoose); 
// var AutoIncrement  = require('mogoose-auto-increment')
let timestampPlugin = require('../plugins/timestamp')

// const bcrypt = require('bcrypt');
// const SALT_WORK_FACTOR = 10;

var schema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    mobile_no : {type :Number , required: true , unique: true , index : { unique : true}},
    password : {type: String , default: '' , select: false},
    email_address : String,
    status : {type : Number, default : 1}, 
    orders : [{ type : mongoose.Schema.Types.ObjectId, ref : "Orders"}],
    addresses : [{ type : mongoose.Schema.Types.ObjectId, ref : "Addresses"}],
    presc : [{ type : mongoose.Schema.Types.ObjectId, ref : "Prescriptions"}]
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })    
schema.set('toObject', { getters: true });
schema.plugin(AutoIncrement, {inc_field: 'id' , id : 'customer' });
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
    schema
    .virtual('status_label')
    .get(function () {
       return this.status == 1 ? "Active" : "Inactive"
    });
    schema.pre('save', function (next) { 
    // store reference
    const user = this;
    if (user.password === undefined) {
        return next();
    }
    // bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    //     if (err) console.log(err);
    //     // hash the password using our new salt
    //     bcrypt.hash(user.password, salt, function (err, hash) {
    //         if (err) console.log(err);

    //         console.log("hash ", hash  )
    //         user.hashed_password  = hash;
    //     });
    // });
    next()
});

module.exports = mongoose.model('Customers' , schema);