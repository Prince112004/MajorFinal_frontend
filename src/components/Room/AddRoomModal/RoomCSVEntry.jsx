// components/AddRoom/RoomCSVEntry.jsx
import React from "react";

const RoomCSVEntry = ({ csvData, setCsvData, onAdd, onReview, roomCount }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Paste CSV Data
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Format:{" "}
          <code className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-purple-600 dark:text-purple-400">
            Room Code, Building Name, Room Type, Capacity (Optional)
          </code>
        </p>
        <textarea
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          rows={10}
          placeholder={`📝 Example:
LAB-101, Gyan Mandir, LAB, 60
L-201, Academic Block, LECTURE, 120
CS-LAB, Science Block, LAB, 45
Seminar-Hall, Admin Block, LECTURE
Note: Capacity is optional. Room Type must be either LECTURE or LAB.`}
          className="w-full h-[260px] px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 hover:shadow-lg"
        />
      </div>
      <div className="flex gap-3 pt-6 mt-auto">
        <button
          onClick={onAdd}
          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Add to Review List
        </button>
        {roomCount > 0 && (
          <button
            onClick={onReview}
            className="px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Review ({roomCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCSVEntry;
