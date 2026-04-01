import React, { useState } from "react";
import { LayoutDashboard, BarChart3, Plus } from "lucide-react"; // Added Plus icon
import OverviewFacultyData from "./OverviewFacultyData";
import FacultyData from "./FacultyData";

const FacultyDirectry = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic header content based on the selected tab
  const headerContent = {
    overview: {
      title: "Faculty Overview",
      subtitle: "Analytical insights and department statistics.",
    },
    stats: {
      title: "Faculty Directory",
      subtitle: "Manage, view, and organize all faculty members.",
    },
  };

  // Helper function to handle navigation routing via switch
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewFacultyData />;
      case "stats":
        return <FacultyData />;
      // Add more cases here in the future as needed
      default:
        return <OverviewFacultyData />; // Fallback component
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* --- TOP NAVIGATION HEADER --- */}
      <div className="flex-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:px-4 border-b border-slate-200 dark:border-slate-800">
        {/* Left Side: Dynamic Title & Subtitle */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-all">
            {headerContent[activeTab].title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-all">
            {headerContent[activeTab].subtitle}
          </p>
        </div>

        {/* Right Side: Tab Bar & Add Button */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
          {/* Segmented Control / Tabs */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-transparent dark:border-slate-700/50 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === "overview"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-600/50"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === "stats"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-600/50"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800"
              }`}
            >
              <BarChart3 size={16} />
              <span>Faculty</span>
            </button>
          </div>

          
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 dark:bg-[#0b1120]">
        {renderContent()}
      </div>
    </div>
  );
};

export default FacultyDirectry;
