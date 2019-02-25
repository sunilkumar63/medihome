let express = require('express');
let router = express.Router();
var admin_api =  require('../models/api/admin')

router.post('/admin/config/save' , (req,res,next) =>{
    admin_api.saveConfig(req.body).then(result => res.json(result)).catch(err => res.json(false)) 
})
router.get('/admin/config/fetch' , (req,res,next) =>{
    admin_api.getAllConfig().then( configs => res.send(configs))
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
module.exports = router