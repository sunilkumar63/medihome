var configModel  = require('../configuration')

module.exports.saveConfig =  (data) =>{
    return new Promise( async  (resolve,reject) => {
        var save_obj = {}
        save_obj.section_id = "general"
        save_obj.values =  JSON.stringify(data)
        var rs= await configModel.findOneAndUpdate({section_id : save_obj.section_id} , 
                {values : save_obj.values , section_id : save_obj.section_id} ,
                {upsert: true, new: true, setDefaultsOnInsert: true})
           if(rs )  resolve(true)
           else reject(false)
        })
        // configModel.insertMany(save_obj).then( docs => resolve(docs)).catch( err => { console.log(err) ; reject(err) })
}

module.exports.getAllConfig =() => {
    return new Promise( (resolve,reject) => {
    configModel.find({}).then(configs => resolve(configs)).catch(err =>{ console.log(err); reject(false) })
    })
}

module.exports._getConfigValue = (section_id,field_id)  =>{

}