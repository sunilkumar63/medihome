let express = require('express');
let router = express.Router();
var customer_api = require('../models/api/provider')
var medicine_api = require('../models/api/medicine')
var order_api = require('../models/api/order')
var OrderModel =  require('../models/order');
router.get('/api/prescription/:customer_id?' , (req, res , next) =>{
    var cust_id ;
    // console.log("ses " , nn); return
    if(req.session.customer) {
        let customer  = req.session.customer;
        cust_id = customer.id
    }
    if(req.params.customer_id) { 
        cust_id = req.params.customer_id;
    } 
    // console.log(req.session)
        // if(cust_id)
    customer_api.getCustomerPrescription(cust_id)
                        .then(result => res.json(result))
                        .catch(err => res.send(err))
})

router.post('/api/medicine/save' ,  async(req, res , next) =>{
    var items_arr = req.body.items;
    var count = 0;
    await items_arr.map((data) => {
        medicine_api.saveMedicine(data,req.body.order_id).then(order => { 
            if(order){ 
                count += 1;  
                console.log("count ", count )
                if(count == items_arr.length){
                    OrderModel.findOne({id : order.id}).populate('medicines')
                    .then( ordernew =>{
                        order_api.getGrandTotal(ordernew,function(amount){
                            ordernew.grand_total = amount;
                            ordernew.save(record =>{
                               if(record) res.json(ordernew)
                               else res.json(false)
                            })
                        })
                    })                    
                }
                 }
            }).catch(err =>console.log("Err" , err))
            // res.json(order)
            
    })
    
 })
router.post('/api/medicine/delete' , (req, res , next) =>{
    medicine_api.remove(req.body).then(result => { res.json(result); console.log(result) }).catch(err =>console.log("Err" , err))
})
module.exports = router;