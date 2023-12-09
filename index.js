import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://MrL1ght:misha0278@cluster0.rulbh.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('DB ok'))
.catch((err)=>console.log("DB error", err));

const app = express();

app.use(express.json());


app.post("/auth/register", (req, res) => {
    
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
