const CompanyModel = require("../model/CompanyModel")

/*
 * @作者: kerwin
 */
module.exports = {
    getList(){
        return CompanyModel.find()
    },
    
    async addList(data){

        for(let i of data){
            await  CompanyModel.findOneAndUpdate({
                title:i.title
            },{
                $set:i
            },{upsert:true})
        }

        return []
    } ,

    updateList(id,data){
        return CompanyModel.findByIdAndUpdate(id,data)
    }
} 