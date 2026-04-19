import React, { useState, useEffect } from "react";
import CourseHeader from "./CourseHeader";
import CourseList from "./CourseList";
import AddCourseModal from "./AddCourseModal";
import useAdminStore from "../../store/useAdminStore";
import EditCourseModal from "./EditCourseModal";
import { toast } from "react-toastify";
import CustomLoader from "../../ui/CustomLoader";

const Course = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [pendingCourses, setPendingCourses] = useState([]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Pull functions from Zustand
  const {
    courses: storeCourses = [],
    fetchCourses,
    saveCoursesToBackend, // <-- We need to use this one!
    deleteCourse,
    updateCourse,
    isLoading,
    isSaving,
  } = useAdminStore();

  useEffect(() => {
    if (selectedBranch && fetchCourses) {
      fetchCourses(selectedBranch);
    }
  }, [selectedBranch, fetchCourses]);

  const currentBranchPending = pendingCourses.filter(
    (c) => c.branch === selectedBranch,
  );

  const displayCourses = [...storeCourses, ...currentBranchPending];

  const handleSaveToPending = (newCourses) => {
    setPendingCourses([...pendingCourses, ...newCourses]);
  };

  const handleFinalSubmit = async () => {
    // FIXED: Changed saveBatchesToBackend to saveCoursesToBackend
    const success = await saveCoursesToBackend(
      selectedBranch,
      currentBranchPending,
    );

    if (success) {
      toast.success(
        `${currentBranchPending.length} course(s) saved to database successfully!`,
        { position: "bottom-right", theme: "colored" },
      );
      // FIXED: Changed setPendingBatches to setPendingCourses
      setPendingCourses((prev) =>
        prev.filter((c) => c.branch !== selectedBranch),
      );
    } else {
      toast.error("Failed to save courses to the database. Please try again.", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  // --- Handle Edit ---
  const handleEditClick = (course) => {
    setEditingCourse(course);
  };

  const handleSaveEdit = async (updatedData) => {
    if (updateCourse) {
      await updateCourse(updatedData);
      toast.success(`${updatedData.courseCode} updated successfully!`);
    }
    setEditingCourse(null); // Close modal
  };

  // --- Handle Delete ---
  const handleDeleteClick = async (id) => {
    const isPending = pendingCourses.some((c) => c.id === id);

    if (isPending) {
      // If it's just in the preview/pending list, remove it locally
      setPendingCourses(pendingCourses.filter((c) => c.id !== id));
      toast.info("Removed unsaved course.");
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone.",
      )
    ) {
      if (deleteCourse) {
        await deleteCourse(id);
        toast.success("Course deleted successfully!");
      }
    }
  };

  return (
    <div className="min-h-full w-full mx-auto space-y-6">
      <CourseHeader
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <div className="rounded-lg">
        {pendingCourses.length > 0 && selectedBranch && (
          <div className="mb-8 p-1 bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-cyan-800 dark:text-cyan-300 font-bold flex items-center gap-2">
                ⚠️ Unsaved Changes
              </h3>
              <p className="text-sm text-cyan-600 dark:text-cyan-500 mt-1">
                You have {currentBranchPending.length} new courses waiting to be
                saved to the database.
              </p>
            </div>
            <button
              onClick={handleFinalSubmit}
              disabled={isSaving}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                isSaving
                  ? "bg-cyan-400 cursor-not-allowed text-white"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white active:scale-95 shadow-md shadow-cyan-500/20"
              }`}
            >
              {isSaving ? "Saving..." : "Save to Database"}
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <CustomLoader variant="blue" />
          </div>
        ) : (
          <CourseList
            selectedBranch={selectedBranch}
            courses={displayCourses}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddCourseModal
          selectedBranch={selectedBranch}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveToPending}
        />
      )}

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Course;
