import React, { useState, useEffect } from "react";
import RoomHeader from "./RoomHeader";
import RoomList from "./RoomList";
import AddRoomModal from "./AddRoomModal/AddRoomModal";
import useAdminStore from "../../store/useAdminStore";
import { toast } from "react-toastify";
import CustomLoader from "../../ui/CustomLoader";
import EditRoomModal from "./EditRoomModal";

// pages/Room.jsx
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import useAdminStore from "../store/useAdminStore";
// import AddRoomModal from "../components/AddRoom/AddRoomModal";
// import RoomList from "../components/Room/RoomList";
// import RoomHeader from "../components/Room/RoomHeader";
// import EditRoomModal from "../components/Room/EditRoomModal";
// import CustomLoader from "../ui/CustomLoader";

const Room = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const {
    rooms,
    fetchRooms,
    createRoom,
    bulkCreateRooms,
    updateRoom,
    deleteRoom,
    isLoadingRooms,
    isSavingRoom,
  } = useAdminStore();

  // Fetch all rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleAddRooms = async (roomData) => {
    // For single room creation
    if (!Array.isArray(roomData)) {
      const result = await createRoom(roomData);
      if (result.success) {
        toast.success("Room created successfully!");
        return result;
      } else {
        toast.error(result.error || "Failed to create room");
        return result;
      }
    } 
    // For bulk room creation
    else {
      const result = await bulkCreateRooms(roomData);
      if (result.success) {
        const { inserted, errors } = result.summary;
        if (errors > 0) {
          toast.warning(`${inserted} rooms created, ${errors} failed.`);
        } else {
          toast.success(`${inserted} rooms created successfully!`);
        }
        return result;
      } else {
        toast.error(result.error || "Failed to create rooms");
        return result;
      }
    }
  };

  const handleEditRoom = async (updatedData) => {
    if (!updatedData.room_code || !updatedData.room_type) {
      toast.error("Room Code and Room Type are required!");
      return;
    }

    const result = await updateRoom(editingRoom._id, updatedData);
    if (result.success) {
      toast.success("Room updated successfully.");
      setEditingRoom(null);
    } else {
      toast.error(result.error || "Failed to update room");
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    
    const result = await deleteRoom(roomId);
    if (result.success) {
      toast.success("Room deleted successfully.");
    } else {
      toast.error(result.error || "Failed to delete room");
    }
  };

  return (
    <div className="min-h-full w-full font-sans text-gray-800 dark:text-gray-100">
      <div className="w-full mx-auto space-y-4">
        <RoomHeader onAddClick={() => setIsAddModalOpen(true)} />

        {isLoadingRooms ? (
          <div className="flex justify-center py-20">
            <CustomLoader variant="purple" />
          </div>
        ) : (
          <RoomList
            rooms={rooms}
            onEdit={setEditingRoom}
            onDelete={handleDeleteRoom}
          />
        )}

        {isAddModalOpen && (
          <AddRoomModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddRooms}
          />
        )}

        {editingRoom && (
          <EditRoomModal
            room={editingRoom}
            onClose={() => setEditingRoom(null)}
            onSave={handleEditRoom}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
