const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req , res) => {
     
    try {
    
     const file = req.files.file;
     console.log("FILE aagayi JEE" , file)
     
     
     let path = __dirname + "/files/" + Date.now() + `${file.name.split('.')[1]}`;
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

function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file , folder ,quality){
    const options = {folder}
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto" 
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req , res)=>{
   
    try {
      
        const { name , tags , email} = req.body;
        console.log( name , tags , email)

        const file = req.files.imageFile;
        console.log(file)

        //Validation
        const supportedTypes = ["jpg" , "jpeg","png"]
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType)

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false, 
                message : "File Format Not Supported"
            })
        }

        //if file format Supported
        const response = await uploadFileToCloudinary(file , "MyData");
        console.log(response)

        //db mein entry krte hai
        const filedata = await File.create({  
           name ,
           tags , 
           email , 
           ImageUrl : response.secure_url
        })

        res.json({
            success : true, 
            imageUrl :  response.secure_url,
            message : "Image Succesfully Uploaded"
        })

    } 
    catch (error) {
       console.error(error);
       res.status(400).json({
        success : false, 
        message : "Something went wrong"
       })    
    }
}


exports.videoUpload = async (req ,res)=>{
    try {
    
        
        const { name , tags , email} = req.body;
        console.log( name , tags , email)

        const file = req.files.videoFile;
        console.log(file)

        // Validation
        const supportedTypes = ["mp4","mov"]
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType)

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false, 
                message : "File Format Not Supported"
            })
        }
         
        // Uploading To Mydata Folder
        const response = await uploadFileToCloudinary(file , "MyData");
        console.log(response)


          //db mein entry krte hai
          const filedata = await File.create({  
            name ,
            tags , 
            email , 
            ImageUrl : response.secure_url
         })
 
         res.json({
             success : true, 
             videoUrl :  response.secure_url,
             message : "Video Succesfully Uploaded"
         })



    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : true,
            message : "Something went wrong"
        })
    }
}


exports.imageSizeReducer =async (req , res)=>{
    
   
    try {
      
        const { name , tags , email} = req.body;
        console.log( name , tags , email)

        const file = req.files.imageFile;
        console.log(file)

        //Validation
        const supportedTypes = ["jpg" , "jpeg","png"]
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType)

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false, 
                message : "File Format Not Supported"
            })
        }

        //if file format Supported
        const response = await uploadFileToCloudinary(file , "MyData", 90 );
        console.log(response)

        //db mein entry krte hai
        const filedata = await File.create({  
           name ,
           tags , 
           email , 
           ImageUrl : response.secure_url
        })

        res.json({
            success : true, 
            imageUrl :  response.secure_url,
            message : "Image Succesfully Uploaded"
        })

    } 
    catch (error) {
       console.error(error);
       res.status(400).json({
        success : false, 
        message : "Something went wrong"
       })    
    }

}