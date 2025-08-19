import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import router from "./routes/mindmap.routes.js";
dotenv.config();

const app=express()
const server=http.createServer(app);
const io=new Server(server,{
  cors:{
    origin:"http://localhost:5137",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

app.use("/",router)

// Socket.io for real-time collaboration
io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('join-mindmap', (mindmapId) => {
    socket.join(mindmapId);
  });
  
  socket.on('mindmap-update', (data) => {
    socket.to(data.mindmapId).emit('mindmap-updated', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected to mongoDB")).catch((err)=>console.log("mongoDB connection error",err))

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>console.log(`server running on port ${PORT}`))