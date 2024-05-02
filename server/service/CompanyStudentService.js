const CompanyStudentModel = require("../model/CompanyStudentModel")

/*
 * @作者: kerwin
 */
module.exports = {
    getList(){
        return CompanyStudentModel.find()
    },
    
    async addList(data){

        for(let i of data){
            await  CompanyStudentModel.findOneAndUpdate({
                studentname:i.studentname,
                company:i.company
            },{
                $set:i
            },{upsert:true})
        }

        return []
    } 
} 