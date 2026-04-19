import React from "react";
import BatchCard from "../../ui/BatchCard";
import { FileStack } from "lucide-react";
import NoItemSelected from "../../ui/NoItemSelected";

const BatchList = ({ selectedBranch, batches, onEdit, onDelete }) => {
  // Empty State: No Branch Selected
  if (!selectedBranch) {
    return (
      <NoItemSelected
        icon={<FileStack />}
        message="No Branch Selected"
        step="Please select the branch to proceed."
        variant="violet"
      />
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-900 animate-fade-in-up p-6 shadow-lg dark:shadow-none border border-gray-100 dark:border-slate-600 rounded-lg shadow-gray-600 ">
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
        <div className="min-h-100 p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No batches exist for this branch yet. Click "Add Batch" to get
            started! 🚀
          </p>
        </div>
      ) : (
        /* Batches Grid using BatchCard component */
        <div className="min-h-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
