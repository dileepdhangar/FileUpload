const { config } = require("dotenv");
const nodemailer = require("nodemailer");
config()

exports.configNodeMailer =async (doc)=>{
    try {
        console.log("DOC", doc)
        
        //transporter
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
               
            }
        })

        //Mail send krna hai
        let info = await transporter.sendMail({
            from : `Praveen`,
            to: doc.email,
            subject : "New FIle Uploaded on Cloudinary",
            html : `<h1>Hello bhai file uppload ho chuki hai</h1> <p>View Here : <a href="${doc.ImageUrl}">"${doc.ImageUrl}<a/></p>`
        })

        console.log("INFO",info);

    } catch (error) {
        console.error(error)
    }
}