import React, { useState } from "react";
import {
  Send,
  BookCheck,
  Search,
  AlertCircle,
  FileDown,
  CheckCircle,
  ListPlus,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import { useStudentStore } from "../../store/useStudentStore";

import CourseSearchList from "./CourseSearchList";
import RegistrationSummary from "./RegistrationSummary";
import { generateRegistrationPDF } from "./RegistrationReceipt";

const CourseRegistrationForm = ({
  currentSemAvailableCourses = [],
  onBack,
  batchDetails,
  onRegistrationComplete,
}) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedSnapshot, setLastSubmittedSnapshot] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { submitRegistration } = useStudentStore();

  const addCourse = (course, registrationType) => {
    if (selectedCourses.find((c) => c.code === course.code)) {
      toast.warning(`${course.code} is already added.`);
      return;
    }
    const courseWithType = { ...course, registrationType };
    setSelectedCourses((prev) => [...prev, courseWithType]);
    toast.success(`Added ${course.name} as ${registrationType}`);
  };

  const removeCourse = (code) => {
    setSelectedCourses((prev) => prev.filter((c) => c.code !== code));
    toast.success("Course Removed Successfully");
  };

  const handleFinalSubmit = async () => {
    if (selectedCourses.length === 0) {
      toast.error("Add at least one subject.");
      return;
    }

    setIsSubmitting(true);
    const success = await submitRegistration(selectedCourses);
    setIsSubmitting(false);

    if (success) {
      setLastSubmittedSnapshot([...selectedCourses]);
      setIsSubmitted(true);
      setSelectedCourses([]);
      toast.success("Form Submitted Successfully!");
      if (onRegistrationComplete) {
        onRegistrationComplete();
      }
    }
  };

  // Calculate total credits
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + (course.credits || 0),
    0,
  );

  return (
    <div className="h-full w-full flex flex-col">
      {!isSubmitted ? (
        <>
          {/* Fixed Header Bar */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Dashboard
                </button>
              )}
            </div>

            {selectedCourses.length > 0 && (
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {isSubmitting ? "Submitting..." : "Finalize Registration"}
              </button>
            )}
          </div>

          {/* Batch Info Banner */}
          {batchDetails && (
            <div className="flex-shrink-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-4 border border-indigo-100 dark:border-gray-700 my-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Registering for: Semester {batchDetails.semester_name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {batchDetails.batch_name} · {batchDetails.academic_year}
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <span className="text-xs font-medium text-indigo-700 dark:text-indigo-400">
                    Registration Open
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="flex-shrink-0 mt-4 flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl">
            <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-blue-900 dark:text-blue-300">
              <span className="font-bold">Note:</span> Review your selected
              courses carefully. Once submitted, you cannot modify your
              registration.
            </p>
          </div>
          {/* Main Content - Fixed height layout */}
          <div className="flex-1 min-h-0 mt-2">
            {/* CHANGED: Grid columns from 7 and 5 to 6 and 6 for 50-50 split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              {/* Left Column - Course Search List - Changed to lg:col-span-6 */}
              <div className="lg:col-span-6 h-full">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-full">
                  <div className="flex-shrink-0 p-4 lg:p-5 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-800/30">
                    <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                      <BookCheck size={20} className="text-emerald-500" />
                      Available Courses
                    </h2>
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Search by course code or name..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all dark:text-gray-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <CourseSearchList
                      courses={currentSemAvailableCourses}
                      searchTerm={searchTerm}
                      onAdd={addCourse}
                      selectedCodes={selectedCourses.map((c) => c.code)}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Registration Summary - Changed to lg:col-span-6 */}
              <div className="lg:col-span-6 h-full">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-full">
                  <div className="flex-shrink-0 p-4 lg:p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                        <ListPlus
                          size={20}
                          className="text-indigo-600 dark:text-indigo-400"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                          Registration Summary
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Review your selected courses
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 overflow-hidden">
                    <RegistrationSummary
                      selectedCourses={selectedCourses}
                      onRemove={removeCourse}
                    />
                  </div>

                  {/* Summary Footer - Fixed at bottom */}
                  {selectedCourses.length > 0 && (
                    <div className="flex-shrink-0 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Total Courses:
                        </span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {selectedCourses.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Total Credits:
                        </span>
                        <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                          {totalCredits}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info Alert - Fixed at bottom */}
        </>
      ) : (
        /* SUCCESS PHASE */
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full mx-auto py-10 lg:py-16 px-4 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl space-y-6">
            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle
                size={32}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
              Registration Successful!
            </h2>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Official Receipt
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Download your registration receipt
                </p>
              </div>
              <button
                onClick={() => generateRegistrationPDF(lastSubmittedSnapshot)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all"
              >
                <FileDown size={18} />
                <span>Download Receipt</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-indigo-600 text-sm font-bold hover:underline"
              >
                Start New Registration
              </button>
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center justify-center gap-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRegistrationForm;
