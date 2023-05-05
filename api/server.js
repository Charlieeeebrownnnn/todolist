const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const connectDB = require("./db");

require('dotenv').config()

app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);


connectDB();


  const Todo=require('./models/Todo')
  app.get('/todos',async(req,res)=>{
    const todos=await Todo.find();

    res.json(todos);
  })
app.post('/todo/new',(req,res)=>{
    const todo=new Todo({
            text:req.body.text
    });
    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id',async(req,res)=>{
        const result=await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})


app.get('/todo/complete/:id',async(req,res)=>{

    const todo=await Todo.findById(req.params.id);

    todo.complete =! todo.complete;

    todo.save();
    res.json(todo);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
