import React from "react";
import CustomDropdown from "../../ui/CustomDropdown"; // Adjust path if needed

const branches = ["CSE", "ECE", "IT", "MECH", "CIVIL"];

const CourseHeader = ({ selectedBranch, setSelectedBranch, onAddClick }) => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-slate-800 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 transition-all relative">
      {/* FIXED: Wrapped the decorative blur in its own overflow-hidden container */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Course Library
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
          Manage curriculum, subjects, and credits for each branch.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto relative z-10">
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
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/30 hover:shadow-cyan-500/50"
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
          Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseHeader;
