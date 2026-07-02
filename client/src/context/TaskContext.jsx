import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/tasks');
      setTasks(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    const res = await api.post('/tasks', taskData);
    setTasks([res.data.data, ...tasks]);
    return res.data.data;
  };

  const updateTask = async (id, taskData) => {
    const res = await api.put(`/tasks/${id}`, taskData);
    setTasks(tasks.map(t => t._id === id ? res.data.data : t));
    return res.data.data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const updateStatus = async (id, status) => {
    const res = await api.patch(`/tasks/${id}/status`, { status });
    setTasks(tasks.map(t => t._id === id ? res.data.data : t));
  };

  const updatePin = async (id, isPinned) => {
    const res = await api.patch(`/tasks/${id}/pin`, { isPinned });
    setTasks(tasks.map(t => t._id === id ? res.data.data : t));
  };

  return (
    <TaskContext.Provider value={{
      tasks, loading, error,
      fetchTasks, addTask, updateTask, deleteTask, updateStatus, updatePin
    }}>
      {children}
    </TaskContext.Provider>
  );
};
