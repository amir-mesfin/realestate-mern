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
    // unique:true,
  },
  avatar:{
    type:String,
    default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&psig=AOvVaw2lwkFcP0a131ONeLIEG6qx&ust=1754392404238000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiVxJKD8Y4DFQAAAAAdAAAAABAU"
  },
},{timestamps:true});

const User = mongoose.model("User",userSchema);

 export default User ;