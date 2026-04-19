import React, { useState } from "react";
import Navbaar from "../components/Navbaar";
import TableModal from "../components/TableModal";
import Contact from "../components/Student/Contact";
import Attendance from "../components/Attendance/Attendance"
import BacklogCourseManagement from "../components/Student/BacklogCourseManagement";
import NoticeBoard from "../components/Student/NoticeBoard";
import Assignment from "../components/Student/Assignment";

import CourseRegistration from "../components/Student/CourseRegistration";

import {
  Menu,
  X,
  CalendarDays,
  MessageSquare,
  ClipboardCheck,
  Bell,
  FileText,
  GraduationCap,
  BookPlus,
  History,
} from "lucide-react";

const Student = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeView, setActiveView] = useState("timetable"); // Default to timetable

  // 🔁 Render content dynamically
  const renderContent = () => {
    switch (activeView) {
      case "timetable":
        return <TableModal />;
      case "attendance":
        return <Attendance />;
      case "registration":
        return <CourseRegistration />;
      case "backlog":
        return <BacklogCourseManagement />;
      case "notices":
        return <NoticeBoard />;
      case "contact":
        return <Contact />;
      default:
        return <TableModal />;
    }
  };

  // 📋 Sidebar Menu Items mapped to components
  const menuItems = [
    { key: "timetable", label: "My Timetable", icon: CalendarDays },
    { key: "attendance", label: "Attendance", icon: ClipboardCheck },
    { key: "registration", label: "Course Registration", icon: BookPlus },
    { key: "backlog", label: "Backlogs", icon: History },
    { key: "notices", label: "Notice Board", icon: Bell },
    { key: "contact", label: "Helpdesk / Support", icon: MessageSquare },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-100 dark:bg-slate-900 overflow-hidden">
      {/* Navbar */}
      <Navbaar />

      {/* Overlay (Mobile) */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Layout */}
      <div className="flex flex-1 w-full overflow-hidden ">
        {/* ================= SIDEBAR ================= */}
        <div
          className={`
            fixed md:static top-0 left-0 h-full w-64 
            bg-white dark:bg-slate-900
            border-r border-slate-200 dark:border-slate-800
            z-50 transform transition-transform duration-300
            ${openSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 flex flex-col
            px-4 py-5
          `}
        >
          {/* Close Button (Mobile) */}
          <div className="flex justify-end md:hidden mb-4">
            <X
              onClick={() => setOpenSidebar(false)}
              className="cursor-pointer text-slate-500 dark:text-slate-400"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl text-blue-600 dark:text-blue-500 font-bold px-2">
            Student Name
          </h1>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 px-2">
            Student Portal
          </h2>

          {/* Menu */}
          <div className="flex flex-col gap-2 overflow-y-auto pb-4">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveView(item.key);
                    setOpenSidebar(false);
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 cursor-pointer
                    ${
                      activeView === item.key
                        ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 text-xs text-slate-400 px-2 border-t border-slate-200 dark:border-slate-800">
            Student Dashboard v1.0
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900  shadow-md border border-slate-200 dark:border-slate-700 p-2 min-h-full flex flex-col">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* ================= FLOAT BUTTON ================= */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all z-50"
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Student;
