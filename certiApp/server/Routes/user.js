import express from "express";
import bcrypt from "bcrypt";
import {User} from "../Model/model.js"; 
import jwt from "jsonwebtoken"
import { Certificate } from "../Model/model.js";

const userRoute = express.Router();

userRoute.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

userRoute.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "Enter a valid username" });
        }

        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        
        const token = jwt.sign(
            { username: user.username, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        
        res.cookie("authToken", token, { httpOnly: true });

        res.status(200).json({ msg: "Logged in successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


userRoute.post("/api/issue", async (req, res) => {
    try {
      const { course, certificateId, candidateName, grade, issueDate } = req.body;
  
      // Check if the certificate ID already exists
      const existingCertificate = await Certificate.findOne({ certificateId });
      if (existingCertificate) {
        return res.status(400).json({ msg: "Certificate ID already exists" });
      }
  
      // Create a new certificate
      const newCertificate = new Certificate({
        course,
        certificateId,
        candidateName,
        grade,
        issueDate,
      });
  
      await newCertificate.save();
      res.status(201).json({ msg: "Certificate issued successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  

  userRoute.get("/api/view/:certificateId", async (req, res) => {
    try {
      const { certificateId } = req.params;
      const certificate = await Certificate.findOne({ certificateId });
  
      if (!certificate) {
        return res.status(404).json({ msg: "Certificate not found" });
      }
  
      res.json(certificate);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });

export default userRoute;
