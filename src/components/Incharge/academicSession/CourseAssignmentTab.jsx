import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  Loader2,
  AlertCircle,
  Search,
  X,
  BookOpen,
  FileText,
} from "lucide-react";

// ========== MOCK DATA ==========
const MOCK_BATCHES = [
  {
    _id: "batch_1",
    batch_name: "CSE 2024 - Section A",
    department: "CSE",
    year: "1st Year",
    semester: 1,
  },
  {
    _id: "batch_2",
    batch_name: "CSE 2023 - Section B",
    department: "CSE",
    year: "2nd Year",
    semester: 3,
  },
  {
    _id: "batch_3",
    batch_name: "ECE 2024 - Section A",
    department: "ECE",
    year: "1st Year",
    semester: 1,
  },
  {
    _id: "batch_4",
    batch_name: "ECE 2023 - Section A",
    department: "ECE",
    year: "2nd Year",
    semester: 3,
  },
  {
    _id: "batch_5",
    batch_name: "MECH 2024 - Section A",
    department: "MECH",
    year: "1st Year",
    semester: 1,
  },
  {
    _id: "batch_6",
    batch_name: "CSE 2022 - Section A",
    department: "CSE",
    year: "3rd Year",
    semester: 5,
  },
];

const MOCK_FACULTIES = [
  {
    _id: "fac_1",
    name: "Dr. Sarah Johnson",
    faculty_code: "FAC001",
    department: "CSE",
    designation: "Professor",
  },
  {
    _id: "fac_2",
    name: "Prof. Michael Chen",
    faculty_code: "FAC002",
    department: "CSE",
    designation: "Associate Professor",
  },
  {
    _id: "fac_3",
    name: "Dr. Emily Davis",
    faculty_code: "FAC003",
    department: "ECE",
    designation: "Professor",
  },
  {
    _id: "fac_4",
    name: "Prof. Robert Wilson",
    faculty_code: "FAC004",
    department: "MECH",
    designation: "Assistant Professor",
  },
  {
    _id: "fac_5",
    name: "Dr. Lisa Anderson",
    faculty_code: "FAC005",
    department: "APS",
    designation: "Professor",
  },
  {
    _id: "fac_6",
    name: "Prof. James Brown",
    faculty_code: "FAC006",
    department: "HSS",
    designation: "Associate Professor",
  },
];

const MOCK_COURSES = [
  {
    _id: "course_1",
    course_name: "Data Structures",
    course_code: "CS101",
    semester_offered: 1,
    department: "CSE",
    course_type: "THEORY",
    nature: "CORE",
    credits: 4,
  },
  {
    _id: "course_2",
    course_name: "Algorithms",
    course_code: "CS102",
    semester_offered: 3,
    department: "CSE",
    course_type: "THEORY",
    nature: "CORE",
    credits: 4,
  },
  {
    _id: "course_3",
    course_name: "Programming Lab",
    course_code: "CS103",
    semester_offered: 1,
    department: "CSE",
    course_type: "LAB",
    nature: "CORE",
    credits: 2,
  },
  {
    _id: "course_4",
    course_name: "Digital Electronics",
    course_code: "EC201",
    semester_offered: 1,
    department: "ECE",
    course_type: "THEORY",
    nature: "CORE",
    credits: 3,
  },
  {
    _id: "course_5",
    course_name: "Thermodynamics",
    course_code: "ME301",
    semester_offered: 3,
    department: "MECH",
    course_type: "THEORY",
    nature: "CORE",
    credits: 3,
  },
  {
    _id: "course_6",
    course_name: "Engineering Mathematics",
    course_code: "MA101",
    semester_offered: 1,
    department: "APS",
    course_type: "THEORY",
    nature: "CORE",
    credits: 3,
  },
];

const EVEN_SEMS = new Set([2, 4, 6, 8]);
const ODD_SEMS = new Set([1, 3, 5, 7]);

