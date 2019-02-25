var Model =  require('../pages');

module.exports = {
    save : async (data) =>{
        return new Promise(async  (resolve,reject) => {
        var item = await new Model(data).save()
        if(item) resolve(true)
        else reject(false)           
    })
    } ,
    update : async (data) =>{
        return new Promise(async  (resolve,reject) => {
            var name = data.name;
            console.log("url key ",name.replace(/[\. ,:-]+/g, "-"))
            var updateVals = {
                name : data.name,
                status : data.status,
                content : data.content,
                url_key : name.toLowerCase().replace(/[\. ,:-]+/g, "-")
            }
         if(data.filename) updateVals.filename = data.filename
        var saved = await Model.findOneAndUpdate( {id : data.id} , {$set :  updateVals } , { new : true} )
        if(saved) resolve(true)
        else reject(false)           
    })
    } ,
    fetchAll : async (data) =>{
        var front = data.front;
        return new Promise(async  (resolve,reject) => {
            if(front)
                Model.find({status : true}).then( result => resolve(result) ).catch(error => reject(error))        
            else
                Model.find().then( result => resolve(result) ).catch(error => reject(error))        
    })
    },
    fetch : async (id) =>{
        return new Promise(async  (resolve,reject) => {
        var data =  await Model.findOne({id : id});
        if(data){
            resolve(data)
        }
    })
    },
    getByUrlKey : async (url_key) =>{
        return new Promise(async  (resolve,reject) => {
        var data =  await Model.findOne({url_key : url_key , status : true});
        if(data){
            resolve(data)
        }
    })
    },
    remove : async (id) =>{
        return new Promise(async  (resolve,reject) => {
        Model.remove({id : id }).then( result => resolve(result) ).catch(error => reject(error))        
    })
    }
}