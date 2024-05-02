const RightModel = require("../model/RightModel")

/*
 * @作者: kerwin
 */
module.exports = {
    getList(){
        return RightModel.find()
    },
    updateList({data,title}){
        // console.log(data)
        if(data._id){
            return RightModel.findOneAndUpdate({_id:data._id},{
                "$set":{
                    title:title
                }
            })
        }else{
            return RightModel.findOneAndUpdate({
                "children.path":data.path
            },{
                "$set":{
                    "children.$.title":title
                }
            })
        }
    },
    deleteList(item){
        // console.log(item)
        if(item._id){
            return RightModel.findOneAndDelete({"_id":item._id})
        }else{
            return RightModel.findOneAndUpdate(
                {
                    "children.path":item.path
                },
                {
                    "$pull":{"children":{path:item.path}}
                }
            )
        }
    }
}