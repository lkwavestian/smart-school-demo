const StudentService = require("../service/StudentService")
const JWT = require("../util/JWT")

/*
 * @作者: kerwin
 */
module.exports = {
    async getList(req, res) {
        var result = await StudentService.getList()
        res.send(result)
    },
    
    async addList(req, res) {
        // console.log(req.body)
        var result = await StudentService.addList(req.body)
        res.send(result)
    },
    async updateList(req, res) {
        // console.log(req.body)
        var result = await StudentService.updateList(req.params.id,req.body)
        res.send(result)
    },
   
    async deleteList (req,res){
        var result = await StudentService.deleteList(req.params.id)
        res.send(result)
    },
    async login(req,res){
        var result = await StudentService.login(req.body)
        if (result.length) {
            let { _id, studentname,introduction,avatarUrl,gender } = result[0]
            
            const token  =JWT.generate({
                _id,
                username:studentname
            },"1d")
            res.header("Authorization",token)

            res.send({
                ActionType: "OK",
                data: { _id, username:studentname,
                    introduction,avatarUrl,gender,
                   "role": {
                        "roleName": "学生",
                        "roleType": 3,
                        "rights": [
                            "/index",
                            "/center",
                            "/interview-manage",
                            "/interview-manage/companylist",
                            "/interview-manage/companydata",
                            "/student-manage",
                            "/student-manage/studentlist",
                        ]
                    }
                
                }
            })
        } else {
            res.status(400).send({
                ActionType: "fail"
            })
        }
    },
    async upload(req,res){
        var result = await StudentService.upload(req.params.id,req.file,req.body)
        res.send(result)
    }
}