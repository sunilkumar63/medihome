let express = require('express');
let path = require('path');
let router = express.Router();
var customer_api = require('../models/api/provider') 
var redis  = require('../helpers/cache')
var order_api = require('../models/api/order')
var multer = require('multer'); 
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "../upload");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: Storage })

router.get('/api/test' , async (req, res , next) =>{
    res.json(global.presc_image_path)
})

router.post('/api/customer/register' , (req, res , next) =>{
  customer_api.saveCustomer(req.body)
                        .then( data =>{  res.json(data)  })
                        .catch( err => res.send(err) )
})

router.post('/api/customer/login' , (req, res , next) =>{
    customer_api.authLogin(req.body)
                        .then( data =>{ 
                                    req.session.customer = data; 
                                    req.session.save();
                                    res.send(data) 
                                 })
                        .catch( err => res.json(err) )

})
router.get('/api/customer/logout', function (req,res) {
    if (req.session) { 
        delete req.session;
        if(!req.session)  res.send(true)
    }
})
router.get('/api/customer/auth' , (req, res , next) =>{
    if(req.session) {
        // console.log("Memory Usage - ",process.memoryUsage);
            if(req.session.customer) res.send(req.session.customer)
            else res.json(false)
        }   
        else{
            res.json(false)     
        }
})

router.get('/api/customer/:id?/:all?' , redis.redisMiddleware() ,(req, res , next) =>{
    var customer_id;
    if(req.session && !req.params.id) {
        let customer = req.session.customer;
        customer_id =  customer.id
    }else{
        customer_id = req.params.id;
    }    
    customer_api.getCustomer(customer_id,req.params.all)
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
})

router.get('/api/customers/active' , (req, res , next) =>{    
    customer_api.getAllActiveCustomers(req.params)
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
})
router.get('/api/customers' , redis.redisMiddleware(),(req, res , next) =>{    
    customer_api.getAllCustomer(req.params)
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
})

router.post('/uploadsave' , async (req, res , next) =>{
    var data = req.body;
    if(!req.body.name || !req.files ) return res.status(500).send("Not valid Data");
    if(req.session) { 
        if(req.session.customer) {   
            var customer = req.session.customer;  
            data.customer_id = customer.id;            
                if(req.files) {
                let imageFile = req.files.file;
                let image_save_path = global.presc_image_path +req.body.filename
                imageFile.mv(image_save_path , function(err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            }
            if(req.body.filename) {
                data.file = req.body.filename;
            }
            // console.log(data); return;
         var pres =  await customer_api.savePrescription(data);
         if(pres) {                           
            let  new_order = {
                customer_id : data.customer_id,
                shipping_address : data.shipping_address,
                grand_total : 0,
                prescription_id : pres.id
            }
            order_api.createOrder(new_order)
                .then( order => {
                    if(order)    pres.order_id = order.id; res.send(order) 
                    })
                .catch(err => console.error(err))
        }
        else { console.log("err")}
    }
}
else{
    return res.status(500).json("NO CUSTOMER DATA");
} 
 })

     router.get('/api/address/:customer_id?' , (req,res, next) =>{
        var cust_id = null;
        if(req.session.customer && !req.params.customer_id) {
            let customer  = req.session.customer;
            cust_id = customer.id
        }
        if(req.params.customer_id) { 
            cust_id = req.params.customer_id;
        }  
        customer_api.getAddresses(cust_id)
                                .then(result => res.json(result))
                                .catch(err => res.json(err))
     })

     router.get('/api/addresses' , (req, res , next) =>{
        customer_api.getAddressCollection()
                            .then(result => res.json(result))
                            .catch(err => res.json(err))
    })

     router.post('/api/customer/address' , (req,res, next) =>{
         var data = req.body;
            if(req.session) { 
                if(!req.session.customer) { 
                     return false;
                }
            }  
         let customer = req.session.customer;
         data.customer_id = customer.id;
         customer_api.saveAddress(data)
                            .then(result => res.send(true))
                            .catch( err => { throw err })
     })
     
     router.get('/api/customer/address/remove/:id' , (req,res) =>{
        customer_api.removeAddress(req.params.id).then(result => res.send(true))
     })

     router.get('/api/order/create' , (req,res, next) =>{
        let  new_order = {
            customer_id : 6,
            shipping_address: "dsds",
            grand_total : 100 
        }
        order_api.createOrder(new_order);
        return ;
     })

     router.post('/api/data/validator' , async (req, res , next) =>{
      customer_api.validateAttribute(req.body, result=>{
        res.json(result);
      });
    })

    router.post('/api/customer/update' , async (req, res , next) =>{
        customer_api.updateAttribute(req.body, result=>{
          res.json(result);
        });
      })

module.exports = router;