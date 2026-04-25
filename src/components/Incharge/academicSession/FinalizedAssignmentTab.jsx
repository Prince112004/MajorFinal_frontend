import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Users,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const FinalizedAssignmentTab = ({ session }) => {
  const [courseAssignments, setCourseAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(null);
  const [genSuccess, setGenSuccess] = useState(false);

  // Load assignments from localStorage
  useEffect(() => {
    if (session?._id) {
      setIsLoading(true);
      setTimeout(() => {
        const savedAssignments = localStorage.getItem("courseAssignments");
        if (savedAssignments) {
          const allAssignments = JSON.parse(savedAssignments);
          const sessionAssignments = allAssignments[session._id] || [];
          setCourseAssignments(sessionAssignments);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [session?._id]);

  const handleGenerate = async () => {
    setGenerating(true);
    setGenError(null);
    setGenSuccess(false);

    try {
      await new Promise((res) => setTimeout(res, 1500));

      const timetable = generateDummyTimetable(courseAssignments);
      localStorage.setItem(
        `timetable_${session._id}`,
        JSON.stringify(timetable),
      );

      setGenSuccess(true);
      setTimeout(() => setGenSuccess(false), 3000);
    } catch {
      setGenError("Timetable generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const generateDummyTimetable = (assignments) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = [
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-1:00",
      "2:00-3:00",
      "3:00-4:00",
    ];

    const timetable = {};
    days.forEach((day) => {
      timetable[day] = {};
      timeSlots.forEach((slot) => {
        const randomAssignment =
          assignments[Math.floor(Math.random() * assignments.length)];
        if (randomAssignment && Math.random() > 0.3) {
          timetable[day][slot] = {
            course: randomAssignment.course_id,
            faculty: randomAssignment.faculty_id,
            batch: randomAssignment.batch_name,
            room: `Room ${Math.floor(Math.random() * 100) + 100}`,
          };
        } else {
          timetable[day][slot] = null;
        }
      });
    });
    return timetable;
  };

  // Group assignments by batch
  const groupedByBatch = courseAssignments.reduce((groups, assignment) => {
    const batchName = assignment.batch_name || "Unknown Batch";
    if (!groups[batchName]) {
      groups[batchName] = [];
    }
    groups[batchName].push(assignment);
    return groups;
  }, {});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-emerald-500" />
        <span className="ml-3 text-sm text-gray-400">
          Loading assignments...
        </span>
      </div>
    );
  }

  if (courseAssignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <BookOpen size={28} className="text-gray-400" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          No assignments found. Add course assignments in the first tab and save
          them.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ minHeight: "500px" }}>
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Finalized Course Assignments
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Total {courseAssignments.length} assignment
          {courseAssignments.length !== 1 ? "s" : ""} ready for timetable
          generation
        </p>
      </div>

      {/* Assignments List - Scrollable Area */}
      <div className="space-y-4" style={{ marginBottom: "80px" }}>
        {Object.entries(groupedByBatch).map(([batchName, assignments]) => (
          <div key={batchName} className="space-y-2">
            {/* Batch Header - Enhanced visibility */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-lg shadow-md">
              <GraduationCap size={16} className="text-white" />
              <h4 className="text-sm font-semibold text-white">{batchName}</h4>
              <span className="text-xs text-white/90 ml-auto bg-white/20 px-2 py-0.5 rounded-full">
                {assignments.length} course{assignments.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Assignment Cards */}
            <div className="space-y-2 pl-2">
              {assignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    assignment.is_backlog
                      ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 shadow-sm"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        assignment.is_backlog
                          ? "bg-amber-200 dark:bg-amber-800"
                          : "bg-indigo-100 dark:bg-indigo-900/30"
                      }`}
                    >
                      <CheckCircle2
                        size={14}
                        className={
                          assignment.is_backlog
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-indigo-600 dark:text-indigo-400"
                        }
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                        {assignment.course_id?.course_name || "—"}
                      </p>
                      {assignment.is_backlog && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200">
                          Backlog
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {assignment.course_id?.course_code}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        Faculty: {assignment.faculty_id?.name || "—"}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        Credits: {assignment.course_id?.credits || "—"}
                      </span>
                      {assignment.course_id?.course_type && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {assignment.course_id.course_type}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Footer - Always at bottom of component */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 pt-4 pb-2 -mt-16">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {courseAssignments.length}
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 ml-1">
                assigned
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Ready for generation
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 sm:flex-none justify-end">
            {genError && (
              <span className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                <AlertCircle size={12} />
                {genError}
              </span>
            )}
            {genSuccess && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                <CheckCircle2 size={12} />
                Generated!
              </span>
            )}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg shadow-md transition-all duration-200 whitespace-nowrap"
            >
              {generating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Sparkles size={14} className="text-yellow-300" />
              )}
              {generating ? "Generating..." : "Generate Timetable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizedAssignmentTab;
