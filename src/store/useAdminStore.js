import { create } from "zustand";
import { teacher } from "../../public/js/data";

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

  // ====================== Action to fetch faculty data ==================================
  fetchFaculty: async () => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        set({ faculty: teacher, isLoading: false });
      }, 1000);
      /* REAL BACKEND
      const response = await fetch("/api/faculty");
      const data = await response.json();
      set({ faculty: data, isLoading: false });
      */
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // ====================== Action to fetch batches by branch ==============================
  // ====================== Action to fetch batches by branch ==============================
  fetchBatches: async (branch) => {
    if (!branch) return;

    set({ isLoading: true, error: null, batches: [] }); // Clear previous branch batches
    try {
      // 1. MOCK DATA FETCH
      setTimeout(() => {
        // ADDED DUMMY DATA HERE SO IT SHOWS IN THE DROPDOWN
        const dummyBatches = [
          {
            id: 1,
            batchName: "1st_Year_Sec_A",
            branch: "CSE",
            status: "Active",
            degree: "B.Tech",
            year: "1st Year",
            semester: "1",
            students: 120,
          },
          {
            id: 2,
            batchName: "3rd_Year_DBMS",
            branch: "CSE",
            status: "Active",
            degree: "B.Tech",
            year: "3rd Year",
            semester: "5",
            students: 110,
          },
          {
            id: 3,
            batchName: "Final_Year_AI",
            branch: "CSE",
            status: "Active",
            degree: "B.Tech",
            year: "4th Year",
            semester: "7",
            students: 95,
          },
          {
            id: 4,
            batchName: "2nd_Year_Comm",
            branch: "ECE",
            status: "Active",
            degree: "B.Tech",
            year: "2nd Year",
            semester: "3",
            students: 80,
          },
          {
            id: 5,
            batchName: "1st_Year_Mech",
            branch: "MECH",
            status: "Active",
            degree: "B.Tech",
            year: "1st Year",
            semester: "1",
            students: 60,
          },
        ];

        set({
          // Filter the dummy data so it only shows batches for the selected branch
          batches: dummyBatches.filter((b) => b.branch === branch),
          isLoading: false,
        });
      }, 800);

      // 2. REAL BACKEND FETCH (Uncomment when ready)
      /*
      // Example: GET /api/batches?branch=CSE
      const response = await fetch(`/api/batches?branch=${branch}`);
      if (!response.ok) throw new Error("Failed to fetch batches");
      const data = await response.json();
      set({ batches: data, isLoading: false });
      */
    } catch (error) {
      console.error("Failed to fetch batches:", error);
      set({ error: error.message, isLoading: false });
    }
  },
  // ====================== Action to save new batches ====================================
  saveBatchesToBackend: async (branch, newBatches) => {
    set({ isSaving: true, error: null });
    try {
      // 1. MOCK BACKEND SAVE
      return new Promise((resolve) => {
        setTimeout(() => {
          // Append the new batches to the existing ones in the store
          set((state) => ({
            batches: [...state.batches, ...newBatches],
            isSaving: false,
          }));
          resolve(true); // Tell the component the save was successful
        }, 2000); // Lowered from 5s to 2s for better UX testing
      });

      // 2. REAL BACKEND POST (Uncomment when ready)
      /*
      // Assuming your backend expects { branch: "CSE", batches: [...] }
      const response = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch, batches: newBatches })
      });
      
      if (!response.ok) throw new Error("Failed to save batches to server");
      
      const savedData = await response.json();
      
      // Update store with the newly saved data
      set((state) => ({ 
        batches: [...state.batches, ...newBatches], // Or use savedData from backend
        isSaving: false 
      }));
      return true;
      */
    } catch (error) {
      console.error("Failed to save batches:", error);
      set({ error: error.message, isSaving: false });
      return false; // Tell the component the save failed
    }
  },

  // ====================== Action to update a batch ====================================
  updateBatchInBackend: async (batchId, updatedData) => {
    try {
      // 1. MOCK BACKEND UPDATE
      return new Promise((resolve) => {
        setTimeout(() => {
          set((state) => ({
            batches: state.batches.map((b) =>
              b.id === batchId ? updatedData : b,
            ),
          }));
          resolve(true);
        }, 500); // 500ms mock delay
      });

      // 2. REAL BACKEND PUT (Uncomment when ready)
      /*
      const response = await fetch(`/api/batches/${batchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error("Failed to update batch");
      
      set((state) => ({
        batches: state.batches.map((b) => (b.id === batchId ? updatedData : b)),
      }));
      return true;
      */
    } catch (error) {
      console.error("Failed to update batch:", error);
      return false;
    }
  },

  // ====================== Action to delete a batch ====================================
  deleteBatchFromBackend: async (batchId) => {
    try {
      // 1. MOCK BACKEND DELETE
      return new Promise((resolve) => {
        setTimeout(() => {
          set((state) => ({
            batches: state.batches.filter((b) => b.id !== batchId),
          }));
          resolve(true);
        }, 500);
      });

      // 2. REAL BACKEND DELETE (Uncomment when ready)
      /*
      const response = await fetch(`/api/batches/${batchId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("Failed to delete batch");
      
      set((state) => ({
        batches: state.batches.filter((b) => b.id !== batchId),
      }));
      return true;
      */
    } catch (error) {
      console.error("Failed to delete batch:", error);
      return false;
    }
  },
  // Action to fetch room assignments
  fetchRooms: async (branch) => {
    if (!branch) return;
    set({ isRoomsLoading: true, error: null, rooms: [] });
    try {
      // 1. MOCK DATA FETCH
      setTimeout(() => {
        set({
          rooms: [
            // Dummy data for testing
            {
              id: 101,
              branch: "CSE",
              batchName: "1st_Year_Sec_A",
              labName: "Physics Lab",
              roomNumber: "Lab-1",
            },
            {
              id: 102,
              branch: "CSE",
              batchName: "3rd_Year_DBMS",
              labName: "Computer Lab 3",
              roomNumber: "Lab-304",
            },
          ].filter((r) => r.branch === branch),
          isRoomsLoading: false,
        });
      }, 800);

      // 2. REAL BACKEND FETCH (Uncomment when ready)
      /*
      const response = await fetch(`/api/rooms?branch=${branch}`);
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      set({ rooms: data, isRoomsLoading: false });
      */
    } catch (error) {
      set({ error: error.message, isRoomsLoading: false });
    }
  },

  // Action to save new room assignments
  saveRoomsToBackend: async (branch, newRooms) => {
    set({ isSaving: true, error: null });
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          set((state) => ({
            rooms: [...state.rooms, ...newRooms],
            isSaving: false,
          }));
          resolve(true);
        }, 1500);
      });

      /* REAL BACKEND POST 
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch, rooms: newRooms })
      });
      if (!response.ok) throw new Error("Failed to save rooms");
      const savedData = await response.json();
      set((state) => ({ rooms: [...state.rooms, ...newRooms], isSaving: false }));
      return true;
      */
    } catch (error) {
      set({ isSaving: false });
      return false;
    }
  },

  updateRoomInBackend: async (roomId, updatedData) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          set((state) => ({
            rooms: state.rooms.map((r) => (r.id === roomId ? updatedData : r)),
          }));
          resolve(true);
        }, 500);
      });
    } catch (error) {
      return false;
    }
  },

  deleteRoomFromBackend: async (roomId) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          set((state) => ({
            rooms: state.rooms.filter((r) => r.id !== roomId),
          }));
          resolve(true);
        }, 500);
      });
    } catch (error) {
      return false;
    }
  },

  fetchCourses: async (branch) => {
    if (!branch) return;
    set({ isLoading: true, error: null, courses: [] });
    setTimeout(() => {
      const dummyCourses = [
        {
          id: 1,
          branch: "CSE",
          courseCode: "CS101",
          courseName: "Data Structures",
          credits: "4",
          type: "Core",
          semester: "3",
        },
        {
          id: 2,
          branch: "CSE",
          courseCode: "CS102",
          courseName: "Algorithms",
          credits: "4",
          type: "Core",
          semester: "4",
        },
        {
          id: 3,
          branch: "ECE",
          courseCode: "EC201",
          courseName: "Signals & Systems",
          credits: "3",
          type: "Core",
          semester: "3",
        },
      ];
      set({
        courses: dummyCourses.filter((c) => c.branch === branch),
        isLoading: false,
      });
    }, 800);
  },
  saveCoursesToBackend: async (branch, pending) => {
    set({ isSaving: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set((state) => ({
          courses: [...state.courses, ...pending],
          isSaving: false,
        }));
        resolve(true);
      }, 1000);
    });
  },
  deleteCourse: async (id) => {
    // 1. (Optional) Real API Call here: await fetch(`/api/courses/${id}`, { method: 'DELETE' });

    // 2. Update Zustand State instantly
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    }));
  },

  updateCourse: async (updatedCourse) => {
    // 1. (Optional) Real API Call here: await fetch(`/api/courses/${updatedCourse.id}`, { method: 'PUT', body: JSON.stringify(updatedCourse) });

    // 2. Update Zustand State instantly
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course,
      ),
    }));
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
