let express = require('express');
let router = express.Router();
var customer_api = require('../models/api/provider')
var chat_historyModel = require('../models/chat_history')
var emailer = require('../helpers/notification')


router.post('/api/email/', async function(req,res,next){ console.log(req.body.msg_type)
        if(req.body.msg_type === "order_email")
            await emailer.orderEmail(req.body, (response) =>{
                if(response){
                    var new_message = new chat_historyModel({
                        order_id : req.body.order.id,
                        message : req.body.message
                    });
                    new_message.save(success => console.log("message saved"));
                    res.send(response)
                }              
          });   
})

module.exports = router