import { create } from "zustand";
import { teacher } from "../../public/js/data";
import {toast} from "react-toastify"
import {axiosInstance} from "../lib/axios";

const dummyAcademicSessions = [
  {
    _id: "sess_001",
    name: "Academic Year 2023-24",
    startDate: "2023-07-01",
    endDate: "2024-06-30",
    isActive: true,
    semester: "Even",
    currentStatus: "Ongoing",
    description: "Regular academic session for 2023-2024",
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
  },
  {
    _id: "sess_002",
    name: "Academic Year 2024-25",
    startDate: "2024-07-01",
    endDate: "2025-06-30",
    isActive: false,
    semester: "Odd",
    currentStatus: "Upcoming",
    description: "Next academic session",
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-05-01T10:00:00Z",
  },
  {
    _id: "sess_003",
    name: "Summer Term 2024",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    isActive: true,
    semester: "Summer",
    currentStatus: "Ongoing",
    description: "Summer term for backlog courses",
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:00:00Z",
  },
  {
    _id: "sess_004",
    name: "Academic Year 2022-23",
    startDate: "2022-07-01",
    endDate: "2023-06-30",
    isActive: false,
    semester: "Both",
    currentStatus: "Completed",
    description: "Previous academic session",
    createdAt: "2022-06-01T10:00:00Z",
    updatedAt: "2023-06-30T10:00:00Z",
  },
];

