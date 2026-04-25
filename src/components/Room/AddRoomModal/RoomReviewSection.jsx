// components/AddRoom/RoomReviewSection.jsx
import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Save,
  ChevronLeft,
  ChevronRight,
  DoorOpen,
} from "lucide-react";
import { toast } from "react-toastify";

const RoomReviewSection = ({
  roomList,
  onUpdate,
  onDelete,
  onAddMore,
  onSubmit,
  isSubmitting,
  roomTypeOptions = ["LECTURE", "LAB"],
  buildingOptions = [
    "Gyan Mandir",
    "Academic Block",
    "Science Block",
    "Engineering Block",
    "Admin Block",
  ],
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    room_code: "",
    building_name: "",
    room_type: "",
    capacity: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(roomList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRooms = roomList.slice(startIndex, endIndex);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditFormData({ ...roomList[index] });
  };

  const handleUpdate = () => {
    if (!editFormData.room_code || !editFormData.room_type) {
      toast.error("Room Code and Room Type are required!");
      return;
    }
    onUpdate(editingIndex, editFormData);
    setEditingIndex(null);
    setEditFormData({
      room_code: "",
      building_name: "",
      room_type: "",
      capacity: "",
    });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      onDelete(index);
      if (currentRooms.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  if (roomList.length === 0) {
    return (
      <div className="text-center py-12">
        <DoorOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-slate-500 dark:text-slate-400">No rooms added yet</p>
        <button
          onClick={onAddMore}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Add Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
        <div>
          <p className="text-sm font-semibold text-purple-700 dark:text-purple-400">
            Total Rooms to Submit
          </p>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">
            {roomList.length} {roomList.length === 1 ? "Room" : "Rooms"}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={onAddMore}
            className="px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
          >
            Add More
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : `Submit All (${roomList.length})`}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editingIndex !== null && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Edit Room
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Room Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={editFormData.room_code}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    room_code: e.target.value.toUpperCase(),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Building Name
              </label>
              <select
                value={editFormData.building_name}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    building_name: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {buildingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Room Type <span className="text-red-500">*</span>
              </label>
              <select
                value={editFormData.room_type}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    room_type: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {roomTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Capacity
              </label>
              <input
                type="number"
                value={editFormData.capacity || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, capacity: e.target.value })
                }
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-6">
            <button
              onClick={handleUpdate}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all"
            >
              Update Room
            </button>
            <button
              onClick={() => {
                setEditingIndex(null);
                setEditFormData({
                  room_code: "",
                  building_name: "",
                  room_type: "",
                  capacity: "",
                });
              }}
              className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Rooms Table */}
      {editingIndex === null && (
        <div className="border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Room Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Building
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-800">
                {currentRooms.map((room, idx) => (
                  <tr
                    key={room.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                      {startIndex + idx + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                      {room.room_code}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                      {room.building_name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          room.room_type === "LAB"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {room.room_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                      {room.capacity || "-"}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(startIndex + idx)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-3 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(startIndex + idx)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomReviewSection;
