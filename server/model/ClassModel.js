/*
 * @作者: kerwin
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClassType = {
    "title": String,
    "number": Number
}
//tag===>tags
const ClassModel = mongoose.model("class",new Schema(ClassType))

module.exports = ClassModel