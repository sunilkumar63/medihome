let express = require('express');
let router = express.Router();
var admin_api =  require('../models/api/admin')
var customer_api =  require('../models/api/provider')
var order_api =  require('../models/api/order')
var cache  = require('../helpers/cache')
var  jwt    = require('jsonwebtoken');
let config = require('../config/env.json');

  
//Set KEY API JWT AUTHx
router.post('/admin/config/save' , (req,res,next) =>{
    admin_api.saveConfig(req.body).then(result => res.json(result)).catch(err => res.json(false)) 
})  
router.post('/admin/config/fetch' , (req,res,next) =>{ 
    var count = Object.keys(req.query).length;
    if(count === 0) 
        admin_api.getAllConfig().then( configs => res.send(configs))
     else
        admin_api.getConfig(req.query).then( configs => res.send(configs))
})
router.get('/admin/basic/info' , cache.mcacheMiddleware() , async (req,res,next) =>{ 
    var data = await admin_api.getBasicConfig();
    res.json(data);
})
router.post('/api/admin/login' , (req, res , next) =>{
    admin_api.authLogin(req.body)
                        .then( data =>{ 
                                    req.session.admin = data; 
                                    req.session.save();
                                    res.send(data) 
                                 })
                        .catch( err => res.json(err) )
})
router.post('/admin/customer/address/save' , (req,res, next) =>{
    var data = req.body;
    customer_api.saveAddress(data)
                       .then(result => res.send(true))
                       .catch( err => { throw err })
})
router.get('/api/admin/logout', function (req,res) {
    if (req.session) { 
        delete req.session.admin;
        res.send(true)
    }
})
router.get('/api/admin/auth' , (req, res , next) =>{
    if(req.session) {
            if(req.session.admin) res.send(req.session.admin)
            else res.json(false)
        }   
        else{
            res.json(false)     
        }
})

router.post('/admin/order/save' , async (req, res , next) =>{
    var data = req.body;
    var presc_id = null;
    if(!req.body.name) return res.status(500).json("Not valid Data");
            //   data.customer_id = customer.id;            
                if(req.files) {
                    let imageFile = req.files.file;
                    let image_save_path = global.presc_image_path +req.body.filename
                    imageFile.mv(image_save_path , function(err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
                if(req.body.filename) {
                    data.file = req.body.filename;
                }
                var pres =  await customer_api.savePrescription(data);
            }
            if(pres) presc_id  = pres.id;
            let  new_order = {
                customer_id : data.customer_id,
                shipping_address : data.shipping_address,
                grand_total : 0,
                prescription_id : presc_id
            }
            order_api.createOrder(new_order)
                .then( order => {
                    if(order){ 
                        if(pres) pres.order_id = order.id; 
                        res.send(order) 
                        }
                    })
                .catch(err => console.error(err))
 })
 
 router.get('/auth' , async (req, res , next) =>{ console.log(req.app.get('secret'))
 const payload = { check:  true};
  var token = jwt.sign(payload, 'heymynameismohamedaymen', {
        expiresIn: 1440 // expires in 24 hours
  }); 
  res.json({  message: 'authentication done ',  token: token });
})
module.exports = router