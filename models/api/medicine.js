var CustomerModel =  require('../customer');
var OrderModel =  require('../order');
var orderApi =  require('../api/order');
var MedicineModel =  require('../medicine');

module.exports = {
saveMedicine : async (data,order_id) =>{
    var new_medi = new MedicineModel(data);
    return new Promise(async function(resolve , reject) {
     let  medi = await new_medi.save();
    if(medi) { 
      var order = await OrderModel.findOne({id : order_id});
    if(order){
             order.status = 2; 
            order.medicines.push(medi._id); 
            // order.grand_total = order.grand_total + (medi.price * medi.qty) 
            var order_new = await order.save();
            if(order_new)  resolve(order);                                                                        
         }
         else{
            reject(false); console.log(order)
         }
      }
    })
},

getOrder : id =>{
    return new Promise( (resolve, reject) => {
    OrderModel.findOne({id : id}).then( result => resolve(result) ).catch(error => reject(error))
    })
    //.populate('customer_id')
},
remove :  async (data) =>{
    // MedicineModel.findOneAndRemove({_id : data._id})
    var medi =  await MedicineModel.findOne({_id : data._id});
    return new Promise(async function(resolve , reject) {
        OrderModel.findOne({id : parseInt(data.order_id)}).populate('medicines').then(order => {order.medicines.pull(data._id);                                                                        
                                                                        orderApi.getGrandTotal(order, function(amount){ 
                                                                        order.grand_total = amount 
                                                                        medi.remove();
                                                                        order.save(); 
                                                                        resolve(true) })
                                                                       })
                                                                         .catch(err => { reject(false); console.log(err) })
    })
},
getCollection : () =>{
    return new Promise( (resolve, reject) => {
     OrderModel.find().then( result => resolve(result) ).catch(error => reject(error))
    })
    //.populate('customer_id')
}
}