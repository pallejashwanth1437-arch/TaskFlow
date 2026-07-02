import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import ProgressCircle from './ProgressCircle';
import { CheckCircle2, CircleDashed, Clock, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardStats = () => {
  const { tasks } = useContext(TaskContext);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', val: total, color: 'text-brandLight', bg: 'bg-brandLight/10', icon: <ListTodo size={20} className="text-brandLight" /> },
    { label: 'Pending', val: pending, color: 'text-pending', bg: 'bg-pending/10', icon: <CircleDashed size={20} className="text-pending" /> },
    { label: 'In Progress', val: inProgress, color: 'text-progress', bg: 'bg-progress/10', icon: <Clock size={20} className="text-progress" /> },
    { label: 'Completed', val: completed, color: 'text-completed', bg: 'bg-completed/10', icon: <CheckCircle2 size={20} className="text-completed" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="col-span-2 md:col-span-1 glass rounded-[22px] p-5 flex items-center gap-5 relative overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand/20 blur-[40px]"></div>
        <ProgressCircle percentage={pct} />
        <div className="z-10">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">Completion</p>
          <p className="text-lg font-semibold my-1 text-text display">{completed} of {total}</p>
          <p className="text-sm text-muted">tasks completed</p>
        </div>
      </motion.div>

      {stats.map((s, i) => (
        <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 * i }} className="glass rounded-[22px] p-5 shadow-lg hover:-translate-y-1 transition-transform flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">{s.label}</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
              {s.icon}
            </div>
          </div>
          <p className="text-3xl font-semibold mt-3 text-text display">{s.val}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
