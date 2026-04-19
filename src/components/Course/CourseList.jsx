import React from "react";
import { BookOpen } from "lucide-react";
import CourseCard from "../../ui/CourseCard";
import NoItemSelected from "../../ui/NoItemSelected";

const CourseList = ({ selectedBranch, courses, onEdit, onDelete }) => {
  if (!selectedBranch) {
    return (
      <NoItemSelected
        icon={<BookOpen />}
        message="No Branch Selected"
        step="Please select the branch to proceed."
        variant="blue"
      />
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-900 animate-fade-in-up p-6 shadow-lg dark:shadow-none border border-gray-100 dark:border-slate-600 rounded-lg shadow-gray-600">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
          {selectedBranch} Courses
          <span className="text-sm font-medium bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800/50">
            {courses.length}
          </span>
        </h2>
      </div>

      {courses.length === 0 ? (
        <div className="h-100 p-8 text-center bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center justify-center">
          <p className="text-gray-500 dark:text-slate-400 text-lg">
            No courses exist for this branch yet. Click "Add Course" to create
            the curriculum! 📚
          </p>
        </div>
      ) : (
        <div className=" min-h-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
