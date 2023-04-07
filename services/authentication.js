const JWT=require('jsonwebtoken')
const secreat='$uperman@123'

function createTokenForUser(user){
    const payload={
        _id:user._id,
        name:user.fullName,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role

    }
const token =JWT.sign(payload,secreat);
return token
}
function validateToken(token){
    const payload=JWT.verify(token,secreat)
    return payload 
}
module.exports={
    createTokenForUser,
    validateToken,
}