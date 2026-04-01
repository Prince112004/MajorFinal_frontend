import React from "react";
import RoomCard from "./RoomCard";

const RoomList = ({ selectedBranch, rooms, onEdit, onDelete }) => {
  if (!selectedBranch) {
    return (
      <div className="flex flex-col items-center justify-center h-72 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
          No Branch Selected
        </h2>
        <p className="text-gray-500 mt-2">
          Select a branch to view room assignments.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          {selectedBranch} Lab Rooms
          <span className="text-sm font-medium bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full">
            {rooms.length}
          </span>
        </h2>
      </div>

      {rooms.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No rooms assigned for this branch yet. Click "Assign Room"!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              assignment={room}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
