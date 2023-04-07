const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: "/images/user.webp",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
  .update(user.password)
  .digest('hex') 
console.log('salt');
  this.salt=salt;
  this.password=hashedPassword

  next();
});

// virtual function of the mongoose 
userSchema.static('matchpasswordAndGenerateToken',async function(email,password){
    const user=await User.findOne({email})
    console.log(user);
    if (!user){
  throw new Error('No user found  ');
} 
const salt=user.salt
const hashedPassword=user.password
const userProvdedHash=createHmac('sha256',salt)
.update(password)
.digest('hex')
if (hashedPassword!=userProvdedHash) {
    
        throw new Error('incorrected password');
    } 
    else{
        
        // return {...user,password:undefined,salt:undefined} 
        const token =createTokenForUser(user)
        return token
    }
})

const User = mongoose.model("user", userSchema);
module.exports=User
