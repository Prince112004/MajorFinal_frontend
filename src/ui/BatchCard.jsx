// components/ui/BatchCard.jsx
import React, { useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  MapPin,
  Clock,
  X,
  ChevronRight,
  Eye,
  CalendarDays,
  UserCheck,
  DoorOpen,
} from "lucide-react";

const BatchCard = ({ batch, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Adaptive colors - vibrant for light mode, softer for dark mode
  const getCardGradient = () => {
    return "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-cyan-600";
  };

  const getBadgeStyle = () => {
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-cyan-300";
  };

  const getIconColor = () => {
    return "text-blue-500 dark:text-cyan-400";
  };

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    setShowDetails(true);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDetails]);

  const gradientColor = getCardGradient();

  // Format lecture room display
  const getLectureRoomDisplay = () => {
    if (batch.lecture_room_id) {
      if (typeof batch.lecture_room_id === "object") {
        return (
          batch.lecture_room_id.room_name ||
          batch.lecture_room_id.room_number ||
          "Room Assigned"
        );
      }
      return batch.lecture_room_id;
    }
    return "Not Assigned";
  };

  return (
    <>
      {/* Batch Card */}
      <div
        onClick={handleCardClick}
        className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border border-gray-200 dark:border-slate-700"
      >
        {/* Top Gradient Bar */}
        <div className={`h-2 bg-gradient-to-r ${gradientColor}`} />

        {/* Card Content */}
        <div className="p-5">
          {/* Department Badge */}
          <div className="flex justify-between items-start mb-4">
            <div
              className={`px-3 py-1.5 rounded-xl ${getBadgeStyle()} shadow-sm`}
            >
              <span className="text-xs font-bold">
                {batch.department || batch.branch || "General"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(batch);
                }}
                className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 cursor-pointer active:scale-90"
                title="Edit Batch"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(batch._id || batch.id);
                }}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 cursor-pointer active:scale-90"
                title="Delete Batch"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Batch Name */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 mb-2">
              {batch.batch_name || batch.batchName}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <GraduationCap size={12} className={getIconColor()} />
              <span>{batch.program || batch.degree || "B.Tech"}</span>
            </div>
          </div>

          {/* Year and Semester Info */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-2">
              <Calendar className={`w-4 h-4 ${getIconColor()}`} />
              <div>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Year
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {batch.year || "1"}
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${getIconColor()}`} />
              <div>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Semester
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {batch.semester || "1"}
                </p>
              </div>
            </div>
          </div>

          {/* View Details Link */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Eye size={12} />
              <span>Click to view details</span>
            </div>
            <ChevronRight
              size={16}
              className={`${getIconColor()} group-hover:translate-x-1 transition-transform`}
            />
          </div>
        </div>
      </div>

      {/* Full Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowDetails(false)}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header - Fixed at top */}
            <div
              className={`sticky top-0 bg-gradient-to-r ${gradientColor} px-6 py-5 flex justify-between items-center rounded-t-2xl z-10 flex-shrink-0`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Batch Details
                  </h2>
                  <p className="text-xs text-white/80 mt-0.5">
                    Complete information about the batch
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div
              className="flex-1 overflow-y-auto p-6"
              style={{ maxHeight: "calc(90vh - 140px)" }}
            >
              {/* Batch Name Section */}
              <div className="mb-6 p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                    Batch Name
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {batch.batch_name || batch.batchName}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {batch.program || batch.degree || "Bachelor of Technology"}{" "}
                  Program
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400 uppercase">
                      Program
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-800 dark:text-white">
                    {batch.program || batch.degree || "B.Tech"}
                  </p>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                      Department
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-800 dark:text-white">
                    {batch.department || batch.branch || "Computer Science"}
                  </p>
                </div>

                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl border border-cyan-100 dark:border-cyan-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase">
                      Year
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-800 dark:text-white">
                    {batch.year || "1st Year"}{" "}
                    {batch.year &&
                      `(${batch.year === 1 ? "I" : batch.year === 2 ? "II" : batch.year === 3 ? "III" : "IV"})`}
                  </p>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-100 dark:border-teal-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase">
                      Semester
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-800 dark:text-white">
                    Semester {batch.semester || 1}
                  </p>
                </div>

                {/* Lecture Room Field - NEW */}
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-800/50 md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <DoorOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">
                      Lecture Room
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-800 dark:text-white">
                    {getLectureRoomDisplay()}
                  </p>
                  {batch.lecture_room_id &&
                    typeof batch.lecture_room_id === "object" &&
                    batch.lecture_room_id.room_number && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Room Number: {batch.lecture_room_id.room_number}
                      </p>
                    )}
                </div>

                <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-100 dark:border-sky-800/50 md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase">
                      Total Students
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-800 dark:text-white">
                    {batch.students || "Not Specified"} Enrolled Students
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20 rounded-xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-semibold text-blue-600 dark:text-cyan-400 mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Additional Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-slate-600 dark:text-slate-400 mb-1 sm:mb-0">
                      Course Coordinator:
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white">
                      Dr. Sarah Johnson
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-slate-600 dark:text-slate-400 mb-1 sm:mb-0">
                      Schedule:
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white">
                      Monday & Wednesday, 10:00 AM - 12:00 PM
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-slate-600 dark:text-slate-400 mb-1 sm:mb-0">
                      Academic Year:
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white">
                      2024 - 2025
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-slate-600 dark:text-slate-400 mb-1 sm:mb-0">
                      Batch Strength:
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white">
                      60 Students (Maximum Capacity)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed at bottom */}
            <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-6 py-4 flex justify-end gap-3 rounded-b-2xl flex-shrink-0">
              <button
                onClick={() => setShowDetails(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetails(false);
                  onEdit(batch);
                }}
                className={`px-5 py-2.5 rounded-xl font-medium text-white transition-all flex items-center gap-2 bg-gradient-to-r ${gradientColor} hover:shadow-lg`}
              >
                <Edit3 size={16} />
                Edit Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatchCard;
