import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const FilterBar = ({ filters, setFilters }) => {
  const priorities = [
    { v: 'high', l: 'High', c: '#F0464B' },
    { v: 'medium', l: 'Medium', c: '#F0A93A' },
    { v: 'low', l: 'Low', c: '#45D8E0' },
  ];

  const handlePriorityClick = (v) => {
    const current = filters.priorities;
    const updated = current.includes(v)
      ? current.filter(p => p !== v)
      : [...current, v];
    setFilters({ ...filters, priorities: updated });
  };

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full rounded-xl border border-borderLight bg-surface text-text py-2.5 pl-9 pr-3.5 text-sm focus:outline-none focus:border-brand transition-colors"
          />
        </div>
        
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="appearance-none rounded-xl border border-borderLight bg-surface text-text py-2.5 pl-3.5 pr-8 text-sm focus:outline-none focus:border-brand cursor-pointer"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" size={14} />
        </div>

        <div className="relative ml-auto">
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="appearance-none rounded-xl border border-borderLight bg-surface text-text py-2.5 pl-3.5 pr-8 text-sm focus:outline-none focus:border-brand cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="alphabetical">Sort: Alphabetical</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" size={14} />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-faint mr-1">Priority</span>
        {priorities.map((p) => {
          const active = filters.priorities.includes(p.v);
          return (
            <button
              key={p.v}
              onClick={() => handlePriorityClick(p.v)}
              className="flex items-center gap-1.5 rounded-full border text-xs font-medium px-3 py-1.5 transition-all"
              style={{
                borderColor: active ? p.c : '#232733',
                backgroundColor: active ? `${p.c}1A` : 'transparent',
                color: active ? p.c : '#9096AA'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.c }}></span>
              {p.l}
            </button>
          );
        })}
        {filters.priorities.length > 0 && (
          <button onClick={() => setFilters({ ...filters, priorities: [] })} className="text-xs font-medium text-faint hover:text-text ml-1">
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
