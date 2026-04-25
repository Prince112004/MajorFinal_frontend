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
} from "lucide-react";

// ========== MOCK DATA ==========
const MOCK_BATCHES = [
  { _id: "batch_1", batch_name: "CSE 2024 - Section A", department: "CSE", year: "1st Year", semester: 1 },
  { _id: "batch_2", batch_name: "CSE 2023 - Section B", department: "CSE", year: "2nd Year", semester: 3 },
  { _id: "batch_3", batch_name: "ECE 2024 - Section A", department: "ECE", year: "1st Year", semester: 1 },
  { _id: "batch_4", batch_name: "ECE 2023 - Section A", department: "ECE", year: "2nd Year", semester: 3 },
  { _id: "batch_5", batch_name: "MECH 2024 - Section A", department: "MECH", year: "1st Year", semester: 1 },
  { _id: "batch_6", batch_name: "CSE 2022 - Section A", department: "CSE", year: "3rd Year", semester: 5 },
];

const MOCK_FACULTIES = [
  { _id: "fac_1", name: "Dr. Sarah Johnson", faculty_code: "FAC001", department: "CSE", designation: "Professor" },
  { _id: "fac_2", name: "Prof. Michael Chen", faculty_code: "FAC002", department: "CSE", designation: "Associate Professor" },
  { _id: "fac_3", name: "Dr. Emily Davis", faculty_code: "FAC003", department: "ECE", designation: "Professor" },
  { _id: "fac_4", name: "Prof. Robert Wilson", faculty_code: "FAC004", department: "MECH", designation: "Assistant Professor" },
  { _id: "fac_5", name: "Dr. Lisa Anderson", faculty_code: "FAC005", department: "APS", designation: "Professor" },
  { _id: "fac_6", name: "Prof. James Brown", faculty_code: "FAC006", department: "HSS", designation: "Associate Professor" },
];

const MOCK_COURSES = [
  { _id: "course_1", course_name: "Data Structures", course_code: "CS101", semester_offered: 1, department: "CSE", course_type: "THEORY", nature: "CORE", credits: 4 },
  { _id: "course_2", course_name: "Algorithms", course_code: "CS102", semester_offered: 3, department: "CSE", course_type: "THEORY", nature: "CORE", credits: 4 },
  { _id: "course_3", course_name: "Programming Lab", course_code: "CS103", semester_offered: 1, department: "CSE", course_type: "LAB", nature: "CORE", credits: 2 },
  { _id: "course_4", course_name: "Digital Electronics", course_code: "EC201", semester_offered: 1, department: "ECE", course_type: "THEORY", nature: "CORE", credits: 3 },
  { _id: "course_5", course_name: "Thermodynamics", course_code: "ME301", semester_offered: 3, department: "MECH", course_type: "THEORY", nature: "CORE", credits: 3 },
  { _id: "course_6", course_name: "Engineering Mathematics", course_code: "MA101", semester_offered: 1, department: "APS", course_type: "THEORY", nature: "CORE", credits: 3 },
];

const EVEN_SEMS = new Set([2, 4, 6, 8]);
const ODD_SEMS = new Set([1, 3, 5, 7]);

