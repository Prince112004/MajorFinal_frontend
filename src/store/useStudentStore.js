import { create } from "zustand";
import { toast } from "react-toastify";
import { dummyResults,courses } from "../../public/js/data"; //this is dummy result imported from data.js file...comment when backend is ready
// import axios from "axios"; // 💡 Uncomment when your backend is ready

export const useStudentStore = create((set, get) => ({
  attendanceData: {},
  currentSemAvailableCourses: [],
  isCourseLoading: false,

  // ================= ATTENDANCE ACTIONS =================

  // --- FETCH ATTENDANCE ---
  fetchAttendance: () => {
    try {
      // 🔗 BACKEND LOGIC (When ready)
      // const response = await axios.get("/api/student/attendance");
      // set({ attendanceData: response.data });

      // 🛠️ LOCAL STORAGE LOGIC (Current implementation)
      const saved = JSON.parse(localStorage.getItem("attendance")) || {};
      set({ attendanceData: saved });
    } catch (error) {
      console.error("Error loading attendance:", error);
      toast.error("Failed to load attendance data ❌");
      set({ attendanceData: {} });
    }
  },

  // --- MARK ATTENDANCE ---
  markAttendance: async (date, status) => {
    try {
      // 🔗 BACKEND LOGIC (When ready)
      // await axios.post("/api/student/attendance", { date, status });

      // 🛠️ LOCAL STORAGE LOGIC
      const currentData = get().attendanceData;
      const updated = { ...currentData, [date]: status };

      // Update Zustand state and LocalStorage simultaneously
      set({ attendanceData: updated });
      localStorage.setItem("attendance", JSON.stringify(updated));

      toast.success(`Marked ${status} for ${date}`);
      return true;
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to mark attendance ❌");
      return false;
    }
  },
  // ================= RESULT STATE =================
  resultData: null,
  isResultLoading: false,
  availableSemesters: ["Semester 1", "Semester 2", "Semester 3"], // Dummy list
  selectedSemester: "Semester 2", // Default selection

  setSemester: (semester) => set({ selectedSemester: semester }),

  fetchResult: async (semester) => {
    set({ isResultLoading: true });
    try {
      // 🔗 BACKEND LOGIC (When ready)
      // const response = await axios.get(`/api/student/results?semester=${semester}`);
      // set({ resultData: response.data, isResultLoading: false });

      // 🛠️ MOCK LOGIC (Simulating network delay)
      setTimeout(() => {
        const data = dummyResults[semester] || { summary: null, courses: [] };
        set({ resultData: data, isResultLoading: false });
      }, 800);
    } catch (error) {
      console.error("Error fetching result:", error);
      toast.error("Failed to fetch results");
      set({ resultData: null, isResultLoading: false });
    }
  },

  downloadResultPdf: async (semester) => {
    toast.info(`Generating PDF for ${semester}...`);
    // 🔗 BACKEND LOGIC
    // window.open(`/api/student/results/download?semester=${semester}`, '_blank');

    // Mock simulation
    setTimeout(() => {
      toast.success("PDF Downloaded successfully!");
    }, 1500);
  },

  //==============COURSE REGISTRATION SECTION ====================//
  fetchCoursesOfCurrentSemester: async ({ semester, branch }) => {
    set({ isCourseLoading: true });

    try {
      // ================== 🔗 API CALL (UNCOMMENT WHEN READY) ==================
      /*
    const res = await axios.get(
      `/api/student/course?branch=${branch}&semester=${semester}`
    );

    set({
      currentSemAvailableCourses: res.data,
      isCourseLoading: false,
    });
    return;
    */
      // =======================================================================

      // ================== 🧪 DUMMY DATA (FOR NOW) ==================

      // Fetch ALL courses - ignoring branch and semester
      setTimeout(() => {
        // Get all courses from the store
        const allCourses = courses || [];

        // If you want to keep some filtering but make it optional, use this:
        // For now, returning ALL courses regardless of branch and semester
        const filteredCourses = allCourses; // No filtering - show all courses

        // Alternative: If you want to show courses based on branch only (no semester filter):
        // const filteredCourses = allCourses.filter(course =>
        //   (!branch || course.branch === branch)
        // );

        // Alternative: If you want to show courses based on semester only (no branch filter):
        // const filteredCourses = allCourses.filter(course =>
        //   (!semester || course.semester === semesterNumeric)
        // );

        set({
          currentSemAvailableCourses: filteredCourses,
          isCourseLoading: false,
        });
      }, 500);
      // ===========================================================
    } catch (error) {
      set({ isCourseLoading: false });
      toast.error("Error in Fetching courses");
    }
  },

  submitRegistration: async (courses) => {
    set({ isCourseLoading: true });

    try {
      // ================== 🔗 REAL API (UNCOMMENT LATER) ==================
      /*
    const response = await axios.post("/api/v1/registration/submit", {
      courseList: courses,
      submittedAt: new Date().toISOString(),
    });

    if (response.status === 200 || response.status === 201) {
      set({ registrationStatus: "success", isCourseLoading: false });
      return true;
    }
    */
      // ================================================================

      // ================== 🧪 DUMMY PROCESSING ==================
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate delay

      console.log("Submitted Courses:", courses);

      // optional: simple validation
      if (!courses || courses.length === 0) {
        set({ registrationStatus: "error", isCourseLoading: false });
        return false;
      }

      set({
        registrationStatus: "success",
        isCourseLoading: false,
      });

      return true;
      // =======================================================
    } catch (error) {
      console.error("Submission Error:", error);
      set({ registrationStatus: "error", isCourseLoading: false });
      return false;
    }
  },
})); 
