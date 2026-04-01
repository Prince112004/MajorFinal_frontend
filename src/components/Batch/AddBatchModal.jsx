import React, { useState } from "react";
import CustomDropdown from "../../ui/CustomDropdown";
import { toast } from "react-toastify";

const AddBatchModal = ({ selectedBranch, onClose, onSave }) => {
  const [inputMethod, setInputMethod] = useState("manual");
  const [previewData, setPreviewData] = useState([]);

  const [manualForm, setManualForm] = useState({
    batchName: "",
    degree: "B.Tech",
    year: "1st Year",
    semester: "1",
    status: "Active",
    students: "",
  });

  const [pasteData, setPasteData] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleManualAdd = () => {
    // 🔴 Validation Toast
    if (!manualForm.batchName || !manualForm.students) {
      toast.error("Batch Name and Total Students are required!", {
        position: "top-center",
      });
      return;
    }

    setPreviewData([
      ...previewData,
      { id: Date.now(), ...manualForm, branch: selectedBranch },
    ]);
    setManualForm({ ...manualForm, batchName: "", students: "" });

    // 🟢 Success Toast
    toast.success("Batch added to preview!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handlePasteParse = () => {
    if (!pasteData.trim()) {
      toast.warning("Please paste some data first!", {
        position: "top-center",
      });
      return;
    }

    const rows = pasteData.split("\n");
    const newBatches = rows
      .filter((row) => row.trim() !== "")
      .map((row, index) => {
        const [batchName, degree, year, semester, status, students] =
          row.split(",");
        return {
          id: Date.now() + index,
          branch: selectedBranch,
          batchName: batchName?.trim() || "",
          degree: degree?.trim() || "B.Tech",
          year: year?.trim() || "1st Year",
          semester: semester?.trim() || "1",
          status: status?.trim() || "Active",
          students: students?.trim() || "",
        };
      });

    if (newBatches.length > 0) {
      setPreviewData([...previewData, ...newBatches]);
      setPasteData("");
      toast.success(`Successfully parsed ${newBatches.length} batches!`, {
        position: "top-center",
      });
    } else {
      toast.error("Could not parse data. Please check the format.", {
        position: "top-center",
      });
    }
  };

  const handleDeletePreview = (id) => {
    setPreviewData(previewData.filter((item) => item.id !== id));
    toast.info("Batch removed from preview", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const startEditing = (data) => {
    setEditingId(data.id);
    setEditForm(data);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editForm.batchName || !editForm.students) {
      toast.error("Batch Name and Students cannot be empty!");
      return;
    }
    setPreviewData(
      previewData.map((item) => (item.id === editingId ? editForm : item)),
    );
    setEditingId(null);
    toast.success("Changes saved!", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const handleFinalSubmit = () => {
    onSave(previewData);
    toast.info(
      `${previewData.length} batch(es) moved to pending state. Don't forget to save to database!`,
      {
        position: "bottom-right",
        theme: "dark",
      },
    );
    setPreviewData([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-100 dark:border-slate-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900/50 shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Add New Batches
            </h2>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">
              Target Branch: {selectedBranch}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-gray-500 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Animated Input Method Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit mx-auto">
            {["manual", "paste", "upload"].map((method) => (
              <button
                key={method}
                onClick={() => setInputMethod(method)}
                className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                  inputMethod === method
                    ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400 scale-100"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100"
                }`}
              >
                {method} Entry
              </button>
            ))}
          </div>

          {/* ========================================= */}
          {/* FULL MANUAL ENTRY FORM (Restored) */}
          {/* ========================================= */}
          {inputMethod === "manual" && (
            <div className="bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Batch Name */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Batch Name
                  </label>
                  <input
                    list="batch-suggestions"
                    placeholder="e.g. 1st_Year_Sec_A"
                    value={manualForm.batchName}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        batchName: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-gray-100 font-medium"
                  />
                  <datalist id="batch-suggestions">
                    <option value="1st_Year_Sec_A" />
                    <option value="1st_Year_Sec_B" />
                    <option value={`${selectedBranch}_3rd_Sem`} />
                    <option value={`${selectedBranch}_5th_Sem_Minor`} />
                    <option value="Final_Year_Main" />
                  </datalist>
                </div>

                {/* Degree Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Degree
                  </label>
                  <CustomDropdown
                    options={["B.Tech", "M.Tech", "BCA", "MCA", "Diploma"]}
                    value={manualForm.degree}
                    onChange={(val) =>
                      setManualForm({ ...manualForm, degree: val })
                    }
                  />
                </div>

                {/* Year Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Year
                  </label>
                  <CustomDropdown
                    options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
                    value={manualForm.year}
                    onChange={(val) =>
                      setManualForm({ ...manualForm, year: val })
                    }
                  />
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Semester
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={manualForm.semester}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, semester: e.target.value })
                    }
                    placeholder="1-8"
                    className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-gray-100 font-medium"
                  />
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <CustomDropdown
                    options={[
                      { label: "🟢 Active", value: "Active" },
                      { label: "🟡 Upcoming", value: "Upcoming" },
                      { label: "⚫ Passed", value: "Passed" },
                    ]}
                    value={manualForm.status}
                    onChange={(val) =>
                      setManualForm({ ...manualForm, status: val })
                    }
                  />
                </div>

                {/* Total Students */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Total Students
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 60"
                    value={manualForm.students}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, students: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-gray-100 font-medium"
                  />
                </div>

                <div className="lg:col-span-2 flex items-end">
                  <button
                    onClick={handleManualAdd}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                  >
                    + Add to Preview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* FULL PASTE ENTRY FORM (Restored) */}
          {/* ========================================= */}
          {inputMethod === "paste" && (
            <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
              <p className="text-sm text-gray-500 mb-3 font-medium">
                Format:{" "}
                <code className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md">
                  Name, Degree, Year, Sem, Status, Students
                </code>
              </p>
              <textarea
                rows="5"
                value={pasteData}
                onChange={(e) => setPasteData(e.target.value)}
                placeholder="1st_Year_Sec_A, B.Tech, 1st Year, 1, Active, 60&#10;CSE_3rd_Sem, B.Tech, 2nd Year, 3, Upcoming, 120"
                className="w-full p-4 border border-gray-200 rounded-2xl dark:bg-slate-900 dark:border-slate-700 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-gray-100"
              />
              <button
                onClick={handlePasteParse}
                className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
              >
                Parse Data
              </button>
            </div>
          )}

          {/* ========================================= */}
          {/* FULL UPLOAD ENTRY FORM (Restored) */}
          {/* ========================================= */}
          {inputMethod === "upload" && (
            <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl p-12 text-center bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <svg
                className="w-12 h-12 mx-auto text-indigo-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              <p className="font-bold text-gray-700 dark:text-gray-300">
                Click to upload Excel File
              </p>
              <p className="text-sm text-gray-500 mt-1">Supports .csv, .xlsx</p>
              <input type="file" accept=".csv, .xlsx" className="hidden" />
            </div>
          )}

          {/* PREVIEW SECTION WITH INLINE EDITING */}
          {previewData.length > 0 && (
            <div className="mt-10 border-t border-gray-100 dark:border-slate-800 pt-8">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-extrabold text-gray-800 dark:text-white">
                  Data Preview
                </h3>
                <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-1 rounded-lg text-xs font-bold">
                  {previewData.length} pending
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {previewData.map((data) => (
                  <div
                    key={data.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden"
                  >
                    {/* EDIT MODE */}
                    {editingId === data.id ? (
                      <div className="p-4 grid grid-cols-2 md:grid-cols-6 gap-3 items-end bg-indigo-50/50 dark:bg-indigo-900/10">
                        <div className="col-span-2 md:col-span-2">
                          <label className="text-xs text-gray-500 font-bold mb-1 block">
                            Name
                          </label>
                          <input
                            value={editForm.batchName}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                batchName: e.target.value,
                              })
                            }
                            className="w-full p-2 text-sm bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 font-bold mb-1 block">
                            Degree
                          </label>
                          <input
                            value={editForm.degree}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                degree: e.target.value,
                              })
                            }
                            className="w-full p-2 text-sm bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 font-bold mb-1 block">
                            Sem
                          </label>
                          <input
                            value={editForm.semester}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                semester: e.target.value,
                              })
                            }
                            className="w-full p-2 text-sm bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 font-bold mb-1 block">
                            Students
                          </label>
                          <input
                            type="number"
                            value={editForm.students}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                students: e.target.value,
                              })
                            }
                            className="w-full p-2 text-sm bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div className="flex gap-2 justify-end col-span-2 md:col-span-1">
                          <button
                            onClick={saveEdit}
                            className="p-2 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 rounded-lg transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* DISPLAY MODE */
                      <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-md">
                            {data.batchName}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs font-medium mt-2">
                            <span className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                              {data.degree}
                            </span>
                            <span className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                              Sem {data.semester}
                            </span>
                            <span
                              className={`${data.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"} px-2 py-1 rounded-md`}
                            >
                              {data.status}
                            </span>
                            <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md">
                              {data.students} Students
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(data)}
                            className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeletePreview(data.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleFinalSubmit}
            disabled={previewData.length === 0}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${previewData.length > 0 ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/30" : "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none"}`}
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBatchModal;
