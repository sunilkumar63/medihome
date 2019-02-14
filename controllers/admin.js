let express = require('express');
let router = express.Router();
var admin_api =  require('../models/api/admin')

router.post('/admin/config/save' , (req,res,next) =>{
    admin_api.saveConfig(req.body).then(result => res.json(result)).catch(err => res.json(false)) 
})
router.get('/admin/config/fetch' , (req,res,next) =>{
    admin_api.getAllConfig().then( configs => res.send(configs))
})

module.exports = router