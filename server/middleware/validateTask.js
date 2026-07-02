export const validateTask = (req, res, next) => {
  const { title, category, priority, status } = req.body;

  if (title !== undefined && title.trim() === '') {
    res.status(400);
    throw new Error('Task title cannot be empty');
  }

  const validCategories = ['Work', 'Study', 'Personal', 'Health', 'Shopping', 'Others', 'Design', 'Development', 'Research', 'Marketing', 'Ops'];
  if (category && !validCategories.includes(category)) {
    res.status(400);
    throw new Error('Invalid category');
  }

  const validPriorities = ['high', 'medium', 'low'];
  if (priority && !validPriorities.includes(priority)) {
    res.status(400);
    throw new Error('Invalid priority');
  }

  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (status && !validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  next();
};
