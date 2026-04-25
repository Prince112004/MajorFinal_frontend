// // components/AddRoom/AddRoomModal.jsx
// import React, { useState, useEffect } from "react";
// import { X, DoorOpen, Eye } from "lucide-react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import RoomMethodSelector from "./RoomMethodSelector";
// import RoomManualEntry from "./RoomManualEntry";
// import RoomCSVEntry from "./RoomCSVEntry";
// import RoomFileUpload from "./RoomFileUpload";
// import RoomReviewSection from "./RoomReviewSection";

// components/AddRoom/AddRoomModal.jsx
import React, { useState } from "react";
import { X, DoorOpen, Eye } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomMethodSelector from "./RoomMethodSelector";
import RoomManualEntry from "./RoomManualEntry";
import RoomCSVEntry from "./RoomCSVEntry";
import RoomFileUpload from "./RoomFileUpload";
import RoomReviewSection from "./RoomReviewSection";

const AddRoomModal = ({ onClose, onSave }) => {
  const [activeMethod, setActiveMethod] = useState("manual");
  const [formData, setFormData] = useState({
    room_code: "",
    building_name: "Gyan Mandir",
    room_type: "LECTURE",
    capacity: "",
  });
  const [csvData, setCsvData] = useState("");
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [animation, setAnimation] = useState("");

  const roomTypeOptions = ["LECTURE", "LAB"];
  const buildingOptions = ["Gyan Mandir", "Academic Block", "Science Block", "Engineering Block", "Admin Block"];

  const handleMethodChange = (method) => {
    setAnimation("animate-out fade-out");
    setTimeout(() => {
      setActiveMethod(method);
      setAnimation("animate-in fade-in");
      setTimeout(() => setAnimation(""), 300);
    }, 150);
  };

  // Parse comma-separated data
  const parseCommaSeparated = (text) => {
    const lines = text.trim().split("\n");
    const parsed = [];
    const errors = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const parts = line.split(",").map(part => part.trim());
        if (parts.length >= 3) {
          parsed.push({
            room_code: parts[0],
            building_name: parts[1] || "Gyan Mandir",
            room_type: parts[2].toUpperCase(),
            capacity: parts[3] ? parseInt(parts[3]) : null,
          });
        } else {
          errors.push(`Line ${i + 1}: Expected at least 3 columns, got ${parts.length}`);
        }
      }
    }

    if (errors.length > 0) {
      toast.warning(`Skipped ${errors.length} invalid entries`);
    }
    
    return parsed;
  };

  // Parse CSV file
  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsed = parseCommaSeparated(text);
      setPreviewData(parsed);
      if (parsed.length > 0) {
        toast.success(`Successfully parsed ${parsed.length} room records`);
      } else {
        toast.error("No valid data found in file");
      }
    };
    
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    
    reader.readAsText(file);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      parseFile(uploadedFile);
    }
  };

  const addToReviewList = (rooms) => {
    if (rooms.length === 0) {
      toast.error("No valid room data to add");
      return;
    }
    
    const newRooms = rooms.map(r => ({
      id: Date.now() + Math.random(),
      room_code: r.room_code,
      building_name: r.building_name,
      room_type: r.room_type,
      capacity: r.capacity || null,
    }));
    
    setRoomList([...roomList, ...newRooms]);
    toast.success(`${rooms.length} room(s) added to review list`);
    
    setAnimation("animate-out fade-out");
    setTimeout(() => {
      setFormData({
        room_code: "",
        building_name: "Gyan Mandir",
        room_type: "LECTURE",
        capacity: "",
      });
      setCsvData("");
      setFile(null);
      setPreviewData([]);
      setAnimation("animate-in fade-in");
      setTimeout(() => setAnimation(""), 300);
    }, 150);
  };

  const handleManualAdd = () => {
    if (!formData.room_code || !formData.room_type) {
      toast.error("Room Code and Room Type are required!");
      return;
    }
    addToReviewList([formData]);
  };

  const handleCsvAdd = () => {
    if (!csvData.trim()) {
      toast.error("Please enter room data");
      return;
    }
    
    const parsed = parseCommaSeparated(csvData);
    if (parsed.length === 0) {
      toast.error("No valid data found. Please check format.");
      return;
    }
    
    addToReviewList(parsed);
  };

  const handleFileAdd = () => {
    if (previewData.length === 0) {
      toast.error("No data found in file");
      return;
    }
    addToReviewList(previewData);
  };

  const handleUpdateRoom = (index, updatedRoom) => {
    const updatedList = [...roomList];
    updatedList[index] = updatedRoom;
    setRoomList(updatedList);
    toast.success("Room updated successfully");
  };

  const handleDeleteRoom = (index) => {
    const updatedList = roomList.filter((_, i) => i !== index);
    setRoomList(updatedList);
    toast.success("Room deleted successfully");
  };

  const handleFinalSubmit = async () => {
    if (roomList.length === 0) {
      toast.error("No rooms to submit");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Prepare data for backend
      const submitData = roomList.map(({ id, ...room }) => ({
        room_code: room.room_code,
        building_name: room.building_name,
        room_type: room.room_type,
        capacity: room.capacity ? parseInt(room.capacity) : null,
      }));
      
      // Call the onSave function passed from parent (which should call bulkCreateRooms)
      const result = await onSave(submitData);
      if (result && result.success) {
        toast.success(`${roomList.length} room(s) submitted successfully!`);
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1500);
      } else {
        toast.error(result?.error || "Failed to submit rooms");
      }
    } catch (error) {
      toast.error("Error submitting rooms");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      room_code: "",
      building_name: "Gyan Mandir",
      room_type: "LECTURE",
      capacity: "",
    });
    setCsvData("");
    setFile(null);
    setPreviewData([]);
    setRoomList([]);
    setActiveMethod("manual");
    setShowReview(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <DoorOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {showReview ? "Review & Submit Rooms" : "Add New Rooms"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {showReview 
                    ? `Review ${roomList.length} room(s) before final submission`
                    : "Add room data manually, via CSV text, or file upload"}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {!showReview ? (
              <>
                <RoomMethodSelector 
                  activeMethod={activeMethod}
                  setActiveMethod={handleMethodChange}
                  roomCount={roomList.length}
                  onReview={() => setShowReview(true)}
                />
                
                <div className={`min-h-[450px] transition-all duration-300 ${animation}`}>
                  {activeMethod === "manual" && (
                    <RoomManualEntry 
                      formData={formData}
                      setFormData={setFormData}
                      onAdd={handleManualAdd}
                      onReview={() => setShowReview(true)}
                      roomCount={roomList.length}
                      roomTypeOptions={roomTypeOptions}
                      buildingOptions={buildingOptions}
                    />
                  )}
                  
                  {activeMethod === "csv" && (
                    <RoomCSVEntry 
                      csvData={csvData}
                      setCsvData={setCsvData}
                      onAdd={handleCsvAdd}
                      onReview={() => setShowReview(true)}
                      roomCount={roomList.length}
                    />
                  )}
                  
                  {activeMethod === "file" && (
                    <RoomFileUpload 
                      file={file}
                      previewData={previewData}
                      onFileUpload={handleFileUpload}
                      onAdd={handleFileAdd}
                      onReview={() => setShowReview(true)}
                      roomCount={roomList.length}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="animate-in slide-in-from-right duration-300">
                <RoomReviewSection 
                  roomList={roomList}
                  onUpdate={handleUpdateRoom}
                  onDelete={handleDeleteRoom}
                  onAddMore={() => setShowReview(false)}
                  onSubmit={handleFinalSubmit}
                  isSubmitting={isSubmitting}
                  roomTypeOptions={roomTypeOptions}
                  buildingOptions={buildingOptions}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;