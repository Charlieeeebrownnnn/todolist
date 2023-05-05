const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

  const Todo=require('./models/Todo')
/* 套用schema */
  app.get('/todos',async(req,res)=>{
    const todos=await Todo.find();

    res.json(todos);
  })
/* 設定回饋為find 顯示全部的資料 */
app.post('/todo/new',(req,res)=>{
    const todo=new Todo({
            text:req.body.text
    });
    todo.save();
    res.json(todo);
});
/* post 就是顯示新的資料 不用特別設定其他狀態 因為預設就是true 等等*/

app.delete('/todo/delete/:id',async(req,res)=>{
        const result=await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})
/* delete 是用 id 而且用 async  */


app.get('/todo/complete/:id',async(req,res)=>{

    const todo=await Todo.findById(req.params.id);

    todo.complete=!todo.complete;

    todo.save();
    res.json(todo);
})
/* 搞懂promise 到底要怎麼用 */

app.listen(3001, () => console.log("Server started on port 3001"));
