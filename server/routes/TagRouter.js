/*
 * @作者: kerwin
 */
var express = require("express")
var TagController = require("../controllers/TagController")
var TagRouter = express.Router()

TagRouter.get("/adminapi/tags",/*读取controller */TagController.getList)
TagRouter.post("/adminapi/tags",/*读取controller */TagController.addList)
//动态路由
TagRouter.put("/adminapi/tags/:id",TagController.updateList)
TagRouter.delete("/adminapi/tags/:id",TagController.deleteList)

module.exports = TagRouter