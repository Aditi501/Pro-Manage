const Task = require('../model/task');
const User=require('../model/user');

 const createTask = async (req, res) => {
  const { title, priority, dueDate, checklist, assignedTo } = req.body;
  const createdBy = req.userId;

  try {
    const task = new Task({ title, priority, dueDate, checklist, createdBy, assignedTo });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  const userId = req.userId;
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: userId },
        { assignedTo: userId }
      ]
    });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task updated successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task status updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const shareTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task shared successfully' },task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const filterTasks = async (req, res) => {
  const { filter } = req.query;
  const userEmail = req.email;
  try {
    let tasks;
    const today = new Date();
    let startDate, endDate;
    console.log("User Email:", userEmail); 
    switch (filter) {
      case 'today':
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
        tasks = await Task.find({
          $or: [
            { createdBy: req.userId, assignedTo: userEmail , createdAt: { $gte: startDate, $lt: endDate }},
            { createdBy: req.userId, createdAt: { $gte: startDate, $lt: endDate } },
            { assignedTo: userEmail, createdAt: { $gte: startDate, $lt: endDate } }
          ]
        });
        break;
      case 'this_week':
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        tasks = await Task.find({
          $or: [
            { createdBy: req.userId, assignedTo: userEmail, createdAt: { $gte: startDate, $lt: endDate } },
            { createdBy: req.userId, createdAt: { $gte: startDate, $lt: endDate } },
            { assignedTo: userEmail, createdAt: { $gte: startDate, $lt: endDate } }
          ]
        });
        break;
      case 'this_month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        tasks = await Task.find({
          $or: [
            { createdBy: req.userId, assignedTo: userEmail, createdAt: { $gte: startDate, $lt: endDate }},
            { createdBy: req.userId, createdAt: { $gte: startDate, $lt: endDate } },
            { assignedTo: userEmail, createdAt: { $gte: startDate, $lt: endDate } }
          ]
        });
        break;
      default:
        tasks = await Task.find({ $or: [{ createdBy: req.userId }, { assignedTo: userEmail }] });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getTaskCounts = async (req, res) => {
  const userEmail = req.email; 

  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.userId },
        { assignedTo: userEmail }
      ]
    });

    let backlogCount = 0;
    let todoCount = 0;
    let inProgressCount = 0;
    let doneCount = 0;

    let highPriorityCount = 0;
    let mediumPriorityCount = 0;
    let lowPriorityCount = 0;

    let dueDateCount = 0;

    const updateCounters = (task) => {
      const status = task.status;
      const priority = task.priority;
      const hasDueDate = task.dueDate;

      switch (status) {
        case 'backlog':
          backlogCount++;
          break;
        case 'todo':
          todoCount++;
          break;
        case 'in-progress':
          inProgressCount++;
          break;
        case 'done':
          doneCount++;
          break;
        default:
          break;
      }

      switch (priority) {
        case 'High Priority':
          highPriorityCount++;
          break;
        case 'Medium Priority':
          mediumPriorityCount++;
          break;
        case 'Low Priority':
          lowPriorityCount++;
          break;
        default:
          break;
      }

      if (hasDueDate) {
        dueDateCount++;
      }
    };

    tasks.forEach(task => updateCounters(task));

    const result = {
      backlogTasks: backlogCount,
      todoTasks: todoCount,
      inProgressTasks: inProgressCount,
      completedTasks: doneCount,
      highPriority: highPriorityCount,
      moderatePriority: mediumPriorityCount,
      lowPriority: lowPriorityCount,
      dueDateTasks: dueDateCount
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={createTask,getTask,updateTask,deleteTask,shareTask,filterTasks,getTasks,updateTaskStatus,getTaskCounts}