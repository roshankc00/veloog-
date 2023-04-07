const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookiename){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookiename]
        if(!tokenCookieValue){
           return  next()
        }
        try{

            const userPlayload=validateToken(tokenCookieValue)
            req.user=userPlayload
        }
        catch(error){ }
       return  next();

    }
}
module.exports={
    checkForAuthenticationCookie,
}