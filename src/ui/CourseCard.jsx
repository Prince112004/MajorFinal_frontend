import React from "react";

const CourseCard = ({ course, onEdit, onDelete }) => {
  // Determine badge colors based on course type
  const getTypeColors = (type) => {
    if (type?.toLowerCase() === "core")
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    if (type?.toLowerCase() === "elective")
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    if (type?.toLowerCase() === "lab")
      return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400";
    return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col w-full max-w-sm">
      {/* Top Row: Badges */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColors(course.type)}`}
        >
          {course.type || "Course"}
        </span>
        <span className="bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-lg text-xs font-bold border border-cyan-100 dark:border-cyan-800/50">
          {course.credits} Credits
        </span>
      </div>

      {/* Course Info */}
      <div className="mb-4 flex-1">
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white line-clamp-2 leading-tight">
          {course.courseName}
        </h3>
        <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-slate-900/50 inline-block px-2 py-1 rounded-md">
          {course.courseCode}
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-50 dark:border-slate-700/50">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Semester: {course.semester}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(course)}
            className="p-2 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-xl transition-colors"
            title="Edit Course"
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
            onClick={() => onDelete(course.id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-xl transition-colors"
            title="Delete Course"
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

export default CourseCard;
