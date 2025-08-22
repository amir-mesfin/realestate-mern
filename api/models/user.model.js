import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  avatar:{
    type:String,
    default:"https://www.w3schools.com/howto/img_avatar.png"
  },
  role:{
    type:String,
    require:true,
    default:'user'
  },
  sellerRequest:{
    type:Boolean,
    require:true,
    default:false,
  }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

 export default User ;