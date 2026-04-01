import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Building,
  GraduationCap,
  BookOpen,
  Hash,
  Send,
} from "lucide-react";

const FacultyDetailModal = ({ faculty, onClose }) => {
  // State to handle the expanded image view
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // Safety check: if no faculty is selected, don't render anything
  if (!faculty) return null;

  return (
    <>
      {/* --- MAIN MODAL --- */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden z-[101] flex flex-col max-h-[90vh]">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-start justify-between text-white shrink-0">
            <div className="flex items-center gap-4">
              {/* CLICKABLE PROFILE PICTURE */}
              <div
                onClick={() => setIsImageExpanded(true)}
                className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-md border border-white/30 shrink-0 cursor-pointer hover:scale-105 hover:bg-white/30 transition-all shadow-sm"
                title="Click to expand"
              >
                {/* If you add 'imageUrl' to your data later, you can render an <img src={faculty.imageUrl} /> here instead */}
                {faculty.teacher
                  ? faculty.teacher.replace("Dr. ", "").charAt(0)
                  : "F"}
              </div>

              <div>
                <h2 className="text-2xl font-bold">{faculty.teacher}</h2>
                <p className="text-indigo-100 font-medium">
                  {faculty.designation}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
                    <Hash size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Faculty ID
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                    <Building size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Department
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty.department}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Branch: {faculty.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Qualifications
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty.qualification}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200 break-all">
                      {faculty.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Contact Details
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty.contact || "N/A"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ext: {faculty.extensionNo || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Areas */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-slate-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Research Areas
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {faculty.researchAreas && faculty.researchAreas.length > 0 ? (
                  faculty.researchAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-lg font-medium"
                    >
                      {area}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500 italic">
                    No research areas specified.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${faculty.email}`}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-colors shadow-sm ${
                  faculty.email
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed pointer-events-none"
                }`}
              >
                <Send size={18} />
                Send Email
              </a>
              <a
                href={
                  faculty.contact
                    ? `tel:${faculty.contact.replace(/[^0-9+]/g, "")}`
                    : "#"
                }
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-colors shadow-sm ${
                  faculty.contact
                    ? "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    : "bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <Phone size={18} />
                Call Faculty
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- EXPANDED IMAGE OVERLAY (LIGHTBOX) --- */}
      {isImageExpanded && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsImageExpanded(false)} // Clicking anywhere closes it
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-slate-300 transition-colors p-2"
            onClick={() => setIsImageExpanded(false)}
          >
            <X size={32} />
          </button>

          {/* The Expanded Picture */}
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevents closing if they click exactly on the picture
          >
            {faculty.imageUrl ? (
              <img
                src={faculty.imageUrl}
                alt={faculty.teacher}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              // Fallback large initial if there is no image URL
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-8xl sm:text-9xl font-bold text-white shadow-[0_0_50px_rgba(99,102,241,0.4)] border-4 border-white/20 select-none">
                {faculty.teacher
                  ? faculty.teacher.replace("Dr. ", "").charAt(0)
                  : "F"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyDetailModal;
