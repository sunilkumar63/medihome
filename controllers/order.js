let express = require('express');
let router = express.Router({ strict: true });
var order_api = require('../models/api/order')
var cache  = require('../helpers/cache')
var pdf = require('html-pdf'); 
var helper = require('../helpers/data'); 

var authorization = async (req,res,next) =>{
  if(!req.session.admin) res.send({
       message: 'No auth provided.'
   });
   else next()
}

router.get('/api/customer/order/:customer_id?' , authorization, (req, res , next) =>{
    var cust_id ;
    if(req.session.customer) {
        let customer  = req.session.customer;
        cust_id = customer.id
    }
    if(req.params.customer_id) { 
        cust_id = req.params.customer_id;
    }    
    order_api.getCustomerOrder(cust_id)
                    .then(result => res.json(result))
                    .catch(err => console.log(err))
})

router.get('/api/order/:id/:entity?' , authorization ,async (req, res , next) =>{
    let entity=  req.params.entity;
    if(entity === 'chat_history')
         order_api.getChatHistory(req.params.id).then(result => res.json(result))
         .catch(err => res.json(err))
    else
         await order_api.getOrder(req.params.id , req.params.entity)
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
})

router.get('/api/orders/:type?'  , authorization ,  async (req, res , next) =>{    
    var data = await order_api.getOrders(req.params)
    if(data){
        res.json(data)
    }
})
router.post('/api/filter/order' ,authorization , async (req, res , next) =>{    
    var data = await order_api.getOrders(req.body)
    if(data){
        res.json(data)
    }
})
router.get('/api/order/updatestatus/:id/:status' ,authorization, async (req, res , next) =>{   
    var is_updated = await order_api.updateStatus(req.params.id,req.params.status)
    if(is_updated) res.send(true)
    else res.send(false)
})
router.post('/api/order/:id/ship' , authorization,async (req, res , next) =>{   
    var is_updated = await order_api.shipOrder(req.body)
    if(is_updated) res.send(true)
    else res.send(false)
})
router.get('/api/order_stats' , cache.mcacheMiddleware(), async (req,res,next) =>{ 
    var data = await order_api.getStatistics();
    res.json(data);
})

router.get('/api/order/download/invoice/:id', async   (req,res,next)=>{
    var order = await order_api.getOrder(req.params.id,"all")
    var html = await helper.generateInvoice(order);
    var fileName = 'invoice_2.pdf';
    pdf.create(html).toFile(`public/invoice/${fileName}` ,(  err, stream) => {
    if (err) return console.log(err);
    else res.json({filepath: `invoice/${fileName}`})
  });
})
module.exports = router;