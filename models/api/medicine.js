var CustomerModel =  require('../customer');
var OrderModel =  require('../order');
var MedicineModel =  require('../medicine');

module.exports = {
saveMedicine : async (data) =>{
    var new_medi = new MedicineModel(data);
    return new Promise(async function(resolve , reject) {
     let  medi = await new_medi.save();
    if(medi) { 
        OrderModel.findOne({id : data.order_id}).then(order => { order.status = 2; order.medicines.push(medi._id); order.save(); resolve(medi) })
                                                                         .catch(err => { reject(false); console.log(err) })
    }
    })
}, 

getOrder : id =>{
    return new Promise( (resolve, reject) => {
    OrderModel.findOne({id : id}).then( result => resolve(result) ).catch(error => reject(error))
    })
    //.populate('customer_id')
},

getCollection : () =>{
    return new Promise( (resolve, reject) => {
     OrderModel.find().then( result => resolve(result) ).catch(error => reject(error))
    })
    //.populate('customer_id')
}
}