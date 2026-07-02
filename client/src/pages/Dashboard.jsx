import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import DashboardStats from '../components/DashboardStats';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import TaskModal from '../components/TaskModal';
import DeleteModal from '../components/DeleteModal';
import { TaskContext } from '../context/TaskContext';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from '../components/Background3D';

const Dashboard = () => {
  const { tasks, loading, error } = useContext(TaskContext);
  
  const [view, setView] = useState('grid');
  const [dim, setDim] = useState(false);
  const [filters, setFilters] = useState({ search: '', status: 'all', sort: 'newest', priorities: [] });
  
  const [modal, setModal] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    document.body.style.filter = dim ? 'brightness(0.85)' : 'none';
  }, [dim]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openNewTask();
      }
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openNewTask = () => {
    setEditingTask(null);
    setModal('task');
  };

  const closeModal = () => {
    setModal(null);
    setEditingTask(null);
    setDeleteTarget(null);
  };

  const getFilteredTasks = () => {
    let result = [...tasks];
    
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q));
    }
    
    if (filters.status !== 'all') {
      result = result.filter(t => t.status === filters.status);
    }
    
    if (filters.priorities.length > 0) {
      result = result.filter(t => filters.priorities.includes(t.priority));
    }
    
    const order = { high: 0, medium: 1, low: 2 };
    
    result.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      
      switch (filters.sort) {
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
        case 'dueDate': {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        case 'priority': return order[a.priority] - order[b.priority];
        case 'alphabetical': return a.title.localeCompare(b.title);
        default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    
    return result;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden flex flex-col">
      <Background3D />
      
      {/* Content wrapper with z-index to stay above 3D background */}
      <div className="relative z-10 max-w-[1180px] w-full mx-auto px-6 pt-10 pb-16 flex flex-col flex-1">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Header view={view} setView={setView} dim={dim} setDim={setDim} onNewTask={openNewTask} />
        </motion.div>
        
        <DashboardStats />
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <FilterBar filters={filters} setFilters={setFilters} />
        </motion.div>
        
        {error && <div className="mt-6 p-4 rounded-xl bg-high/10 text-high text-sm">{error}</div>}

        {loading ? (
          <LoadingSkeleton />
        ) : filteredTasks.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <EmptyState onNewTask={openNewTask} />
          </motion.div>
        ) : (
          <motion.div layout className={`mt-6 grid gap-4 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            <AnimatePresence>
              {filteredTasks.map((task, idx) => (
                <motion.div
                  key={task._id}
                  layout
                  initial={{ opacity: 0, y: 30, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                  className="perspective-1000"
                >
                  <TaskCard 
                    task={task} 
                    onEdit={(t) => { setEditingTask(t); setModal('task'); }}
                    onDelete={(t) => { setDeleteTarget(t); setModal('delete'); }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="mt-auto pt-12 text-center border-t border-border/30 mt-12">
          <span className="font-mono text-xs text-faint">Tasks — command deck v3.0 (Cinematic Edition)</span>
        </div>

        <button onClick={openNewTask} className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-[0_8px_30px_-8px_rgba(91,95,239,0.5)] md:hidden hover:bg-brandLight transition-colors">
          <Plus size={24} />
        </button>

        <AnimatePresence>
          {modal === 'task' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-50">
              <TaskModal task={editingTask} onClose={closeModal} />
            </motion.div>
          )}
          {modal === 'delete' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-50">
              <DeleteModal task={deleteTarget} onClose={closeModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
