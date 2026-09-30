const mongoose = require("mongoose");
const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("GetTasks Error:", error);
    return res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { text, priority, status } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ message: "Task text is required" });
    }

    const validPriorities = ["low", "medium", "high"];
    const validStatuses = ["pending", "completed"];

    const taskData = {
      text: text.trim(),
      priority: priority && validPriorities.includes(priority.toLowerCase()) ? priority.toLowerCase() : "medium",
      status: status && validStatuses.includes(status.toLowerCase()) ? status.toLowerCase() : "pending",
      userId: req.userId,
    };

    const task = new Task(taskData);
    const savedTask = await task.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    console.error("CreateTask Error:", error);
    return res.status(500).json({ message: "Failed to create task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("DeleteTask Error:", error);
    return res.status(500).json({ message: "Failed to delete task" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    const validStatuses = ["pending", "completed"];
    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Status must be either 'pending' or 'completed'" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("UpdateStatus Error:", error);
    return res.status(500).json({ message: "Failed to update task status" });
  }
};

const updateTaskPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    const validPriorities = ["low", "medium", "high"];
    if (!priority || !validPriorities.includes(priority.toLowerCase())) {
      return res.status(400).json({ message: "Priority must be 'low', 'medium', or 'high'" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { priority: priority.toLowerCase() },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("UpdatePriority Error:", error);
    return res.status(500).json({ message: "Failed to update task priority" });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTaskPriority,
};

