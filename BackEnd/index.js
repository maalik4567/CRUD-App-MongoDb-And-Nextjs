import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import cors

const app = express()
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors()); // Use cors middleware
app.use(express.json()); // Parse JSON bodies

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database is Connected");
    app.listen(PORT,()=>{
        console.log(`Server is Running on PORT ${PORT}`);
    })
})

const UserSchema = new mongoose.Schema({
    STDID: Number,
    Name:String,
    CGPA:Number,
    Semester:Number
})

const UserModel = mongoose.model("users",UserSchema);

app.get("/getUsers",async(req,res)=>{
    const userData = await UserModel.find();
    res.json(userData);
})

app.post("/insertUser",async(req,res)=>{
    try {
        const { studentId, name, cgpa, semester } = req.body;
        const newUser = new UserModel({ STDID: studentId, Name: name, CGPA: cgpa, Semester: semester });
        await newUser.save();
        res.status(201).json({ message: "User inserted successfully" });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: "Failed to insert user" });
    }
})

app.put('/updateUser/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, CGPA, Semester } = req.body;
      const updatedUser = await UserModel.findOneAndUpdate({ STDID: id }, { Name, CGPA, Semester }, { new: true });
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  });
  
  app.delete('/deleteUser/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await UserModel.findOneAndDelete({ STDID: id });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
});