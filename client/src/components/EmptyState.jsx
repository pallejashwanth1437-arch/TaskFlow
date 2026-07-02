import React from 'react';
import { Radar, Plus } from 'lucide-react';

const EmptyState = ({ onNewTask }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center rounded-[22px] mt-6 glass">
    <div className="w-20 h-20 rounded-full border border-border bg-surface2 flex items-center justify-center mb-6">
      <Radar size={30} className="text-faint" />
    </div>
    <h3 className="font-display text-lg font-semibold text-text">No tasks found</h3>
    <p className="mt-1.5 text-sm text-muted max-w-[280px]">Create your first task to get started.</p>
    <button onClick={onNewTask} className="mt-6 flex items-center gap-2 rounded-xl bg-brand text-white px-4 py-2.5 font-medium hover:bg-brandLight transition-colors shadow-[0_8px_30px_-8px_rgba(91,95,239,0.4)]">
      <Plus size={16} /> Create Task
    </button>
  </div>
);

export default EmptyState;
