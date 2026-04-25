import React, { useState } from "react";
import {
  PlusCircle,
  CheckCircle2,
  BookOpen,
  Clock,
  Award,
  Microscope,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const CourseSearchList = ({
  courses = [],
  searchTerm = "",
  onAdd,
  selectedCodes = [],
}) => {
  const [selectedType, setSelectedType] = useState({});

  const filtered = Array.isArray(courses)
    ? courses.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const handleTypeChange = (courseCode, type) => {
    setSelectedType((prev) => ({
      ...prev,
      [courseCode]: type,
    }));
  };

  const handleAddCourse = (course) => {
    const type = selectedType[course.code];
    if (!type) {
      toast.warning(
        `Please select course type (Regular/Backlog/Dropped) for ${course.code}`,
      );
      return;
    }
    onAdd(course, type);
    setSelectedType((prev) => ({
      ...prev,
      [course.code]: undefined,
    }));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Regular":
        return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400";
      case "Backlog":
        return "border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      case "Dropped":
        return "border-yellow-200 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  return (
    // Fixed height container with internal scroll
    <div className="flex flex-col h-[475px] border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
      {/* Scrollable List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.length > 0 ? (
          filtered.map((course) => {
            const isSelected = selectedCodes.includes(course.code);
            const selectedTypeValue = selectedType[course.code];

            return (
              <div
                key={course.code}
                className={`group relative p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-600 text-white rounded-md tracking-wider">
                        {course.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          course.type === "Theory"
                            ? "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                            : "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                        }`}
                      >
                        {course.type.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight">
                      {course.name}
                    </h3>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Award size={14} className="text-indigo-500" />
                        <span className="text-xs font-medium">
                          {course.credits} Cr.
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">
                          {course.L}-{course.T}-{course.P}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        {course.type === "Theory" ? (
                          <BookOpen size={14} />
                        ) : (
                          <Microscope size={14} />
                        )}
                        <span className="text-xs font-medium truncate">
                          {course.nature}
                        </span>
                      </div>
                    </div>

                    {!isSelected && (
                      <div className="mt-3 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                          Select Course Type:
                        </label>
                        <div className="flex gap-2">
                          {["Regular", "Backlog", "Dropped"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                handleTypeChange(course.code, type)
                              }
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                                selectedTypeValue === type
                                  ? getTypeColor(type) +
                                    " ring-2 ring-offset-1 ring-indigo-500"
                                  : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                              }`}
                            >
                              {type === "Regular" && <CheckCircle2 size={12} />}
                              {type === "Backlog" && <AlertCircle size={12} />}
                              {type === "Dropped" && <XCircle size={12} />}
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddCourse(course)}
                    disabled={isSelected}
                    className={`shrink-0 p-2.5 rounded-xl transition-all ${
                      isSelected
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 cursor-pointer"
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      <PlusCircle size={22} />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
            <BookOpen size={32} className="text-slate-400" />
            <p className="font-bold text-slate-900 dark:text-white">
              No subjects found
            </p>
          </div>
        )}
      </div>

      {/* Footer Info (Fixed at bottom) */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
        <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center uppercase tracking-widest font-semibold">
          Showing {filtered.length} Available Courses
        </p>
      </div>
    </div>
  );
};

export default CourseSearchList;
