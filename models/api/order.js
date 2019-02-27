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
        order.populate('medicines') ; order.populate('ship_address', {updatedAt:0 , createdAt :  0, _id : 0 });order.populate('prescription');order.populate('chat_history').populate('customer','first_name last_name') 
     }
    if(entity !== null && entity !== 'all')  order.populate(entity)
    if(order) resolve(order)
    else reject({error : true , message : 'invalid order ID'})
    }).catch(err => null)
},

getOrders : (params) =>{
    return new Promise( async (resolve, reject) => {
                    if(params.type === 'recent') 
                        orders = await OrderModel.find().sort('-date').limit(5)
                        .populate('customer','first_name last_name')
                        .then(result => resolve(result))
                        .catch(err => { console.log(err); reject(false) })
                    else
                       orders = await OrderModel.find().sort('-date')
                        .populate('customer','first_name last_name')
                        .then(result => resolve(result))
                        .catch(err => { console.log(err); reject(false) })
    })
},

getCollection : () =>{
    return new Promise( (resolve, reject) => {
     OrderModel.find().populate('customer','first_name last_name').then( result => resolve(result) ).catch(error => reject(error))
    })
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

 shipOrder : (post_data , status_code = 3) =>{ 
    return new Promise( (resolve, reject) => {
        if(status_code === 3) { 
            OrderModel.findOne({id : post_data.order_id}).then(order =>{
                if(order.status !== 2)  reject(false)             
            })
        }
        
        OrderModel.updateOne({id : post_data.order_id} ,{$set: { 
                                 'grand_total' : post_data.grand_total,
                                 'shipping_charge' :  post_data.shipping_charge,
                                 'extra_charge' :  post_data.extra_charge,
                                 'status' : 3
                                }}, {upsert:true})
                                .then(res =>{
                                    //send Email
                                    //estimate Delivery TIme
                                    resolve(res)
                                    })
                                .catch(err => console.log(err))
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
}

}