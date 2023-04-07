 const mongoose=require('mongoose')
 const blogSchema=mongoose.Schema({
    title:{
        type:String, 
        required:true,   
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURl:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'


    }
 },{timestamps:true})

 const Blog=mongoose.model('blogs',blogSchema)

 module.exports=Blog;