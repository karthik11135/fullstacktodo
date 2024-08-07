const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Todo, UserTodos } = require("../models/schemas");
const authMiddleware = require("../middleware/helper");

const todoZodSchema = z.object({
  title: z.string(),
  description: z.string(),
});

router.get("/todos", authMiddleware, async (req, res, next) => {
  const username = req.user;
  console.log("reached here");
  try {
    const user = await User.findOne({ username });
    const userTodos = await UserTodos.findOne({ user_id: user._id });
    console.log(userTodos);
    let todos = [];
    if (userTodos === null) res.status(200).json({ todos, msg: "something" });
    for (let i = 0; i < userTodos.todos_list.length; i++) {
      const todo = await Todo.findOne({ _id: userTodos.todos_list[i] });
      todos.push(todo);
    }
    res.status(200).json({ todos, msg: "someh" });
  } catch (err) {
    console.log("bad");
    res.status(400).send();
  }
});

router.post("/todo", authMiddleware, async (req, res, next) => {
  const bodyTodo = req.body;
  const username = req.user;

  const check = todoZodSchema.safeParse(bodyTodo);
  if (!check.success) {
    res.status(400).send("zod gone");
    return;
  }
  try {
    const user = await User.findOne({ username });
    const todo = await Todo.create(bodyTodo);

    const updateForUser = await UserTodos.findOneAndUpdate(
      { user_id: user._id },
      { $push: { todos_list: todo._id } }
    );

    if (updateForUser === null) {
      const created = await UserTodos.create({
        user_id: user._id,
        todos_list: [todo._id],
      });
      console.log(created);
    }
    res.status(200).send("Done success");
  } catch (err) {
    res.status(400).send("gone buddy");
  }
});

router.post("/update/:todoId", authMiddleware, async (req, res) => {
  const updatedTodo = req.body;
  const check = todoZodSchema.safeParse(updatedTodo);
  if (!check.success) res.status(400);
  const todoId = req.params.todoId;
  try {
    const updated = await Todo.findOneAndUpdate({ _id: todoId }, updatedTodo);
    res.status(200).json({ msg: "Updated" });
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

router.get("/delete/:todoId", authMiddleware, async (req, res) => {
  const username = req.user;
  const todoId = req.params.todoId;

  try {
    const user = await User.findOne({ username });
    const deleteTodo = await Todo.deleteOne({ _id: todoId });
    const userTodos = await UserTodos.findOne({ user_id: user._id });

    const updatedTodoList = userTodos.todos_list.filter(
      (userTodoId) => userTodoId != todoId
    );

    userTodos.todos_list = updatedTodoList;
    userTodos.save();

    res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    res.status(400).send("something went wrong!!!");
  }
});

module.exports = router;
