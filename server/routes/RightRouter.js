/*
 * @作者: kerwin
 */
var express = require("express")
var RightController = require("../controllers/RightController")
var RightRouter = express.Router()

RightRouter.get("/adminapi/rights",/*读取controller */RightController.getList)
RightRouter.put("/adminapi/rights",RightController.updateList)
RightRouter.delete("/adminapi/rights",RightController.deleteList)

module.exports = RightRouter