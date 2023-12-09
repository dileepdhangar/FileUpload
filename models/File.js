const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");
const { configNodeMailer } = require("../config/nodemailer");


const fileSchema = new mongoose.Schema({
    name : {
        type: String, 
        required : true
    },
    ImageUrl : {
        type: String, 
    },
    tags : {
        type: String, 
    },
    email : {
        type: String, 
    },
})

fileSchema.post("save" , async (doc)=>{
    configNodeMailer(doc)
})


const File = mongoose.model("File" , fileSchema)
module.exports = File

 