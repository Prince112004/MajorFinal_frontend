import React from "react";
import CustomDropdown from "../../ui/CustomDropdown";

const branches = ["CSE", "ECE", "IT", "MECH", "CIVIL"];

const BatchHeader = ({ selectedBranch, setSelectedBranch, onAddClick }) => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-slate-800 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 transition-all relative">
      {/* Contained Decorative background blur */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          Batch Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
          Organize and track academic batches across departments.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto relative z-10">
        {/* --- REUSABLE DROPDOWN COMPONENT --- */}
        <div className="w-full sm:w-56">
          <CustomDropdown
            label="Branch:"
            options={branches}
            value={selectedBranch}
            onChange={setSelectedBranch}
            placeholder="Select Branch"
          />
        </div>

        <button
          onClick={onAddClick}
          disabled={!selectedBranch}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
            selectedBranch
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50"
              : "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
          }`}
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
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Batch
        </button>
      </div>
    </div>
  );
};

export default BatchHeader;
