const TagModel = require("../model/TagModel")

/*
 * @作者: kerwin
 */
module.exports = {
    getList(){
        return TagModel.find().sort({grade:1}) //排序
    },
    
    addList(data){
        return TagModel.create(data)
    },
    updateList(id,data){
        return TagModel.findByIdAndUpdate(id,data)
    },
    deleteList(id){
        return TagModel.findByIdAndDelete(id)
    }
    
}