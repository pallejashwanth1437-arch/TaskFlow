import React from 'react';

const SkeletonCard = () => (
  <div className="rounded-[22px] border border-border bg-surface p-5 relative overflow-hidden">
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.6s_infinite]"></div>
    <div className="flex justify-between items-start mb-4">
      <div className="h-5 bg-surface2 rounded w-3/4"></div>
      <div className="h-4 w-4 bg-surface2 rounded"></div>
    </div>
    <div className="h-3 bg-surface2 rounded w-full mb-2"></div>
    <div className="h-3 bg-surface2 rounded w-5/6 mb-5"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 bg-surface2 rounded-lg w-16"></div>
      <div className="h-6 bg-surface2 rounded-lg w-20"></div>
      <div className="h-6 bg-surface2 rounded-lg w-24"></div>
    </div>
    <div className="pt-3 border-t border-border flex justify-between items-center">
      <div className="space-y-1.5">
        <div className="h-3 bg-surface2 rounded w-24"></div>
        <div className="h-3 bg-surface2 rounded w-20"></div>
      </div>
      <div className="flex gap-1">
        <div className="h-8 w-8 bg-surface2 rounded-lg"></div>
        <div className="h-8 w-8 bg-surface2 rounded-lg"></div>
        <div className="h-8 w-8 bg-surface2 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default LoadingSkeleton;
