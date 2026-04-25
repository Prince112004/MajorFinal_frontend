// components/AddRoom/RoomManualEntry.jsx
import React, { useState, useEffect, useRef } from "react";

const RoomManualEntry = ({
  formData,
  setFormData,
  onAdd,
  onReview,
  roomCount,
  roomTypeOptions = ["LECTURE", "LAB"],
  buildingOptions = [
    "Gyan Mandir",
    "Academic Block",
    "Science Block",
    "Engineering Block",
    "Admin Block",
  ],
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [customBuilding, setCustomBuilding] = useState("");
  const [showCustomBuilding, setShowCustomBuilding] = useState(false);

  const roomTypeRef = useRef(null);
  const buildingRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideRoomType =
        roomTypeRef.current && !roomTypeRef.current.contains(event.target);
      const isOutsideBuilding =
        buildingRef.current && !buildingRef.current.contains(event.target);

      if (isOutsideRoomType && isOutsideBuilding) {
        setOpenDropdown(null);
        setShowCustomBuilding(false);
        setCustomBuilding("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    setShowCustomBuilding(false);
    setCustomBuilding("");
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setOpenDropdown(null);
  };

  const handleCustomBuildingAdd = () => {
    if (customBuilding.trim()) {
      setFormData({ ...formData, building_name: customBuilding.trim() });
      setShowCustomBuilding(false);
      setCustomBuilding("");
      setOpenDropdown(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Room Code */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Room Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.room_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  room_code: e.target.value.toUpperCase(),
                })
              }
              placeholder="e.g., LAB-101, L-201, CS-LAB"
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
          </div>

          {/* Room Type Dropdown */}
          <div className="relative" ref={roomTypeRef}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Room Type <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown("roomType")}
              className="w-full px-4 py-2 text-left border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
            >
              <span>{formData.room_type || "Select Room Type"}</span>
              <span
                className={`text-gray-400 transition-transform ${openDropdown === "roomType" ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {openDropdown === "roomType" && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                {roomTypeOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleSelect("room_type", option)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Building Name Dropdown */}
          <div className="relative" ref={buildingRef}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Building Name
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown("building")}
              className="w-full px-4 py-2 text-left border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
            >
              <span>{formData.building_name || "Select Building"}</span>
              <span
                className={`text-gray-400 transition-transform ${openDropdown === "building" ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {openDropdown === "building" && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {buildingOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleSelect("building_name", option)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    {option}
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-slate-700">
                  {!showCustomBuilding ? (
                    <div
                      onClick={() => setShowCustomBuilding(true)}
                      className="px-4 py-2 text-purple-600 hover:bg-gray-100 cursor-pointer"
                    >
                      + Add Custom Building
                    </div>
                  ) : (
                    <div className="p-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={customBuilding}
                        onChange={(e) => setCustomBuilding(e.target.value)}
                        placeholder="Enter building name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        autoFocus
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleCustomBuildingAdd()
                        }
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={handleCustomBuildingAdd}
                          className="flex-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCustomBuilding(false);
                            setCustomBuilding("");
                          }}
                          className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Capacity
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              placeholder="e.g., 60"
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Optional: Maximum number of students
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-6 mt-auto">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Add to Review List
        </button>
        {roomCount > 0 && (
          <button
            type="button"
            onClick={onReview}
            className="px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Review ({roomCount})
          </button>
        )}
      </div>
    </form>
  );
};

export default RoomManualEntry;
