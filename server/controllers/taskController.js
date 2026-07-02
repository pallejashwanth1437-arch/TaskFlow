import Task from '../models/Task.js';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res, next) => {
  try {
    const { title, description, category, priority, status, dueDate, isPinned } = req.body;
    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }
    const task = await Task.create({
      title,
      description,
      category,
      priority,
      status,
      dueDate,
      isPinned
    });
    res.status(201).json({ success: true, message: 'Task created successfully', data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: 'Task updated successfully', data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    await task.deleteOne();
    res.status(200).json({ success: true, message: 'Task deleted successfully', data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
// @access  Public
export const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400);
      throw new Error('Status is required');
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    task.status = status;
    const updatedTask = await task.save();
    res.status(200).json({ success: true, message: 'Task status updated', data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task pin state
// @route   PATCH /api/tasks/:id/pin
// @access  Public
export const updateTaskPin = async (req, res, next) => {
  try {
    const { isPinned } = req.body;
    if (isPinned === undefined) {
      res.status(400);
      throw new Error('isPinned boolean is required');
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    task.isPinned = isPinned;
    const updatedTask = await task.save();
    res.status(200).json({ success: true, message: 'Task pin state updated', data: updatedTask });
  } catch (error) {
    next(error);
  }
};
