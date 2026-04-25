import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle modal animation on open
  useEffect(() => {
    if (faculty) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match this with animation duration
      return () => clearTimeout(timer);
    }
  }, [faculty]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle close with animation
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with animation duration
  };

  if (!faculty && !shouldRender) return null;

  const modalContent = (
    <>
      {/* Backdrop - with fade animation */}
      <div
        className={`fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm transition-all duration-300 ease-out
          ${isAnimating ? "opacity-100" : "opacity-0"}`}
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={handleClose}
      ></div>

      {/* Modal Container - with scale and fade animation */}
      <div
        className={`fixed z-[101] left-1/2 top-1/2 w-full max-w-2xl p-4 transition-all duration-300 ease-out
          ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{
          position: "fixed",
          transform: isAnimating
            ? "translate(-50%, -50%)"
            : "translate(-50%, -50%) scale(0.95)",
        }}
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex items-start justify-between text-white shrink-0">
            <div className="flex items-center gap-4">
              <div
                onClick={() => setIsImageExpanded(true)}
                className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-md border border-white/30 shrink-0 cursor-pointer hover:scale-105 hover:bg-white/30 transition-all shadow-sm"
              >
                {faculty?.teacher
                  ? faculty.teacher.replace("Dr. ", "").charAt(0)
                  : "F"}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{faculty?.teacher}</h2>
                <p className="text-emerald-50 font-medium">
                  {faculty?.designation}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="cursor-pointer p-3 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                    <Hash size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Faculty ID
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty?.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg shrink-0">
                    <Building size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Department
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty?.department}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Branch: {faculty?.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Qualifications
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty?.qualification}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200 break-all">
                      {faculty?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Contact Details
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {faculty?.contact || "N/A"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ext: {faculty?.extensionNo || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Areas */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Research Areas
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {faculty?.researchAreas && faculty.researchAreas.length > 0 ? (
                  faculty.researchAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-sm rounded-lg font-medium border border-emerald-100 dark:border-emerald-800"
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
                href={`mailto:${faculty?.email}`}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-colors shadow-sm ${
                  faculty?.email
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed pointer-events-none"
                }`}
              >
                <Send size={18} />
                Send Email
              </a>
              <a
                href={
                  faculty?.contact
                    ? `tel:${faculty.contact.replace(/[^0-9+]/g, "")}`
                    : "#"
                }
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-colors shadow-sm ${
                  faculty?.contact
                    ? "bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700"
                    : "bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <Phone size={18} />
                Contact Faculty
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Image Lightbox with animations */}
      {isImageExpanded && (
        <>
          <div
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm transition-all duration-300"
            style={{ animation: "fadeIn 0.3s ease-out" }}
            onClick={() => setIsImageExpanded(false)}
          />
          <div
            className="fixed z-[201] left-1/2 top-1/2"
            style={{
              transform: "translate(-50%, -50%)",
              animation: "scaleIn 0.3s ease-out",
            }}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors p-2"
              onClick={() => setIsImageExpanded(false)}
            >
              <X size={32} />
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              {faculty?.imageUrl ? (
                <img
                  src={faculty.imageUrl}
                  alt={faculty.teacher}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-8xl sm:text-9xl font-bold text-white shadow-[0_0_50px_rgba(16,185,129,0.4)] border-4 border-white/20">
                  {faculty?.teacher
                    ? faculty.teacher.replace("Dr. ", "").charAt(0)
                    : "F"}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );

  // Use portal to ensure modal is attached to body
  return mounted && shouldRender
    ? createPortal(modalContent, document.body)
    : null;
};

export default FacultyDetailModal;
