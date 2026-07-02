import React from 'react';
import { Radar, Upload, Grid, List, Moon, Sun, Plus } from 'lucide-react';

const Header = ({ view, setView, dim, setDim, onNewTask }) => {
  return (
    <div className="flex items-start justify-between gap-6 flex-wrap">
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brandDim flex items-center justify-center shadow-[0_8px_30px_-8px_rgba(91,95,239,0.4)] shrink-0 mt-0.5">
          <Radar className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-[34px] font-semibold tracking-tight text-text display leading-none">Tasks</h1>
          <p className="text-sm text-muted mt-1">Your command deck for getting things done</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <button className="flex items-center gap-2 rounded-xl border border-borderLight bg-surface text-muted text-sm font-medium px-3.5 py-2 hover:border-borderLight hover:text-text transition-all" onClick={() => alert('Import is a UI placeholder in this demo')}>
          <Upload size={16} /> <span>Import</span>
        </button>
        
        <div className="flex items-center rounded-xl border border-borderLight bg-surface p-1">
          <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${view === 'grid' ? 'bg-brand text-white' : 'text-muted hover:bg-surface2'}`} onClick={() => setView('grid')}>
            <Grid size={15} />
          </button>
          <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${view === 'list' ? 'bg-brand text-white' : 'text-muted hover:bg-surface2'}`} onClick={() => setView('list')}>
            <List size={15} />
          </button>
        </div>

        <button className="w-[42px] h-[42px] rounded-xl border border-borderLight bg-surface text-muted flex items-center justify-center hover:border-borderLight hover:text-text transition-all" onClick={() => setDim(!dim)}>
          {dim ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="flex items-center gap-2 rounded-xl border-none bg-brand text-white text-sm font-medium px-3.5 py-2.5 hover:bg-brandLight transition-all shadow-[0_8px_30px_-8px_rgba(91,95,239,0.4)]" onClick={onNewTask}>
          <Plus size={16} /> New Task 
          <span className="ml-1 border border-white/25 bg-white/10 rounded-md px-1.5 py-0.5 text-[10px] text-white/85 mono">Ctrl+N</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
