/*
 * @作者: kerwin
 */
/*
 * @作者: kerwin
 */
var express = require("express")
var CompanyController = require("../controllers/CompanyController")
var CompanyRouter = express.Router()

CompanyRouter.get("/adminapi/companys",/*读取controller */CompanyController.getList)
CompanyRouter.post("/adminapi/companys",/*读取controller */CompanyController.addList)
//动态路由
CompanyRouter.put("/adminapi/companys/:id",CompanyController.updateList)

module.exports = CompanyRouter