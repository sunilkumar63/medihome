var bannerModel =  require('../banner');

module.exports = {
    saveBanner : async (data) =>{
        return new Promise(async  (resolve,reject) => {
        var banner = await new bannerModel(data).save()
        if(banner) resolve(true)
        else reject(false)           
    })
    } ,
    updateBanner : async (data) =>{
        return new Promise(async  (resolve,reject) => {
            var updateVals = {
                name : data.name,
                status : data.status
            }
            if(data.filename) updateVals.filename = data.filename
        var banner = await bannerModel.findOneAndUpdate( {id : data.id} , {$set :  updateVals } , { new : true} )
        if(banner) resolve(true)
        else reject(false)           
    })
    } ,
    getBanners : async (data) =>{
        return new Promise(async  (resolve,reject) => {
        bannerModel.find({status : true}).then( result => resolve(result) ).catch(error => reject(error))        
    })
    },
    getBanner : async (id) =>{
        return new Promise(async  (resolve,reject) => {
        bannerModel.find({id : id }).then( result => resolve(result) ).catch(error => reject(error))        
    })
    },
    removeBanner : async (id) =>{
        return new Promise(async  (resolve,reject) => {
        bannerModel.remove({id : id }).then( result => resolve(result) ).catch(error => reject(error))        
    })
    }
}