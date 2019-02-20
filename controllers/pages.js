let router = require('express').Router();
var pages_api  =  require('../models/api/pages') 
let save = '/admin/page/save'
let fetchAll = '/api/pages/:front?'
let edit = '/api/page/:id'

router.post(save , async (req, res) =>{
    var data = req.body;    
    if(!data) return res.status(500).json({error :"Not valid Data"});
     if(req.files) {
        let imageFile = req.files.image;
        let image_save_path = global.banner_image_path +req.files.image.name
        imageFile.mv(image_save_path , async function(err) {
            if (err) { 
                return res.status(500).json(err);
            }
        })
            data.filename = req.files.image.name;
        }
        data.name =  req.body.name
        //SAVE DATA TO DB
        if(data.id) {
            var file =  await pages_api.update(data) 
        }else{ 
            var file =  await pages_api.save(data) 
        }
        if(file)  { console.log("saved all")  ; res.json(file) }
        else return res.status(500).json("something wrong "+file);
    })

router.get(edit ,  async(req, res) =>{
        var id = req.params.id; 
        var data = await pages_api.fetch(id)
        if(data)
        res.json(data)
})
router.delete(edit , (req, res) =>{
    var id = req.params.id; 
    res.send(pages_api.remove(id))
})
router.get(fetchAll , async (req, res) =>{
    var banners  = await pages_api.fetchAll(req.params);
    res.send(banners)
})

module.exports = router;