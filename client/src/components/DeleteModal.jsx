import React, { useContext } from 'react';
import { AlertCircle } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';

const DeleteModal = ({ task, onClose }) => {
  const { deleteTask } = useContext(TaskContext);

  const handleDelete = async () => {
    await deleteTask(task._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-[380px] rounded-[22px] border border-borderLight bg-surface2 p-6 shadow-2xl">
        <div className="w-11 h-11 rounded-full bg-high/10 flex items-center justify-center text-high mb-4">
          <AlertCircle size={24} />
        </div>
        <h2 className="font-display text-lg font-semibold text-text">Delete Task?</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Are you sure you want to delete "{task.title}"? This action cannot be undone.
        </p>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-muted hover:text-text transition-colors">
            Cancel
          </button>
          <button onClick={handleDelete} className="rounded-xl border border-transparent bg-high px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
