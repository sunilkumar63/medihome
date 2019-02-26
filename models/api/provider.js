// var bcrypt =  require('bcrypt');
var Customer =  require('../customer');
var PrescriptionModel =  require('../prescription');
var CustomerModel =  require('../customer');
var OrderModel =  require('../order');
var AddressModel =  require('../customer_address');

module.exports= { 
    
saveCustomer :  async (data, callback) =>{
    let cust = new Customer(data);
    var response = await cust.save();
    return new Promise( function(resolve , reject) {
        if(response !== null)  resolve(response)
        else{ reject("Error")}
    })
} , 

authLogin : (data) =>{
return new Promise( (resolve , reject) =>{
Customer.findOne({ mobile_no : data.mobile_no}).then( res =>{          
        if(res) { resolve(res)   }
        else reject(false)
    })
})
},

getCustomer :  async  (id , populateEntity = null) => {
    return new Promise( (resolve , reject) =>{
      var customers =   Customer.findOne({ id : id});
      if(populateEntity === 'all')  customers.findOne({ id : id}).populate('addresses')
                                                    .populate( {path : 'orders' , populate: { path: 'prescription' , select: 'image_src file -_id'} } )
                                                    .populate( {path : 'orders' , populate: { path: 'medicines' , select : 'name'} } )
                                                    .populate('presc')
      if(populateEntity !== null && populateEntity !== 'all')  customers.findOne({ id : id}).populate(populateEntity)

      if(customers){  
        if(customers) resolve(customers)
        else reject({error : true , message : 'invalid customer ID'})
        }
        }).catch(err => null)
},

getAllCustomer : () => {
    return new Promise( (resolve , reject) =>{
        Customer.find().then( res =>{  
                if(res) resolve(res)
                else reject({error : true , message : 'zero customer'})
            })
        }).catch(err => null)
},
getAddressCollection: () => {
    return new Promise( (resolve , reject) =>{
        AddressModel.find().then( res =>{  
                if(res) resolve(res)
                else reject({error : true , message : 'zero address'})
            })
        }).catch(err => null)
},

savePrescription :  async (data, callback) =>{
    return new Promise( function(resolve , reject) {
        let pres = new PrescriptionModel(data);
        pres.save( (err,response) => {
        if(response) {            
            CustomerModel.findOne({id : data.customer_id})
                                    .then( (customer,err) => { 
                                        if(customer) { customer.presc.push(response._id); customer.save() ;  resolve(pres)                                          
                                        } 
                                        else { console.log("customer ",err); reject(false) } 
                                     })
                                    .catch(err => reject(err))
        }
        else{ reject("Error")}
    })
    }).catch(err => null)
},

getCustomerPrescription : (customer_id) => {
    return new Promise( (resolve , reject) =>{
        PrescriptionModel.find({ customer_id : customer_id }).then( res =>{  
                if(res) resolve(res)
                else reject({error : true , message : 'invalid customer ID'})
            })
        })
},

saveAddress :  data =>{
    var addr = new AddressModel(data);
    return new Promise(async function(resolve , reject) {
     let  address = await addr.save();
     if(address) {
        CustomerModel.findOne({id : data.customer_id})
                                    .then( (customer,err) => { 
                                        if(customer) { customer.addresses.push(address._id); customer.save() ;  resolve(customer)                                          
                                        } 
                                        else { console.log("customer ",err); reject(false) } 
                                     })
                                    .catch(err => reject(err))
     }
})
},
removeAddress :  id =>{
    return new Promise(async function(resolve , reject) {
     AddressModel.findOneAndRemove({id : id}).then(result => resolve(true)).catch(err => reject(false))
    })
},

getAddresses : customer_id =>{
    return new Promise( (resolve , reject) =>{
           AddressModel.find({customer_id : customer_id}).then( res =>{  
            if(res) resolve(res)
            else reject({error : true , message : 'invalid customer ID'})
        })
    })
},

validateAttribute : async (params,cb) =>{ 
var entity =  params.entity;
var attribute =  params.attribute;
var value =  params.value;
var model ,record= null;
switch(entity){
    case 'customer' :
        model = CustomerModel;
    case 'order' :
        model = OrderModel;    
}
if(entity == "customer") model = CustomerModel;
if(model)
    record = await model.findOne({ [ attribute] : [value]}).select('id');
    if(record) return cb(true)
    else return cb(false)
},

updateAttribute : async (params,cb) =>{ 
    // console.log(params); return;
    var entity =  'customer';
    var id = parseInt(params.id);
    var attribute =  params.attribute;
    var value =  params.value;
    if(attribute == "status" && entity == "customer") value = parseInt(value)
    var model ,record= null;
    switch(entity){
        case 'customer' :
            model = CustomerModel;
        case 'order' :
            model = OrderModel;    
    }
    if(entity == "customer") model = CustomerModel;
    if(model)
        record = await model.findOneAndUpdate({ id : [id]}, { [attribute] : value }  , {new: true})
        if(record) return cb(record)
        else return cb(false)
    }
}
 
