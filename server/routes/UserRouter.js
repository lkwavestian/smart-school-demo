/*
 * @作者: kerwin
 */
var express = require("express")
var UserController = require("../controllers/UserController")
var UserRouter = express.Router()

UserRouter.get("/adminapi/users",/*读取controller */UserController.getList)
UserRouter.post("/adminapi/users/login",/*读取controller */UserController.login)
UserRouter.post("/adminapi/users",/*读取controller */UserController.addList)
//动态路由
UserRouter.put("/adminapi/users/:id",UserController.updateList)
UserRouter.delete("/adminapi/users/:id",UserController.deleteList)

module.exports = UserRouter