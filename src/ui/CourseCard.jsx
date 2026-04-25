import React, { useState } from "react";
import {
  Trash2,
  Edit3,
  BookOpen,
  Layers,
  Monitor,
  Award,
  X,
  Users,
  UserCheck,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  GraduationCap,
  Mail,
} from "lucide-react";

const CourseCard = ({ course, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy data for faculty teaching the course
  const facultyTeaching = {
    name: "Dr. Sarah Johnson",
    id: "FAC001",
    designation: "Professor",
    email: "sarah.johnson@institute.edu",
    specialization: course.department,
    qualification: "Ph.D. in Computer Science",
    experience: "12 years",
    imageUrl: null,
  };

  // Dummy data for enrolled students
  const enrolledStudents = [
    {
      id: "STU001",
      name: "John Doe",
      rollNo: "2024001",
      semester: course.semester,
    },
    {
      id: "STU002",
      name: "Jane Smith",
      rollNo: "2024002",
      semester: course.semester,
    },
    {
      id: "STU003",
      name: "Mike Johnson",
      rollNo: "2024003",
      semester: course.semester,
    },
    {
      id: "STU004",
      name: "Emily Brown",
      rollNo: "2024004",
      semester: course.semester,
    },
    {
      id: "STU005",
      name: "David Wilson",
      rollNo: "2024005",
      semester: course.semester,
    },
    {
      id: "STU006",
      name: "Sarah Davis",
      rollNo: "2024006",
      semester: course.semester,
    },
    {
      id: "STU007",
      name: "Chris Martinez",
      rollNo: "2024007",
      semester: course.semester,
    },
    {
      id: "STU008",
      name: "Amanda Taylor",
      rollNo: "2024008",
      semester: course.semester,
    },
  ];

  const getTypeConfig = (type) => {
    const lowerType = type?.toLowerCase();
    const configs = {
      core: {
        color:
          "text-blue-600 bg-blue-50 dark:bg-blue-400/10 border-blue-100 dark:border-blue-400/20",
        icon: BookOpen,
      },
      elective: {
        color:
          "text-purple-600 bg-purple-50 dark:bg-purple-400/10 border-purple-100 dark:border-purple-400/20",
        icon: Layers,
      },
      lab: {
        color:
          "text-emerald-600 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-100 dark:border-emerald-400/20",
        icon: Monitor,
      },
      default: {
        color:
          "text-slate-600 bg-slate-50 dark:bg-slate-400/10 border-slate-100 dark:border-slate-400/20",
        icon: Award,
      },
    };
    return configs[lowerType] || configs.default;
  };

  const config = getTypeConfig(course.type);
  const TypeIcon = config.icon;

  const handleCardClick = (e) => {
    // Don't open modal if clicking on edit/delete buttons
    if (e.target.closest("button")) return;
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 
        hover:bg-slate-50/80 dark:hover:bg-slate-800/50 
        hover:shadow-md hover:border-cyan-500/40 hover:ring-1 hover:ring-cyan-500/10
        w-full max-w-[320px] cursor-pointer
        h-[210px] flex flex-col justify-between shrink-0"
      >
        <div>
          {/* Top Section: Icon & Credits */}
          <div className="flex justify-between items-start mb-3">
            <div
              className={`p-2 rounded-lg border transition-transform duration-300 group-hover:scale-110 ${config.color}`}
            >
              <TypeIcon size={20} strokeWidth={2.5} />
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                Credits
              </span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {course.credits}
              </span>
            </div>
          </div>

          {/* Main Info */}
          <div className="mb-2">
            <code className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
              {course.courseCode}
            </code>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {course.courseName}
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Semester {course.semester}
            </p>
          </div>
        </div>

        {/* Actions: Pinned to bottom via flex justify-between */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800/50">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border transition-colors duration-300 ${config.color}`}
          >
            {course.type || "Course"}
          </span>

          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(course);
              }}
              className="group relative p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-100/50 dark:hover:bg-cyan-400/20 rounded-md transition-all cursor-pointer active:scale-90"
            >
              <Edit3 size={18} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center group-hover:flex hidden">
                <span className="relative z-10 p-2 px-3 text-[10px] leading-none text-white font-bold whitespace-nowrap bg-slate-800 shadow-lg rounded-md animate-in fade-in slide-in-from-bottom-2 duration-200">
                  EDIT
                </span>
                <div className="w-2 h-2 -mt-1 rotate-45 bg-slate-800"></div>
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(course._id);
              }}
              className="group relative p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-100/50 dark:hover:bg-red-500/20 rounded-md transition-all cursor-pointer active:scale-90"
            >
              <Trash2 size={18} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center group-hover:flex hidden">
                <span className="relative z-10 p-2 px-3 text-[10px] leading-none text-white font-bold whitespace-nowrap bg-red-600 shadow-lg rounded-md animate-in fade-in slide-in-from-bottom-2 duration-200">
                  DELETE
                </span>
                <div className="w-2 h-2 -mt-1 rotate-45 bg-red-600"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Course Details Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-lg bg-white/20 backdrop-blur-sm`}
                      >
                        <TypeIcon size={24} />
                      </div>
                      <div>
                        <code className="text-sm font-mono bg-white/20 px-2 py-1 rounded">
                          {course.courseCode}
                        </code>
                        <h2 className="text-2xl font-bold mt-1">
                          {course.courseName}
                        </h2>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {course.type}
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {course.nature}
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {course.credits} Credits
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        Semester {course.semester}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div
                className="overflow-y-auto p-6"
                style={{ maxHeight: "calc(90vh - 180px)" }}
              >
                {/* Course Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <BookOpen size={18} className="text-cyan-600" />
                      Course Information
                    </h3>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Department:
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.department}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Course Type:
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Nature:
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.nature}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Credits:
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.credits}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Semester:
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.semester}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <Clock size={18} className="text-cyan-600" />
                      Lecture Hours
                    </h3>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Lecture (L):
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.l} hours/week
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Tutorial (T):
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.t} hours/week
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Practical (P):
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {course.p} hours/week
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                          Total Hours:
                        </span>
                        <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                          {parseInt(course.l) +
                            parseInt(course.t) +
                            parseInt(course.p)}{" "}
                          hours/week
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Faculty Teaching Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-3">
                    <UserCheck size={18} className="text-cyan-600" />
                    Faculty Teaching This Course
                  </h3>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                        {facultyTeaching.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-lg">
                          {facultyTeaching.name}
                        </h4>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          {facultyTeaching.designation}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <GraduationCap size={14} />
                            <span>{facultyTeaching.qualification}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Calendar size={14} />
                            <span>
                              Experience: {facultyTeaching.experience}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <MapPin size={14} />
                            <span>ID: {facultyTeaching.id}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Mail size={14} />
                            <span>{facultyTeaching.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrolled Students Section */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <Users size={18} className="text-cyan-600" />
                      Enrolled Students
                      <span className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {enrolledStudents.length}
                      </span>
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                          <th className="text-left p-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                            Roll No
                          </th>
                          <th className="text-left p-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                            Student Name
                          </th>
                          <th className="text-left p-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                            Student ID
                          </th>
                          <th className="text-left p-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                            Semester
                          </th>
                          <th className="text-left p-3 text-xs font-medium text-slate-500 dark:text-slate-400"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {enrolledStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                          >
                            <td className="p-3 text-slate-700 dark:text-slate-300 font-mono text-xs">
                              {student.rollNo}
                            </td>
                            <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">
                              {student.name}
                            </td>
                            <td className="p-3 text-slate-500 dark:text-slate-400 text-xs">
                              {student.id}
                            </td>
                            <td className="p-3 text-slate-500 dark:text-slate-400">
                              Semester {student.semester}
                            </td>
                            <td className="p-3">
                              <button className="text-cyan-600 hover:text-cyan-700">
                                <ChevronRight size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Footer
              <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => onEdit(course)}
                  className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                >
                  Edit Course
                </button>
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseCard;
