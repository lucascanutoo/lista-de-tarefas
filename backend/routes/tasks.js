const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET todas as tarefas
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.completed === "true") filter.completed = true;
  if (req.query.completed === "false") filter.completed = false;

  const tasks = await Task.find(filter);
  res.json(tasks);
});

// POST nova tarefa
router.post("/", async (req, res) => {
  const task = await Task.create({ title: req.body.title });
  res.status(201).json(task);
});

// PUT editar tarefa
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE tarefa
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;