/*
 * @作者: kerwin
 */
var express = require("express")
var StudentController = require("../controllers/StudentController")
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

var StudentRouter = express.Router()

StudentRouter.get("/adminapi/students",/*读取controller */StudentController.getList)
StudentRouter.post("/adminapi/students",/*读取controller */StudentController.addList)
StudentRouter.post("/adminapi/students/login",/*读取controller */StudentController.login)
//动态路由
StudentRouter.put("/adminapi/students/:id",StudentController.updateList)
StudentRouter.post("/adminapi/students/:id/upload",upload.single('file'),StudentController.upload)
StudentRouter.delete("/adminapi/students/:id",StudentController.deleteList)

module.exports = StudentRouter