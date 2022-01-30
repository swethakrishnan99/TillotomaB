const mongoose = require('mongoose')
const schema = mongoose.Schema



const filesSchema = schema({
    driveId: {
        required: "Id is required",
        type: String
    },
    mimeType:{
        required:"MimeType Is Required",
        type:String
    }
    
    // ,facultyId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'faculties'
    // }
   
})

module.exports = mongoose.model("file", filesSchema)