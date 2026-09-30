const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTaskPriority,
} = require("../controllers/taskController");

// All task routes are protected by authMiddleware
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.patch("/:id/status", updateTaskStatus);
router.patch("/:id/priority", updateTaskPriority);

module.exports = router;
