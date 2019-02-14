let router = require('express').Router();
var banner_api  =  require('../models/api/banner') 
let save = '/admin/banner/save'

router.post(save , (req, res) =>{
    var data = req.body;
    if( !req.files ) return res.status(500).json({error :"Not valid Data"});

        let imageFile = req.files.image;
        let image_save_path = global.banner_image_path +req.files.image.name
        imageFile.mv(image_save_path , async function(err) {
        if (err) { console.log("errrr")
            return res.status(500).json(err);
        }else{
            console.log("bannner upladed")
            data.filename = req.files.image.name;
            data.name =  req.body.name
            let file =  await banner_api.saveBanner(data)
            if(file)  { console.log("saved all")  ; res.json(file) }
            else return res.status(500).send("something wrong");
            }
        })

    })

    module.exports = router;