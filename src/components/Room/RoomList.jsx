// components/Room/RoomList.jsx
import React from "react";
import RoomCard from "../../ui/RoomCard";
import { DoorOpen } from "lucide-react";

const RoomList = ({ rooms, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 animate-fade-in-up p-6 shadow-lg dark:shadow-none border border-gray-100 dark:border-slate-600 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          Rooms
          <span className="text-sm font-medium bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full">
            {rooms.length}
          </span>
        </h2>
      </div>

      {rooms.length === 0 ? (
        <div className="min-h-100 p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <DoorOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No rooms found. Click "Add Room" to get started! 🚀
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room._id || room.id}
              room={room}
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
