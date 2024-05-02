/*
 * @作者: kerwin
 */
/*
 * @作者: kerwin
 */
var express = require("express")
var CompanyStudentController = require("../controllers/CompanyStudentController")
var CompanyStudentRouter = express.Router()

CompanyStudentRouter.get("/adminapi/companystudents",/*读取controller */CompanyStudentController.getList)
CompanyStudentRouter.post("/adminapi/companystudents",/*读取controller */CompanyStudentController.addList)
//动态路由
// CompanyRouter.put("/adminapi/companys/:id",CompanyController.updateList)

module.exports = CompanyStudentRouter