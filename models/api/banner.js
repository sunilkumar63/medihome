var bannerModel =  require('../banner');

module.exports = {
    saveBanner : async (data) =>{
        return new Promise(async  (resolve,reject) => {
        var banner = await new bannerModel(data).save()
        if(banner) resolve(true)
        else reject(false)           
    })
    }
}