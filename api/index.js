const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const Post = require("./models/post");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'uploads/' });4
const fs = require("fs");

const app = express();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads",express.static(__dirname + "/uploads"))

const salt = bcrypt.genSaltSync(10);
const secret = "vgvhbs3def5gdxd3gt6cee23frtgdw";

mongoose.connect("mongodb+srv://MERN_BLOG:P505gu4xyKdxxKU3@cluster0.jjkdpmb.mongodb.net/?retryWrites=true&w=majority")

app.post("/register",async (req,res)=>{
   const {username,password} = req.body;
   try{
      const UserDoc = await User.create({username,
         password: bcrypt.hashSync(password,salt)
      })
      res.json(UserDoc);
   }catch(e){
      console.log(e);
      res.status(400).json(e);
   }
  
});
app.post("/login", async (req,res)=>{
   const {username,password} = req.body;
   const userDoc = await User.findOne({username:username});
   const passOk = bcrypt.compareSync(password,userDoc.password);
   if(passOk){
      jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
          if(err) throw err;
         res.cookie("token",token).json({
            username,
            id:userDoc._id
         });
         })
   }else{
      res.status(400).json("wrong credentials");
   }
});
app.get("/profile",(req,res)=>{
   const{token} = req.cookies;
   jwt.verify(token,secret,{},(err,info)=>{
      if(err) throw err;
      res.json(info);
   });
});
app.post("/logout",(req,res)=>{
    res.cookie("token","").json("logged out");
});
app.put("/compose",uploadMiddleware.single('file'),async(req,res)=>{
   let newPath = null;
   if(req.file){
      const {originalname,path} = req.file;
      const part = originalname.split(".");
      const ext = part[part.length - 1];
      newPath = path+"."+ext;
      fs.renameSync(path,newPath);
     }
     const{token} = req.cookies;
   jwt.verify(token,secret,{},async (err,info)=>{
      if(err) throw err;
      const{id,title,summary,content} = req.body;
      const doc = await Post.findById(id);
      const isAuthor = JSON.stringify(doc.author) === JSON.stringify(info.id);
      if(isAuthor){
         const postDoc = await Post.findByIdAndUpdate(id,{
            title:title,
            summary:summary,
            content:content,
            cover:newPath?newPath : doc.cover,
           });
           res.json(postDoc);
      }else{
         return res.status(400).json("not the author");
         
      }
         /*const postDoc = await Post.findByIdAndUpdate(id,{
            title:title,
            summary:summary,
            content:content,
            cover:newPath,
            author:info.id
           });
           res.json(postDoc);*/
   });
});
app.post("/compose",uploadMiddleware.single('file'),async (req,res)=>{
  
  const {originalname,path} = req.file;
  const part = originalname.split(".");
  const ext = part[part.length - 1];
  const newPath = path+"."+ext;
  fs.renameSync(path,newPath);

  const{token} = req.cookies;
   jwt.verify(token,secret,{},async (err,info)=>{
      if(err) throw err;
      const{title,summary,content} = req.body;
         const postDoc = await Post.create({
            title:title,
            summary:summary,
            content:content,
            cover:newPath,
            author:info.id
           });
           res.json(postDoc);
   });
});
app.get("/post/:id",async(req,res) =>{
    const {id} = req.params;
   const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
});

app.get("/compose",async (req,res)=>{
   
     res.json(await Post.find()
     .populate("author",["username"])
     .sort({createdAt:-1})
     .limit(10)
     );
});
app.listen(4000);
//P505gu4xyKdxxKU3
//mongodb+srv://MERN_BLOG:P505gu4xyKdxxKU3@cluster0.jjkdpmb.mongodb.net/?retryWrites=true&w=majority