const express=require('express')
const User=require('../modals/user')
const router=express.Router()
router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    try{

        const token=await  User.matchpasswordAndGenerateToken(email,password)
        return res.cookie("token",token).redirect('/')
    }
    catch(error){
        return res.render('signin',{
            error:"incorrect email and spassword"

        })
    }

})

// router.post('signin',async(req,res)=>{
//     const {email,password}=req.body;
//     console.log(email,password);
//    const user=await  User.matchpassword(email,password)
//    console.log(user);
//    return res.redirect('/')

// })
router.post('/signup',async (req,res)=>{
    const {fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password
    })
 res.redirect('/')
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})
module.exports=router;
