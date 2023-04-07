require('dotenv').config();
const express=require('express')
const path=require('path')
const userRoute=require('./routes/user')
const blogRoute=require('./routes/blog')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const Blog = require('./modals/blogs')
const app=express()
const databaseURI=process.env.DATABASE_URL
const PORT=process.env.PORT ;
// connecting to the mongoose 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected");
})


// setting up the view engine
app.set('view engine','ejs')
app.set("views",path.resolve('./views'))

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(path.resolve('./public')))
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))
// all routes 
app.get('/',async(req,res)=>{
  const allBlogs=await Blog.find({});
  console.log(allBlogs);
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
})
app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(PORT,()=>{
    console.log(`running at the port   ${PORT}`);
})