import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, Loader2, AlertCircle, X } from "lucide-react";
import useAdminStore from "../../store/useAdminStore";

// ─── Create / Edit Modal ──────────────────────────────────────────────────────
const SessionModal = ({ isOpen, onClose, existingSession }) => {
  const { createAcademicSession, updateAcademicSession, isSaving } =
    useAdminStore();

  const isEditing = !!existingSession;
  const [form, setForm] = useState({
    academic_year: "",
    term: "",
    isActive: false,
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setForm({
        academic_year: existingSession.academic_year ?? "",
        term: existingSession.term ?? "",
        isActive: existingSession.isActive ?? false,
      });
    } else {
      setForm({ academic_year: "", term: "", isActive: false });
    }
    setFormError(null);
  }, [existingSession, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!form.academic_year.trim() || !form.term.trim()) {
      setFormError("Academic year and term are required.");
      return;
    }

    const result = isEditing
      ? await updateAcademicSession(existingSession._id, form)
      : await createAcademicSession(form);

    if (result?.success === false) {
      setFormError(result.message || "Something went wrong.");
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {isEditing ? "Edit Academic Session" : "Create Academic Session"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {formError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={15} />
              {formError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Academic Year
            </label>
            <input
              type="text"
              name="academic_year"
              value={form.academic_year}
              onChange={handleChange}
              placeholder="e.g. 2024-2025"
              className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Term
            </label>
            <input
              type="text"
              name="term"
              value={form.term}
              onChange={handleChange}
              placeholder="ODD\EVEN"
              className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              Mark as Active
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isSaving && <Loader2 size={14} className="animate-spin" />}
              {isEditing ? "Save Changes" : "Create Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteModal = ({ session, onClose, onConfirm, isDeleting }) => {
  if (!session) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Trash2 size={18} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Delete Session
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {session.academic_year} — {session.term}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {isDeleting && <Loader2 size={14} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const GenerateTable = ({ setActiveView, setSelectedSession }) => {
  const { academicSessions, fetchAcademicSessions, deleteAcademicSession } =
    useAdminStore();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  const [deletingSession, setDeletingSession] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await fetchAcademicSessions();
      } catch {
        setFetchError("Failed to load academic sessions.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchAcademicSessions]);

  const openCreateModal = () => {
    setEditingSession(null);
    setModalOpen(true);
  };

  const openEditModal = (e, session) => {
    e.stopPropagation();
    setEditingSession(session);
    setModalOpen(true);
  };

  const openDeleteModal = (e, session) => {
    e.stopPropagation();
    setDeletingSession(session);
  };

  const confirmDelete = async () => {
    if (!deletingSession) return;
    setIsDeleting(true);
    await deleteAcademicSession(deletingSession._id);
    setIsDeleting(false);
    setDeletingSession(null);
  };

  const handleRowClick = (session) => {
    // ⚠️ Adjust route to match your routing structure
    console.log("Row Clicked")
    setSelectedSession(session);
    setActiveView("academicSession");
    // navigate(`/admin/academic-sessions/${session._id}`);
  };

  return (
    <>
      <div className="min-h-[85vh] max-h-fit w-full overflow-x-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="p-3 w-full mx-auto">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl md:text-2xl font-semibold">
              Academic Sessions
            </h1>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-[1px]"
            >
              <Plus size={16} />
              Create New
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-blue-500" />
              <span className="ml-3 text-gray-500 dark:text-gray-400 text-sm">
                Loading academic sessions…
              </span>
            </div>
          ) : fetchError ? (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={18} />
              {fetchError}
            </div>
          ) : academicSessions?.length === 0 ? (
            <div className="text-center py-24 text-gray-400 dark:text-gray-500 text-sm">
              No academic sessions found. Create one to get started.
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">
                      #
                    </th>
                    <th className="text-left px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">
                      Academic Year
                    </th>
                    <th className="text-left px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">
                      Term
                    </th>
                    <th className="text-left px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-right px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {academicSessions.map((session, index) => (
                    <tr
                      key={session._id ?? index}
                      onClick={() => handleRowClick(session)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="px-5 py-4 text-gray-400 dark:text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
                        {session.academic_year ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {session.term ?? "—"}
                      </td>
                      <td className="px-5 py-4">
                        {session.isActive ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => openEditModal(e, session)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md transition-colors duration-150"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>
                          <button
                            onClick={(e) => openDeleteModal(e, session)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md transition-colors duration-150"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <SessionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        existingSession={editingSession}
      />

      <DeleteModal
        session={deletingSession}
        onClose={() => setDeletingSession(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default GenerateTable;
