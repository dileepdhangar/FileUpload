const File = require("../models/File");

exports.localFileUpload = async (req , res) => {
     
    try {
    
     const file = req.files.file;
     console.log("FILE aagayi JEE" , file)
     
     
     let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
     console.log("PATH->", path)

     file.mv(path , (error)=>{
        console.log(error)
     })

     res.json({
        success : true,
        message : "Local file Uploaded SuccesFully"
     })

    } catch (error) {
        
        console.log((error))
    }
}