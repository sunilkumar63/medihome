var configModel  = require('../configuration')
var Admin =  require('../admin');

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
}

module.exports.getAllConfig =() => {
    return new Promise( (resolve,reject) => {
    configModel.find({}).then(configs => resolve(configs)).catch(err =>{ console.log(err); reject(false) })
    })
}
module.exports.getConfig =(params) => {
    return new Promise( (resolve,reject) => {
    configModel.findOne({section_id : params.section_id}).then( config =>{
                    var config_data = JSON.parse(config.values);
                    if(params.field_name) 
                        resolve(config_data[params.field_name])
                     else
                        resolve(false)   
                })
            .catch(err =>{ console.log(err); reject(false) })
    })
}
module.exports.getBasicConfig =(params) => {
    return new Promise( (resolve,reject) => {
    configModel.findOne({section_id : 'general'}).then( config =>{
                    var config_data = JSON.parse(config.values);
                    if(config_data) 
                        resolve(config_data)
                     else
                        resolve(false)   
                })
            .catch(err =>{ console.log(err); reject(false) })
    })
}
module.exports.authLogin =  (data) =>{
    return new Promise( (resolve , reject) =>{
    Admin.findOne({ mobile_no : data.mobile_no,password: data.password}).then( res =>{          
            if(res) { resolve(res)   }            
            else { reject(false) }
         })
         .catch(err => {console.log(err) ;reject(false) })
    })
    },
    
module.exports.getInfo =  async  (id) => {
        return new Promise( async (resolve , reject) =>{
          var customers =   await Admin.findOne({ id : id});
            if(customers) resolve(customers)
            else reject({error : true , message : 'invalid Admin ID'})
        })
},

module.exports._getConfigValue = (section_id,field_id)  =>{
}