// ── Faculty inline search cell ────────────────────────────────────────────────
const FacultyCell = ({ faculties, value, onChange }) => {
  const [query, setQuery] = useState(value?.name ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!value) setQuery("");
  }, [value]);

  const filtered = faculties
    .filter(
      (f) =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.faculty_code.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 8);

  return (
    <div ref={ref} className="relative min-w-[180px]">
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs transition-all ${
          open
            ? "border-emerald-400 ring-1 ring-emerald-300 dark:ring-emerald-500/40"
            : "border-gray-200 dark:border-gray-600"
        } bg-white dark:bg-gray-800/80`}
      >
        <Search size={11} className="text-gray-400 flex-none" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Assign faculty…"
          className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200 placeholder-gray-400 w-28 min-w-0"
        />
        {value && (
          <X
            size={11}
            className="text-gray-400 hover:text-gray-600 cursor-pointer flex-none"
            onMouseDown={(e) => {
              e.preventDefault();
              onChange(null);
              setQuery("");
            }}
          />
        )}
      </div>

      {open && query.length > 0 && (
        <div className="absolute z-30 top-full left-0 mt-1 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-44 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-3 py-2.5 text-xs text-gray-400 italic">
              No faculty found
            </p>
          ) : (
            filtered.map((f) => (
              <button
                key={f._id}
                onMouseDown={() => {
                  onChange(f);
                  setQuery(f.name);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
              >
                <p className="text-xs font-medium text-gray-800 dark:text-gray-100">
                  {f.name}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {f.faculty_code} · {f.department}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const CourseAssignmentTab = ({ session, onSave }) => {
  // ========== BACKEND INTEGRATION (COMMENTED FOR NOW) ==========
  // const {
  //   batches = [],
  //   fetchBatches,
  //   faculties = [],
  //   fetchFaculties,
  //   courses = [],
  //   fetchAllCourses,
  //   saveCourseAssignments,
  //   isLoading,
  //   error,
  // } = useAdminStore();

  // ========== MOCK STATE ==========
  const [batches] = useState(MOCK_BATCHES);
  const [faculties] = useState(MOCK_FACULTIES);
  const [courses] = useState(MOCK_COURSES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // rows shape: { [batchId]: [{ rowId, course, faculty, is_backlog, isManual }] }
  const [rows, setRows] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // ========== MOCK INITIALIZATION ==========
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const termSems = session?.term === "EVEN" ? EVEN_SEMS : ODD_SEMS;
  const filteredBatches = batches.filter((b) => termSems.has(b.semester));

  // Auto-populate rows once data is ready
  useEffect(() => {
    if (!filteredBatches.length || !courses.length) return;

    setRows((prev) => {
      const next = { ...prev };
      filteredBatches.forEach((batch) => {
        if (next[batch._id]) return;
        const batchCourses = courses.filter(
          (c) =>
            c.semester_offered === batch.semester &&
            c.department === batch.department,
        );
        next[batch._id] = batchCourses.map((course) => ({
          rowId: crypto.randomUUID(),
          course,
          faculty: null,
          is_backlog: false,
          isManual: false,
        }));
      });
      return next;
    });
  }, [filteredBatches, batches, courses, session?.term]);

  const toggleCollapse = (batchId) =>
    setCollapsed((prev) => ({ ...prev, [batchId]: !prev[batchId] }));

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

  const removeRow = (batchId, rowId) =>
    setRows((prev) => ({
      ...prev,
      [batchId]: prev[batchId].filter((r) => r.rowId !== rowId),
    }));

  const handleSave = async () => {
    const payload = [];
    Object.entries(rows).forEach(([batchId, batchRows]) => {
      batchRows.forEach((r) => {
        if (!r.course || !r.faculty) return;
        payload.push({
          session_id: session._id,
          batch_id: batchId,
          course_id: r.course._id,
          faculty_id: r.faculty._id,
          is_backlog: r.is_backlog,
        });
      });
    });

    if (payload.length === 0) {
      setError("No complete assignments to save. Please assign faculty to courses.");
      return;
    }

    setIsSaving(true);
    setError(null);

    // ========== BACKEND INTEGRATION (COMMENTED) ==========
    // await saveCourseAssignments?.(payload);
    
    // ========== FRONTEND SIMULATION (ACTIVE) ==========
    setTimeout(() => {
      console.log("Course assignments saved:", payload);
      console.log("Total assignments:", payload.length);
      
      setIsSaving(false);
      
      // Call onSave callback if provided
      if (onSave) {
        onSave(payload);
      }
      
      // Show success message (you can add a toast notification here)
      alert(`Successfully saved ${payload.length} course assignments!`);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-emerald-500" />
        <span className="ml-3 text-sm text-gray-400">Loading course data…</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Auto-populated for the{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {session?.term}
            </span>{" "}
            term. Assign faculty and mark backlog rows as needed.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Courses are automatically loaded based on semester and department
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-[1px]"
        >
          {isSaving && <Loader2 size={14} className="animate-spin" />}
          Save All Assignments
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* ── Batch sections ── */}
      {filteredBatches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500 text-sm gap-2">
          <BookOpen size={36} className="opacity-20" />
          <p>No batches found for the {session?.term} term.</p>
          <p className="text-xs">Please check if batches are created for this semester</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredBatches.map((batch) => {
            const batchRows = rows[batch._id] ?? [];
            const isCollapsed = !!collapsed[batch._id];

            const deptCourses = courses.filter(
              (c) => c.department === batch.department,
            );

            const relevantFaculty = faculties.filter(
              (f) =>
                f.department === batch.department ||
                f.department === "APS" ||
                f.department === "HSS",
            );

            const assignedCount = batchRows.filter((r) => r.faculty).length;
            const totalCourses = batchRows.length;

            return (
              <div
                key={batch._id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden transition-all"
              >
                {/* Batch header — clickable to collapse */}
                <button
                  onClick={() => toggleCollapse(batch._id)}
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isCollapsed ? (
                      <ChevronRight size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                        {batch.batch_name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {batch.department} · Year {batch.year} · Sem{" "}
                        {batch.semester} ·{" "}
                        <span className="text-emerald-400">
                          {assignedCount}/{totalCourses} assigned
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Pill badges */}
                  <div className="flex items-center gap-2">
                    {batchRows.some((r) => r.is_backlog) && (
                      <span className="px-2 py-0.5 text-[11px] font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full">
                        has backlog
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full">
                      {totalCourses} courses
                    </span>
                  </div>
                </button>

                {/* Rows table */}
                {!isCollapsed && (
                  <div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                          <th className="text-left px-5 py-2.5 text-xs font-medium text-gray-400 w-8">
                            #
                          </th>
                          <th className="text-left px-5 py-2.5 text-xs font-medium text-gray-400">
                            Course
                          </th>
                          <th className="text-left px-5 py-2.5 text-xs font-medium text-gray-400">
                            Assigned Faculty
                          </th>
                          <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-400">
                            Backlog
                          </th>
                          <th className="px-4 py-2.5 w-8" />
                        </td>
                      </thead>

                      <tbody className="divide-y divide-gray-50 dark:divide-gray-700/40">
                        {batchRows.map((row, idx) => (
                          <tr
                            key={row.rowId}
                            className={`transition-colors ${
                              row.is_backlog
                                ? "bg-amber-50/60 dark:bg-amber-900/10"
                                : "hover:bg-gray-50/70 dark:hover:bg-gray-700/20"
                            }`}
                          >
                            {/* # */}
                            <td className="px-5 py-3 text-xs text-gray-400">
                              {idx + 1}
                            </td>

                            {/* Course */}
                            <td className="px-5 py-3">
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
                                  className="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-2.5 py-1.5 text-gray-700 dark:text-gray-200 outline-none focus:ring-1 focus:ring-emerald-400 w-full max-w-xs"
                                >
                                  <option value="">— Select course —</option>
                                  {deptCourses.map((c) => (
                                    <option key={c._id} value={c._id}>
                                      {c.course_code} – {c.course_name}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <div>
                                  <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                                    {row.course?.course_name}
                                  </p>
                                  <p className="text-[11px] text-gray-400 mt-0.5">
                                    {row.course?.course_code} ·{" "}
                                    {row.course?.course_type} ·{" "}
                                    {row.course?.nature} · {row.course?.credits} credits
                                  </p>
                                </div>
                              )}
                            </td>

                            {/* Faculty search */}
                            <td className="px-5 py-3">
                              <FacultyCell
                                faculties={relevantFaculty}
                                value={row.faculty}
                                onChange={(f) =>
                                  updateRow(batch._id, row.rowId, {
                                    faculty: f,
                                  })
                                }
                              />
                            </td>

                            {/* Backlog toggle */}
                            <td className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={row.is_backlog}
                                onChange={(e) =>
                                  updateRow(batch._id, row.rowId, {
                                    is_backlog: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                              />
                            </td>

                            {/* Delete (manual rows only) */}
                            <td className="px-4 py-3">
                              {row.isManual && (
                                <button
                                  onClick={() =>
                                    removeRow(batch._id, row.rowId)
                                  }
                                  className="p-1 text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors"
                                  title="Remove row"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Add backlog row */}
                    <div className="px-5 py-3 border-t border-dashed border-gray-200 dark:border-gray-700/60 bg-gray-50/30 dark:bg-gray-800/20">
                      <button
                        onClick={() => addRow(batch._id)}
                        className="flex items-center gap-1.5 text-xs text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                      >
                        <Plus size={13} />
                        Add backlog course
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