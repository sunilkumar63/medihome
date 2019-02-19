let router = require('express').Router();
var banner_api  =  require('../models/api/banner') 
let save = '/admin/banner/save'
let fetchAll = '/api/banners/:front?'
let edit = '/api/banner/:id'

router.post(save , async (req, res) =>{
    var data = req.body;
    if(!data) return res.status(500).json({error :"Not valid Data"});
        
     //SAVE IMAGE  LOCALLY
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
        console.log(data.id)
        if(data.id) {
            var file =  await banner_api.updateBanner(data) 
        }else{ 
            var file =  await banner_api.saveBanner(data) 
        }
        if(file)  { console.log("saved all")  ; res.json(file) }
        else return res.status(500).json("something wrong "+file);
    })

router.get(edit , (req, res) =>{
        var id = req.params.id; 
        res.send(banner_api.getBanner(id))
})
router.delete(edit , (req, res) =>{
    var id = req.params.id; 
    res.send(banner_api.removeBanner(id))
})
router.get(fetchAll , async (req, res) =>{
    var banners  = await banner_api.getBanners(req.params);
    res.send(banners)
})

module.exports = router;