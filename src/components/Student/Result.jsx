import React, { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import ResultHeader from "../Result/ResultHeader";
import ResultSummary from "../Result/ResultSummary";
import ResultTable from "../Result/ResultTable";

const Result = () => {
  const {
    resultData,
    isResultLoading,
    availableSemesters,
    selectedSemester,
    setSemester,
    fetchResult,
    downloadResultPdf,
  } = useStudentStore();

  // Fetch result whenever the selected semester changes
  useEffect(() => {
    fetchResult(selectedSemester);
  }, [selectedSemester, fetchResult]);

  const handleDownload = () => {
    downloadResultPdf(selectedSemester);
  };

  return (
    <div className="w-full  mx-auto p-2 sm:p-1 text-slate-900 dark:text-slate-100 font-sans animate-in fade-in duration-300">
      {/* 1. Header with Dropdown & Download */}
      <ResultHeader
        semesters={availableSemesters}
        selectedSemester={selectedSemester}
        onSemesterChange={setSemester}
        onDownload={handleDownload}
      />

      {/* Loading State Overlay */}
      {isResultLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-500 mb-4"
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
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Fetching {selectedSemester} results...
          </p>
        </div>
      ) : (
        <>
          {/* 2. Summary Stats Cards */}
          <ResultSummary summary={resultData?.summary} />

          {/* 3. Detailed Grades Table */}
          <ResultTable courses={resultData?.courses} />
        </>
      )}
    </div>
  );
};

export default Result;