// Faculty Search Component - Fixed positioning
const FacultySearch = ({
  faculties,
  value,
  onChange,
  placeholder = "Search faculty...",
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) {
      setQuery(value.name);
    } else {
      setQuery("");
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = faculties
    .filter(
      (f) =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.faculty_code.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 8);

  const handleSelect = (faculty) => {
    onChange(faculty);
    setQuery(faculty.name);
    setOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all duration-200 w-full ${
          open
            ? "border-emerald-400 ring-2 ring-emerald-100 dark:ring-emerald-900/30"
            : "border-gray-200 dark:border-gray-600 hover:border-emerald-300"
        } bg-white dark:bg-gray-800`}
      >
        <Search size={14} className="text-gray-400 flex-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200 placeholder-gray-400 min-w-0"
        />
        {value && (
          <X
            size={14}
            className="text-gray-400 hover:text-gray-600 cursor-pointer flex-none"
            onMouseDown={(e) => {
              e.preventDefault();
              handleClear();
            }}
          />
        )}
      </div>

      {open && query.length > 0 && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-64 overflow-y-auto">
          {filtered.map((f) => (
            <button
              key={f._id}
              type="button"
              onClick={() => handleSelect(f)}
              className="w-full text-left px-4 py-3 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0 cursor-pointer"
            >
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {f.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {f.faculty_code} · {f.department} · {f.designation}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Component
const CourseAssignmentTab = ({ session, onSave, onAssignmentsChange }) => {
  const [batches] = useState(MOCK_BATCHES);
  const [faculties] = useState(MOCK_FACULTIES);
  const [courses] = useState(MOCK_COURSES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState({});
  const [expandedBatches, setExpandedBatches] = useState({});
  const [savingBatch, setSavingBatch] = useState(null);
  const [isSavingAll, setIsSavingAll] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const termSems = session?.term === "EVEN" ? EVEN_SEMS : ODD_SEMS;
  const filteredBatches = batches.filter((b) => termSems.has(b.semester));

  const hasInitialized = useRef(false);

  // Initialize rows
  useEffect(() => {
    if (hasInitialized.current) return;
    if (!filteredBatches.length || !courses.length) return;

    hasInitialized.current = true;

    const newRows = {};
    filteredBatches.forEach((batch) => {
      const batchCourses = courses.filter(
        (c) =>
          c.semester_offered === batch.semester &&
          c.department === batch.department,
      );
      newRows[batch._id] = batchCourses.map((course) => ({
        rowId: crypto.randomUUID(),
        course,
        faculty: null,
        is_backlog: false,
        isManual: false,
      }));
    });
    setRows(newRows);

    const initialCollapseState = {};
    filteredBatches.forEach((batch) => {
      initialCollapseState[batch._id] = false;
    });
    setExpandedBatches(initialCollapseState);
  }, [filteredBatches, courses]);

  const toggleBatch = (batchId) => {
    setExpandedBatches((prev) => ({
      ...prev,
      [batchId]: !prev[batchId],
    }));
  };

  const updateRow = (batchId, rowId, patch) =>
    setRows((prev) => ({
      ...prev,
      [batchId]: prev[batchId].map((r) =>
        r.rowId === rowId ? { ...r, ...patch } : r,
      ),
    }));

  const addRow = (batchId) =>
    setRows((prev) => ({
      ...prev,
      [batchId]: [
        ...(prev[batchId] ?? []),
        {
          rowId: crypto.randomUUID(),
          course: null,
          faculty: null,
          is_backlog: true,
          isManual: true,
        },
      ],
    }));

  const deleteRow = (batchId, rowId) => {
    if (
      window.confirm("Are you sure you want to delete this course assignment?")
    ) {
      setRows((prev) => ({
        ...prev,
        [batchId]: prev[batchId].filter((r) => r.rowId !== rowId),
      }));
    }
  };

  const saveBatchAssignments = async (batchId) => {
    const batchRows = rows[batchId] || [];
    const incompleteRows = batchRows.filter((r) => !r.course || !r.faculty);

    if (incompleteRows.length > 0) {
      setError(
        "Please complete all course and faculty assignments for this batch before saving.",
      );
      setTimeout(() => setError(null), 3000);
      return;
    }

    const payload = batchRows
      .filter((r) => r.course && r.faculty)
      .map((r) => {
        const batch = batches.find((b) => b._id === batchId);
        return {
          _id: crypto.randomUUID(),
          session_id: session._id,
          batch_id: batchId,
          batch_name: batch?.batch_name,
          course_id: r.course,
          faculty_id: r.faculty,
          is_backlog: r.is_backlog,
          createdAt: new Date().toISOString(),
        };
      });

    if (payload.length === 0) {
      setError(
        "No complete assignments to save. Please assign faculty to courses.",
      );
      setTimeout(() => setError(null), 3000);
      return;
    }

    setSavingBatch(batchId);
    setError(null);

    setTimeout(() => {
      const savedAssignments = localStorage.getItem("courseAssignments");
      let assignments = savedAssignments ? JSON.parse(savedAssignments) : {};
      if (!assignments[session._id]) assignments[session._id] = [];

      assignments[session._id] = assignments[session._id].filter(
        (a) => a.batch_id !== batchId,
      );
      assignments[session._id].push(...payload);
      localStorage.setItem("courseAssignments", JSON.stringify(assignments));

      setSavingBatch(null);
      if (onAssignmentsChange) onAssignmentsChange(assignments[session._id]);

      alert(
        `✅ Successfully saved ${payload.length} course assignments for this batch!`,
      );
    }, 1000);
  };

  const saveAllAssignments = async () => {
    let allPayloads = [];
    let hasErrors = false;

    for (const batchId of Object.keys(rows)) {
      const batchRows = rows[batchId] || [];
      const incompleteRows = batchRows.filter((r) => !r.course || !r.faculty);

      if (incompleteRows.length > 0) {
        const batch = batches.find((b) => b._id === batchId);
        setError(
          `Batch "${batch?.batch_name}" has incomplete assignments. Please complete all assignments before saving.`,
        );
        hasErrors = true;
        setTimeout(() => setError(null), 3000);
        break;
      }

      batchRows.forEach((r) => {
        if (r.course && r.faculty) {
          const batch = batches.find((b) => b._id === batchId);
          allPayloads.push({
            _id: crypto.randomUUID(),
            session_id: session._id,
            batch_id: batchId,
            batch_name: batch?.batch_name,
            course_id: r.course,
            faculty_id: r.faculty,
            is_backlog: r.is_backlog,
            createdAt: new Date().toISOString(),
          });
        }
      });
    }

    if (hasErrors) return;

    if (allPayloads.length === 0) {
      setError(
        "No complete assignments to save. Please assign faculty to courses.",
      );
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsSavingAll(true);
    setError(null);

    setTimeout(() => {
      const savedAssignments = localStorage.getItem("courseAssignments");
      let assignments = savedAssignments ? JSON.parse(savedAssignments) : {};
      assignments[session._id] = allPayloads;
      localStorage.setItem("courseAssignments", JSON.stringify(assignments));

      setIsSavingAll(false);
      if (onSave) onSave(allPayloads);
      if (onAssignmentsChange) onAssignmentsChange(allPayloads);

      alert(
        `✅ Successfully saved ${allPayloads.length} course assignments for all batches!`,
      );
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-emerald-500 mb-3" />
        <p className="text-sm text-gray-500">Loading course data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-4 sm:p-5 border border-emerald-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FileText size={16} className="text-emerald-600" />
              Course Assignment Overview
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {session?.term} term · {filteredBatches.length} batches ·
              Auto-populated courses
            </p>
          </div>
          <button
            onClick={saveAllAssignments}
            disabled={isSavingAll}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {isSavingAll && <Loader2 size={16} className="animate-spin" />}
            {isSavingAll ? "Saving All..." : "Save All Assignments"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Batches List */}
      {filteredBatches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
          <BookOpen size={48} className="opacity-20 mb-3" />
          <p className="text-sm">
            No batches found for the {session?.term} term.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBatches.map((batch) => {
            const batchRows = rows[batch._id] ?? [];
            const isExpanded = expandedBatches[batch._id];
            const assignedCount = batchRows.filter((r) => r.faculty).length;
            const totalCourses = batchRows.length;
            const progressPercentage = (assignedCount / totalCourses) * 100;
            const isSaving = savingBatch === batch._id;

            return (
              <div
                key={batch._id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Batch Header */}
                <button
                  onClick={() => toggleBatch(batch._id)}
                  className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-emerald-500">
                      {isExpanded ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                          {batch.batch_name}
                        </h4>
                        <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
                          Sem {batch.semester}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {batch.department} · {batch.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block w-24">
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center">
                        {assignedCount}/{totalCourses}
                      </p>
                    </div>

                    <div className="sm:hidden text-right">
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {assignedCount}/{totalCourses}
                      </p>
                    </div>

                    {batchRows.some((r) => r.is_backlog) && (
                      <span className="px-2 py-1 text-[10px] font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                        Backlog
                      </span>
                    )}
                  </div>
                </button>

                {/* Content */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-700">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-12">
                              #
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              Course
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              Assigned Faculty
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 w-20">
                              Backlog
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 w-20">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                          {batchRows.map((row, idx) => {
                            const deptCourses = courses.filter(
                              (c) => c.department === batch.department,
                            );
                            const relevantFaculty = faculties.filter(
                              (f) =>
                                f.department === batch.department ||
                                f.department === "APS" ||
                                f.department === "HSS",
                            );

                            return (
                              <tr
                                key={row.rowId}
                                className={`transition-colors ${
                                  row.is_backlog
                                    ? "bg-amber-50/30 dark:bg-amber-900/5"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                                }`}
                              >
                                <td className="px-4 py-3 text-xs text-gray-500">
                                  {idx + 1}
                                </td>
                                <td className="px-4 py-3">
                                  {row.isManual ? (
                                    <select
                                      value={row.course?._id ?? ""}
                                      onChange={(e) => {
                                        const c = deptCourses.find(
                                          (c) => c._id === e.target.value,
                                        );
                                        updateRow(batch._id, row.rowId, {
                                          course: c ?? null,
                                        });
                                      }}
                                      className="text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 w-full max-w-xs"
                                    >
                                      <option value="">Select course...</option>
                                      {deptCourses.map((c) => (
                                        <option key={c._id} value={c._id}>
                                          {c.course_code} – {c.course_name} (
                                          {c.credits} credits)
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <div>
                                      <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                                        {row.course?.course_name}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {row.course?.course_code} ·{" "}
                                        {row.course?.course_type} ·{" "}
                                        {row.course?.nature} ·{" "}
                                        {row.course?.credits} credits
                                      </p>
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <FacultySearch
                                    faculties={relevantFaculty}
                                    value={row.faculty}
                                    onChange={(f) =>
                                      updateRow(batch._id, row.rowId, {
                                        faculty: f,
                                      })
                                    }
                                    placeholder="Search faculty..."
                                  />
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <input
                                    type="checkbox"
                                    checked={row.is_backlog}
                                    onChange={(e) =>
                                      updateRow(batch._id, row.rowId, {
                                        is_backlog: e.target.checked,
                                      })
                                    }
                                    className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                                  />
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() =>
                                      deleteRow(batch._id, row.rowId)
                                    }
                                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Delete Row"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden p-4 space-y-3">
                      {batchRows.map((row, idx) => {
                        const deptCourses = courses.filter(
                          (c) => c.department === batch.department,
                        );
                        const relevantFaculty = faculties.filter(
                          (f) =>
                            f.department === batch.department ||
                            f.department === "APS" ||
                            f.department === "HSS",
                        );

                        return (
                          <div
                            key={row.rowId}
                            className={`bg-white dark:bg-gray-800 rounded-lg border p-4 ${
                              row.is_backlog
                                ? "border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/10"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">
                                  #{idx + 1}
                                </span>
                                {row.is_backlog && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                                    Backlog
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => deleteRow(batch._id, row.rowId)}
                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete Row"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="mb-3">
                              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                                Course
                              </label>
                              {row.isManual ? (
                                <select
                                  value={row.course?._id ?? ""}
                                  onChange={(e) => {
                                    const c = deptCourses.find(
                                      (c) => c._id === e.target.value,
                                    );
                                    updateRow(batch._id, row.rowId, {
                                      course: c ?? null,
                                    });
                                  }}
                                  className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-emerald-400"
                                >
                                  <option value="">Select course...</option>
                                  {deptCourses.map((c) => (
                                    <option key={c._id} value={c._id}>
                                      {c.course_code} – {c.course_name} (
                                      {c.credits} credits)
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                  <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                                    {row.course?.course_name || "Not assigned"}
                                  </p>
                                  {row.course && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      {row.course.course_code} ·{" "}
                                      {row.course.course_type} ·{" "}
                                      {row.course.credits} credits
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="mb-3">
                              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                                Assigned Faculty
                              </label>
                              <FacultySearch
                                faculties={relevantFaculty}
                                value={row.faculty}
                                onChange={(f) =>
                                  updateRow(batch._id, row.rowId, {
                                    faculty: f,
                                  })
                                }
                                placeholder="Search faculty..."
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`backlog-mobile-${row.rowId}`}
                                checked={row.is_backlog}
                                onChange={(e) =>
                                  updateRow(batch._id, row.rowId, {
                                    is_backlog: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                              />
                              <label
                                htmlFor={`backlog-mobile-${row.rowId}`}
                                className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                              >
                                Mark as Backlog Course
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col sm:flex-row gap-3 justify-between">
                      <button
                        onClick={() => addRow(batch._id)}
                        className="flex items-center justify-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors"
                      >
                        <Plus size={16} />
                        Add Backlog Course
                      </button>
                      <button
                        onClick={() => saveBatchAssignments(batch._id)}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-all"
                      >
                        {isSaving && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        {isSaving ? "Saving..." : "Save Batch Assignments"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseAssignmentTab;
