import React, { useState } from "react";
import { X, Save, GraduationCap, Activity, Hash, Users } from "lucide-react";

const EditBatchModal = ({ batch, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...batch });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-gray-100 dark:border-slate-800 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Save className="text-indigo-500" /> Edit Batch
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1">
              <Hash size={12} /> Batch Name
            </label>
            <input
              name="batchName"
              value={formData.batchName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1">
              <GraduationCap size={12} /> Degree
            </label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-gray-800 dark:text-white"
            >
              {["B.Tech", "M.Tech", "BCA", "MCA", "Diploma"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1">
              <Activity size={12} /> Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-gray-800 dark:text-white"
            >
              {["Active", "Upcoming", "Passed"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1">
              Semester
            </label>
            <input
              name="semester"
              type="number"
              value={formData.semester}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1">
              <Users size={12} /> Students
            </label>
            <input
              name="students"
              type="number"
              value={formData.students}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 rounded-xl font-bold text-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBatchModal;
