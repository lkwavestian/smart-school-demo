/*
 * @作者: kerwin
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RoleType = {
    "roleName": String,
    "roleType": Number,
    "rights": Array
}
//right===>rights
const RoleModel = mongoose.model("role",new Schema(RoleType))

module.exports = RoleModel