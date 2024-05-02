/*
 * @作者: kerwin
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CompanyStudentType = {
    "company": String,
    "employ_date": String,
    "salary": String,
    "studentname": String
}
//tag===>tags
const CompanyStudentModel = mongoose.model("companystudent",new Schema(CompanyStudentType))

module.exports = CompanyStudentModel