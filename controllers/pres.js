let express = require('express');
let router = express.Router();
var customer_api = require('../models/api/provider')
var medicine_api = require('../models/api/medicine')

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

router.post('/api/medicine/save' , (req, res , next) =>{
        medicine_api.saveMedicine(req.body).then(result => res.json(result)).catch(err =>console.log("Err" , err))
})
module.exports = router;