const express = require("express")
const router = express.Router();
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require("../controllers/FileUpload")

//api routes
router.post("/localFileUpload",  localFileUpload);
router.post("/imageUpload",  imageUpload);
router.post("/videoUpload",  videoUpload);
router.post("/imageSizeReducer",  imageSizeReducer);


//bhaiya yaha se export ho raha hai
module.exports = router