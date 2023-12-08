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
