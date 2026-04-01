import React, { useState, useMemo, useEffect } from "react";
import useAdminStore from "../../store/useAdminStore"; // Adjust the import path as needed
import FacultyDetailsModal from "../Faculty/FacultyDetailModal"; // Adjust path if needed
import { Search, X, Loader2, AlertCircle } from "lucide-react";

const FacultyData = () => {
  // 1. Extract state and actions from Zustand store
  const { faculty, isLoading, error, fetchFaculty } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // 2. Fetch data when the component mounts
  useEffect(() => {
    // Only fetch if we don't already have data to prevent unnecessary network requests
    if (faculty.length === 0) {
      fetchFaculty();
    }
  }, [fetchFaculty, faculty.length]);

  // 3. Dynamically extract unique branches from the fetched API data
  const branches = useMemo(() => {
    const uniqueBranches = [...new Set(faculty.map((t) => t.specialization))];
    return ["All", ...uniqueBranches];
  }, [faculty]);

  // 4. Filter logic based on the fetched data
  const filteredFaculty = useMemo(() => {
    return faculty.filter((t) => {
      const matchesSearch =
        t.teacher?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBranch =
        selectedBranch === "All" || t.specialization === selectedBranch;

      return matchesSearch && matchesBranch;
    });
  }, [searchQuery, selectedBranch, faculty]);

  // --- UI RENDERING FOR LOADING AND ERRORS ---
  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center text-slate-500 dark:text-slate-400">
        <Loader2 size={48} className="animate-spin mb-4 text-indigo-500" />
        <p className="text-lg font-medium animate-pulse">
          Loading faculty directory...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center text-slate-500 dark:text-slate-400">
        <AlertCircle size={48} className="mb-4 text-rose-500" />
        <p className="text-lg font-medium text-slate-900 dark:text-white">
          Failed to load data
        </p>
        <p className="text-sm mt-1 mb-4">{error}</p>
        <button
          onClick={fetchFaculty}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // --- MAIN UI RENDER ---
  return (
    <div className="flex flex-col h-full w-full">
      {/* TOP CONTROLS: Search and Filters */}
      <div className="flex-none space-y-4 mb-6">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search faculty by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide gap-2">
          {branches.map((branch) => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedBranch === branch
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* FACULTY GRID */}
      {filteredFaculty.length > 0 ? (
        <div className="flex-1 overflow-y-auto pr-2 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFaculty.map((fac) => (
              <div
                key={fac.id || fac._id} // Support both MongoDB _id or standard id
                onClick={() => setSelectedFaculty(fac)}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
                  {fac.teacher
                    ? fac.teacher.replace("Dr. ", "").charAt(0)
                    : "F"}
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                  {fac.teacher}
                </h3>
                <span className="text-xs font-semibold text-indigo-500 mt-1 uppercase tracking-wider">
                  {fac.id}
                </span>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">
                  {fac.designation}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <div className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 rounded-md truncate">
                    {fac.specialization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
          <Search size={48} className="mb-4 opacity-20" />
          <p className="text-lg font-medium">No faculty found.</p>
          <p className="text-sm mt-1">
            Try adjusting your search or branch filter.
          </p>
        </div>
      )}

      {/* RENDER THE EXTRACTED MODAL COMPONENT */}
      <FacultyDetailsModal
        faculty={selectedFaculty}
        onClose={() => setSelectedFaculty(null)}
      />
    </div>
  );
};

export default FacultyData;
