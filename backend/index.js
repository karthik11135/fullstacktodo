const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const todoRouter = require('./routes/todo')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb+srv://karthikrk11135:Password11135@cluster0.ms9l4mj.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0')

app.use(bodyParser.json())
app.use(cors())

app.use(authRouter);
app.use(todoRouter)

app.use((err, req, res, next) => {
  console.log("Something went wrong", err);
  res.status(400).send();
});

app.listen(3000, () => {
  console.log("PORT OPENED");
});
