const StudentModel = require("../model/StudentModel")

/*
 * @作者: kerwin
 */
module.exports = {
    getList(){
        return StudentModel.find().populate("class")

        // return StudentModel.aggregate([
        //     {
        //         "$lookup":{
        //             "from":"classes",
        //             "localField":"class",
        //             "foreignField":"_id",
        //             "as":"kerwinmatch"
        //         }
        //     }
        // ])
    },
    
    async addList(data){
        const list = data.list.map(item=>({
            studentname:item.studentname,
            class:data.class,
            score:{},
            password:"123"
        }))

        for(let i of list){
            await StudentModel.updateOne({
                studentname:i.studentname
            },{
                $set:i
            },{
                upsert:true
            })
        }
        
        // console.log(list)
        return []
    },

    updateList(id,{key,value}){
        return StudentModel.findByIdAndUpdate(id,{
            "$set":{
                ["score."+key]:value
            }
        })
    },
   
    deleteList(id){
        return StudentModel.deleteMany({
            class:id
        })
    },
    login(data){
        return StudentModel.find(data)
    },
    upload(id,file,body){
       if(file){
        return StudentModel.findByIdAndUpdate(id,{
            ...body,
            studentname:body.username,
            avatarUrl:`/uploads/${file.filename}`
        },{returnDocument:"after"})
       }else{
        return StudentModel.findByIdAndUpdate(id,{
            ...body,
            studentname:body.username
        },{returnDocument:"after"})
       }
    }
}