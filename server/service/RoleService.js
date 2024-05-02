const RoleModel = require("../model/RoleModel")

/*
 * @作者: kerwin
 */
module.exports = {
    getList(){
        return RoleModel.find()
    },
    updateList(id,{roleName,rights}){
        return RoleModel.findByIdAndUpdate(id,{
            roleName,
            rights
        })
    },
    deleteList(id){
        return RoleModel.findByIdAndDelete(id)
    }
    
}