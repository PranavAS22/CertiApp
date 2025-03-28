import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export  {User}

const certificateSchema = new mongoose.Schema({
    course: { type: String, required: true },
    certificateId: { type: String, required: true, unique: true },
    candidateName: { type: String, required: true },
    grade: { type: String, required: true },
    issueDate: { type: Date, required: true },
  });
  
  const Certificate = mongoose.model("Certificate", certificateSchema);
  
export  {Certificate}




