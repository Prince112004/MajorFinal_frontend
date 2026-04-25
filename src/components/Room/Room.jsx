import React, { useState, useEffect } from "react";
import RoomHeader from "./RoomHeader";
import RoomList from "./RoomList";
import AddRoomModal from "./AddRoomModal";
import useAdminStore from "../../store/useAdminStore";
import { toast } from "react-toastify";
import CustomLoader from "../../ui/CustomLoader";

const Room = () => {
  const [pendingRooms, setPendingRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const {
    batches: storeBatches, // Used to populate the dropdowns
    rooms: storeRooms,
    fetchBatches, // New function to fetch all batches
    fetchAllRooms, // New function to fetch all rooms
    saveRoomsToBackend,
    updateRoomInBackend,
    deleteRoomFromBackend,
    isRoomsLoading,
    isSaving,
  } = useAdminStore();

  // Fetch all batches and rooms on component mount (no branch filter)
  useEffect(() => {
    if (fetchAllBatches) {
      fetchAllBatches(); // Fetch all batches without branch filter
    }
    if (fetchAllRooms) {
      fetchAllRooms(); // Fetch all rooms without branch filter
    }
  }, [fetchAllBatches, fetchAllRooms]);

  // Combine store rooms with pending rooms
  const displayRooms = [...storeRooms, ...pendingRooms];

  const handleFinalSubmit = async () => {
    if (pendingRooms.length === 0) {
      toast.warning("No pending assignments to save!");
      return;
    }

    const success = await saveRoomsToBackend(pendingRooms);
    if (success) {
      toast.success(
        `${pendingRooms.length} room assignment(s) saved to database!`,
      );
      setPendingRooms([]); // Clear all pending rooms
      if (fetchAllRooms) {
        await fetchAllRooms(); // Refresh the list
      }
    } else {
      toast.error("Failed to save room assignments.");
    }
  };

  const handleDeleteClick = async (roomId) => {
    if (!window.confirm("Delete this room assignment?")) return;

    const isPending = pendingRooms.some((r) => r.id === roomId);
    if (isPending) {
      setPendingRooms((prev) => prev.filter((r) => r.id !== roomId));
      toast.info("Pending assignment removed.");
    } else {
      const success = await deleteRoomFromBackend(roomId);
      if (success) {
        toast.success("Assignment deleted from database.");
        if (fetchAllRooms) {
          await fetchAllRooms(); // Refresh the list
        }
      } else {
        toast.error("Failed to delete assignment.");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingRoom.labName || !editingRoom.roomNumber) {
      toast.error("Lab Name and Room Number are required");
      return;
    }

    const isPending = pendingRooms.some((r) => r.id === editingRoom.id);
    if (isPending) {
      setPendingRooms((prev) =>
        prev.map((r) => (r.id === editingRoom.id ? editingRoom : r)),
      );
      toast.success("Pending assignment updated.");
    } else {
      const success = await updateRoomInBackend(editingRoom.id, editingRoom);
      if (success) {
        toast.success("Assignment updated in database.");
        if (fetchAllRooms) {
          await fetchAllRooms(); // Refresh the list
        }
      } else {
        toast.error("Failed to update assignment.");
      }
    }
    setEditingRoom(null);
  };

  return (
    <div className="min-h-full w-full bg-gray-100 dark:bg-slate-900 font-sans text-gray-800 dark:text-gray-100">
      <div className="w-full mx-auto space-y-4 p-6">
        <RoomHeader
          onAddClick={() => {
            setIsModalOpen(true);
          }}
        />

        {/* Unsaved Changes Banner */}
        {pendingRooms.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 p-4 rounded-2xl flex justify-between items-center animate-fade-in-up">
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-100">
                ⚠️ Unsaved Assignments
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                You have {pendingRooms.length} new assignment(s) waiting to be
                saved.
              </p>
            </div>
            <button
              onClick={handleFinalSubmit}
              disabled={isSaving}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-md transition-all"
            >
              {isSaving ? "Saving..." : "Save to Database"}
            </button>
          </div>
        )}

        {/* Loading State */}
        {isRoomsLoading ? (
          <div className="flex justify-center h-130 items-center">
            <CustomLoader variant="green" />
          </div>
        ) : (
          <RoomList
            rooms={displayRooms}
            onEdit={setEditingRoom}
            onDelete={handleDeleteClick}
          />
        )}

        {/* Add Room Modal */}
        {isModalOpen && (
          <AddRoomModal
            availableBatches={storeBatches} // Pass all fetched batches
            onClose={() => setIsModalOpen(false)}
            onSave={(newRooms) =>
              setPendingRooms([...pendingRooms, ...newRooms])
            }
          />
        )}

        {/* Edit Room Modal */}
        {editingRoom && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  Edit Room Assignment
                </h2>
                <p className="text-amber-100 text-sm mt-1">
                  Update room details
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Batch Name
                  </label>
                  <input
                    disabled
                    value={editingRoom.batchName || editingRoom.batch_name}
                    className="w-full p-3 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lab/Course Name *
                  </label>
                  <input
                    value={editingRoom.labName || editingRoom.lab_name}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        labName: e.target.value,
                      })
                    }
                    placeholder="e.g., Computer Lab, Physics Lab"
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Number *
                  </label>
                  <input
                    value={editingRoom.roomNumber || editingRoom.room_number}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        roomNumber: e.target.value,
                      })
                    }
                    placeholder="e.g., Lab-101, Room 204"
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 p-6 pt-0">
                <button
                  onClick={() => setEditingRoom(null)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium shadow-md transition-all"
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

export default Room;
