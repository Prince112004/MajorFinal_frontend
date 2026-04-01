import React, { useState, useEffect } from "react";
import BatchHeader from "../Batch/BatchHeader";
import AddBatchModal from "../Batch/AddBatchModal";
import BatchList from "../Batch/BatchList";
import useAdminStore from "../../store/useAdminStore";
import { toast } from "react-toastify";

const Batch = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [pendingBatches, setPendingBatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to track which card is currently being edited
  const [editingBatch, setEditingBatch] = useState(null);

  const {
    batches: storeBatches,
    fetchBatches,
    saveBatchesToBackend,
    updateBatchInBackend, // Extracted new action
    deleteBatchFromBackend, // Extracted new action
    isLoading,
    isSaving,
  } = useAdminStore();

  useEffect(() => {
    if (selectedBranch) {
      fetchBatches(selectedBranch);
    }
  }, [selectedBranch, fetchBatches]);

  const currentBranchPending = pendingBatches.filter(
    (b) => b.branch === selectedBranch,
  );

  const displayBatches = [...storeBatches, ...currentBranchPending];

  const handleSaveToPending = (newBatches) => {
    setPendingBatches([...pendingBatches, ...newBatches]);
  };

  const handleFinalSubmit = async () => {
    const success = await saveBatchesToBackend(
      selectedBranch,
      currentBranchPending,
    );

    if (success) {
      toast.success(
        `${currentBranchPending.length} batch(es) saved to database successfully!`,
        { position: "bottom-right", theme: "colored" },
      );
      setPendingBatches((prev) =>
        prev.filter((b) => b.branch !== selectedBranch),
      );
    } else {
      toast.error("Failed to save batches to the database. Please try again.", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  // ==========================================
  // 🛠️ EDIT & DELETE HANDLERS FOR CARDS
  // ==========================================

  const handleEditClick = (batch) => {
    setEditingBatch(batch); // Opens the edit modal with this card's data
  };

  const handleDeleteClick = async (batchId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this batch?",
    );
    if (!confirmDelete) return;

    // 1. Check if the batch is in the "pending" list
    const isPending = pendingBatches.some((b) => b.id === batchId);

    if (isPending) {
      // Remove from local pending state
      setPendingBatches((prev) => prev.filter((b) => b.id !== batchId));
      toast.info("Pending batch removed.", { position: "bottom-right" });
    } else {
      // 2. If it's saved in the database, trigger backend delete logic
      const success = await deleteBatchFromBackend(batchId);
      if (success) {
        toast.success("Batch deleted from database.", {
          position: "bottom-right",
        });
      } else {
        toast.error("Failed to delete batch from database.", {
          position: "bottom-right",
        });
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingBatch.batchName || !editingBatch.students) {
      toast.error("Batch Name and Students are required!");
      return;
    }

    const isPending = pendingBatches.some((b) => b.id === editingBatch.id);

    if (isPending) {
      // Update the local pending state
      setPendingBatches((prev) =>
        prev.map((b) => (b.id === editingBatch.id ? editingBatch : b)),
      );
      toast.success("Pending batch updated successfully!", {
        position: "bottom-right",
      });
      setEditingBatch(null); // Close the modal
    } else {
      // Trigger backend edit
      const success = await updateBatchInBackend(editingBatch.id, editingBatch);
      if (success) {
        toast.success("Batch updated in database successfully!", {
          position: "bottom-right",
        });
        setEditingBatch(null); // Close the modal on success
      } else {
        toast.error("Failed to update batch in database.", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#0f172a] p-1  font-sans text-gray-800 dark:text-gray-100 relative">
      <div className="max-w-7xl mx-auto space-y-4">
        <BatchHeader
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          onAddClick={() => {
            if (!selectedBranch) {
              toast.warn("Please select a branch first!");
              return;
            }
            setIsModalOpen(true);
          }}
        />

        {/* DYNAMIC FINAL SAVE BANNER */}
        {currentBranchPending.length > 0 && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-500/30 rounded-full text-indigo-600 dark:text-indigo-400">
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-100">
                  Unsaved Changes
                </h3>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  You have <strong>{currentBranchPending.length}</strong> new
                  batch(es) for {selectedBranch} waiting to be pushed to the
                  database.
                </p>
              </div>
            </div>

            <button
              onClick={handleFinalSubmit}
              disabled={isSaving}
              className={`px-6 py-2.5 rounded-xl font-bold shadow-md transition-all flex items-center gap-2 ${
                isSaving
                  ? "bg-indigo-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
              }`}
            >
              {isSaving ? "Saving..." : "Save to Database"}
            </button>
          </div>
        )}

        {/* LOADING & LIST DISPLAY */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <svg
              className="animate-spin h-8 w-8 text-indigo-500"
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
        ) : (
          <BatchList
            selectedBranch={selectedBranch}
            batches={displayBatches}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        {isModalOpen && (
          <AddBatchModal
            selectedBranch={selectedBranch}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveToPending}
          />
        )}

        {/* ========================================== */}
        {/* ✏️ DEDICATED EDIT MODAL FOR CARDS          */}
        {/* ========================================== */}
        {editingBatch && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-gray-100 dark:border-slate-800 animate-fade-in-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  Edit Batch
                </h2>
                <button
                  onClick={() => setEditingBatch(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Batch Name
                  </label>
                  <input
                    value={editingBatch.batchName}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        batchName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Degree
                  </label>
                  <select
                    value={editingBatch.degree}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        degree: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-gray-800 dark:text-white font-medium"
                  >
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Status
                  </label>
                  <select
                    value={editingBatch.status}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        status: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-gray-800 dark:text-white font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Passed">Passed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Semester
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={editingBatch.semester}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        semester: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Total Students
                  </label>
                  <input
                    type="number"
                    value={editingBatch.students}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        students: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setEditingBatch(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold text-gray-600 dark:text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batch;
