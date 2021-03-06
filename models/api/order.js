// let mongoose = require('mongoose');
var PrescriptionModel =  require('../prescription');
var CustomerModel =  require('../customer');
var OrderModel =  require('../order');
var chat_historyModel =  require('../chat_history');
var sender =  require('../../helpers/notification');

module.exports = {
createOrder : async (data) =>{
    var new_order  =  new OrderModel(data);
    return new Promise( (resolve, reject) =>{
       new_order.save( (err,order) =>{ 
           if(order) {  
                CustomerModel.findOne({id : data.customer_id})
                .then( (customer,err) => { 
                    if(customer) { customer.orders.push(order._id); customer.save() ;  resolve(order)                                          
                    } 
                    else { console.log("customer ",err); reject(false) } 
                })
                .catch(err => { console.log(err) ;reject(err) })               
               }
           else reject(err => console.log(err))
       });
    })
}, 

getCustomerOrder : customer_id =>{
    return new Promise( (resolve, reject) => {
    OrderModel.find({customer_id : customer_id})
                                        .then( result => resolve(result) ).catch(error => reject(error))
    })
    //.populate('customer_id')
},
getOrder : async (id,entity) =>{
    return new Promise( (resolve, reject) => {
    var order =  OrderModel.findOne({id : id})
    if(entity == 'all') { 
        order.populate('medicines') ; order.populate('ship_address', {updatedAt:0 , createdAt :  0, _id : 0 });order.populate('prescription');order.populate('chat_history').populate('customer','first_name last_name email_address mobile_no') 
     }
    if(entity !== null && entity !== 'all')  order.populate(entity)
    if(order) resolve(order)
    else reject({error : true , message : 'invalid order ID'})
    }).catch(err => null)
},
 
getOrders : (params) =>{
    return new Promise( async (resolve, reject) => { 
                    if(params.type === 'filter') {
                       delete params['type']; console.log(params)
                       order  = await OrderModel.find(params).sort({"createdAt" : 1})
                       .populate('customer','first_name last_name email_address' )
                       .then(result => resolve(result))
                       .catch(err => { console.log(err); reject(false) })
                    }
                       if(params.type === 'recent')
                        orders = await OrderModel.find().limit(5)
                        .populate('customer','first_name last_name email_address')
                        .then(result => resolve(result) )
                        .catch(err => { console.log(err); reject(false) })
                      else
                       orders = await OrderModel.find().sort({createdAt : 1})
                        .populate('customer','first_name last_name email_address'  )
                        .then(result => resolve(result))
                        .catch(err => { console.log(err); reject(false) })
    })
},

getCollection : () =>{
    return new Promise( (resolve, reject) => {
     OrderModel.find().populate('customer','first_name last_name').then( result => resolve(result) ).catch(error => reject(error))
    })
},
queryOrders : async (filters) =>{
    return await OrderModel.find(filters).exec();
},
updateStatus : (id , status_code) =>{
    return new Promise( (resolve, reject) => {
        if(status_code === 3) { 
      this._validateOrderForShipment(id, valid =>{
            if(!valid) reject(false)
        })
        }
    OrderModel.findOneAndUpdate({id : id} , {status : status_code}, {upsert:true})
                                                        .then(res =>{
                                                            CustomerModel.findOne({id : res.customer_id}).select('email_address first_name mobile_no -_id').then(customer=>{
                                                                res.customer = customer;
                                                                sender.orderUpdateEmail(res,status_code)
                                                            })                                                          
                                                               resolve(res)
                                                            })
                                                        .catch(err => console.log(err))
    })
 },
 updateGrandTotal : async(order,cb) =>{
     var amount =  0;
    var order = await OrderModel.findOne({id : order}).populate('medicines')
    // getGrandTotal(order,function(amount){
    //     order.grand_total = amount;
    //     order.save(record =>{
    //        if(record) return cb(true)
    //        else return cb(false)
    //     })
    // })
 },
 getGrandTotal : async(order,cb) =>{
    var grand_total =  0;
    // var order_data = order.populate('medicines');
        var medicines = order.medicines
        medicines.forEach(medi =>{
            grand_total += (medi.price * medi.qty);
     })
    if(grand_total)  cb(grand_total)
 },

 shipOrder : (post_data , status_code = 3) =>{ 
    return new Promise( (resolve, reject) => {
        if(status_code === 3) { 
            OrderModel.findOne({id : post_data.order_id}).then(order =>{
                if(order.status !== 2)  reject(false)             
            })
        }
        OrderModel.findOneAndUpdate({id : post_data.order_id} , { 
                                 'grand_total' : post_data.grand_total,
                                 'shipping_charge' :  post_data.shipping_charge,
                                 'extra_charge' :  post_data.extra_charge,
                                 'tracking_no' : post_data.tracking_no,
                                 'status' : 3
                                }  , {upsert:false} )
                                .then(order =>{
                                        //send Email             
                                        CustomerModel.findOne({id : order.customer_id}).select('email_address first_name mobile_no').then(customer=>{
                                        order.customer = customer;                                      
                                        sender.orderShipmentEmail(order);
                                        console.log("sending email")
                                    })   
                                    //estimate Delivery TIme
                                    resolve(order)
                                    })
                                .catch(err => console.log("Shipment LOG : ",err))
    })
 },
 getChatHistory : (id , cb) =>{ console.log(id)
     return new Promise( (resolve,reject) => {
        chat_historyModel.find({order_id : id} )
                .then(response => resolve(response) )
                .catch(err => {console.log(err) ; reject(false)})
    })
 },

 _validateOrderForShipment : (id,cb) => {
    OrderModel.findOne({id : id}).then(order =>{
        if(order.status !== 2)  cb(true) 
        else cb(false)
    })
},

getStatistics : async (cb) =>{
    var stats_arr = {}
    var pending=preparing=shipped=hold=cancelled=completed = 0;
    var all_orders = await OrderModel.find().exec();
   var count_cal  = await function (){ 
                all_orders.forEach(order =>{
                    let status = parseInt(order.status); 
                    if(status  == 1) pending++;
                    if(status  == 2) preparing++
                    if(status  == 3) shipped++
                    if(status  == 4) hold++
                    if(status  == 0) cancelled++
                    if(status  == 6) completed++
                })
}
await count_cal();
stats_arr = {pending : pending , preparing : preparing,shipped : shipped , hold : hold ,cancelled : cancelled , completed : completed}
return new Promise((resolve, reject) =>{
    resolve(stats_arr)
})
}
}