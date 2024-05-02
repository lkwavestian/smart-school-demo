const CompanyStudentService = require("../service/CompanyStudentService")

/*
 * @作者: kerwin
 */
module.exports = {
    async getList(req, res) {
        var result = await CompanyStudentService.getList()
        res.send(result)
    },
    
    async addList(req, res) {
        var result = await CompanyStudentService.addList(req.body)
        res.send(result)
    }
    
}