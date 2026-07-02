import React, { useState, useEffect, useContext } from 'react';
import { X, Pin } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';

const CATEGORIES = ['Work', 'Study', 'Personal', 'Health', 'Shopping', 'Others', 'Design', 'Development', 'Research', 'Marketing', 'Ops'];

const TaskModal = ({ task, onClose }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    isPinned: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'Personal',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        isPinned: task.isPinned || false
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      if (task) {
        await updateTask(task._id, formData);
      } else {
        await addTask(formData);
      }
      onClose();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="w-full max-w-[480px] max-h-[88vh] overflow-y-auto rounded-[22px] border border-borderLight bg-surface2 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-text">{task ? 'Edit Task' : 'New Task'}</h2>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-surface3 hover:text-text transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1.5 text-xs font-medium text-muted">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => { setFormData({ ...formData, title: e.target.value }); setError(''); }}
            placeholder="e.g. Ship the onboarding redesign"
            className={`w-full rounded-xl border ${error ? 'border-high' : 'border-border'} bg-surface text-text px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand`}
            autoFocus
          />
          {error && <div className="mt-1 text-xs text-high">{error}</div>}
        </div>

        <div className="mb-4">
          <label className="block mb-1.5 text-xs font-medium text-muted">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add more detail..."
            rows="3"
            className="w-full rounded-xl border border-border bg-surface text-text px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block mb-1.5 text-xs font-medium text-muted">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface text-text px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-medium text-muted">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface text-text px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block mb-1.5 text-xs font-medium text-muted">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface text-text px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-medium text-muted">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface text-text px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFormData({ ...formData, isPinned: !formData.isPinned })}
          className="w-full flex items-center justify-between rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text transition-colors"
        >
          <span className="flex items-center gap-2">
            <Pin size={16} className={formData.isPinned ? 'text-medium' : 'text-faint'} /> Pin task
          </span>
          <div className={`relative w-9 h-5 rounded-full transition-colors ${formData.isPinned ? 'bg-brand' : 'bg-surface3'}`}>
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all ${formData.isPinned ? 'translate-x-4' : ''}`}></div>
          </div>
        </button>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-muted hover:text-text transition-colors">
            Cancel
          </button>
          <button type="submit" className="rounded-xl border border-transparent bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brandLight transition-colors">
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
