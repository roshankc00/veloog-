const express=require('express')
const router=express.Router()
const path =require('path')
const multer=require('multer')
const Blog = require('../modals/blogs')
const Comment = require('../modals/comment')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.originalname}`
    cb(null,fileName)
    }
  })
  
const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addBlogs',{

        user:req.user
    })
})
router.get('/:id',async(req,res)=>{
  const blog=await Blog.findById(req.params.id).populate('createdBy')
  const comments=await Comment.find({blogID:req.params.id}).populate("createdBy")
  console.log(comments ,"okie");
  return res.render('blog',{
    user:req.user,
    blog,
    comments,
    
  })
})
router.post('/comment/:blogId',async (req,res)=>{
  const comment= await Comment.create({
    content:req.body.content,
    blogID:req.params.blogId,
    createdBy:req.user._id
  })
res.redirect(`blog/${req.params.blogId}`)

})

router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body}=req.body
   const blog =await Blog.create({
    title,
    body,
    coverImageURl:`/uploads/${req.file.filename}`,
    createdBy:req.user._id,

   })
    res.redirect(`/blog/${blog._id}`)
})
module.exports=router

