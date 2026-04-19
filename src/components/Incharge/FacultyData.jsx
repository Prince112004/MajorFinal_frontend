import React, { useState, useMemo, useEffect } from "react";
import useAdminStore from "../../store/useAdminStore";
import FacultyDetailsModal from "../Faculty/FacultyDetailModal";
import { Search, X, Loader2, AlertCircle } from "lucide-react";

const FacultyData = () => {
  const { faculty, isLoading, error, fetchFaculty } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    if (faculty.length === 0) {
      fetchFaculty();
    }
  }, [fetchFaculty, faculty.length]);

  const branches = useMemo(() => {
    const uniqueBranches = [...new Set(faculty.map((t) => t.specialization))];
    return ["All", ...uniqueBranches];
  }, [faculty]);

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

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center text-slate-500 dark:text-slate-400">
        <Loader2 size={48} className="animate-spin mb-4 text-emerald-500" />
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
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* TOP CONTROLS */}
      <div className="flex-none space-y-4 mb-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search faculty by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
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
              className={`cursor-pointer whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedBranch === branch
                  ? "bg-emerald-600 text-white shadow-md"
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
                key={fac.id || fac._id}
                onClick={() => setSelectedFaculty(fac)}
                /* HOVER CHANGES APPLIED BELOW */
                className="group bg-white dark:bg-slate-800/50 rounded-2xl p-5 border-2 border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 cursor-pointer flex flex-col items-center text-center 
                hover:bg-emerald-50/50 dark:hover:bg-slate-800 
                hover:border-emerald-200 dark:hover:border-emerald-500/30 
                hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-none 
                "
              >
                {/* Avatar Icon */}
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-600 transition-all duration-300 shadow-sm">
                  {fac.teacher
                    ? fac.teacher.replace("Dr. ", "").charAt(0)
                    : "F"}
                </div>

                <h3 className="font-bold text-slate-800 dark:text-white line-clamp-1 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  {fac.teacher}
                </h3>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                  {fac.id}
                </span>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">
                  {fac.designation}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 w-full flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <div className="px-2.5 py-1 bg-slate-50 dark:bg-slate-700/30 rounded-md truncate border border-slate-100 dark:border-slate-700 transition-colors group-hover:border-emerald-100 dark:group-hover:border-emerald-900">
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

      <FacultyDetailsModal
        faculty={selectedFaculty}
        onClose={() => setSelectedFaculty(null)}
      />
    </div>
  );
};

export default FacultyData;
