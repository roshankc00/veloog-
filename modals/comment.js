const mongoose=require('mongoose')
const commentSchema=mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",

    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{timesamps:true})


const Comment=mongoose.model('comment',commentSchema)
module.exports=Comment