// components/AddRoom/RoomFileUpload.jsx
import React from "react";
import { Upload, FileText } from "lucide-react";

const RoomFileUpload = ({
  file,
  previewData,
  onFileUpload,
  onAdd,
  onReview,
  roomCount,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 h-[320px] flex flex-col justify-center hover:bg-purple-50/50 dark:hover:bg-purple-900/5">
          <Upload className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3 transition-all duration-300 group-hover:scale-110" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Upload CSV File
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
            File should contain: Room Code, Building Name, Room Type, Capacity
            (Optional)
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg mb-4 max-w-md mx-auto">
            <p className="text-xs font-medium text-purple-800 dark:text-purple-300 mb-1">
              📄 Example CSV content:
            </p>
            <code className="text-xs text-purple-700 dark:text-purple-400 block whitespace-pre">
              LAB-101, Gyan Mandir, LAB, 60
              <br />
              L-201, Academic Block, LECTURE, 120
              <br />
              CS-LAB, Science Block, LAB, 45
            </code>
          </div>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={onFileUpload}
            className="hidden"
            id="room-file-upload"
          />
          <label
            htmlFor="room-file-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-fit mx-auto"
          >
            <FileText className="w-4 h-4" />
            Choose File
          </label>
          {file && (
            <p className="mt-3 text-xs text-purple-600 dark:text-purple-400 animate-in slide-in-from-top duration-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        {previewData.length > 0 && (
          <div className="mt-4 animate-in slide-in-from-bottom duration-300">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Preview ({previewData.length} records)
            </h3>
            <div className="overflow-x-auto border border-gray-200 dark:border-slate-800 rounded-lg max-h-48 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
                <thead className="bg-gray-50 dark:bg-slate-800 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      #
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      Room Code
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      Building
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      Type
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      Capacity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                  {previewData.slice(0, 5).map((room, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                    >
                      <td className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
                        {room.room_code}
                      </td>
                      <td className="px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                        {room.building_name}
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${room.room_type === "LAB" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"}`}
                        >
                          {room.room_type}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                        {room.capacity || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {previewData.length > 5 && (
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 py-2">
                  +{previewData.length - 5} more records
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3 pt-6 mt-auto">
        <button
          onClick={onAdd}
          disabled={previewData.length === 0}
          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Add {previewData.length} Records to Review
        </button>
        {roomCount > 0 && (
          <button
            onClick={onReview}
            className="px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Review ({roomCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomFileUpload;
