import React from "react";

const BatchCard = ({ batch, onEdit, onDelete }) => {
  // Determine status badge colors based on status text
  const getStatusColors = (status) => {
    if (status?.toLowerCase() === "active") {
      return "bg-emerald-100 text-emerald-700";
    }
    if (status?.toLowerCase() === "graduating") {
      return "bg-indigo-100 text-indigo-700";
    }
    return "bg-gray-100 text-gray-700"; // fallback
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col w-full max-w-sm">
      {/* Top Row: Badges */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColors(batch.status)}`}
        >
          {batch.status}
        </span>
        <span className="bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 px-3 py-1 rounded-lg text-xs font-bold">
          {batch.degree}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">
        {batch.batchName}
      </h3>

      {/* Middle Row: Year & Sem */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4 px-1">
        <span>
          Year:{" "}
          <strong className="text-gray-900 dark:text-white">
            {batch.year}
          </strong>
        </span>
        <span>
          Sem:{" "}
          <strong className="text-gray-900 dark:text-white">
            {batch.semester}
          </strong>
        </span>
      </div>

      {/* Bottom Row: Students & Actions */}
      <div className="bg-gray-50 dark:bg-slate-900/50 rounded-2xl p-2 pl-4 flex justify-between items-center mt-auto border border-gray-100 dark:border-slate-700/50">
        {/* Student Count */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
          <svg
            className="w-4 h-4 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>
            <strong className="text-gray-900 dark:text-white text-base">
              {batch.students}
            </strong>{" "}
            Students
          </span>
        </div>

        {/* Edit & Delete Actions */}
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(batch)}
            className="p-2 text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-xl transition-colors"
            title="Edit Batch"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={() => onDelete(batch.id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-xl transition-colors"
            title="Delete Batch"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchCard;
