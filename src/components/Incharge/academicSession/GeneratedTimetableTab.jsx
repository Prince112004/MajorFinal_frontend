import React, { useEffect, useState } from "react";
import { CalendarRange, Clock, Users, MapPin, Download } from "lucide-react";

const GeneratedTimetableTab = ({ session }) => {
  const [timetable, setTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?._id) {
      setIsLoading(true);
      setTimeout(() => {
        const savedTimetable = localStorage.getItem(`timetable_${session._id}`);
        if (savedTimetable) {
          setTimetable(JSON.parse(savedTimetable));
        } else {
          setTimetable(null);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [session?._id]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-1:00",
    "2:00-3:00",
    "3:00-4:00",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 h-full">
        <Clock size={28} className="animate-spin text-blue-500" />
        <span className="ml-3 text-sm text-gray-400">Loading timetable...</span>
      </div>
    );
  }

  if (!timetable) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <CalendarRange
            size={26}
            className="text-blue-500 dark:text-blue-400"
          />
        </div>
        <div>
          <p className="text-base font-medium text-gray-700 dark:text-gray-200">
            No timetable generated yet
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Finalize your assignments and generate a timetable from the{" "}
            <span className="font-medium">Finalized Assignments</span> tab.
          </p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // Create a simple text version for download
    let content = `Timetable for ${session?.academic_year || session?.name} - ${session?.term}\n`;
    content += "=".repeat(50) + "\n\n";

    days.forEach((day) => {
      content += `${day}:\n`;
      content += "-".repeat(30) + "\n";
      timeSlots.forEach((slot) => {
        const entry = timetable[day]?.[slot];
        if (entry) {
          content += `  ${slot}: ${entry.course.course_name} (${entry.course.course_code})\n`;
          content += `    Faculty: ${entry.faculty.name} | Batch: ${entry.batch} | Room: ${entry.room}\n`;
        } else {
          content += `  ${slot}: Free period\n`;
        }
      });
      content += "\n";
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `timetable_${session._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Generated Timetable
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {session?.academic_year || session?.name} - {session?.term} Term
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200"
        >
          <Download size={15} />
          Download Timetable
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                Time / Day
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot}>
                <td className="px-4 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <Clock size={12} className="inline mr-1" />
                  {slot}
                </td>
                {days.map((day) => {
                  const entry = timetable[day]?.[slot];
                  return (
                    <td
                      key={`${day}-${slot}`}
                      className="px-3 py-2 border border-gray-200 dark:border-gray-700 align-top"
                    >
                      {entry ? (
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                            {entry.course.course_name}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {entry.course.course_code}
                          </p>
                          <div className="flex flex-col gap-0.5 text-[10px] text-gray-400 dark:text-gray-500">
                            <p className="flex items-center gap-1">
                              <Users size={10} />
                              {entry.faculty.name}
                            </p>
                            <p className="flex items-center gap-1">
                              <MapPin size={10} />
                              {entry.room}
                            </p>
                            <p className="text-emerald-600 dark:text-emerald-400">
                              {entry.batch}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400 dark:text-gray-600 text-xs text-center py-2">
                          —
                        </p>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneratedTimetableTab;
