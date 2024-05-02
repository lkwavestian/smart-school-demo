/*
 * @作者: kerwin
 */
var express = require("express")
var ClassController = require("../controllers/ClassController")
var ClassRouter = express.Router()

ClassRouter.get("/adminapi/classes",/*读取controller */ClassController.getList)
ClassRouter.post("/adminapi/classes",/*读取controller */ClassController.addList)
//动态路由
// ClassRouter.put("/adminapi/classes/:id",ClassController.updateList)
ClassRouter.delete("/adminapi/classes/:id",ClassController.deleteList)

module.exports = ClassRouter