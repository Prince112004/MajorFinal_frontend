import React, { useState, useEffect } from "react";
// 💡 Make sure to update this import path to where your store is located
import { useFacultyStore } from "../../store/useFacultyStore";

const Leave = () => {
  // Local form state handles what the user is currently typing
  const [form, setForm] = useState({
    date: "",
    reason: "",
  });

  // 🆕 Hook into Zustand store
  const {
    leaves,
    isLeavesLoading,
    isLeaveSubmitting,
    fetchLeaves,
    submitLeave,
  } = useFacultyStore();

  // 🆕 Fetch data on mount via the store
  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const isFormValid = form.date.trim() !== "" && form.reason.trim() !== "";

  // 🆕 Submit using the store action
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isLeaveSubmitting) return;

    // Send data to store
    const success = await submitLeave({
      date: form.date,
      reason: form.reason,
    });

    // Clear form only if submission was successful
    if (success) {
      setForm({ date: "", reason: "" });
    }
  };

  return (
    <div className="p-1 w-full h-full bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col">
      <div className="w-full h-full">
        {/* Header Section */}
        <div className="mb-6 flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Leave Management
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              Apply for time off and track your requests.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT - FORM */}
          <div className="lg:col-span-1 bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/60 h-fit transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-slate-900 dark:text-white">
              <svg
                className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Request
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                  Date of Leave
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.date}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all dark:[color-scheme:dark]"
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                  Reason
                </label>
                <textarea
                  placeholder="E.g., Doctor's appointment..."
                  value={form.reason}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLeaveSubmitting}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex justify-center items-center space-x-2 ${
                  isFormValid && !isLeaveSubmitting
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                {/* 🆕 Show loading state on button */}
                <span>
                  {isLeaveSubmitting ? "Submitting..." : "Submit Request"}
                </span>
                {!isLeaveSubmitting && (
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT - HISTORY */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/60 flex flex-col h-fit transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-slate-900 dark:text-white">
              <svg
                className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Request History
            </h3>

            <div className="space-y-3 max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* 🆕 Replaced local isLoading with isLeavesLoading */}
              {isLeavesLoading ? (
                <div className="flex justify-center items-center py-10">
                  <svg
                    className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : leaves.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <svg
                    className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-base font-medium text-slate-600 dark:text-slate-400">
                    No requests yet
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    When you apply for leave, it will show up here.
                  </p>
                </div>
              ) : (
                leaves.map((leave) => (
                  <div
                    key={leave.id}
                    className="group flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all duration-200"
                  >
                    <div className="mb-2 sm:mb-0 flex-1 min-w-0 pr-4">
                      <p className="font-medium text-slate-800 dark:text-slate-100 text-base break-words whitespace-normal">
                        {leave.reason}
                      </p>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 space-x-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{formatDate(leave.date)}</span>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm w-fit border ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50"
                          : leave.status === "Pending"
                            ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50"
                            : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50"
                      }`}
                    >
                      {leave.status === "Approved" ? (
                        <svg
                          className="w-3.5 h-3.5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : leave.status === "Pending" ? (
                        <svg
                          className="w-3.5 h-3.5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3.5 h-3.5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      {leave.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
