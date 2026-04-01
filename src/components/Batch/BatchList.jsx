import React from "react";
import BatchCard from "../../ui/BatchCard";
const BatchList = ({ selectedBranch, batches, onEdit, onDelete }) => {
  // Empty State: No Branch Selected
  if (!selectedBranch) {
    return (
      <div className="flex flex-col items-center justify-center h-72 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 shadow-sm">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
          No Branch Selected
        </h2>
        <p className="text-gray-500 dark:text-gray-500 mt-2">
          Please select a branch from the header to view or add batches.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          {selectedBranch} Batches
          <span className="text-sm font-medium bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full">
            {batches.length}
          </span>
        </h2>
      </div>

      {/* Empty State: No Batches in Selected Branch */}
      {batches.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No batches exist for this branch yet. Click "Add Batch" to get
            started! 🚀
          </p>
        </div>
      ) : (
        /* Batches Grid using BatchCard component */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {batches.map((batch, idx) => (
            <BatchCard
              key={batch.id || idx}
              batch={batch}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BatchList;
