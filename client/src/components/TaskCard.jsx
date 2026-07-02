import React, { useContext, useState } from 'react';
import { Pin, Edit2, Check, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { format, isPast, startOfDay } from 'date-fns';
import { TaskContext } from '../context/TaskContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { updateStatus, updatePin } = useContext(TaskContext);
  const [hover, setHover] = useState(false);

  const done = task.status === 'completed';
  const overdue = task.dueDate && !done && isPast(startOfDay(new Date(task.dueDate)));

  const priorityColors = { high: '#F0464B', medium: '#F0A93A', low: '#45D8E0' };
  const statusColors = { 'pending': '#8790A8', 'in-progress': '#4C8DFF', 'completed': '#34D399' };
  const statusLabels = { 'pending': 'Pending', 'in-progress': 'In Progress', 'completed': 'Completed' };
  
  const pc = priorityColors[task.priority];
  const sc = statusColors[task.status];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const bgX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const bgY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-[22px] border border-border bg-surface p-5 shadow-xl hover:border-borderLight transition-colors group cursor-default z-10 hover:z-20 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]"
    >
      {/* Spotlight glow effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[22px] opacity-100"
          style={{
            background: `radial-gradient(circle at ${bgX.get()} ${bgY.get()}, rgba(91,95,239,0.15) 0%, transparent 60%)`,
          }}
        />
      )}

      <div style={{ transform: "translateZ(30px)" }} className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          {task.isPinned && <Pin size={14} className="mt-1 text-medium shrink-0 drop-shadow-md" fill="currentColor" />}
          <h3 className={`font-display text-[15px] font-semibold leading-snug text-text ${done ? 'text-faint line-through' : ''}`}>
            {task.title}
          </h3>
        </div>
        <button 
          onClick={() => updatePin(task._id, !task.isPinned)}
          className={`shrink-0 p-1.5 rounded-lg transition-colors ${task.isPinned ? 'text-medium' : 'text-faint hover:text-text'}`}
        >
          <Pin size={14} />
        </button>
      </div>

      <p style={{ transform: "translateZ(20px)" }} className={`mt-2 text-[13px] leading-relaxed text-muted line-clamp-2 ${done ? 'opacity-60' : ''}`}>
        {task.description}
      </p>

      <div style={{ transform: "translateZ(40px)" }} className="flex flex-wrap gap-1.5 mt-4">
        <span className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-medium text-muted bg-surface/50">
          {task.category}
        </span>
        <span 
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold drop-shadow-md"
          style={{ color: pc, backgroundColor: `${pc}1A` }}
        >
          <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: pc }}></span>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span 
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold"
          style={{ color: sc, backgroundColor: `${sc}1A` }}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="mt-4 pt-3 flex items-center justify-between border-t border-border">
        <div className="flex flex-col gap-1 text-[11px] text-faint font-mono">
          <span className={`flex items-center gap-1 ${overdue ? 'text-high font-semibold' : ''}`}>
            {overdue ? <AlertCircle size={12} /> : <Calendar size={12} />}
            {task.dueDate ? `Due ${format(new Date(task.dueDate), 'MMM d')}` : 'No due date'}
            {overdue ? ' · Overdue' : ''}
          </span>
          <span>Created {format(new Date(task.createdAt), 'MMM d')}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button onClick={() => onEdit(task)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-surface3 hover:text-brandLight transition-colors">
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => updateStatus(task._id, done ? 'pending' : 'completed')} 
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${done ? 'text-completed' : 'text-muted hover:text-completed hover:bg-surface3'}`}
          >
            <Check size={14} />
          </button>
          <button onClick={() => onDelete(task)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-high/10 hover:text-high transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
