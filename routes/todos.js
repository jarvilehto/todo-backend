const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get all todos that are not completed
router.get("/wip", async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all todos that are completed
router.get("/completed", async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Cannot find todo" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create one todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update one todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.description) {
      todo.description = req.body.description;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Complete todo by setting completed to true and setting completedAt
router.patch("/complete/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = true;
    todo.completedAt = Date.now();
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    await todo.deleteOne();
    res.json({ message: "Deleted Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