const useAdminStore = create((set, get) => ({
  // State variables
  faculty: [],
  batches: [], // Array to hold fetched batches for the current branch
  isLoading: false,
  isSaving: false, // Loading state specifically for the save button
  error: null,
  rooms: [], // Array to hold assigned rooms/labs
  isRoomsLoading: false,
  courses: [],

  //====================sessions==========================================================
  fetchAcademicSessions: async () => {
    set({ isLoading: true, error: null });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Simulate successful response with dummy data
      set({
        academicSessions: dummyAcademicSessions,
        isLoading: false,
      });

      return { success: true, data: dummyAcademicSessions };
    } catch (error) {
      console.error("Error fetching academic sessions:", error);
      set({
        error:
          error.response?.data?.message || "Failed to fetch academic sessions",
        isLoading: false,
      });
      return { success: false, error: "Failed to fetch academic sessions" };
    }
  },

  createAcademicSession: async (payload) => {
    set({ isSaving: true, error: null });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Create new session with dummy ID
      const newSession = {
        _id: `sess_${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set((state) => ({
        academicSessions: [newSession, ...state.academicSessions],
        isSaving: false,
      }));

      toast.success("Academic session created successfully!");
      return { success: true, data: newSession };
    } catch (error) {
      console.error("Error creating academic session:", error);
      const message =
        error.response?.data?.message || "Failed to create academic session";
      set({ error: message, isSaving: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  updateAcademicSession: async (id, payload) => {
    set({ isSaving: true, error: null });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      let updatedSession = null;

      set((state) => ({
        academicSessions: state.academicSessions.map((session) => {
          if (session._id === id) {
            updatedSession = {
              ...session,
              ...payload,
              updatedAt: new Date().toISOString(),
            };
            return updatedSession;
          }
          return session;
        }),
        isSaving: false,
      }));

      toast.success("Academic session updated successfully!");
      return { success: true, data: updatedSession };
    } catch (error) {
      console.error("Error updating academic session:", error);
      const message =
        error.response?.data?.message || "Failed to update academic session";
      set({ error: message, isSaving: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  deleteAcademicSession: async (id) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      set((state) => ({
        academicSessions: state.academicSessions.filter(
          (session) => session._id !== id,
        ),
      }));

      toast.success("Academic session deleted successfully!");
      return { success: true };
    } catch (error) {
      console.error("Error deleting academic session:", error);
      const message =
        error.response?.data?.message || "Failed to delete academic session";
      set({ error: message });
      toast.error(message);
      return { success: false, message };
    }
  },

  // ====================== Action to fetch faculty data ==================================
  fetchFaculty: async () => {
    set({ isLoading: true, error: null });

    // Simulate API delay for realistic testing
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Transform the teacher data to match your expected response structure
      const facultyData = {
        data: teacher, // or teacher.map(...) if you need to transform the data structure
      };

      set({
        faculty: facultyData.data, // This will match your original response.data.data structure
        isLoading: false,
      });

      return facultyData;
    } catch (error) {
      const errorMessage = "Failed to fetch faculty";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // ====================== Action to fetch batches by branch ==============================

  fetchBatches: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/batch");

      if (response.data.success) {
        set({ batches: response.data.data, isLoading: false });
      } else {
        throw new Error(response.data.message || "Failed to fetch batches");
      }
    } catch (error) {
      console.error("Failed to fetch batches:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch batches",
        isLoading: false,
      });
    }
  },

  // ====================== Create Single Batch ====================================
  createBatch: async (batchData) => {
    set({ isSaving: true, error: null });
    try {
      // Ensure lecture_room_id is properly formatted
      const formattedData = {
        program: batchData.program,
        department: batchData.department,
        year: parseInt(batchData.year),
        semester: parseInt(batchData.semester),
        batch_name: batchData.batch_name,
      };

      const response = await axiosInstance.post("/admin/batch", formattedData);

      if (response.data.success) {
        // Refresh batches list
        await get().fetchBatches();
        set({ isSaving: false });
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || "Failed to create batch");
      }
    } catch (error) {
      console.error("Failed to create batch:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to create batch",
        isSaving: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // ====================== Bulk Create Batches ====================================
  bulkCreateBatches: async (batches) => {
    set({ isSaving: true, error: null });
    try {
      // Format all batches for bulk upload
      const formattedBatches = batches.map((batch) => ({
        program: batch.program,
        department: batch.department,
        year: parseInt(batch.year),
        semester: parseInt(batch.semester),
        batch_name: batch.batch_name,
      }));
      console.log("formatted Data", formattedBatches);
      const response = await axiosInstance.post("/admin/batch/bulk", {
        rows: formattedBatches,
      });

      if (response.data.success) {
        // Refresh batches list after bulk upload
        await get().fetchBatches();
        set({ isSaving: false });
        return {
          success: true,
          summary: response.data.summary,
          errors: response.data.errors,
        };
      } else {
        throw new Error(response.data.message || "Failed to create batches");
      }
    } catch (error) {
      console.error("Failed to bulk create batches:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to create batches",
        isSaving: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // ====================== Update Batch ====================================
  updateBatchInBackend: async (batchId, updatedData) => {
    set({ isSaving: true, error: null });
    try {
      // Format the update data
      const formattedData = {
        program: updatedData.program,
        department: updatedData.department,
        year: parseInt(updatedData.year),
        semester: parseInt(updatedData.semester),
        batch_name: updatedData.batch_name,
        lecture_room_id: updatedData.lecture_room_id || null,
      };

      const response = await axiosInstance.put(
        `/admin/batch/${batchId}`,
        formattedData,
      );

      if (response.data.success) {
        // Refresh batches list
        await get().fetchBatches();
        set({ isSaving: false });
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || "Failed to update batch");
      }
    } catch (error) {
      console.error("Failed to update batch:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update batch",
        isSaving: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // ====================== Delete Batch ====================================
  deleteBatchFromBackend: async (batchId) => {
    set({ isSaving: true, error: null });
    try {
      const response = await axiosInstance.delete(`/admin/batch/${batchId}`);

      if (response.data.success) {
        set((state) => ({
          batches: state.batches.filter((batch) => batch._id !== batchId),
          isSaving: false,
        }));
        return { success: true };
      } else {
        throw new Error(response.data.message || "Failed to delete batch");
      }
    } catch (error) {
      console.error("Failed to delete batch:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete batch",
        isSaving: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // Action to fetch room assignments
  fetchAllRooms: async () => {
    set({ isRoomsLoading: true, error: null, rooms: [] });
    try {
      const response = await axiosInstance.get("/admin/room");
      const rooms = response.data.data || response.data || [];

      // Transform backend data to frontend format
      const formattedRooms = rooms.map((room) => ({
        id: room._id,
        _id: room._id,
        branch: room.department || room.branch,
        batchName: room.batch_name || room.batchName,
        batch_id: room.batch_id,
        labName: room.lab_name || room.labName,
        roomNumber: room.room_number || room.roomNumber,
      }));

      set({ rooms: formattedRooms, isRoomsLoading: false });
      return formattedRooms;
    } catch (error) {
      console.error("Failed to fetch all rooms:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch rooms",
        isRoomsLoading: false,
      });
      return [];
    }
  },

  saveRoomsToBackend: async (newRooms) => {
    set({ isSaving: true, error: null });
    try {
      // Format rooms for backend
      const rows = newRooms.map((room) => ({
        batch_id: room.batch_id || room.batchId,
        room_number: room.roomNumber,
        lab_name: room.labName,
      }));

      const response = await axiosInstance.post("/admin/room/bulk", {
        rows: rows,
      });

      if (response.data.success) {
        set({ isSaving: false });
        return true;
      }
      throw new Error(response.data.message || "Failed to save rooms");
    } catch (error) {
      console.error("Failed to save rooms:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to save rooms",
        isSaving: false,
      });
      return false;
    }
  },

  // Update room in backend - ACTUAL API CALL
  updateRoomInBackend: async (roomId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/admin/room/${roomId}`, {
        room_number: updatedData.roomNumber,
        lab_name: updatedData.labName,
      });

      if (response.data.success) {
        set({ isLoading: false });
        return true;
      }
      throw new Error(response.data.message || "Failed to update room");
    } catch (error) {
      console.error("Failed to update room:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update room",
        isLoading: false,
      });
      return false;
    }
  },

  // Delete room from backend - ACTUAL API CALL
  deleteRoomFromBackend: async (roomId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/admin/room/${roomId}`);

      if (response.data.success) {
        set({ isLoading: false });
        return true;
      }
      throw new Error(response.data.message || "Failed to delete room");
    } catch (error) {
      console.error("Failed to delete room:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete room",
        isLoading: false,
      });
      return false;
    }
  },
  //==============================================================
  //=====================COURSES==================================
  //==============================================================
  fetchCourses: async () => {
    set({ isLoading: true, error: null, courses: [] });

    try {
      const response = await axiosInstance.get("/admin/course");
      const courses = response.data.data || response.data;

      // Transform backend data to frontend format
      const formattedCourses = courses.map((course) => ({
        _id: course._id,
        courseCode: course.course_code,
        courseName: course.course_name,
        semester: course.semester_offered,
        credits: course.credits,
        type: course.course_type,
        department: course.department,
        nature: course.nature,
        l: course.hours?.lecture || 0,
        t: course.hours?.tutorial || 0,
        p: course.hours?.practical || 0,
      }));

      set({
        courses: formattedCourses,
        isLoading: false,
      });

      return formattedCourses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch courses",
        isLoading: false,
        courses: [],
      });
      return [];
    }
  },

  // Save a single course
  saveSingleCourse: async (courseData) => {
    set({ isSaving: true, error: null });

    try {
      // Map frontend field names to backend's exact schema
      const payload = {
        course_code: courseData.courseCode,
        course_name: courseData.courseName,
        semester_offered: parseInt(courseData.semester) || 1,
        credits: parseFloat(courseData.credits) || 0,
        course_type: courseData.type?.toUpperCase(),
        department: courseData.department?.toUpperCase(),
        nature: courseData.nature?.toUpperCase(),
        lecture: parseInt(courseData.l) || 0,
        tutorial: parseInt(courseData.t) || 0,
        practical: parseInt(courseData.p) || 0,
      };

      console.log("Sending single course payload:", payload);

      const response = await axiosInstance.post("/admin/course", payload);
      const newCourse = response.data.data || response.data;

      // Format the new course for frontend state
      const formattedCourse = {
        _id: newCourse._id,
        courseCode: newCourse.course_code,
        courseName: newCourse.course_name,
        semester: newCourse.semester_offered,
        credits: newCourse.credits,
        type: newCourse.course_type,
        department: newCourse.department,
        nature: newCourse.nature,
        l: newCourse.hours?.lecture || 0,
        t: newCourse.hours?.tutorial || 0,
        p: newCourse.hours?.practical || 0,
      };

      set((state) => ({
        courses: [...state.courses, formattedCourse],
        isSaving: false,
      }));

      return { success: true, data: formattedCourse };
    } catch (error) {
      console.error("Error saving single course:", error);
      console.error("Error response:", error.response?.data);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to save course",
        isSaving: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // Save multiple courses (bulk)
  saveBulkCourses: async (coursesData) => {
    set({ isSaving: true, error: null });

    try {
      // Transform frontend course data to match backend's expected format
      const rows = coursesData.map((course) => ({
        course_code: course.courseCode,
        course_name: course.courseName,
        semester_offered: parseInt(course.semester) || 1,
        credits: parseFloat(course.credits) || 0,
        course_type: course.type?.toUpperCase(),
        department: course.department?.toUpperCase(),
        nature: course.nature?.toUpperCase(),
        lecture: parseInt(course.l) || 0,
        tutorial: parseInt(course.t) || 0,
        practical: parseInt(course.p) || 0,
      }));

      // Backend expects { rows: [...] }
      const payload = { rows };

      console.log(
        "Sending bulk courses payload:",
        JSON.stringify(payload, null, 2),
      );
      console.log("Number of courses:", rows.length);

      const response = await axiosInstance.post("/admin/course/bulk", payload);

      console.log("Bulk upload response:", response.data);

      const savedCourses = response.data.data || [];

      // Format saved courses for frontend state
      const formattedCourses = savedCourses.map((course) => ({
        _id: course._id,
        courseCode: course.course_code,
        courseName: course.course_name,
        semester: course.semester_offered,
        credits: course.credits,
        type: course.course_type,
        department: course.department,
        nature: course.nature,
        l: course.hours?.lecture || 0,
        t: course.hours?.tutorial || 0,
        p: course.hours?.practical || 0,
      }));

      // Update local state with all new courses
      set((state) => ({
        courses: [...state.courses, ...formattedCourses],
        isSaving: false,
      }));

      return {
        success: true,
        data: formattedCourses,
        summary: response.data.summary,
      };
    } catch (error) {
      console.error("Error saving bulk courses:", error);
      console.error("Error response:", error.response?.data);

      // Handle partial success if backend returns errors
      if (error.response?.data?.summary) {
        const { summary, errors } = error.response.data;
        console.log("Partial success:", summary);
        console.log("Errors:", errors);

        set({
          error: `Inserted: ${summary.inserted}, Failed: ${summary.skipped}`,
          isSaving: false,
        });

        return {
          success: false,
          error: error.response?.data?.message || "Partial upload failure",
          summary,
          errors,
        };
      }

      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to save courses",
        isSaving: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // Smart save - automatically decides between single and bulk
  saveCoursesToBackend: async (courses) => {
    console.log("saveCoursesToBackend called with:", courses);
    console.log("Number of courses:", courses?.length);

    if (!courses || courses.length === 0) {
      return { success: false, error: "No courses to save" };
    }

    try {
      let result;

      // If only one course, use single course endpoint
      if (courses.length === 1) {
        console.log("Saving single course");
        result = await get().saveSingleCourse(courses[0]);
      } else {
        // If multiple courses, use bulk endpoint
        console.log(`Saving ${courses.length} courses in bulk`);
        result = await get().saveBulkCourses(courses);
      }

      console.log("Save result:", result);
      return result;
    } catch (error) {
      console.error("Error in saveCoursesToBackend:", error);
      return {
        success: false,
        error: error.message || "Failed to save courses",
      };
    }
  },

  // Update a course
  updateCourse: async (updatedCourse) => {
    set({ isLoading: true, error: null });

    try {
      // Map frontend field names to backend's exact schema
      const payload = {
        course_code: updatedCourse.courseCode,
        course_name: updatedCourse.courseName,
        semester_offered: parseInt(updatedCourse.semester) || 1,
        credits: parseFloat(updatedCourse.credits) || 0,
        course_type: updatedCourse.type?.toUpperCase(),
        department: updatedCourse.department?.toUpperCase(),
        nature: updatedCourse.nature?.toUpperCase(),
        lecture: parseInt(updatedCourse.l) || 0,
        tutorial: parseInt(updatedCourse.t) || 0,
        practical: parseInt(updatedCourse.p) || 0,
      };

      console.log("Updating course payload:", payload);

      const response = await axiosInstance.put(
        `/admin/course/${updatedCourse._id}`,
        payload,
      );
      const updated = response.data.data || response.data;

      // Format the updated course for frontend state
      const formattedCourse = {
        _id: updated._id,
        courseCode: updated.course_code,
        courseName: updated.course_name,
        semester: updated.semester_offered,
        credits: updated.credits,
        type: updated.course_type,
        department: updated.department,
        nature: updated.nature,
        l: updated.hours?.lecture || 0,
        t: updated.hours?.tutorial || 0,
        p: updated.hours?.practical || 0,
      };

      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === formattedCourse._id ? formattedCourse : course,
        ),
        isLoading: false,
      }));

      return { success: true, data: formattedCourse };
    } catch (error) {
      console.error("Error updating course:", error);
      console.error("Error response:", error.response?.data);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update course",
        isLoading: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // Delete a course
  deleteCourse: async (courseId) => {
    set({ isLoading: true, error: null });

    try {
      await axiosInstance.delete(`/admin/course/${courseId}`);

      set((state) => ({
        courses: state.courses.filter((course) => course._id !== courseId),
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      console.error("Error deleting course:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete course",
        isLoading: false,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // ====================== Action to save new batches (REAL API CALL) ====================================
  saveBatchesToBackend: async (branch, newBatches) => {
    set({ isSaving: true, error: null });

    try {
      // 🚀 1. MOCK BACKEND SAVE (ACTIVE)
      // Simulates a 1.5-second network request, then saves to local state
      return new Promise((resolve) => {
        setTimeout(() => {
          set((state) => ({
            batches: [...state.batches, ...newBatches],
            isSaving: false,
          }));
          resolve(true); // Tells the UI the save was successful!
        }, 1500);
      });

      // 🌐 2. REAL BACKEND POST (COMMENTED OUT FOR LATER)
      /*
      const response = await fetch('/api/batches/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch: branch, batches: newBatches })
      });
      
      if (!response.ok) {
        throw new Error("Failed to save batches to the server");
      }
      
      const savedData = await response.json();
      
      // Update store with the newly saved data from backend
      set((state) => ({ 
        batches: [...state.batches, ...savedData.batches], 
        isSaving: false 
      }));
      
      return true;
      */
    } catch (error) {
      console.error("Failed to save batches:", error);
      set({ error: error.message, isSaving: false });
      return false; // Tells the UI the save failed
    }
  },
}));

export default useAdminStore;
