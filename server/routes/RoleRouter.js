/*
 * @作者: kerwin
 */
var express = require("express")
var RoleController = require("../controllers/RoleController")
var RoleRouter = express.Router()

RoleRouter.get("/adminapi/roles",/*读取controller */RoleController.getList)
//动态路由
RoleRouter.put("/adminapi/roles/:id",RoleController.updateList)
RoleRouter.delete("/adminapi/roles/:id",RoleController.deleteList)

module.exports = RoleRouter