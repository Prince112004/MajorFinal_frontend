import React from "react";
import CourseCard from "../../ui/CourseCard";

const CourseList = ({ selectedBranch, courses, onEdit, onDelete }) => {
  if (!selectedBranch) {
    return (
      <div className="flex flex-col items-center justify-center h-72 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 shadow-sm">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
          Please select a branch to view or add courses.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          {selectedBranch} Courses
          <span className="text-sm font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-2.5 py-0.5 rounded-full">
            {courses.length}
          </span>
        </h2>
      </div>

      {courses.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No courses exist for this branch yet. Click "Add Course" to create
            the curriculum! 📚
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
