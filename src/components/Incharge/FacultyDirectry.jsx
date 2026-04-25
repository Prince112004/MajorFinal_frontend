import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  ChartPie,
  Contact,
  Plus,
} from "lucide-react";
import OverviewFacultyData from "./OverviewFacultyData";
import FacultyData from "./FacultyData";
import AddFacultyModal from "../Faculty/Add faculty/AddFacultyModal";

const FacultyDirectry = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headerContent = {
    overview: {
      icon: <ChartPie />,
      title: "Faculty Overview",
      subtitle: "Analytical insights and department statistics.",
      accent: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    stats: {
      icon: <Contact />,
      title: "Faculty Directory",
      subtitle: "Manage, view, and organize all faculty members.",
      accent: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
  };

  // Handle adding faculty
  const handleAddFaculty = async (facultyData) => {
    // Here you would typically make an API call to save the data
    console.log("Adding faculty:", facultyData);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // You can update your state here or refresh the data
        console.log("Faculty added successfully");
        resolve();
      }, 1000);
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewFacultyData />;
      case "stats":
        return <FacultyData />;
      default:
        return <OverviewFacultyData />;
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      {/* --- HEADER SECTION --- */}
      <div className="w-full bg-gray-100 dark:bg-slate-900 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-300 dark:border-slate-800 p-2 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 transition-all relative">
        {/* Decorative Blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl" />
        </div>

        {/* Left Side: Icon & Info */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 p-1">
            <div className="relative shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-50 border border-emerald-100 shadow-sm rounded-xl">
                {React.cloneElement(headerContent[activeTab].icon, {
                  size: 20,
                  className: "text-emerald-600",
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-br from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  {headerContent[activeTab].title}
                </h1>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md text-[8px] font-black bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/50">
                  Live
                </span>
              </div>
              <p className="italic text-xs font-md font-thin text-slate-500 tracking-widest uppercase">
                {headerContent[activeTab].subtitle || "Management Portal"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Navigation Tabs */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-3 w-full md:w-auto relative z-10 px-1">
          {/* Add Faculty Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>Add Faculty</span>
          </button>

          {/* Tab Container */}
          <div className="flex w-full md:w-auto p-1 bg-gray-200/50 dark:bg-slate-800/50 rounded-xl border border-gray-300/50 dark:border-slate-700">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === "overview"
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === "stats"
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <BarChart3 size={16} />
              <span>Directory</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#020617] relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="relative p-4 md:p-8 max-w-[1600px] mx-auto animate-in fade-in zoom-in-95 duration-500">
          {renderContent()}
        </div>
      </div>

      {/* Add Faculty Modal */}
      <AddFacultyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFaculty={handleAddFaculty}
      />
    </div>
  );
};

export default FacultyDirectry;
